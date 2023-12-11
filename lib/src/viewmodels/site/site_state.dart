part of 'site_bloc.dart';

@immutable
abstract class SiteState {}

class SiteInitialState extends SiteState {}

class SiteChangedState extends SiteState {
  final String site;

  SiteChangedState(this.site);
}