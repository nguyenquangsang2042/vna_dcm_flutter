import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vna_dcm_flutter/src/views/login/LoginScreen.dart';
import 'package:vna_dcm_flutter/src/widgets/LoadingWidget.dart';

import '../utils/Constant.dart';
import '../viewmodels/login/login_bloc.dart';

class RootScreen extends StatelessWidget {
  const RootScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocBuilder<LoginBloc, LoginState>(
        builder: (context, state) {
          if (state is LoginLoading) {
            return const LoadingWidget();
          } else if (state is LoginSuccess) {
            return Container();
          } else {
            return LoginScreen();
          }
        },
      ),
    );
  }
}
