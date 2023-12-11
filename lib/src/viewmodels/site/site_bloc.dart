import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'site_event.dart';
part 'site_state.dart';

class SiteBloc extends Bloc<SiteEvent, SiteState> {
  String currentSite='psd';
  SiteBloc() : super(SiteInitialState()) {
    on<SetSite>((event, emit) {
      currentSite=event.site;
      emit(SiteChangedState(event.site));
    });
  }
}
