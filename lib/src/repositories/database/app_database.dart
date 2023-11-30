
import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/comment_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/config_notification_dao.dart';
import 'dart:async';
import 'package:vna_dcm_flutter/src/repositories/database/dao/document_area_category_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/document_category_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/document_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/document_favorite_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/document_interactive_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/document_offline_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/document_recently_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/document_type_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/favorite_folder_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/notify_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/search_history_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/standard_doc_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/standard_doc_dashboard_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/standard_doc_detail_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/dao/sub_site_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/comment.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/config_notification.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_area_category.dart';
import 'package:sqflite/sqflite.dart' as sqflite;
import 'package:vna_dcm_flutter/src/repositories/database/models/document_category.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_favorite.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_interactive.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_offline.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_recently.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_type.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/favorite_folder.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/notify.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/search_history.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/standard_doc.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/standard_doc_dashboard.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/standard_doc_detail.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/sub_site.dart';

part 'app_database.g.dart'; 
@Database(version: 1, entities: [
  DocumentAreaCategory,
  FavoriteFolder,
  DocumentType,
  Comment,
  ConfigNotification,
  Document,
  DocumentCategory,
  DocumentFavorite,
  DocumentInteractive,
  DocumentOffline,
  DocumentRecently,
  Notify,
  SearchHistory,
  StandardDoc,
  StandardDocDashBoard,
  StandardDocDetail,
  SubSite
  ])
abstract class AppDatabase extends FloorDatabase {
  DocumentAreaCategoryDao get documentAreaCategoryDao;
  FavoriteFolderDao get favoriteFolderDao;
  DocumentTypeDao get documentTypeDao;
  CommentDao get commentDao;
  ConfigNotificationDao get configNotificationDao;
  DocumentDao get documentDao;
  DocumentCategoryDao get documentCategory;
  DocumentFavoriteDao get documentFavoriteDao;
  DocumentInteractiveDao get documentInteractiveDao;
  DocumentOfflineDao get documentOfflineDao;
  DocumentRecentlyDao get documentRecentlyDao;
  NotifyDao get notifyDao;
  SearchHistoryDao get searchHistoryDao;
  StandardDocDao get standardDocDao;
  StandardDocDashBoardDao get standardDocDashBoardDao;
  StandardDocDetailDao get standardDocDetailDao;
  SubSiteDao get subSiteDao;
}