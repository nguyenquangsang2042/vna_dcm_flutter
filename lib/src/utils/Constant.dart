import 'package:dio/dio.dart';

import '../repositories/apis/DioSingleton.dart';

class Constant
{
  static final Dio client=DioSingleton.instance;
  static String? userName="";
  static String? passWord="";
}
