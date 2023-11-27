import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import {appSchema, Database} from "@nozbe/watermelondb";
import DocumentRecently from "services/database/models/DocumentRecently";
import {Document} from "services/database/models/Document";
import {ConfigNotification} from "services/database/models/ConfigNotification";
import schema from "services/database/schema";
import {DocumentInteractive} from "services/database/models/DocumentInteractive";
import {Comment} from "services/database/models/Comment";
import {DocumentAreaCategory} from "services/database/models/DocumentAreaCategory";
import {FavoriteFolder} from "services/database/models/FavoriteFolder";
import {DocumentType} from "services/database/models/DocumentType";
import {DocumentCategory} from "services/database/models/DocumentCategory";
import DocumentOffline from "services/database/models/DocumentOffline";
import {SearchHistory} from "services/database/models/SearchHistory";
import { DocumentFavorite } from "./models/DocumentFavorite";
import {Notify} from "services/database/models/Notify";
import {SubSite} from "services/database/models/SubSite";
import {StandardDoc} from "services/database/models/StandardDoc";
import { StandardDocDetail } from "./models/StandardDocDetail";
import StandardDocDashBoard from "services/database/models/StandardDocDashBoard";

const adapter = new SQLiteAdapter({
    schema:schema,
    dbName: 'myDatabase',
});
// @ts-ignore
export const database = new Database({
    adapter: adapter,
    modelClasses: [
        Document,
        DocumentRecently,
        ConfigNotification,
        DocumentInteractive,
        Comment,
        DocumentAreaCategory,
        FavoriteFolder,
        DocumentType,
        DocumentCategory,
        DocumentOffline,
        SearchHistory,
        DocumentFavorite,
        Notify,
        SubSite,
        StandardDoc,
        StandardDocDetail,
        StandardDocDashBoard
    ],
    // @ts-ignore
    actionsEnabled: true,
})
