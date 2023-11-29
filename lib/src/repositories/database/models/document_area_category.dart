// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:floor/floor.dart';

@entity
class DocumentAreaCategory {
  @primaryKey
  final int ID;
  final String Title;
  final String TitleEN;
  final String Url;
  final int ParentId;
  final int Rank;
  final String Description;
  final String Image;
  final String Created;
  final String Modified;
  DocumentAreaCategory(
    this.ID,
    this.Title,
    this.TitleEN,
    this.Url,
    this.ParentId,
    this.Rank,
    this.Description,
    this.Image,
    this.Created,
    this.Modified,
  );

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};
  
    result.addAll({'ID': ID});
    result.addAll({'Title': Title});
    result.addAll({'TitleEN': TitleEN});
    result.addAll({'Url': Url});
    result.addAll({'ParentId': ParentId});
    result.addAll({'Rank': Rank});
    result.addAll({'Description': Description});
    result.addAll({'Image': Image});
    result.addAll({'Created': Created});
    result.addAll({'Modified': Modified});
  
    return result;
  }

  factory DocumentAreaCategory.fromMap(Map<String, dynamic> map) {
    return DocumentAreaCategory(
      map['ID']?.toInt() ?? 0,
      map['Title'] ?? '',
      map['TitleEN'] ?? '',
      map['Url'] ?? '',
      map['ParentId']?.toInt() ?? 0,
      map['Rank']?.toInt() ?? 0,
      map['Description'] ?? '',
      map['Image'] ?? '',
      map['Created'] ?? '',
      map['Modified'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory DocumentAreaCategory.fromJson(String source) => DocumentAreaCategory.fromMap(json.decode(source));
}
