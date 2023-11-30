import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_offline.dart';

@dao
abstract class DocumentOfflineDao{
  @Query('SELECT * FROM DocumentOffline')
  Future<List<DocumentOffline>> findAll();
}