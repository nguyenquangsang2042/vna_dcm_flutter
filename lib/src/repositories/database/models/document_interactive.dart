// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:floor/floor.dart';

@entity
class DocumentInteractive {
  @primaryKey
  String ID;
  String Title;
  String ResourceId;
  String ResourceUrl;
  String Created;
  String Type;
  String StorageCode;
  int VersionShow;
  String DocumentType;
  String Department;
  int IsAutoFollow;
  int DocumentId;
  String Thumbnail;
  DocumentInteractive({
    required this.ID,
    required this.Title,
    required this.ResourceId,
    required this.ResourceUrl,
    required this.Created,
    required this.Type,
    required this.StorageCode,
    required this.VersionShow,
    required this.DocumentType,
    required this.Department,
    required this.IsAutoFollow,
    required this.DocumentId,
    required this.Thumbnail,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'ID': ID});
    result.addAll({'Title': Title});
    result.addAll({'ResourceId': ResourceId});
    result.addAll({'ResourceUrl': ResourceUrl});
    result.addAll({'Created': Created});
    result.addAll({'Type': Type});
    result.addAll({'StorageCode': StorageCode});
    result.addAll({'VersionShow': VersionShow});
    result.addAll({'DocumentType': DocumentType});
    result.addAll({'Department': Department});
    result.addAll({'IsAutoFollow': IsAutoFollow});
    result.addAll({'DocumentId': DocumentId});
    result.addAll({'Thumbnail': Thumbnail});

    return result;
  }

  factory DocumentInteractive.fromMap(Map<String, dynamic> map) {
    return DocumentInteractive(
      ID: map['ID'] ?? '',
      Title: map['Title'] ?? '',
      ResourceId: map['ResourceId'] ?? '',
      ResourceUrl: map['ResourceUrl'] ?? '',
      Created: map['Created'] ?? '',
      Type: map['Type'] ?? '',
      StorageCode: map['StorageCode'] ?? '',
      VersionShow: map['VersionShow']?.toInt() ?? 0,
      DocumentType: map['DocumentType'] ?? '',
      Department: map['Department'] ?? '',
      IsAutoFollow: map['IsAutoFollow']?.toInt() ?? 0,
      DocumentId: map['DocumentId']?.toInt() ?? 0,
      Thumbnail: map['Thumbnail'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory DocumentInteractive.fromJson(String source) =>
      DocumentInteractive.fromMap(json.decode(source));
}
