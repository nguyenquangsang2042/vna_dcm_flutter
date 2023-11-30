// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:floor/floor.dart';

@entity
class StandardDoc {
  @primaryKey
  int ID;
  String Title;
  String TitleEN;
  int Rank;
  StandardDoc({
    required this.ID,
    required this.Title,
    required this.TitleEN,
    required this.Rank,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'ID': ID});
    result.addAll({'Title': Title});
    result.addAll({'TitleEN': TitleEN});
    result.addAll({'Rank': Rank});

    return result;
  }

  factory StandardDoc.fromMap(Map<String, dynamic> map) {
    return StandardDoc(
      ID: map['ID']?.toInt() ?? 0,
      Title: map['Title'] ?? '',
      TitleEN: map['TitleEN'] ?? '',
      Rank: map['Rank']?.toInt() ?? 0,
    );
  }

  String toJson() => json.encode(toMap());

  factory StandardDoc.fromJson(String source) =>
      StandardDoc.fromMap(json.decode(source));
}
