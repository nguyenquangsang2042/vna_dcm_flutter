import 'dart:convert';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:vna_dcm_flutter/src/repositories/apis/api_contronler.dart';
import 'package:vna_dcm_flutter/src/utils/constant.dart';
import 'package:vna_dcm_flutter/src/utils/function.dart';
import 'package:vna_dcm_flutter/src/utils/shared_preferences.dart';

// Sự kiện (Event)
abstract class LoginEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class LoginButtonPressed extends LoginEvent {
  final String username;
  final String password;

  LoginButtonPressed({required this.username, required this.password});

  @override
  List<Object> get props => [username, password];
}

class ReloginEvent extends LoginEvent {
  final String username;
  final String password;

  ReloginEvent({required this.username, required this.password});

  @override
  List<Object> get props => [username, password];
}

class ReloginFailEvent extends LoginEvent {
  ReloginFailEvent();
}

// Trạng thái (State)
abstract class LoginState extends Equatable {
  @override
  List<Object> get props => [];
}

class LoginLoading extends LoginState {}

class LoginSuccess extends LoginState {}

class LoginFailure extends LoginState {
  final String error;

  LoginFailure({required this.error});

  @override
  List<Object> get props => [error];
}

// Bloc
class LoginBloc extends Bloc<LoginEvent, LoginState> {
  LoginBloc(LoginState state) : super(state) {
    on<LoginButtonPressed>((event, emit) async {
      Constant.userName = event.username;
      Constant.passWord = event.password;
      emit(LoginLoading());
    });
    on<ReloginEvent>(
      (event, emit) async {
        if (event.username == "" || event.password == "") {
          emit(LoginFailure(error: "Username or password is null or empty"));
        } else {
          var isAuth = await ApiController.auth(event.username, event.password);
          if (isAuth == true) {
            // get Data and Save data
            String? modified=await SharedPreferencesUtil().getModified();
            SharedPreferencesUtil()
                .saveUserAndPassword(event.username, event.password);
            await Future.wait([
              ApiController.getCurrentUser().then((value) {
                SharedPreferencesUtil().saveCurrentUser(json.encode(value!));
                Constant.currentUser=value;
              }),
              ApiController.getListSites(modified??"").then((subSites)  {
                Constant.db.subSiteDao.insertOrUpdate(subSites!);
              }),
              ApiController.getAllMasterData("DocumentAreaCategory,FavoriteFolder,DocumentType",modified??"").then((res){
                Constant.db.documentAreaCategoryDao.insertOrUpdate(res["DocumentAreaCategory"]);
              })
            ]);
            SharedPreferencesUtil().saveModified(Helper().getCurrentTimeFormatted());
            emit(LoginSuccess());
          } else {
            Constant.userName = "";
            Constant.passWord = "";
            emit(LoginFailure(error: "Invalid username or password"));
          }
        }
      },
    );
    on<ReloginFailEvent>(
      (event, emit) {
        Constant.userName = "";
        Constant.passWord = "";
        emit(LoginFailure(error: "Invalid username or password"));
      },
    );
  }
}
