import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vna_dcm_flutter/src/repositories/apis/DioSingleton.dart';
import 'package:vna_dcm_flutter/src/utils/Constant.dart';
import 'package:vna_dcm_flutter/src/utils/shared_preferences.dart';
import 'package:vna_dcm_flutter/src/viewmodels/login/login_bloc.dart';
import 'package:vna_dcm_flutter/src/views/login/LoginScreen.dart';
import 'package:dio/dio.dart';
import 'package:vna_dcm_flutter/src/views/root_screen.dart';
import 'package:vna_dcm_flutter/src/widgets/LoadingWidget.dart';

Future<void> main() async {
  // gọi để lấy session
  WidgetsFlutterBinding.ensureInitialized();
  await Constant.client.get(
      "https://vnadmsuatportal.vuthao.com/psd/api/ApiMobile.ashx?func=AdfsLogin");
  Constant.userName= (await SharedPreferencesUtil().getUser());
  Constant.passWord= (await SharedPreferencesUtil().getPassword());
  LoginState state = Constant.userName==""||Constant.passWord==""?LoginLoading():LoginFailure(error: "");
  runApp(MaterialApp(home: MultiBlocProvider(
    providers: [
      BlocProvider<LoginBloc>(
        create: (context) => LoginBloc(state),
      ),
      // Add more BlocProviders if needed
    ],
    child: const RootScreen(),
  ),));
}
