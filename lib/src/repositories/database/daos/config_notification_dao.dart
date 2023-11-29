
import 'package:floor/floor.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/config_notification.dart';
@dao
abstract class ConfigNotificationDao{
   @Query('SELECT * FROM ConfigNotification')
  Future<List<ConfigNotification>> findAll();
}