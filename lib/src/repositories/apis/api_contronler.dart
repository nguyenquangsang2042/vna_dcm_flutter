import 'package:dio/dio.dart';
import 'package:vna_dcm_flutter/src/repositories/apis/api_service.dart';

class ApiController {
  static Future<bool> auth(String username, String password) async {
    var data = FormData.fromMap(
        {'data': '{"Username":"$username","Password":"$password"}'});
    var responsive = await ApiService.post(
        "api/ApiMobile.ashx?func=AdfsLogin",
        data: data);
    if (responsive.data.toString().contains("Success")) {
      return true;
    } else {
      return false;
    }
  }
}
