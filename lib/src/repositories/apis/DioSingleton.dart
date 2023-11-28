import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio/dio.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:logger/logger.dart';

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
      // Add Logger interceptor
      var logger = Logger();
      _dio!.interceptors.add(InterceptorsWrapper(
        onRequest: (options, handler) {
          // Do something before request is sent
          logger.i('REQUEST[${options.method}] => PATH: ${options.path}');
          logger.i('REQUEST PostData ${options.data}');
          return handler.next(options);
        },
        onResponse: (response, handler) {
          // Do something with the response data
          logger.i('RESPONSE[${response.statusCode}] => PATH: ${response.requestOptions.path}\nJSON[${response.data}]');
          return handler.next(response);
        },
        onError: (DioError e, handler) {
          // Do something with the error
          logger.e('ERROR[${e.response?.statusCode}] => PATH: ${e.requestOptions.path}');
          return handler.next(e);
        },
      ));
      // Add CookieManager interceptor
      _dio!.interceptors.add(CookieManager(CookieJar()));
    }

    return _dio!;
  }
}
