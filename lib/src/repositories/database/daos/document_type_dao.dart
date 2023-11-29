import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_type.dart';
@dao
abstract class DocumentTypeDao{
  @Query('SELECT * DocumentType')
  Future<List<DocumentType>> findAll();
}