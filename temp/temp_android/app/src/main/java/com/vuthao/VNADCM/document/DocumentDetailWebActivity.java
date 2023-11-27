package com.vuthao.VNADCM.document;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DownloadManager;
import android.app.ProgressDialog;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewTreeObserver;
import android.webkit.DownloadListener;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.CompoundButton;

import android.widget.Toast;
import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.core.content.FileProvider;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.google.android.material.tabs.TabLayout;
import com.google.gson.Gson;
import com.vuthao.VNADCM.BuildConfig;
import com.vuthao.VNADCM.R;
import com.vuthao.VNADCM.base.Constants;
import com.vuthao.VNADCM.base.DCMApplication;
import com.vuthao.VNADCM.base.Functions;
import com.vuthao.VNADCM.base.LocaleHelper;
import com.vuthao.VNADCM.base.NetworkUtil;
import com.vuthao.VNADCM.base.Utility;
import com.vuthao.VNADCM.base.activity.BaseActivity;
import com.vuthao.VNADCM.base.api.session.PersistentCookieStore;
import com.vuthao.VNADCM.base.event.EventChange;
import com.vuthao.VNADCM.base.event.EventDispatcher;
import com.vuthao.VNADCM.base.model.app.CurrentUser;
import com.vuthao.VNADCM.base.model.app.Document;
import com.vuthao.VNADCM.base.model.app.DocumentOffline;
import com.vuthao.VNADCM.base.model.app.DocumentType;
import com.vuthao.VNADCM.base.model.custom.DeviceInfo;
import com.vuthao.VNADCM.base.realm.RealmDocumentController;
import com.vuthao.VNADCM.base.realm.RealmDocumentOfflineController;
import com.vuthao.VNADCM.base.realm.RealmDocumentTypeController;
import com.vuthao.VNADCM.databinding.ActivityDocumentWebBinding;
import com.vuthao.VNADCM.document.presenter.DocmentWebPresenter;
import com.vuthao.VNADCM.login.LoginActivity;

import okhttp3.JavaNetCookieJar;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;

public class DocumentDetailWebActivity extends BaseActivity implements View.OnClickListener,
        DocmentWebPresenter.DocmentWebListener,
        DownloadListener,
        DocumentDownload.DocumentDownloadListener,
        CompoundButton.OnCheckedChangeListener,
        SwipeRefreshLayout.OnRefreshListener {
    private ActivityDocumentWebBinding binding;
    private DocmentWebPresenter presenter;
    private int mResouceId;
    private boolean isOffline;
    private int mDocumentGroupId;
    private int mCategoryId;
    private String mToken;
    private String mUrl;
    private RealmDocumentTypeController realmDocumentTypeController;
    private RealmDocumentController realmDocumentController;
    private RealmDocumentOfflineController realmDocumentOfflineController;
    private DocumentType documentType;
    private Document document;
    private DocumentOffline documentOffline;
    private ValueCallback<Uri[]> uploadComment;
    private static final String TAG = DocumentDetailWebActivity.class.getSimpleName();
    private ViewTreeObserver.OnScrollChangedListener mOnScrollChangedListener;
    private DocumentWebClient docClient;
    private ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        binding = ActivityDocumentWebBinding.inflate(getLayoutInflater());
        super.onCreate(savedInstanceState);
        setContentView(binding.getRoot());

        init();
        configureWebView();

        if(getIntent().getExtras().containsKey("isOffline"))
        {
            this.onGetTokenWebError();
            binding.swipeRefresh.setEnabled(false);
            binding.swipeRefresh.setRefreshing(false);
        }
        else {
            loadData();
        }
        setEvent();

    }
    private void setEvent()
    {
        binding.swipeRefresh.setOnRefreshListener(this);
        binding.imgBack.setOnClickListener(this);
        binding.tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener()
        {

            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                int position = tab.getPosition();
                if(position==0)
                {
                    binding.pdfView.setVisibility(View.VISIBLE);
                    binding.infoView.setVisibility(View.GONE);
                }
                else {
                    binding.pdfView.setVisibility(View.GONE);
                    binding.infoView.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });
    }

    private void init() {
        presenter = new DocmentWebPresenter(this);
        realmDocumentTypeController = new RealmDocumentTypeController();
        realmDocumentController = new RealmDocumentController();
        realmDocumentOfflineController = new RealmDocumentOfflineController();
        Bundle bundle = getIntent().getExtras();
        if (bundle != null) {
            mResouceId = bundle.getInt("ResourceId", 0);
            isOffline = bundle.getBoolean("isOffline", false);
            mDocumentGroupId = bundle.getInt("DocumentGroupId", 1);
            mCategoryId = bundle.getInt("CategoryId", 0);
            mUrl = bundle.getString("Url", "");
            documentType = realmDocumentTypeController.getItem(mCategoryId);
            document = realmDocumentController.getItemByDocumentId(mResouceId);
            documentOffline = realmDocumentOfflineController.getItemByDocumentId(mResouceId);
            if (documentOffline != null) {
                binding.switchOfflineMode.setChecked(!Functions.isNullOrEmpty(documentOffline.getPath()));
                binding.switchOfflineMode.setOnCheckedChangeListener(this);
            } else if (document != null) {
                binding.switchOfflineMode.setChecked(false);
                binding.switchOfflineMode.setOnCheckedChangeListener(this);
            } else {
                binding.switchOfflineMode.setVisibility(View.GONE);
                binding.lnOfflineMode.setVisibility(View.GONE);
            }
            if (documentType != null) {
                String df = getString(R.string.document_type) + " / ";
                df += CurrentUser.getInstance().getUser().getDefaultLanguageid() == 1066 ? documentType.getTitle() : documentType.getTitleEN();
                binding.tvTitle.setText(df);
            } else {
                binding.lnTitle.setVisibility(View.GONE);
            }
        } else {
            binding.lnTitle.setVisibility(View.GONE);
        }
        binding.tvOffline.setText(R.string.ngo_i_tuy_n);
    }

    private void loadData() {
        presenter.getDocumentById(mResouceId, CurrentUser.getInstance().getUser().getDefaultLanguageid());
        presenter.getTokenWebView();
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void configureWebView() {
        WebSettings webSettings = binding.webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setSupportZoom(true);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setDisplayZoomControls(false);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setAllowFileAccess(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
        String userAgent = String.format("%s [%s/%s]", webSettings.getUserAgentString(), "App Android", BuildConfig.VERSION_NAME);
        webSettings.setUserAgentString(userAgent);
        docClient = new DocumentWebClient(binding, isOffline);
        binding.webView.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_OVERLAY);
        binding.webView.setHorizontalScrollBarEnabled(true);
        binding.webView.setVerticalScrollBarEnabled(true);
        binding.webView.setWebViewClient(docClient);
        binding.webView.setWebChromeClient(new DocumentWebChromeClient());
        binding.webView.setDownloadListener(this);
    }
    public void getDownloadURLPDF()
    {
        try {
            Map<String, Object> fileInfo = new HashMap<>();
            fileInfo.put("Title", document.getFileTitle());
            fileInfo.put("Url", document.getFileUrl());
            fileInfo.put("ID", document.getFileID());

            ArrayList<Map<String, Object>> files = new ArrayList<>();
            files.add(fileInfo);

            DeviceInfo deviceInfo = Utility.share.genDeviceInfo();

            Map<String, Object> metaObj = new HashMap<>();
            metaObj.put("Title", document.getTitle());
            metaObj.put("Description", "");
            metaObj.put("ResourceUrl", document.getUrl());
            metaObj.put("ResourceCategoryId", document.getResourceCategoryId());
            metaObj.put("ResourcesubCategoryId", document.getResourceSubCategoryId());
            metaObj.put("ResourceId", document.getID());
            metaObj.put("PostTime", new Date());
            metaObj.put("UserAgent", "");
            metaObj.put("FlgUpdateData", 1);
            metaObj.put("AppName", "Mobile Android" );
            metaObj.put("Platform", deviceInfo != null ? deviceInfo.getDeviceOS() + " " + deviceInfo.getDeviceOSVersion() : "Android");
            metaObj.put("CodeName", deviceInfo != null ? deviceInfo.getDeviceModel() : "Android");
            metaObj.put("DeviceName", deviceInfo != null ? deviceInfo.getDeviceName() : "Android");
            metaObj.put("IP", "");


            String url = "/api/download.ashx?func=download"
                    + "&tbl=documentattachfiles"
                    + "&data=" + URLEncoder.encode(new Gson().toJson(files), "UTF-8").replace("+", "%20")
                    + "&code=" + document.getTitle().replace("_", "")
                    + "&isarchive=" + (document.getIsArchived() > 0 ? String.valueOf(document.getIsArchived()): "")
                    + "&byurl=1"
                    + "&MetaObj=" + URLEncoder.encode(new Gson().toJson(metaObj), "UTF-8").replace("+", "%20")
                    + "&ispilot=" + (document.isPilot() ? "1" : "0");
            Log.i( "getDownloadURLPDF: ",Constants.BASE_URL+"/"+Constants.SUB_SITE+ url);
            progressDialog = new ProgressDialog(this);
            progressDialog.setMessage("Downloading...");
            progressDialog.setIndeterminate(true);
            progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
            progressDialog.setCancelable(true);
            new DownloadFileTask().execute(Constants.BASE_URL+"/"+Constants.SUB_SITE+ url);
        } catch (Exception ex) {
            // Handle the exception here
        }

    }
    private class DownloadFileTask extends AsyncTask<String, Integer, String> {
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }
        @Override
        protected String doInBackground(String... urls) {
            String fileUrl = urls[0];
            int fileLength;
            PersistentCookieStore cookieStore = new PersistentCookieStore(DCMApplication.context);
            CookieManager cookieManager = new CookieManager(cookieStore, CookiePolicy.ACCEPT_ALL);
            OkHttpClient.Builder builder = new OkHttpClient.Builder()
                    .cookieJar(new JavaNetCookieJar(cookieManager))
                    .connectTimeout(5, TimeUnit.MINUTES)
                    .writeTimeout(5, TimeUnit.MINUTES)
                    .readTimeout(5, TimeUnit.MINUTES);

            OkHttpClient client = builder.build();
            try {
                Request request = new Request.Builder()
                        .url(fileUrl)
                        .build();

                Response response = client.newCall(request).execute();
                if (!response.isSuccessful()) {
                    throw new IOException("Unexpected response code: " + response);
                }
                fileLength = (int) response.body().contentLength();
                String directoryPath = getFilesDir().getPath();
                String uniqueId = UUID.randomUUID().toString();
                String filePath = directoryPath + "/" + uniqueId+".pdf";
                InputStream input = response.body().byteStream();
                FileOutputStream output = new FileOutputStream(filePath);
                byte[] data = new byte[1024];
                int total = 0;
                int count;
                while ((count = input.read(data)) != -1) {
                    total += count;

                    // Publish progress
                    if (fileLength > 0)
                        publishProgress((int) (total * 100 / fileLength));

                    output.write(data, 0, count);
                }

                output.flush();
                output.close();
                input.close();

                return filePath;
            } catch (Exception e) {
                Log.e("DownloadFileActivity", "Error: " + e.getMessage());
                return null;
            }
        }
        @Override
        protected void onProgressUpdate(Integer... values) {
            super.onProgressUpdate(values);
            progressDialog.setIndeterminate(false);
            progressDialog.setMax(100);
            progressDialog.setProgress(values[0]);
        }

        @Override
        protected void onPostExecute(String filePath) {
            progressDialog.dismiss();
            if (filePath != null) {
                documentOffline.setPath(filePath);
                realmDocumentOfflineController.addNewItem(documentOffline);
                Utility.share.showAlertWithOnlyOK(getString(R.string.offline_enable), sBaseActivity, () -> {
                });
            } else {
                // Error occurred
                Toast.makeText(getApplicationContext(), "Download failed. Check the URL and try again.", Toast.LENGTH_LONG).show();
            }
        }
    }
    private void loadUrl() {
        if (!mUrl.isEmpty()) {
            binding.webView.loadUrl(mUrl + "&autoid=" + mToken);
        } else {
            String url = Constants.BASE_URL + "/" + Constants.SUB_SITE
                    + "/frontend/pages/VNADetailVB.aspx?rid=" + mResouceId
                    + "&gid=" + mDocumentGroupId
                    + "&cid=" + mCategoryId
                    + "&autoid=" + mToken
                    + "&Mobile=thachdepzai"
                    + "&lang=" + (getPreferencesController().getLocaleId().equals("1066") ? "vi" : "en");

            binding.webView.loadUrl(url);
            Log.i("Url Web Document", url);
        }
    }

    private void goBack() {
        if (binding.webView.canGoBack()) {
            binding.webView.goBack();
        } else {
            finish();
        }
    }

    @Override
    public void onBackPressed() {
        goBack();
    }

    @Override
    public void onClick(View v) {
        if (v == binding.imgBack) {
            goBack();
        }
    }

    @Override
    public void onGetTokenWebSuccess(String token) {
        mToken = token;
        loadUrl();
    }

    @Override
    public void onGetTokenWebError() {
        documentOffline = realmDocumentOfflineController.getItemByDocumentId(mResouceId);
        if(documentOffline!=null)
        {
            binding.swipeRefresh.setEnabled(false);
            if (Functions.isNullOrEmpty(documentOffline.getPath()))
                binding.tvNodata.setVisibility(View.VISIBLE);
            else {
                binding.switchOfflineMode.setVisibility(View.GONE);
                binding.lnOfflineMode.setVisibility(View.GONE);
                File file = null;
                if (documentOffline.getPath() != null)
                    file = new File(documentOffline.getPath());
                if (file != null && file.exists()) {
                    if ((documentOffline.getIsDivSection() == 2
                            || (documentOffline.getIsDivSection() == 1 && documentOffline.getFileUrl().endsWith("doc"))
                                                      || documentOffline.getFileUrl().endsWith("docx")))
                        binding.webView.loadUrl(file.getPath());
                    else {
                        if(documentOffline!=null && !Functions.isNullOrEmpty(documentOffline.getPath()))
                        {
                            Uri uri = FileProvider.getUriForFile(this, this.getPackageName() + ".provider", file);
                            binding.pdfView.recycle();
                            binding.pdfView.fromUri(uri).enableAnnotationRendering(true).load();
                        }
                        setDataOfflineType2();
                    }
                }
            }
        }
        else
        {
            binding.tvNodata.setVisibility(View.VISIBLE);
        }
    }
    void setDataOfflineType2()
    {
        binding.rlwebView.setVisibility(View.GONE);
        binding.rlOffline.setVisibility(View.VISIBLE);
        binding.tabLayout.getTabAt(0).setText(R.string.n_i_dung_v_n_b_n);
        binding.tabLayout.getTabAt(1).setText(R.string.thu_c_t_nh);
        binding.tvMavanban.setText(Functions.isNullOrEmpty(documentOffline.getCode())?"":documentOffline.getCode());
        binding.tvTenvt.setText(Functions.isNullOrEmpty(documentOffline.getTitleEN())?"":documentOffline.getTitleEN());
        binding.tvTenvanban.setText(Functions.isNullOrEmpty(documentOffline.getTitle())?"":documentOffline.getTitle());
        binding.tvTrangthai.setText(Functions.isNullOrEmpty(String.valueOf(documentOffline.getStatus()))?"":String.valueOf(documentOffline.getStatus()));
        binding.tvNgaybanhanh.setText(Functions.isNullOrEmpty(documentOffline.getPublishDate())?"":
                Functions.share.formatLongToString(Functions.share.formatStringToLong(documentOffline.getPublishDate(),Constants.formatDfDate),"dd/MM/yyyy")
        );
        binding.tvNgayhieuluc.setText(Functions.isNullOrEmpty(documentOffline.getEffectiveStartDate())?"":
                Functions.share.formatLongToString(Functions.share.formatStringToLong(documentOffline.getEffectiveStartDate(),Constants.formatDfDate),"dd/MM/yyyy")
        );
        binding.tvNgayhethieuluc.setText(Functions.isNullOrEmpty(documentOffline.getEffectiveEndDate())?"":
                Functions.share.formatLongToString(Functions.share.formatStringToLong(documentOffline.getEffectiveEndDate(),Constants.formatDfDate),"dd/MM/yyyy")
        );
        binding.tvSobanhanh.setText(Functions.isNullOrEmpty(documentOffline.getText6())?"":documentOffline.getText6());
        binding.tvSosuadoi.setText(Functions.isNullOrEmpty(documentOffline.getText7())?"":documentOffline.getText7());
        binding.tvSosuadoitamthoi.setText(Functions.isNullOrEmpty(documentOffline.getText8())?"":documentOffline.getText8());
        binding.tvLanguage.setText(CurrentUser.getInstance().getUser().getDefaultLanguageid()==1033?"English":"Tiếng việt");
        binding.tvDvctbsc1.setText(Functions.isNullOrEmpty(documentOffline.getDVCTBSCap1())?"":documentOffline.getDVCTBSCap1());
        binding.tvDvctbsc2.setText(Functions.isNullOrEmpty(documentOffline.getDVCTBSCap2())?"":documentOffline.getDVCTBSCap2());
        binding.tvDvctbsc3.setText(Functions.isNullOrEmpty(documentOffline.getDVCTBSCap3())?"":documentOffline.getDVCTBSCap3());
        binding.tvDonviphanphoi.setText(Functions.isNullOrEmpty(documentOffline.getDVPhanPhoi())?"":documentOffline.getDVPhanPhoi());
        binding.tvCappdtlc1.setText(Functions.isNullOrEmpty(documentOffline.getCapPCTLCap1())?"":documentOffline.getCapPCTLCap1());
        binding.tvCappdtlc2.setText(Functions.isNullOrEmpty(documentOffline.getCapPCTLCap2())?"":documentOffline.getCapPCTLCap2());
        binding.tvNoidunsuadoi.setText(Functions.isNullOrEmpty(documentOffline.getNoiDungSuaDoi())?"":documentOffline.getNoiDungSuaDoi());
        binding.tvNguoidang.setText(Functions.isNullOrEmpty(documentOffline.getNguoiDang())?"":documentOffline.getNguoiDang());
        binding.tvNguoixemxet.setText(Functions.isNullOrEmpty(documentOffline.getNguoiXemXet())?"":documentOffline.getNguoiXemXet());
        binding.tvNguoiphechuan.setText(Functions.isNullOrEmpty(documentOffline.getNguoiPheChuan())?"":documentOffline.getNguoiPheChuan());
        binding.tvNguoichapnhan.setText(Functions.isNullOrEmpty(documentOffline.getNguoiChapNhan())?"":documentOffline.getNguoiChapNhan());
        binding.tvNguoibiensoan.setText(Functions.isNullOrEmpty(documentOffline.getNguoiBienSoan())?"":documentOffline.getNguoiBienSoan());
        binding.tvNguoiduyet.setText(Functions.isNullOrEmpty(documentOffline.getNguoiDuyet())?"":documentOffline.getNguoiDuyet());
        binding.tvLoaitl.setText(Functions.isNullOrEmpty(documentOffline.getLoaiTL())?"":documentOffline.getLoaiTL());
        binding.tvDanhmuc.setText(Functions.isNullOrEmpty(documentOffline.getAreaCategoryTitle())?"":documentOffline.getAreaCategoryTitle());
        binding.tvTuviettat.setText(Functions.isNullOrEmpty(documentOffline.getTuVT())?"":documentOffline.getTuVT());
        binding.tvTukhoa.setText(Functions.isNullOrEmpty(documentOffline.getTuKhoa())?"":documentOffline.getTuKhoa());
    }
    @Override
    public void onGetDocumentSuccess() {
        EventDispatcher.getInstance().post(EventChange.DOCUMENT_RECENTLY);
    }

    @Override
    public void onGetDocumentError() {
        Log.d("ERROR", "onGetDocumentError");
    }

    @Override
    public void onAuthCMSSuccess() {
    }

    @Override
    public void onAuthCMSError() {
        onGetTokenWebError();
    }

    @Override
    public void onDoneGetHTML(boolean success, String path) {
        if (success) {

            realmDocumentOfflineController.updatePath(mResouceId, path);
            Utility.share.showAlertWithOnlyOK(getString(R.string.offline_enable), this, () -> {
            });
        } else {
            Utility.share.showAlertWithOnlyOK("Thao tác không thực hện được", this, () -> {
            });
        }
    }

    @Override
    public void onDownloadStart(String url, String userAgent,
                                String contentDisposition, String mimetype,
                                long contentLength) {
        if (contentLength == 0) {
            onDownloadError();
        } else {
            String fileName = contentDisposition.replaceFirst("(?i)^.*filename=\"?([^\"]+)\"?.*$", "$1");
            String folderName = presenter.getFolderName(mResouceId);
            new DocumentDownload(this, this, contentLength)
                    .execute(url, folderName, fileName);
        }
    }

    @Override
    public void onDownloadSuccess() {
        hideProgressDialog();
        showToast(getString(R.string.download_completed), null);
    }

    @Override
    public void onDownloadError() {
        hideProgressDialog();
        showToast(getString(R.string.dowload_error), null);
    }

    @Override
    protected void onResume() {
        super.onResume();
        DCMApplication.getInstance().trackScreenView("Detail document view screen");
    }

    ActivityResultLauncher<Intent> commentResultLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            new ActivityResultCallback<ActivityResult>() {
                @Override
                public void onActivityResult(ActivityResult result) {
                    if (result.getResultCode() == Activity.RESULT_OK) {
                        if (uploadComment == null) return;
                        uploadComment.onReceiveValue(WebChromeClient
                                .FileChooserParams
                                .parseResult(result
                                        .getResultCode(), result.getData()));
                        uploadComment = null;
                    }
                }
            });

    @Override
    public void onRefresh() {

        binding.webView.reload();
        if(getIntent().getExtras().containsKey("isOffline"))
            binding.swipeRefresh.setRefreshing(false);
    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if (isChecked) {
            Map<String, Object> data = new HashMap<>();
            document = realmDocumentController.getItemByDocumentId(mResouceId);
            data.put("DocumentId", document.getDocumentId());
            data.put("DocumentTypeId",document.getDocumentTypeId());
            data.put("DocumentGroupId", document.getDocumentGroupId());
            data.put("IsArchive", document.getIsArchived());
            data.put("Version", document.getVersion());

            String json = new Gson().toJson(data);
            String jsonData=new Gson().toJson(document,Document.class);
            documentOffline=new Gson().fromJson(jsonData,DocumentOffline.class);
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(Constants.formatDfDate);
            String formattedDateTime = now.format(formatter);
            documentOffline.setDateDownload(formattedDateTime);

            realmDocumentOfflineController.addNewItem(documentOffline);
            if ((documentOffline.getIsDivSection() == 2
                    || (documentOffline.getIsDivSection() == 1 && documentOffline.getFileUrl().endsWith("doc")) || documentOffline.getFileUrl().endsWith("docx")))
                presenter.getHTML(this, document, json, 1066, getApplicationContext());
            else {
                getDownloadURLPDF();
            }
        } else {
            realmDocumentOfflineController.updatePath(document.getDocumentId(), "");
            Utility.share.showAlertWithOnlyOK(getString(R.string.offline_disable), this, () -> {
            });
        }
    }

    public class DocumentWebClient extends WebViewClient {
        public Object IsDivSection;
        public Object DocumentId;
        public Object DocumentTypeId;
        public Object DocumentGroupId;
        public Object IsArchive;
        public Object Version;
        private ActivityDocumentWebBinding binding;
        private boolean isOffline;

        public DocumentWebClient(ActivityDocumentWebBinding binding, boolean isOffline) {
            this.binding = binding;
            this.isOffline = isOffline;
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView web, WebResourceRequest request) {
            String url = request.getUrl().toString();
            if (url.contains("download&tbl=documentattachfiles")) {
                showProgressDialog();
                web.loadUrl(request.getUrl().toString());
            } else {
                if (url.contains("not-found") || url.contains("access-denied")) {
                    web.loadUrl(url + "&Mobile=thachdepzai");
                } else {
                    List<Integer> pars = Functions.share.getParameterUrlDoc(url);
                    if (pars.size() > 0) {
                        String u = Constants.BASE_URL + "/" + Constants.SUB_SITE
                                + "/frontend/pages/VNADetailVB.aspx?rid=" + pars.get(0)
                                + "&gid=" + pars.get(1)
                                + "&cid=" + pars.get(2)
                                + "&autoid=" + mToken
                                + "&Mobile=thachdepzai"
                                + "&lang=" + (getPreferencesController().getLocaleId().equals("1066") ? "vi" : "en");
                        web.loadUrl(u);
                    }
                }
            }

            return true;
        }

        @Override
        public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
            super.onReceivedError(view, request, error);
            hideProgressDialog();
            if (NetworkUtil.getConnectivityStatus(DocumentDetailWebActivity.this) == NetworkUtil.NETWORK_STATUS_NOT_CONNECTED) {
                showToast(getString(R.string.no_connection), null);
            } else {
                String url = view.getUrl();
                if (url.contains("download&tbl=documentattachfiles")) {
                    showToast(getString(R.string.dowload_error), null);
                } else {
                    showToast(getString(R.string.something_wrong), null);
                }
            }
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);
            binding.progressBar.setVisibility(View.VISIBLE);
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            view.evaluateJavascript("_VBINFO.IsDivSection", new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String value) {
                    IsDivSection = value;
                    binding.switchOfflineMode.setVisibility(isOffline ? View.GONE : View.VISIBLE);
                    binding.lnOfflineMode.setVisibility(isOffline ? View.GONE : View.VISIBLE);
                }
            });
            view.evaluateJavascript("_VBINFO.DocumentId", new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String value) {
                    DocumentId = value;
                }
            });
            view.evaluateJavascript("_VBINFO.DocumentTypeId", new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String value) {
                    DocumentTypeId = value;
                }
            });
            view.evaluateJavascript("_DocumentGroupId", new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String value) {
                    DocumentGroupId = value;
                }
            });
            view.evaluateJavascript("_QUERYINFO.IsArchive", new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String value) {
                    IsArchive = value;
                }
            });
            view.evaluateJavascript("_VBINFO.Version", new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String value) {
                    Version = value;
                }
            });
        }
    }

    public class DocumentWebChromeClient extends WebChromeClient {
        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            binding.progressBar.setProgress(newProgress);
            binding.progressBar.setVisibility(newProgress == 100 ? View.INVISIBLE : View.VISIBLE);
            if (binding.swipeRefresh.isRefreshing()) {
                binding.swipeRefresh.setRefreshing(false);
            }
        }

        @Override
        public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
            if (uploadComment != null) {
                uploadComment.onReceiveValue(null);
                uploadComment = null;
            }

            uploadComment = filePathCallback;
            Intent intent = fileChooserParams.createIntent();
            try {
                commentResultLauncher.launch(intent);
            } catch (ActivityNotFoundException e) {
                uploadComment = null;
                showToast(getString(R.string.error_file_chooser), null);
                Log.d(TAG, e.getMessage());
                return false;
            }
            return true;
        }
    }

    @Override
    protected void onStart() {
        super.onStart();
        binding.swipeRefresh.getViewTreeObserver().addOnScrollChangedListener(mOnScrollChangedListener =
                () -> {
                    binding.swipeRefresh.setEnabled(binding.webView.getScrollY() == 0);
                });
    }

    @Override
    protected void onStop() {
        binding.swipeRefresh.getViewTreeObserver().removeOnScrollChangedListener(mOnScrollChangedListener);
        super.onStop();
    }

    @Override
    protected void attachBaseContext(Context newBase) {
        super.attachBaseContext(LocaleHelper.wrap(newBase));
    }
}
