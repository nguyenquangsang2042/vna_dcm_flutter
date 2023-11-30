import 'package:bottom_sheet_scaffold/bottom_sheet_scaffold.dart';
import 'package:cherry_toast/cherry_toast.dart';
import 'package:cherry_toast/resources/arrays.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vna_dcm_flutter/src/views/login/LoginScreen.dart';
import 'package:vna_dcm_flutter/src/views/login/LoadingWidget.dart';

import '../utils/constant.dart';
import '../viewmodels/login/login_bloc.dart';
import 'dashboard/dashboard_screen.dart';

class RootScreen extends StatelessWidget {
  const RootScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final loginBloc = BlocProvider.of<LoginBloc>(context);
    return BottomSheetScaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(50.0), // Set the height as needed
        child: BlocBuilder<LoginBloc, LoginState>(
          builder: (context, state) {
            if (state is LoginSuccess) {
              return AppBar(
                title: Text("widget.title"),
                leading: InkWell(
                  onTap: () {
                    if (BottomSheetPanel.isOpen) {
                      BottomSheetPanel.close();
                    } else {
                      BottomSheetPanel.open();
                    }
                  },
                  child: const Icon(
                    Icons.arrow_back_ios,
                    color: Colors.black54,
                  ),
                ),
              );
            }
            return const SizedBox(
              height: 0,
            );
          },
        ),
      ),
      body: BlocBuilder<LoginBloc, LoginState>(
        builder: (context, state) {
          if (state is LoginLoading) {
            if (Constant.userName != "" &&
                Constant.passWord != "" &&
                Constant.userName != null &&
                Constant.passWord != null) {
              loginBloc.add(ReloginEvent(
                  username: Constant.userName!, password: Constant.passWord!));
            } else {
              loginBloc.add(ReloginFailEvent());
            }
            return const LoadingWidget();
          } else if (state is LoginSuccess) {
            return DashboardScreen();
          } else {
            if ((state as LoginFailure).error != "") {
              Future.delayed(Duration.zero, () {
                CherryToast.warning(
                  animationDuration: Duration(seconds: 1),
                  displayCloseButton: false,
                  toastPosition: Position.bottom,
                  title: const Text("Login Fail",
                      style: TextStyle(color: Colors.black)),
                  action: Text(state.error,
                      style: const TextStyle(color: Colors.black)),
                ).show(context);
              });
            }
            return LoginScreen();
          }
        },
      ),
      draggableBody: true,
      dismissOnClick: true,
      barrierColor: Colors.black54,
      bottomSheet: DraggableBottomSheet(
        animationDuration: Duration(milliseconds: 200),
        body: Container(),
        header: Container(), //header is not required
      ),
    );
  }
}
