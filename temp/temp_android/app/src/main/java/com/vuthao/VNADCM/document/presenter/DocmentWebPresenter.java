package com.vuthao.VNADCM.document.presenter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Path;

import androidx.core.content.ContextCompat;

import com.google.gson.Gson;
import com.vuthao.VNADCM.base.Functions;
import com.vuthao.VNADCM.base.ImageUtils;
import com.vuthao.VNADCM.base.api.ApiAuthController;
import com.vuthao.VNADCM.base.api.ApiDocumentController;
import com.vuthao.VNADCM.base.model.Status;
import com.vuthao.VNADCM.base.model.app.Document;
import com.vuthao.VNADCM.base.model.app.DocumentOffline;
import com.vuthao.VNADCM.base.model.app.DocumentRecently;
import com.vuthao.VNADCM.base.realm.*;

import io.reactivex.Observable;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.schedulers.Schedulers;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by Nhum Lê Sơn Thạch on 16/02/2023.
 */
public class DocmentWebPresenter {
    private final DocmentWebListener listener;
    private final ApiAuthController apiAuthController;
    private final ApiDocumentController apiDocumentController;
    private final RealmDocumentRecentlyController realmDocumentRecentlyController;
    private final RealmDocumentController realmDocumentController;
    private final RealmDocumentOfflineController realmDocumentOfflineController;

    public DocmentWebPresenter(DocmentWebListener listener) {
        this.listener = listener;
        this.apiAuthController = new ApiAuthController();
        this.realmDocumentRecentlyController = new RealmDocumentRecentlyController();
        this.apiDocumentController = new ApiDocumentController();
        this.realmDocumentController = new RealmDocumentController();
        this.realmDocumentOfflineController = new RealmDocumentOfflineController();
    }

    public void getTokenWebView() {
        apiAuthController.getTokenWebView(new ApiAuthController.ApiTokenWebViewListener() {
            @Override
            public void onGetTokenSuccess(String token) {
                listener.onGetTokenWebSuccess(token);
            }

            @Override
            public void onGetTokenError() {
                listener.onGetTokenWebError();
            }
        });
    }

    public void getDocumentById(int id,int langID) {
        apiDocumentController.getDocumentById(id, new ApiDocumentController.ApiDocumentListener() {
            @Override
            public void onGetDocumentSuccess(ArrayList<DocumentOffline> documents) {
                addDocumentRecently(id);
                if(documents!=null && !documents.isEmpty())
                {
                    String json = new Gson().toJson(documents.get(0));
                    Document data= new Gson().fromJson(json, Document.class);
                    realmDocumentController.addNewItem(data);
                }
                listener.onGetDocumentSuccess();
            }

            @Override
            public void onGetDocumentError() {
                listener.onGetDocumentError();
            }
        },langID);
    }
    public void getHTML(DocmentWebListener listener,Document doc,String data, int lcid,Context context)
    {
        apiDocumentController.getHTML(new ApiDocumentController.ApiHTMLListener() {
            @SuppressLint("CheckResult")
            @Override
            public void onGetHTMLSuccess(String html) {
                Observable.create(emitter -> {
                            UUID uuid = UUID.randomUUID();
                            String strHTML = replaceHrefAndSrc(context, html, uuid.toString());
                            strHTML=strHTML.replace("&lt;;#type;#&gt;","").replace("<#root>","");
                            String path = writeHtmlToFile(context, strHTML, uuid.toString());

                            if (!Functions.isNullOrEmpty(path)) {
                                emitter.onNext(path);
                            } else {
                                emitter.onError(new Exception("Path is null or empty"));
                            }

                            emitter.onComplete();
                        })
                        .subscribeOn(Schedulers.newThread())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(path -> {
                            listener.onDoneGetHTML(true, (String) path);
                        }, throwable -> {
                            listener.onDoneGetHTML(false, null);
                        });
            }

            @Override
            public void onGetHTMLError(String err) {
                listener.onDoneGetHTML(false,null);
            }
        },data,lcid);
    }
    public String replaceHrefAndSrc(Context context,String htmlString,String guid) {
        org.jsoup.nodes.Document doc = Jsoup.parse(htmlString);

        Elements hrefElements = doc.select("[href]");
        for (Element element : hrefElements) {
            String originalSrc = element.attr("href");
            String newSrc = downloadResource(context,originalSrc,guid);
            element.attr("href", newSrc);
        }

        Elements srcElements = doc.select("[src]");
        for (Element element : srcElements) {
            String originalSrc = element.attr("src");
            String newSrc = downloadResource(context,originalSrc,guid);
            element.attr("src", newSrc);
        }
        Elements scriptElements = doc.select("script");
        for (Element element : scriptElements) {
            if(element.toString().contains("_NODE"))
            {
                Map<String,String> data =getPathAndReplace(context,element.toString(),guid);
                String html=element.toString();
                for (Map.Entry<String, String> entry : data.entrySet()) {
                    html=html.replace(entry.getKey(),entry.getValue());
                }
                element.replaceWith(Jsoup.parse(html));

            }
        }

        return doc.html();
    }

    public Map<String,String> getPathAndReplace(Context context,String html,String guid)
    {
        List<String> data= Arrays.stream(html.split("\\\\\\\\\\\\\\\""))
            .filter(img -> img.contains("https")&& ImageUtils.isImageLink(img)) // Filter items containing "https"
            .collect(Collectors.toList());
        Map<String,String> dataReplace=new HashMap<>();
        for(String str:data)
        {
           dataReplace.put(str, downloadResource(context,str,guid));
        }
        return dataReplace;
    }
    public String writeHtmlToFile(Context context,  String htmlContent,String guid) {
        try {
            // Create the file object
            File file = new File(context.getFilesDir()+"/"+guid, guid+".html");

            // Create a FileWriter object
            FileWriter writer = new FileWriter(file);

            // Write the HTML content to the file
            writer.write(htmlContent);

            // Close the writer
            writer.close();

            return file.getPath();
        } catch (IOException e) {
            e.printStackTrace();
            return ""; // File write failed
        }
    }
    public String downloadResource(Context context, String originalSrc,String guid) {
        try {
            URL url = new URL(originalSrc);
            URLConnection connection = url.openConnection();
            InputStream inputStream = connection.getInputStream();

            String fileName = originalSrc.substring(originalSrc.lastIndexOf('/') + 1);
            String filePath = Paths.get(context.getFilesDir()+"/"+guid, fileName).toString();

            // Create the 'downloaded_resources' directory if it doesn't exist
            File directory = new File(context.getFilesDir()+"/"+guid);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            OutputStream outputStream = new FileOutputStream(filePath);
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }

            inputStream.close();
            outputStream.close();

            return  filePath;
        } catch (IOException e) {
            e.printStackTrace();
            return originalSrc; // Return original src if downloading fails
        }
    }

    public String getFolderName(int id) {
        String res = "";
        Document document = realmDocumentController.getItemByDocumentId(id);
        if (document != null) {
            res = document.getTitle() + "_" + id;
            res = Functions.share.replaceString(res);
        }

        return res;
    }

    public void addDocumentRecently(int id) {
        DocumentRecently recently = new DocumentRecently(id, System.currentTimeMillis());
        realmDocumentRecentlyController.addItem(recently);
    }

    public void authCMS() {
        apiAuthController.authCMS(new Callback<Status>() {
            @Override
            public void onResponse(Call<Status> call, Response<Status> response) {
                if (response.isSuccessful()) {
                    if (response.body().getStatus().equals("SUCCESS")) {
                        listener.onAuthCMSSuccess();
                    } else {
                        listener.onAuthCMSError();
                    }
                } else {
                    listener.onAuthCMSError();
                }
            }

            @Override
            public void onFailure(Call<Status> call, Throwable t) {
                listener.onAuthCMSError();
            }
        });
    }

    public interface DocmentWebListener {
        void onGetTokenWebSuccess(String token);
        void onGetTokenWebError();
        void onGetDocumentSuccess();
        void onGetDocumentError();
        void onAuthCMSSuccess();
        void onAuthCMSError();
        void onDoneGetHTML(boolean success,String path);
    }
}
