import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/comment.dart';

@dao
abstract class CommentDao {
  @Query('SELECT * FROM Comment')
  Future<List<Comment>> findAll();
  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> insertOrUpdateAll(List<Comment> data);
}
