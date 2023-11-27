package com.vuthao.VNADCM.base.realm;

import com.vuthao.VNADCM.base.Constants;
import com.vuthao.VNADCM.base.Functions;
import com.vuthao.VNADCM.base.model.app.Document;
import com.vuthao.VNADCM.base.model.app.DocumentCategory;
import com.vuthao.VNADCM.base.model.app.DocumentOffline;
import com.vuthao.VNADCM.base.model.app.DocumentRecently;

import java.util.ArrayList;

import io.realm.Realm;
import io.realm.RealmResults;
import io.realm.Sort;

/**
 * Created by Nhum Lê Sơn Thạch on 16/02/2023.
 */
public class RealmDocumentOfflineController extends RealmController {


    public void addNewItem(DocumentOffline document) {
        realm.executeTransaction(realm -> realm.copyToRealmOrUpdate(document));
    }
    public void addNewItems(ArrayList<DocumentOffline> documents) {
        realm.executeTransaction(realm -> realm.copyToRealmOrUpdate(documents));
    }
    public void updatePath(int documentID,String path)
    {
        realm.executeTransaction(realm ->{
            DocumentOffline doc=realm.where(DocumentOffline.class).equalTo("DocumentId", documentID).findFirst();
            if(doc!=null)
            {
                doc.setPath(path);
                realm.copyToRealmOrUpdate(doc);
            }
        } );
    }


    public DocumentOffline getItemByDocumentId(int documentId) {
        DocumentOffline data=realm.where(DocumentOffline.class).equalTo("DocumentId", documentId).findFirst();
        return data!=null?realm.copyFromRealm(data):null;
    }
   public ArrayList<DocumentOffline> getAll()
   {
       RealmResults<DocumentOffline> realmResults = realm.where(DocumentOffline.class).isNotEmpty("Path")
               .sort("DateDownload", Sort.DESCENDING).findAll();
       return new ArrayList<>(realmResults);
   }
}
