import {appSchema, tableSchema} from "@nozbe/watermelondb";
import {Document} from "services/database/models/Document";
import DocumentRecently from "services/database/models/DocumentRecently";
import {ConfigNotification} from "services/database/models/ConfigNotification";
import {DocumentInteractive} from "services/database/models/DocumentInteractive";
import {Comment} from "services/database/models/Comment";
import {DocumentAreaCategory} from "services/database/models/DocumentAreaCategory";
import {FavoriteFolder} from "services/database/models/FavoriteFolder";
import {DocumentType} from "services/database/models/DocumentType";
import {DocumentCategory} from "services/database/models/DocumentCategory";
import DocumentOffline from "services/database/models/DocumentOffline";
import {SearchHistory} from "services/database/models/SearchHistory";
import {DocumentFavorite} from "services/database/models/DocumentFavorite";
import {Notify} from "services/database/models/Notify";
import {SubSite} from "services/database/models/SubSite";
import {StandardDoc} from "services/database/models/StandardDoc";
import {StandardDocDetail} from "services/database/models/StandardDocDetail";
import StandardDocDashBoard from "services/database/models/StandardDocDashBoard";

const schema = appSchema({
    version: 1,
    tables: [
        DocumentRecently.getSchema(),
        Document.getSchema(),
        ConfigNotification.getSchema(),
        DocumentInteractive.getSchema(),
        Comment.getSchema(),
        DocumentAreaCategory.getSchema(),
        FavoriteFolder.getSchema(),
        DocumentType.getSchema(),
        DocumentCategory.getSchema(),
        DocumentOffline.getSchema(),
        SearchHistory.getSchema(),
        DocumentFavorite.getSchema(),
        Notify.getSchema(),
        SubSite.getSchema(),
        StandardDoc.getSchema(),
        StandardDocDetail.getSchema(),
        StandardDocDashBoard.getSchema(),
    ],
});
export default schema;
