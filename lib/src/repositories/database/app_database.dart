
import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/daos/comment_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/daos/config_notification_dao.dart';
import 'dart:async';
import 'package:vna_dcm_flutter/src/repositories/database/daos/document_area_category_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/daos/document_type_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/daos/favorite_folder_dao.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_area_category.dart';
import 'package:sqflite/sqflite.dart' as sqflite;

part 'app_database.g.dart'; // the generated code will be there

@Database(version: 1, entities: [DocumentAreaCategory])
abstract class AppDatabase extends FloorDatabase {
  DocumentAreaCategoryDao get documentAreaCategoryDao;
  FavoriteFolderDao get favoriteFolderDao;
  DocumentTypeDao get documentTypeDao;
  CommentDao get commentDao;
  ConfigNotificationDao get configNotificationDao;
}