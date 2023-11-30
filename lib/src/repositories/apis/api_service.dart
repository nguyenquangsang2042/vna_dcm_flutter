import 'package:dio/dio.dart';
import 'package:vna_dcm_flutter/src/utils/Constant.dart';

import 'DioSingleton.dart';

class ApiService {
  static Future<Response> get(String path) async {
    try {
      // Use DioSingleton to make a GET request
      return await DioSingleton.instance.get('${Constant.mDomain}/$path');
    } catch (e) {
      // Handle error
      rethrow;
    }
  }

  static Future<Response> post(String path, {FormData? data}) async {
    try {
      // Use DioSingleton to make a POST request
      return await DioSingleton.instance.post('${Constant.mDomain}/$path', data: data);
    } catch (e) {
      // Handle error
      rethrow;
    }
  }
}
