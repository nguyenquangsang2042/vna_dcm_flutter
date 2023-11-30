import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/search_history.dart';
@dao
abstract class SearchHistoryDao{
  @Query('SELECT * SearchHistory')
  Future<List<SearchHistory>> findAll();
}