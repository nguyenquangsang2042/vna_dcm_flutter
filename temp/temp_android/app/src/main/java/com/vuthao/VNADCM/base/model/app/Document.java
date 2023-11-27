package com.vuthao.VNADCM.base.model.app;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

/**
 * Created by Nhum Lê Sơn Thạch on 10/02/2023.
 */
public class Document extends RealmObject {
    @PrimaryKey
    private int ID;
    private String Title;
    private String TitleEN;
    private int DocumentId;
    private int DocumentTypeId;
    private int DocumentGroupId;
    private int IsArchived;
    private String Url;
    private String StorageCode;
    private int Status;
    private String IssueDate;
    private String Thumbnail;
    private String LastTimeView;
    private boolean IsMostViewedL;
    private boolean IsNewestL;
    private boolean IsFavoriteL;
    private int AreaCategoryId;
    private String Path;
    private String DateDownload;

    // Other properties from your JSON data
    private String Code;
    private int Version;
    private String EffectiveStartDate;
    private String PublishDate;
    private String Publisher;
    private int Int1;
    private int Int2;
    private int Int5;
    private int Int6;
    private String Text5;
    private String Text6;
    private String Text11;
    private String Title1;
    private String DocUrl;
    private int IsDivSection;
    private String DVCTBSCap1;
    private String DVCTBSCap2;
    private String DVCTBSCap3;
    private String CapPCTLCap1;
    private String CapPCTLCap2;
    private String CapPCTLCap3;

    private String NoiDungSuaDoi;
    private String NguoiDang;
    private String NguoiDuyet;
    private String LoaiTL;
    private String FileUrl;
    private String FileTitle;
    private String FileID;
    private String AreaCategoryTitle;
    private String Department2;
    private String IssueDate1;
    private String EffectiveEndDate;
    private String Text7;
    private String Text8;
    private String DVPhanPhoi;
    private String NguoiXemXet;
    private String NguoiPheChuan;
    private String NguoiChapNhan;
    private String NguoiBienSoan;
    private String TuVT;
    private String TuKhoa;
    private String ResourceCategoryId;
    private String ResourceSubCategoryId;
    private boolean IsPilot;

    public boolean isPilot() {
        return IsPilot;
    }

    public void setPilot(boolean pilot) {
        IsPilot = pilot;
    }

    public String getResourceSubCategoryId() {
        return ResourceSubCategoryId;
    }

    public void setResourceSubCategoryId(String resourceSubCategoryId) {
        ResourceSubCategoryId = resourceSubCategoryId;
    }

    public String getResourceCategoryId() {
        return ResourceCategoryId;
    }

    public void setResourceCategoryId(String resourceCategoryId) {
        ResourceCategoryId = resourceCategoryId;
    }

    public String getFileID() {
        return FileID;
    }

    public void setFileID(String fileID) {
        FileID = fileID;
    }

    public String getTuVT() {
        return TuVT;
    }

    public void setTuVT(String tuVT) {
        TuVT = tuVT;
    }

    public String getTuKhoa() {
        return TuKhoa;
    }

    public void setTuKhoa(String tuKhoa) {
        TuKhoa = tuKhoa;
    }

    public String getNguoiBienSoan() {
        return NguoiBienSoan;
    }

    public void setNguoiBienSoan(String nguoiBienSoan) {
        NguoiBienSoan = nguoiBienSoan;
    }

    public String getNguoiChapNhan() {
        return NguoiChapNhan;
    }

    public void setNguoiChapNhan(String nguoiChapNhan) {
        NguoiChapNhan = nguoiChapNhan;
    }

    public String getNguoiPheChuan() {
        return NguoiPheChuan;
    }

    public void setNguoiPheChuan(String nguoiPheChuan) {
        NguoiPheChuan = nguoiPheChuan;
    }

    public String getNguoiXemXet() {
        return NguoiXemXet;
    }

    public void setNguoiXemXet(String nguoiXemXet) {
        NguoiXemXet = nguoiXemXet;
    }

    public String getDVCTBSCap3() {
        return DVCTBSCap3;
    }

    public void setDVCTBSCap3(String DVCTBSCap3) {
        this.DVCTBSCap3 = DVCTBSCap3;
    }

    public String getCapPCTLCap3() {
        return CapPCTLCap3;
    }

    public void setCapPCTLCap3(String capPCTLCap3) {
        CapPCTLCap3 = capPCTLCap3;
    }

    public String getDVPhanPhoi() {
        return DVPhanPhoi;
    }

    public void setDVPhanPhoi(String DVPhanPhoi) {
        this.DVPhanPhoi = DVPhanPhoi;
    }

    public String getText8() {
        return Text8;
    }

    public void setText8(String text8) {
        Text8 = text8;
    }

    public String getText7() {
        return Text7;
    }

    public void setText7(String text7) {
        Text7 = text7;
    }

    public String getEffectiveEndDate() {
        return EffectiveEndDate;
    }

    public void setEffectiveEndDate(String effectiveEndDate) {
        EffectiveEndDate = effectiveEndDate;
    }

    public int getIsArchived() {
        return IsArchived;
    }

    public void setIsArchived(int isArchived) {
        IsArchived = isArchived;
    }

    public int getDocumentGroupId() {
        return DocumentGroupId;
    }

    public void setDocumentGroupId(int documentGroupId) {
        DocumentGroupId = documentGroupId;
    }

    public int getDocumentTypeId() {
        return DocumentTypeId;
    }

    public void setDocumentTypeId(int documentTypeId) {
        DocumentTypeId = documentTypeId;
    }

    public String getPath() {
        return Path;
    }

    public void setPath(String path) {
        Path = path;
    }

    public String getDateDownload() {
        return DateDownload;
    }

    public void setDateDownload(String dateDownload) {
        DateDownload = dateDownload;
    }

    public String getCode() {
        return Code;
    }

    public void setCode(String code) {
        Code = code;
    }

    public int getVersion() {
        return Version;
    }

    public void setVersion(int version) {
        Version = version;
    }

    public String getEffectiveStartDate() {
        return EffectiveStartDate;
    }

    public void setEffectiveStartDate(String effectiveStartDate) {
        EffectiveStartDate = effectiveStartDate;
    }

    public String getPublishDate() {
        return PublishDate;
    }

    public void setPublishDate(String publishDate) {
        PublishDate = publishDate;
    }

    public String getPublisher() {
        return Publisher;
    }

    public void setPublisher(String publisher) {
        Publisher = publisher;
    }

    public int getInt1() {
        return Int1;
    }

    public void setInt1(int int1) {
        Int1 = int1;
    }

    public int getInt2() {
        return Int2;
    }

    public void setInt2(int int2) {
        Int2 = int2;
    }

    public int getInt5() {
        return Int5;
    }

    public void setInt5(int int5) {
        Int5 = int5;
    }

    public int getInt6() {
        return Int6;
    }

    public void setInt6(int int6) {
        Int6 = int6;
    }

    public String getText5() {
        return Text5;
    }

    public void setText5(String text5) {
        Text5 = text5;
    }

    public String getText6() {
        return Text6;
    }

    public void setText6(String text6) {
        Text6 = text6;
    }

    public String getText11() {
        return Text11;
    }

    public void setText11(String text11) {
        Text11 = text11;
    }

    public String getTitle1() {
        return Title1;
    }

    public void setTitle1(String title1) {
        Title1 = title1;
    }

    public String getDocUrl() {
        return DocUrl;
    }

    public void setDocUrl(String docUrl) {
        DocUrl = docUrl;
    }

    public int getIsDivSection() {
        return IsDivSection;
    }

    public void setIsDivSection(int isDivSection) {
        IsDivSection = isDivSection;
    }

    public String getDVCTBSCap1() {
        return DVCTBSCap1;
    }

    public void setDVCTBSCap1(String DVCTBSCap1) {
        this.DVCTBSCap1 = DVCTBSCap1;
    }

    public String getDVCTBSCap2() {
        return DVCTBSCap2;
    }

    public void setDVCTBSCap2(String DVCTBSCap2) {
        this.DVCTBSCap2 = DVCTBSCap2;
    }

    public String getCapPCTLCap1() {
        return CapPCTLCap1;
    }

    public void setCapPCTLCap1(String capPCTLCap1) {
        CapPCTLCap1 = capPCTLCap1;
    }

    public String getCapPCTLCap2() {
        return CapPCTLCap2;
    }

    public void setCapPCTLCap2(String capPCTLCap2) {
        CapPCTLCap2 = capPCTLCap2;
    }

    public String getNoiDungSuaDoi() {
        return NoiDungSuaDoi;
    }

    public void setNoiDungSuaDoi(String noiDungSuaDoi) {
        NoiDungSuaDoi = noiDungSuaDoi;
    }

    public String getNguoiDang() {
        return NguoiDang;
    }

    public void setNguoiDang(String nguoiDang) {
        NguoiDang = nguoiDang;
    }

    public String getNguoiDuyet() {
        return NguoiDuyet;
    }

    public void setNguoiDuyet(String nguoiDuyet) {
        NguoiDuyet = nguoiDuyet;
    }

    public String getLoaiTL() {
        return LoaiTL;
    }

    public void setLoaiTL(String loaiTL) {
        LoaiTL = loaiTL;
    }

    public String getFileUrl() {
        return FileUrl;
    }

    public void setFileUrl(String fileUrl) {
        FileUrl = fileUrl;
    }

    public String getFileTitle() {
        return FileTitle;
    }

    public void setFileTitle(String fileTitle) {
        FileTitle = fileTitle;
    }

    public String getAreaCategoryTitle() {
        return AreaCategoryTitle;
    }

    public void setAreaCategoryTitle(String areaCategoryTitle) {
        AreaCategoryTitle = areaCategoryTitle;
    }

    public String getDepartment2() {
        return Department2;
    }

    public void setDepartment2(String department2) {
        Department2 = department2;
    }

    public String getIssueDate1() {
        return IssueDate1;
    }

    public void setIssueDate1(String issueDate1) {
        IssueDate1 = issueDate1;
    }

    public Document() {
    }
    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public String getTitleEN() {
        return TitleEN;
    }

    public void setTitleEN(String titleEN) {
        TitleEN = titleEN;
    }

    public int getDocumentId() {
        return DocumentId;
    }

    public void setDocumentId(int documentId) {
        DocumentId = documentId;
    }

    public String getUrl() {
        return Url;
    }

    public void setUrl(String url) {
        Url = url;
    }

    public String getStorageCode() {
        return StorageCode;
    }

    public void setStorageCode(String storageCode) {
        StorageCode = storageCode;
    }

    public int getStatus() {
        return Status;
    }

    public void setStatus(int status) {
        Status = status;
    }

    public String getIssueDate() {
        return IssueDate;
    }

    public void setIssueDate(String issueDate) {
        IssueDate = issueDate;
    }

    public String getThumbnail() {
        return Thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        Thumbnail = thumbnail;
    }

    public String getLastTimeView() {
        return LastTimeView;
    }

    public void setLastTimeView(String lastTimeView) {
        LastTimeView = lastTimeView;
    }

    public boolean isMostViewedL() {
        return IsMostViewedL;
    }

    public void setMostViewedL(boolean mostViewedL) {
        IsMostViewedL = mostViewedL;
    }

    public boolean isNewestL() {
        return IsNewestL;
    }

    public void setNewestL(boolean newestL) {
        IsNewestL = newestL;
    }

    public boolean isFavoriteL() {
        return IsFavoriteL;
    }

    public void setFavoriteL(boolean favoriteL) {
        IsFavoriteL = favoriteL;
    }

    public int getAreaCategoryId() {
        return AreaCategoryId;
    }

    public void setAreaCategoryId(int areaCategoryId) {
        AreaCategoryId = areaCategoryId;
    }
}
