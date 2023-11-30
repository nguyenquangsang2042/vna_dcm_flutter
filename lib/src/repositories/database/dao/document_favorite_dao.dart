import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_favorite.dart';
@dao
abstract class DocumentFavoriteDao{
  @Query('SELECT * FROM DocumentFavorite')
  Future<List<DocumentFavorite>> findAll();
}