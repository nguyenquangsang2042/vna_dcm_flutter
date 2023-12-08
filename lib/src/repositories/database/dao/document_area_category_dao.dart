// dao/person_dao.dart

import 'package:floor/floor.dart';

import '../models/document_area_category.dart';

@dao
abstract class DocumentAreaCategoryDao {
  @Query('SELECT * FROM DocumentAreaCategory')
  Future<List<DocumentAreaCategory>> findAll();
  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> insertOrUpdate(List<DocumentAreaCategory> subSites);
}