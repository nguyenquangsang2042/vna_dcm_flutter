import 'package:vna_dcm_flutter/src/repositories/database/app_database.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/current_user.dart';

class Constant
{
  static String? userName="";
  static String? passWord="";
  static late AppDatabase db; 
  static String mSite='https://vnadmsuatportal.vuthao.com';
  static String mSubsite='psd';
  static String mDomain='$mSite/$mSubsite';
  static late CurrentUser currentUser;

}
