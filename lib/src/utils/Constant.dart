import 'package:vna_dcm_flutter/src/repositories/database/app_database.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/current_user.dart';

class Constant {

  static String? get userName => _userName;
  static set userName(String? value) {
    _userName = value;
  }

  static String? get passWord => _passWord;
  static set passWord(String? value) {
    _passWord = value;
  }

  static AppDatabase get db => _db;
  static set db(AppDatabase value) {
    _db = value;
  }

  static String get mSite => _mSite;
  static set mSite(String value) {
    _mSite = value;
  }

  static String get mSubsite => _mSubsite;
  static set mSubsite(String value) {
    _mSubsite = value;
  }

  static String get baseSubsite => _baseSubsite;
  static set baseSubsite(String value) {
    _baseSubsite = value;
  }

  static String get mDomain => '$_mSite/$_mSubsite';

  static CurrentUser get currentUser => _currentUser;
  static set currentUser(CurrentUser value) {
    _currentUser = value;
  }

  // Private static variables
  static String? _userName = "";
  static String? _passWord = "";
  static late AppDatabase _db;
  static String _mSite = 'https://vnadmsuatportal.vuthao.com';
  static var _mSubsite = 'psd';
  static String _baseSubsite = 'psd';
  static late CurrentUser _currentUser;
}
