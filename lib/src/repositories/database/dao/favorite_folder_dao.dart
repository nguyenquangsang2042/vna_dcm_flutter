import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/favorite_folder.dart';

@dao
abstract class FavoriteFolderDao{
  @Query('SELECT * FROM FavoriteFolder')
  Future<List<FavoriteFolder>> findAll();
  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> insertOrUpdateAll(List<FavoriteFolder> data);
}