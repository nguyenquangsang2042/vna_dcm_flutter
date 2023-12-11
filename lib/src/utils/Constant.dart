import 'package:vna_dcm_flutter/src/repositories/database/app_database.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/current_user.dart';

class Constant {
  static final Constant _singleton = Constant._internal();

  factory Constant() {
    return _singleton;
  }

  Constant._internal();

  String? userName = "";
  String? passWord = "";
  late AppDatabase db;
  String mSite = 'https://vnadmsuatportal.vuthao.com';
  var mSubsite = 'psd';
  String baseSubsite = 'psd';
  String mDomain = '${Constant.mSite}/${Constant.mSubsite}';
  late CurrentUser currentUser;
}

