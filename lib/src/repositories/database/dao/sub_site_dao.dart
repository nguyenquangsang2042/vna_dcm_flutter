import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/sub_site.dart';
@dao
abstract class SubSiteDao{
  @Query('SELECT * SubSite')
  Future<List<SubSite>> findAll();
  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> insertOrUpdate(List<SubSite> subSites);
}