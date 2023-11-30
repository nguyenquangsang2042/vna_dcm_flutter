import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/standard_doc_detail.dart';
@dao
abstract class StandardDocDetailDao{
  @Query('SELECT * StandardDocDetail')
  Future<List<StandardDocDetail>> findAll();
}