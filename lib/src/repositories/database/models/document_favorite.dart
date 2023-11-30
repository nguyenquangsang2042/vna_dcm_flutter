// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:floor/floor.dart';

@entity
class DocumentFavorite {
  @primaryKey
  String ID;
  String ResourceTitle;
  String ResourceUrl;
  String ResourceId;
  String FolderId;
  String CreatedBy;
  String Modified;
  String Created;
  String FolderTitle;
  String Thumbnail;
  int DocumentId;
  DocumentFavorite({
    required this.ID,
    required this.ResourceTitle,
    required this.ResourceUrl,
    required this.ResourceId,
    required this.FolderId,
    required this.CreatedBy,
    required this.Modified,
    required this.Created,
    required this.FolderTitle,
    required this.Thumbnail,
    required this.DocumentId,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'ID': ID});
    result.addAll({'ResourceTitle': ResourceTitle});
    result.addAll({'ResourceUrl': ResourceUrl});
    result.addAll({'ResourceId': ResourceId});
    result.addAll({'FolderId': FolderId});
    result.addAll({'CreatedBy': CreatedBy});
    result.addAll({'Modified': Modified});
    result.addAll({'Created': Created});
    result.addAll({'FolderTitle': FolderTitle});
    result.addAll({'Thumbnail': Thumbnail});
    result.addAll({'DocumentId': DocumentId});

    return result;
  }

  factory DocumentFavorite.fromMap(Map<String, dynamic> map) {
    return DocumentFavorite(
      ID: map['ID'] ?? '',
      ResourceTitle: map['ResourceTitle'] ?? '',
      ResourceUrl: map['ResourceUrl'] ?? '',
      ResourceId: map['ResourceId'] ?? '',
      FolderId: map['FolderId'] ?? '',
      CreatedBy: map['CreatedBy'] ?? '',
      Modified: map['Modified'] ?? '',
      Created: map['Created'] ?? '',
      FolderTitle: map['FolderTitle'] ?? '',
      Thumbnail: map['Thumbnail'] ?? '',
      DocumentId: map['DocumentId']?.toInt() ?? 0,
    );
  }

  String toJson() => json.encode(toMap());

  factory DocumentFavorite.fromJson(String source) =>
      DocumentFavorite.fromMap(json.decode(source));
}
