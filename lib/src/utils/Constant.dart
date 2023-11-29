import 'package:dio/dio.dart';
import 'package:vna_dcm_flutter/src/repositories/database/app_database.dart';

import '../repositories/apis/DioSingleton.dart';

class Constant
{
  static String? userName="";
  static String? passWord="";
  static late AppDatabase db; 
}
