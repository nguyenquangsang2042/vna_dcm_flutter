import 'dart:convert';

import 'package:floor/floor.dart';

@entity
class DocumentRecently {
  @primaryKey
  int documentID;
  String modified;
  DocumentRecently({
    required this.documentID,
    required this.modified,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'documentID': documentID});
    result.addAll({'modified': modified});

    return result;
  }

  factory DocumentRecently.fromMap(Map<String, dynamic> map) {
    return DocumentRecently(
      documentID: map['documentID']?.toInt() ?? 0,
      modified: map['modified'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory DocumentRecently.fromJson(String source) =>
      DocumentRecently.fromMap(json.decode(source));
}
