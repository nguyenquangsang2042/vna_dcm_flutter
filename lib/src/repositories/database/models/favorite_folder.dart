// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:floor/floor.dart';
@entity
class FavoriteFolder {
  @primaryKey
  final String ID;
  final String Title;
  final String ParentId;
  final int Rank;
  final String ResourceUrl;
  final String CreatedBy;
  final String Modified;
  final String Created;
  FavoriteFolder({
    required this.ID,
    required this.Title,
    required this.ParentId,
    required this.Rank,
    required this.ResourceUrl,
    required this.CreatedBy,
    required this.Modified,
    required this.Created,
  });


  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};
  
    result.addAll({'ID': ID});
    result.addAll({'Title': Title});
    result.addAll({'ParentId': ParentId});
    result.addAll({'Rank': Rank});
    result.addAll({'ResourceUrl': ResourceUrl});
    result.addAll({'CreatedBy': CreatedBy});
    result.addAll({'Modified': Modified});
    result.addAll({'Created': Created});
  
    return result;
  }

  factory FavoriteFolder.fromMap(Map<String, dynamic> map) {
    return FavoriteFolder(
      ID: map['ID'] ?? '',
      Title: map['Title'] ?? '',
      ParentId: map['ParentId'] ?? '',
      Rank: map['Rank']?.toInt() ?? 0,
      ResourceUrl: map['ResourceUrl'] ?? '',
      CreatedBy: map['CreatedBy'] ?? '',
      Modified: map['Modified'] ?? '',
      Created: map['Created'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory FavoriteFolder.fromJson(String source) => FavoriteFolder.fromMap(json.decode(source));
}
