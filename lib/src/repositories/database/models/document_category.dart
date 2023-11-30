// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:floor/floor.dart';
@entity
class DocumentCategory {
  @primaryKey
  int ID;
  String Title;
  String Url;
  int DocumentId;
  String StorageCode;
  int AreaCategoryId;
  int Version;
  String IssueDate;
  int Status;
  String StatusName;
  String Code;
  String Thumbnail;
  DocumentCategory({
    required this.ID,
    required this.Title,
    required this.Url,
    required this.DocumentId,
    required this.StorageCode,
    required this.AreaCategoryId,
    required this.Version,
    required this.IssueDate,
    required this.Status,
    required this.StatusName,
    required this.Code,
    required this.Thumbnail,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'ID': ID});
    result.addAll({'Title': Title});
    result.addAll({'Url': Url});
    result.addAll({'DocumentId': DocumentId});
    result.addAll({'StorageCode': StorageCode});
    result.addAll({'AreaCategoryId': AreaCategoryId});
    result.addAll({'Version': Version});
    result.addAll({'IssueDate': IssueDate});
    result.addAll({'Status': Status});
    result.addAll({'StatusName': StatusName});
    result.addAll({'Code': Code});
    result.addAll({'Thumbnail': Thumbnail});

    return result;
  }

  factory DocumentCategory.fromMap(Map<String, dynamic> map) {
    return DocumentCategory(
      ID: map['ID']?.toInt() ?? 0,
      Title: map['Title'] ?? '',
      Url: map['Url'] ?? '',
      DocumentId: map['DocumentId']?.toInt() ?? 0,
      StorageCode: map['StorageCode'] ?? '',
      AreaCategoryId: map['AreaCategoryId']?.toInt() ?? 0,
      Version: map['Version']?.toInt() ?? 0,
      IssueDate: map['IssueDate'] ?? '',
      Status: map['Status']?.toInt() ?? 0,
      StatusName: map['StatusName'] ?? '',
      Code: map['Code'] ?? '',
      Thumbnail: map['Thumbnail'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory DocumentCategory.fromJson(String source) =>
      DocumentCategory.fromMap(json.decode(source));
}
