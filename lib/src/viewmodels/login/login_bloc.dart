import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

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
  LoginBloc(super.initialState);

  @override
  LoginState get initialState => LoginLoading();

  @override
  Stream<LoginState> mapEventToState(LoginEvent event) async* {
    if (event is LoginButtonPressed) {
      yield LoginLoading();

      // Thực hiện xử lý đăng nhập ở đây (ví dụ: kiểm tra username/password)
      // Giả sử đăng nhập thành công nếu username và password đều là "admin"
      if (event.username == "admin" && event.password == "admin") {
        yield LoginSuccess();
      } else {
        yield LoginFailure(error: "Invalid username or password");
      }
    }
  }
}
