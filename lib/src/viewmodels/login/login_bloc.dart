import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:vna_dcm_flutter/src/utils/Constant.dart';

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
      emit(LoginLoading());
      if (event.username == "" ||
          event.password == "") {
        emit(LoginFailure(error: "Username or password is null or empty"));
      }
      else {
        await Constant.client
            .post(
            "https://vnadmsuatportal.vuthao.com/psd/api/ApiMobile.ashx?func=AdfsLogin")
            .then((value) {
          if (event.username == "admin" && event.password == "admin") {
            emit(LoginSuccess());
          } else {
            emit(LoginFailure(error: "Invalid username or password"));
          }
        });
      }
    });
  }
}
