import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/standard_doc_dashboard.dart';

@dao
abstract class StandardDocDashBoardDao {
  @Query('SELECT * StandardDocDashBoard')
  Future<List<StandardDocDashBoard>> findAll();
  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> insertOrUpdateAll(List<StandardDocDashBoard> data);
}
