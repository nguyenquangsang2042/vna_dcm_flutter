import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_category.dart';
@dao
abstract class DocumentCategoryDao{
  @Query('SELECT * FROM DocumentCategory')
  Future<List<DocumentCategory>> findAll();
  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> insertOrUpdateAll(List<DocumentCategory> data);
}