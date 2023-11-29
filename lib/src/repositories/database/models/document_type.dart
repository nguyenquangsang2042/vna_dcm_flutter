import 'dart:convert';

import 'package:floor/floor.dart';

@entity
class DocumentType {
  @primaryKey
  int ID;
  String Title;
  String TitleEN;
  int LangId;
  String Url;
  DocumentType({
    required this.ID,
    required this.Title,
    required this.TitleEN,
    required this.LangId,
    required this.Url,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'ID': ID});
    result.addAll({'Title': Title});
    result.addAll({'TitleEN': TitleEN});
    result.addAll({'LangId': LangId});
    result.addAll({'Url': Url});

    return result;
  }

  factory DocumentType.fromMap(Map<String, dynamic> map) {
    return DocumentType(
      ID: map['ID']?.toInt() ?? 0,
      Title: map['Title'] ?? '',
      TitleEN: map['TitleEN'] ?? '',
      LangId: map['LangId']?.toInt() ?? 0,
      Url: map['Url'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory DocumentType.fromJson(String source) =>
      DocumentType.fromMap(json.decode(source));
}
