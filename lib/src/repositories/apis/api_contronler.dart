import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:vna_dcm_flutter/src/repositories/apis/api_service.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/current_user.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/sub_site.dart';

class ApiController {
  static Future<bool> auth(String username, String password) async {
    var data = FormData.fromMap(
        {'data': '{"Username":"$username","Password":"$password"}'});
    var responsive = await ApiService.post(
        "api/ApiMobile.ashx?func=AdfsLogin",
        data: data);
    if (responsive.data.toString().contains("Success")) {
      return true;
    } else {
      return false;
    }
  }

  static Future<CurrentUser?> getCurrentUser()async{
    var responsive = await ApiService.get(
        "api/ApiMobile.ashx?func=CurrentUser");
    if (responsive.data.toString().toLowerCase().contains("success")) {
      Map<String, dynamic> jsonData = json.decode(responsive.data);
      CurrentUser user =CurrentUser.fromJson(json.encode(jsonData["data"][0]));
      return user;
    } else {
      throw 'CurrentUser null';
    }
  }
  static Future<List<SubSite>>getListSites(String modified)async{
    var res = await ApiService.get("API/ApiMobile.ashx?func=GetListSites&Params=Modified&Modified=$modified");
    if (res.data.toString().toLowerCase().contains("success")) {
      return  List.from(json.decode(res.data)['data']).map((e) => SubSite.fromMap(e)).toList();
    } else {
      throw 'getListSites null';
    }
  }
  static Future<Map<String,dynamic>> getAllMasterData(String beanName,String modified)async{
    var res = await ApiService.get("api/ApiMobile.ashx?func=Get&Params=Modified&BeanName=$beanName&Modified=$modified");
    if (res.data.toString().toLowerCase().contains("success")) {
      return json.decode(res.data)['data'];
    } else {
      throw 'getAllMasterData null';
    }
  }

}
