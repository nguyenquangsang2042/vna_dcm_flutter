// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:floor/floor.dart';

@entity
class DocumentOffline {
  @primaryKey
  int DocumentID;
  String Path;
  String Modified;
  DocumentOffline({
    required this.DocumentID,
    required this.Path,
    required this.Modified,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'DocumentID': DocumentID});
    result.addAll({'Path': Path});
    result.addAll({'Modified': Modified});

    return result;
  }

  factory DocumentOffline.fromMap(Map<String, dynamic> map) {
    return DocumentOffline(
      DocumentID: map['DocumentID']?.toInt() ?? 0,
      Path: map['Path'] ?? '',
      Modified: map['Modified'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory DocumentOffline.fromJson(String source) =>
      DocumentOffline.fromMap(json.decode(source));
}
