
import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document.dart';

@dao
abstract class DocumentDao{
  @Query('SELECT * Document')
  Future<List<Document>> findAll();
  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> insertOrUpdateAll(List<Document> data);
}