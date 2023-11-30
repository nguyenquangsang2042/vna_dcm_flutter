import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/notify.dart';
@dao
abstract class NotifyDao{
  @Query('SELECT * Notify')
  Future<List<Notify>> findAll();
}