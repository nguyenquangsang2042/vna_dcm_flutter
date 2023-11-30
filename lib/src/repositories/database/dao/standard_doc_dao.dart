import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/standard_doc.dart';
@dao
abstract class StandardDocDao{
   @Query('SELECT * StandardDoc')
  Future<List<StandardDoc>> findAll();
}