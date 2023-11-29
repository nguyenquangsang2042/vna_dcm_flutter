// ignore_for_file: public_member_api_docs, sort_constructors_first, non_constant_identifier_names
import 'dart:convert';

import 'package:floor/floor.dart';

class Comment {
  @primaryKey
  String ID;
  String Title;
  String StorageCode;
  int Version;
  String Content;
  String Created;
  int IsApproved;
  String ResourceUrl;
  int Status;
  Comment({
    required this.ID,
    required this.Title,
    required this.StorageCode,
    required this.Version,
    required this.Content,
    required this.Created,
    required this.IsApproved,
    required this.ResourceUrl,
    required this.Status,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'ID': ID,
      'Title': Title,
      'StorageCode': StorageCode,
      'Version': Version,
      'Content': Content,
      'Created': Created,
      'IsApproved': IsApproved,
      'ResourceUrl': ResourceUrl,
      'Status': Status,
    };
  }

  factory Comment.fromMap(Map<String, dynamic> map) {
    return Comment(
      ID: map['ID'] as String,
      Title: map['Title'] as String,
      StorageCode: map['StorageCode'] as String,
      Version: map['Version'] as int,
      Content: map['Content'] as String,
      Created: map['Created'] as String,
      IsApproved: map['IsApproved'] as int,
      ResourceUrl: map['ResourceUrl'] as String,
      Status: map['Status'] as int,
    );
  }

  String toJson() => json.encode(toMap());

  factory Comment.fromJson(String source) => Comment.fromMap(json.decode(source) as Map<String, dynamic>);
}
