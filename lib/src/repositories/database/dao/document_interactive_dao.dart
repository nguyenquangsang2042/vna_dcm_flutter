import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_interactive.dart';
@dao
abstract class DocumentInteractiveDao{
  @Query('SELECT * FROM DocumentInteractive')
  Future<List<DocumentInteractive>> findAll();
}