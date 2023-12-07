import 'package:intl/intl.dart';

class Helper {
  Helper._();
  static final Helper _instance = Helper._();
  factory Helper() => _instance;
  String getCurrentTimeFormatted() =>DateFormat('yyyy-MM-ddTHH:mm:ss').format(DateTime.now());
}
