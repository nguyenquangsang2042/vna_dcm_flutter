import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:flutter/material.dart';
import 'package:vna_dcm_flutter/src/repositories/apis/DioSingleton.dart';
import 'package:vna_dcm_flutter/src/utils/Constant.dart';
import 'package:vna_dcm_flutter/src/views/login/LoginScreen.dart';
import 'package:dio/dio.dart';
import 'package:vna_dcm_flutter/src/widgets/LoadingWidget.dart';

Future<void> main() async {
  // gọi để lấy session
  await Constant.client.get(
      "https://vnadmsuatportal.vuthao.com/psd/api/ApiMobile.ashx?func=AdfsLogin");
  runApp(MaterialApp(home: LoadingWidget(),));
}
