import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vna_dcm_flutter/src/utils/constant.dart';
import '../../viewmodels/login/login_bloc.dart';

class LoginScreen extends StatelessWidget {
  LoginScreen({super.key});
  final TextEditingController _usernameController = TextEditingController(text: 'vnadmsuat.adminsite');
  final TextEditingController _passwordController = TextEditingController(text: 'vnadmsuat@123\$%');
  LoginBloc? _loginBloc;

  @override
  Widget build(BuildContext context) {
    _loginBloc=BlocProvider.of<LoginBloc>(context);
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('lib/src/assets/images/background_main.png'), // Replace with your image path
            fit: BoxFit.cover,
          ),
        ),
        child: Container(
          padding: EdgeInsets.all(10),
          child:  Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Container(
                  height: 50,
                  child: TextField(
                    controller: _usernameController,
                    decoration: InputDecoration(
                      labelText: 'Tài khoản',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0), // Adjust the value as needed
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 15),
                Container(
                  height: 50,
                  child: TextField(
                    controller: _passwordController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0), // Adjust the value as needed
                      ),
                      labelText: 'Mật khẩu',
                    ),
                    obscureText: true,
                  ),
                ),
                SizedBox(height: 10),
                Container(
                  width: MediaQuery.of(context).size.width,
                  height: 40,
                  child:  ElevatedButton(
                    onPressed: () {
                      Constant.userName=_usernameController.text;
                      Constant.passWord=_passwordController.text;

                      _loginBloc?.add(LoginButtonPressed(
                        username: _usernameController.text, // Replace with actual username input
                        password: _passwordController.text, // Replace with actual password input
                      ));
                    },
                    child: Text('Đăng nhập'),
                  ),
                )
              ],
            ),
          ),
        )
      ),
    );
  }
}
