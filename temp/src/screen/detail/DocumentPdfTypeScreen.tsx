import {Text, View} from "react-native";
import PDFView from "react-native-view-pdf";
import {Tab} from '@rneui/themed';
import {useState} from "react";
import {useSelector} from "react-redux";
import {ValueAttributePdf} from "./component/ValueAttributePdf";
import {HeaderAttributePdf} from "./component/HeaderAttributePdf";
import {ScrollView} from "react-native-gesture-handler";
import {format_dd_mm_yy} from "../../utils/function";


// @ts-ignore
export const DocumentPdfTypeScreen = ({item, localPath}) => {
    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    const langId = currentLanguage === 'en' ? 1033 : 1066;

    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    const [index, setIndex] = useState(0);
    return <View style={{flex: 1}}>
        <Tab value={index} onChange={setIndex} dense style={{width: '80%'}}
             indicatorStyle={{
                 backgroundColor: '#006885',
                 height: 3,
             }}
        >
            <Tab.Item titleStyle={{
                color: index == 0 ? '#006885' : 'black', fontFamily: 'heritage_regular',
                lineHeight: 20,
            }}>{currentTranslations.detailPdf}</Tab.Item>
            <Tab.Item titleStyle={{
                color: index != 0 ? '#006885' : 'black', fontFamily: 'heritage_regular',
                lineHeight: 20,
            }}>{currentTranslations.propertiesPdf}</Tab.Item>
        </Tab>
        {
            index == 0 ?
                <PDFView
                    style={{flex: 1}}
                    resource={localPath}
                    resourceType="file"
                /> : <ScrollView style={{backgroundColor:'white'}}>
                    <HeaderAttributePdf title={currentTranslations.th_ng_tin_chung}/>
                    <ValueAttributePdf title={currentTranslations.m_v_n_b_n} value={item.Code} showLine={true}/>
                    <ValueAttributePdf title={currentTranslations.t_n_v_n_b_n} value={item.Title} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.t_n_vi_t_t_t} value={item.TitleEN} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.tr_ng_th_i} value={item.Status} showLine={true}/>
                    <ValueAttributePdf title={currentTranslations.ng_y_ban_h_nh} value={format_dd_mm_yy(item.PublishDate)} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.ng_y_hi_u_l_c} value={format_dd_mm_yy(item.EffectiveStartDate)} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.ng_y_h_t_hi_u_l_c} value={format_dd_mm_yy(item.EffectiveEndDate)} showLine={true}/>
                    <ValueAttributePdf title={currentTranslations.s_ban_h_nh} value={item.Text6} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.s_s_a_i} value={item.Text7} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.s_s_a_i_t_m_th_i} value={item.Text8} showLine={true}/>
                    <ValueAttributePdf title={currentTranslations.ng_n_ng} value={langId==1033?"English":"Tiếng việt"} showLine={true}/>
                    <ValueAttributePdf title={currentTranslations.n_v_ch_tr_bi_n_so_n_c_p_1} value={item.DVCTBSCap1} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.n_v_ch_tr_bi_n_so_n_c_p_2} value={item.DVCTBSCap2} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.n_v_ch_tr_bi_n_so_n_c_p_3} value={item.DVCTBSCap3} showLine={true}/>
                    <ValueAttributePdf title={currentTranslations.c_c_n_v_ph_n_ph_i} value={item.DVPhanPhoi} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.c_p_ph_duy_t_t_i_li_u_c_p_1} value={item.CapPCTLCap1} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.c_p_ph_duy_t_t_i_li_u_c_p_2} value={item.CapPCTLCap2} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.m_t_n_i_dung_s_a_i} value={item.NoiDungSuaDoi} showLine={false}/>

                    <HeaderAttributePdf title={currentTranslations.th_ng_tin_ki_m_so_t}/>
                    <ValueAttributePdf title={currentTranslations.ng_i_ng} value={item.NguoiDang} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.ng_i_xem_x_t} value={item.NguoiXemXet} showLine={true}/>
                    <ValueAttributePdf title={currentTranslations.ng_i_ph_chu_n} value={item.NguoiPheChuan} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.ng_i_ch_p_nh_n} value={item.NguoiChapNhan} showLine={true}/>
                    <ValueAttributePdf title={currentTranslations.ng_i_bi_n_so_n} value={item.NguoiBienSoan} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.ng_i_duy_t} value={item.NguoiDuyet} showLine={true}/>


                    <HeaderAttributePdf title={currentTranslations.th_ng_tin_qu_n_tr}/>
                    <ValueAttributePdf title={currentTranslations.lo_i_t_i_li_u} value={item.LoaiTL} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.danh_m_c} value={item.AreaCategoryTitle} showLine={true}/>
                    <ValueAttributePdf title={currentTranslations.t_vi_t_t_t} value={item.TuVT} showLine={false}/>
                    <ValueAttributePdf title={currentTranslations.t_kh_a} value={item.TuKhoa} showLine={true}/>
                </ScrollView>
        }
    </View>
}
