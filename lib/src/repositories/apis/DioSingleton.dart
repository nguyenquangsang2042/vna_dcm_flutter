import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio/dio.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';

class DioSingleton {
  static Dio? _dio;

  // Private constructor to prevent instantiation from outside
  DioSingleton._();

  static Dio get instance {
    // Create a new Dio instance if it doesn't exist
    if (_dio == null) {
      _dio = Dio(
        BaseOptions(
          connectTimeout: Duration(milliseconds: 10000),
          receiveTimeout: Duration(milliseconds: 10000),
          sendTimeout: Duration(milliseconds: 10000),
          responseType: ResponseType.plain,
          followRedirects: false,
          validateStatus: (status) {
            return true;
          },
        ),
      );

      // Add CookieManager interceptor
      _dio!.interceptors.add(CookieManager(CookieJar()));
    }

    return _dio!;
  }
}
