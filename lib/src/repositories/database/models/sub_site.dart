// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:floor/floor.dart';
@entity
class SubSite {
  @primaryKey
  int ID;
  String subSite;
  String Title;
  String TitleEN;
  String Acronyms;
  int Rank;
  SubSite({
    required this.ID,
    required this.subSite,
    required this.Title,
    required this.TitleEN,
    required this.Acronyms,
    required this.Rank,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'ID': ID});
    result.addAll({'SubSite': SubSite});
    result.addAll({'Title': Title});
    result.addAll({'TitleEN': TitleEN});
    result.addAll({'Acronyms': Acronyms});
    result.addAll({'Rank': Rank});

    return result;
  }

  factory SubSite.fromMap(Map<String, dynamic> map) {
    return SubSite(
      ID: map['ID']?.toInt() ?? 0,
      subSite: map['SubSite'] ?? '',
      Title: map['Title'] ?? '',
      TitleEN: map['TitleEN'] ?? '',
      Acronyms: map['Acronyms'] ?? '',
      Rank: map['Rank']?.toInt() ?? 0,
    );
  }

  String toJson() => json.encode(toMap());

  factory SubSite.fromJson(String source) =>
      SubSite.fromMap(json.decode(source));
}
