import 'dart:convert';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:vna_dcm_flutter/src/repositories/apis/api_contronler.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_area_category.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/document_type.dart';
import 'package:vna_dcm_flutter/src/repositories/database/models/favorite_folder.dart';
import 'package:vna_dcm_flutter/src/utils/constant.dart';
import 'package:vna_dcm_flutter/src/utils/function.dart';
import 'package:vna_dcm_flutter/src/utils/shared_preferences.dart';

// Sự kiện (Event)
abstract class LoginEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class LoginButtonPressed extends LoginEvent {
  final String username;
  final String password;

  LoginButtonPressed({required this.username, required this.password});

  @override
  List<Object> get props => [username, password];
}

class ReloginEvent extends LoginEvent {
  final String username;
  final String password;

  ReloginEvent({required this.username, required this.password});

  @override
  List<Object> get props => [username, password];
}

class ReloginFailEvent extends LoginEvent {
  ReloginFailEvent();
}

// Trạng thái (State)
abstract class LoginState extends Equatable {
  @override
  List<Object> get props => [];
}

class LoginLoading extends LoginState {}

class LoginSuccess extends LoginState {}

class LoginFailure extends LoginState {
  final String error;

  LoginFailure({required this.error});

  @override
  List<Object> get props => [error];
}

// Bloc
class LoginBloc extends Bloc<LoginEvent, LoginState> {
  LoginBloc(LoginState state) : super(state) {
    on<LoginButtonPressed>((event, emit) async {
      Constant.userName = event.username;
      Constant.passWord = event.password;
      emit(LoginLoading());
    });
    on<ReloginEvent>(
      (event, emit) async {
        if (event.username == "" || event.password == "") {
          emit(LoginFailure(error: "Username or password is null or empty"));
        } else {
          String? currentSite = await SharedPreferencesUtil().getSite();
          if(currentSite!=null)
          {
            Constant.mSubsite =currentSite!;
            Constant.mDomain='${Constant.mSite}/${Constant.mSubsite}';
          }
          var isAuth = await ApiController.auth(Constant.mDomain,event.username, event.password);
          if (isAuth == true) {
            // get Data and Save data
            String? modified = await SharedPreferencesUtil().getModified();
            SharedPreferencesUtil()
                .saveUserAndPassword(event.username, event.password);
            await ApiController.getCurrentUser(Constant.mDomain).then((value) async {
              SharedPreferencesUtil().saveCurrentUser(json.encode(value!));
              Constant.currentUser = value;
              if (!Constant.currentUser.DefaultSite
                  .contains(Constant.baseSubsite) &&
                  currentSite !=null
              ) {
                await Future.wait([
                  ApiController.getListSites(Constant.mDomain,modified ?? "").then((subSites) {
                    Constant.db.subSiteDao.insertOrUpdateAll(subSites!);
                  }),
                  ApiController.getAllMasterData(Constant.mDomain,
                          "DocumentAreaCategory,FavoriteFolder,DocumentType",
                          modified ?? "")
                      .then((res) {
                    Constant.db.documentAreaCategoryDao.insertOrUpdateAll(
                        List.from(res["DocumentAreaCategory"])
                            .map((e) => DocumentAreaCategory.fromMap(e))
                            .toList());
                    Constant.db.favoriteFolderDao.insertOrUpdateAll(
                        List.from(res["FavoriteFolder"])
                            .map((e) => FavoriteFolder.fromMap(e))
                            .toList());
                    Constant.db.documentTypeDao.insertOrUpdateAll(
                        List.from(res["DocumentType"])
                            .map((e) => DocumentType.fromMap(e))
                            .toList());
                  })
                ]);
              } else {
                String site = currentSite ??
                    Constant.currentUser.DefaultSite.split("/").last;
                Constant.mSubsite ="sqd";
                Constant.mDomain='${Constant.mSite}/${Constant.mSubsite}';
                print(Constant.mDomain );
                isAuth = await ApiController.auth(Constant.mDomain,event.username, event.password);
                if (isAuth == true) {
                  await ApiController.getCurrentUser(Constant.mDomain).then((value) async {
                    SharedPreferencesUtil().saveCurrentUser(json.encode(value!));
                    Constant.currentUser = value;
                    if (Constant.mSubsite.contains("sqd")) {
                      await ApiController.getCategoryDefine(Constant.mDomain).then((value) {});
                    }
                    await Future.wait([
                      ApiController.getListSites(Constant.mDomain,modified ?? "").then((subSites) {
                        Constant.db.subSiteDao.insertOrUpdateAll(subSites!);
                      }),
                      ApiController.getAllMasterData(Constant.mDomain,
                          "DocumentAreaCategory,FavoriteFolder,DocumentType",
                          modified ?? "")
                          .then((res) {
                        Constant.db.documentAreaCategoryDao.insertOrUpdateAll(
                            List.from(res["DocumentAreaCategory"])
                                .map((e) => DocumentAreaCategory.fromMap(e))
                                .toList());
                        Constant.db.favoriteFolderDao.insertOrUpdateAll(
                            List.from(res["FavoriteFolder"])
                                .map((e) => FavoriteFolder.fromMap(e))
                                .toList());
                        Constant.db.documentTypeDao.insertOrUpdateAll(
                            List.from(res["DocumentType"])
                                .map((e) => DocumentType.fromMap(e))
                                .toList());
                      })
                    ]);
                  });
                }
                else {
                  Constant.userName = "";
                  Constant.passWord = "";
                  emit(LoginFailure(error: "Invalid username or password"));
                }
              }
              await SharedPreferencesUtil().saveSite(Constant.mSubsite);
            });
            SharedPreferencesUtil()
                .saveModified(Helper().getCurrentTimeFormatted());
            emit(LoginSuccess());
          } else {
            Constant.userName = "";
            Constant.passWord = "";
            emit(LoginFailure(error: "Invalid username or password"));
          }
        }
      },
    );
    on<ReloginFailEvent>(
      (event, emit) {
        Constant.userName = "";
        Constant.passWord = "";
        emit(LoginFailure(error: "Invalid username or password"));
      },
    );
  }
}
