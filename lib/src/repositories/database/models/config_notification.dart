// ignore_for_file: public_member_api_docs, sort_constructors_first, non_constant_identifier_names
import 'dart:convert';

import 'package:floor/floor.dart';
@entity
class ConfigNotification {
  @primaryKey
  int Rank;
  String Title;
  String TitleEN;
  int ActionCategoryId;
  int IsConfig;
  bool EmailChecked;
  bool NotifyChecked;
  ConfigNotification({
    required this.Rank,
    required this.Title,
    required this.TitleEN,
    required this.ActionCategoryId,
    required this.IsConfig,
    required this.EmailChecked,
    required this.NotifyChecked,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'Rank': Rank,
      'Title': Title,
      'TitleEN': TitleEN,
      'ActionCategoryId': ActionCategoryId,
      'IsConfig': IsConfig,
      'EmailChecked': EmailChecked,
      'NotifyChecked': NotifyChecked,
    };
  }

  factory ConfigNotification.fromMap(Map<String, dynamic> map) {
    return ConfigNotification(
      Rank: map['Rank'] as int,
      Title: map['Title'] as String,
      TitleEN: map['TitleEN'] as String,
      ActionCategoryId: map['ActionCategoryId'] as int,
      IsConfig: map['IsConfig'] as int,
      EmailChecked: map['EmailChecked'] as bool,
      NotifyChecked: map['NotifyChecked'] as bool,
    );
  }

  String toJson() => json.encode(toMap());

  factory ConfigNotification.fromJson(String source) => ConfigNotification.fromMap(json.decode(source) as Map<String, dynamic>);
}
