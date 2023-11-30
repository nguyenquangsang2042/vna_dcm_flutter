import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_recently.dart';
@dao
abstract class DocumentRecentlyDao{
  @Query('SELECT * DocumentRecently')
  Future<List<DocumentRecently>> findAll();
}