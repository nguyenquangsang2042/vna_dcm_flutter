package com.vuthao.VNADCM.base.model.app;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

/**
 * Created by Nhum Lê Sơn Thạch on 24/02/2023.
 */
public class DocumentType extends RealmObject {
    @PrimaryKey
    private int ID;
    private String Title;
    private String TitleEN;
    private int LangId;
    private String Url;

    public DocumentType() {
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

    public int getLangId() {
        return LangId;
    }

    public void setLangId(int langId) {
        LangId = langId;
    }

    public String getUrl() {
        return Url;
    }

    public void setUrl(String url) {
        Url = url;
    }
}
