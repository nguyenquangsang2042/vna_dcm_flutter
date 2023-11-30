import 'dart:convert';

import 'package:floor/floor.dart';
@entity
class StandardDocDashBoard {
  @primaryKey
  int documentID;
  String modified;
  StandardDocDashBoard({
    required this.documentID,
    required this.modified,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'documentID': documentID});
    result.addAll({'modified': modified});

    return result;
  }

  factory StandardDocDashBoard.fromMap(Map<String, dynamic> map) {
    return StandardDocDashBoard(
      documentID: map['documentID']?.toInt() ?? 0,
      modified: map['modified'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory StandardDocDashBoard.fromJson(String source) =>
      StandardDocDashBoard.fromMap(json.decode(source));
}
