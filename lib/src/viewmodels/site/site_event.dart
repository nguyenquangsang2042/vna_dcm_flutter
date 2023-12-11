part of 'site_bloc.dart';

@immutable
abstract class SiteEvent {}
class SetSite extends SiteEvent {
  final String site;

  SetSite(this.site);
}