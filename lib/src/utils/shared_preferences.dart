import 'package:shared_preferences/shared_preferences.dart';

class SharedPreferencesUtil {
  static SharedPreferencesUtil? _instance;
  static SharedPreferences? _prefs;

  SharedPreferencesUtil._internal();

  factory SharedPreferencesUtil() {
    _instance ??= SharedPreferencesUtil._internal();
    return _instance!;
  }

  Future<void> init() async {
    _prefs ??= await SharedPreferences.getInstance();
  }

  Future<void> saveUserAndPassword(String user, String password) async {
    await init();
    await _prefs!.setString('user', user);
    await _prefs!.setString('password', password);
  }

  Future<String?> getUser() async {
    await init();
    return _prefs!.getString('user');
  }

  Future<String?> getPassword() async {
    await init();
    return _prefs!.getString('password');
  }

  Future<void> saveCurrentUser(String data) async {
    await init();
    await _prefs!.setString('currentUser', data);
  }

  Future<String?> getCurrentUser() async {
    await init();
    return _prefs!.getString('currentUser');
  }

  Future<void> saveModified(String data) async {
    await init();
    await _prefs!.setString('modified', data);
  }

  Future<String?> getModified() async {
    await init();
    return _prefs!.getString('modified');
  }
  Future<void> saveSite(String data) async {
    await init();
    await _prefs!.setString('site', data);
  }

  Future<String?> getSite() async {
    await init();
    return _prefs!.getString('site');
  }
}
