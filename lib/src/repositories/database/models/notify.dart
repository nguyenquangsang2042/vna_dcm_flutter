// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:floor/floor.dart';
@entity
class Notify {
  @primaryKey
  String ID;
  String UserId;
  String Content;
  String ContentEN;
  String Link;
  bool FlgRead;
  bool flgConfirm;
  String ResourceId;
  String Modified;
  String Created;
  Notify({
    required this.ID,
    required this.UserId,
    required this.Content,
    required this.ContentEN,
    required this.Link,
    required this.FlgRead,
    required this.flgConfirm,
    required this.ResourceId,
    required this.Modified,
    required this.Created,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};
  
    result.addAll({'ID': ID});
    result.addAll({'UserId': UserId});
    result.addAll({'Content': Content});
    result.addAll({'ContentEN': ContentEN});
    result.addAll({'Link': Link});
    result.addAll({'FlgRead': FlgRead});
    result.addAll({'flgConfirm': flgConfirm});
    result.addAll({'ResourceId': ResourceId});
    result.addAll({'Modified': Modified});
    result.addAll({'Created': Created});
  
    return result;
  }

  factory Notify.fromMap(Map<String, dynamic> map) {
    return Notify(
      ID: map['ID'] ?? '',
      UserId: map['UserId'] ?? '',
      Content: map['Content'] ?? '',
      ContentEN: map['ContentEN'] ?? '',
      Link: map['Link'] ?? '',
      FlgRead: map['FlgRead'] ?? false,
      flgConfirm: map['flgConfirm'] ?? false,
      ResourceId: map['ResourceId'] ?? '',
      Modified: map['Modified'] ?? '',
      Created: map['Created'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory Notify.fromJson(String source) => Notify.fromMap(json.decode(source));
}
