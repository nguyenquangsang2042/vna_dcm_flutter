import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vna_dcm_flutter/src/repositories/apis/api_service.dart';
import 'package:vna_dcm_flutter/src/repositories/database/app_database.dart';
import 'package:vna_dcm_flutter/src/utils/Constant.dart';
import 'package:vna_dcm_flutter/src/utils/shared_preferences.dart';
import 'package:vna_dcm_flutter/src/viewmodels/login/login_bloc.dart';
import 'package:vna_dcm_flutter/src/views/root_screen.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // init database, client and state login 
  ApiService.get(
      "https://vnadmsuatportal.vuthao.com/psd/api/ApiMobile.ashx?func=AdfsLogin");
  Constant.db = await $FloorAppDatabase.databaseBuilder('app_database.db').build();
  Constant.userName = (await SharedPreferencesUtil().getUser());
  Constant.passWord = (await SharedPreferencesUtil().getPassword());
  LoginState state = Constant.userName == "" || Constant.passWord == ""
      ? LoginLoading()
      : LoginFailure(error: "");
  runApp(MaterialApp(
    home: MultiBlocProvider(
      providers: [
        BlocProvider<LoginBloc>(
          create: (context) => LoginBloc(state),
        ),
      ],
      child: const RootScreen(),
    ),
  ));
}
