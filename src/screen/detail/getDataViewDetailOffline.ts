import {Alert} from "react-native";
import {getHTML} from "services/api/apiProvider";
import cheerio from 'cheerio';
import uuid from 'react-native-uuid';
import RNFS from 'react-native-fs';
import axios from "axios";
import {isNullOrEmpty} from "../../utils/function";
import downloadPDF from "./downloadPDF";

export const getDataViewDetailOffline = async (item: any, langId: number) => {
    const res={
        status:false,
        path:''
    }
    const postData = {
        "DocumentId": item.DocumentId,
        "DocumentTypeId": item.DocumentTypeId,
        "DocumentGroupId": item.DocumentGroupId,
        "IsArchive": item.IsArchive,
        "Version": item.Version
    }
    const guid = uuid.v4();
    if ((item.IsDivSection == 2
        || (item.IsDivSection == 1 && item.FileUrl.endsWith("doc")) || item.FileUrl.endsWith("docx"))) {
        let html = await getHTML(langId, langId, postData);
        html = await replaceHrefAndSrc(html, guid);
        res.path= await writeHtmlToFile(html,guid)
        res.status=!isNullOrEmpty(res.path);
        return res;
    } else {
        res.path=await downloadPDF(item,guid);
        res.status=!isNullOrEmpty(res.path);
        return res;
    }
}
const  writeHtmlToFile=async (htmlContent: string, guid: string | number[])=> {
    try {
        const dirPath = `${RNFS.DocumentDirectoryPath}/${guid}`;
        await RNFS.mkdir(dirPath);
        const filePath = `${dirPath}/${guid}.html`;
        await RNFS.writeFile(filePath, htmlContent, 'utf8');

        return filePath;
    } catch (error) {
        console.error(error);
        return '';
    }
}
const replaceHrefAndSrc = async (htmlString: string, guid:any) => {
    let $ = cheerio.load(htmlString);
    const hrefPromises: Promise<void>[] = [];
    const srcPromises: Promise<void>[] = [];
    $('[href]').each((index, element) => {
        const originalSrc = $(element).attr('href');

        if(originalSrc != undefined && !isNullOrEmpty(originalSrc))
        {
            hrefPromises.push(downloadResource(originalSrc, guid).then((newSrc) => {
                $(element).attr('href', newSrc);
            }));
        }
    });
    $('[src]').each((index, element) => {

        const originalSrc = $(element).attr('src');
        if(originalSrc != undefined && !isNullOrEmpty(originalSrc))
        {
            srcPromises.push(downloadResource(originalSrc, guid).then((newSrc) => {
                $(element).attr('src', newSrc);
            }));
        }
    });

    await Promise.all([...hrefPromises, ...srcPromises]);
    const scriptPromises: any[] = [];
    $('script').each((index, element) => {
        if ($(element).toString().includes('_NODE')) {
            scriptPromises.push(getPathAndReplace($(element.children[0]).toString(), guid));
        }
    });
    const scriptHtmls = await Promise.all(scriptPromises);
    $('script').each((index, element) => {
        if ($(element).toString().includes('_NODE')) {
            // @ts-ignore
            $=cheerio.load($.html().toString().replace(element.children[0].data,scriptHtmls.shift()))
        }
    });
    $=cheerio.load($.html().toString().replace("&lt;;#type;#&gt;",""))
    return $.html();
}
const getPathAndReplace = async (html:string, guid:string) => {
    const data = html.split('"').filter(img => img.includes('https') && isImageLink(img));
    let dataReplace ;
    for (const str of data) {
        dataReplace = await downloadResource(removeTrailingBackslashes(str), guid);
        html=html.replace(removeTrailingBackslashes(str),dataReplace);
    }

    return html;
}
const removeTrailingBackslashes = (url: string)=> {
    return url.replace(/\\+$/, '');
}
const isImageLink=(img: string | string[])=> {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
    for (const ext of imageExtensions) {
        if (img.includes(ext)) {
            return true;
        }
    }
    return false;
}

const downloadResource = async (originalSrc: string, guid: string) => {
    try {
        const response = await axios.get(originalSrc, {responseType: 'arraybuffer'});

        const fileName = originalSrc.substring(originalSrc.lastIndexOf('/') + 1);
        const filePath = `${RNFS.DocumentDirectoryPath}/${guid}/${fileName}`;
        await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/${guid}`);
        await RNFS.writeFile(filePath, response.request._response, 'base64');
        return filePath;
    } catch (error) {
        console.error(error);
        return originalSrc;
    }
}
