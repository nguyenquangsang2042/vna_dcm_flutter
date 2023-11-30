// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:floor/floor.dart';
@entity
class SearchHistory {
  @primaryKey
  String Title;
  String Modified;
  SearchHistory({
    required this.Title,
    required this.Modified,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'Title': Title});
    result.addAll({'Modified': Modified});

    return result;
  }

  factory SearchHistory.fromMap(Map<String, dynamic> map) {
    return SearchHistory(
      Title: map['Title'] ?? '',
      Modified: map['Modified'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory SearchHistory.fromJson(String source) =>
      SearchHistory.fromMap(json.decode(source));
}
