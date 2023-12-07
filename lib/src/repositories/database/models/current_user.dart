// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

class CurrentUser {
  String ID;
  String ImagePath;
  String AccountName;
  String FullName;
  int DefaultLanguageid;
  String DepartmentTitle;
  String DepartmentTitleEN;
  String Email;
  String Mobile;
  String PositionTitleEN;
  String PositionTitle;
  int NotifyCategoryId;
  int EmailCategoryId;
  String TopUsedKey;
  String DefaultSite;
  String LastSite;
  CurrentUser({
    required this.ID,
    required this.ImagePath,
    required this.AccountName,
    required this.FullName,
    required this.DefaultLanguageid,
    required this.DepartmentTitle,
    required this.DepartmentTitleEN,
    required this.Email,
    required this.Mobile,
    required this.PositionTitleEN,
    required this.PositionTitle,
    required this.NotifyCategoryId,
    required this.EmailCategoryId,
    required this.TopUsedKey,
    required this.DefaultSite,
    required this.LastSite,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'ID': ID});
    result.addAll({'ImagePath': ImagePath});
    result.addAll({'AccountName': AccountName});
    result.addAll({'FullName': FullName});
    result.addAll({'DefaultLanguageid': DefaultLanguageid});
    result.addAll({'DepartmentTitle': DepartmentTitle});
    result.addAll({'DepartmentTitleEN': DepartmentTitleEN});
    result.addAll({'Email': Email});
    result.addAll({'Mobile': Mobile});
    result.addAll({'PositionTitleEN': PositionTitleEN});
    result.addAll({'PositionTitle': PositionTitle});
    result.addAll({'NotifyCategoryId': NotifyCategoryId});
    result.addAll({'EmailCategoryId': EmailCategoryId});
    result.addAll({'TopUsedKey': TopUsedKey});
    result.addAll({'DefaultSite': DefaultSite});
    result.addAll({'LastSite': LastSite});

    return result;
  }

  factory CurrentUser.fromMap(Map<String, dynamic> map) {
    return CurrentUser(
      ID: map['ID'] ?? '',
      ImagePath: map['ImagePath'] ?? '',
      AccountName: map['AccountName'] ?? '',
      FullName: map['FullName'] ?? '',
      DefaultLanguageid: map['DefaultLanguageid']?.toInt() ?? 0,
      DepartmentTitle: map['DepartmentTitle'] ?? '',
      DepartmentTitleEN: map['DepartmentTitleEN'] ?? '',
      Email: map['Email'] ?? '',
      Mobile: map['Mobile'] ?? '',
      PositionTitleEN: map['PositionTitleEN'] ?? '',
      PositionTitle: map['PositionTitle'] ?? '',
      NotifyCategoryId: map['NotifyCategoryId']?.toInt() ?? 0,
      EmailCategoryId: map['EmailCategoryId']?.toInt() ?? 0,
      TopUsedKey: map['TopUsedKey'] ?? '',
      DefaultSite: map['DefaultSite'] ?? '',
      LastSite: map['LastSite'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory CurrentUser.fromJson(String source) =>
      CurrentUser.fromMap(json.decode(source));
}
