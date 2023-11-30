// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:floor/floor.dart';
@entity
class Document {
  @primaryKey
  int ID;
  int DocumentId;
  String Thumbnail;
  String IssueDate;
  String Title;
  String Url;
  bool IsMostViewed;
  bool IsFavorite;
  String TitleEN;
  int DocumentTypeId;
  int DocumentGroupId;
  int IsArchived;
  String StorageCode;
  int Status;
  String LastTimeView;
  bool IsMostViewedL;
  bool IsNewestL;
  bool IsFavoriteL;
  int AreaCategoryId;
  String Code;
  int Version;
  String EffectiveStartDate;
  String EffectiveEndDate;
  String PublishDate;
  String Publisher;
  int Int1;
  int Int2;
  int Int5;
  int Int6;
  String Text5;
  String Text6;
  String Text7;
  String Text11;
  String Title1;
  String DocUrl;
  int IsDivSection;
  String DVCTBSCap1;
  String DVCTBSCap2;
  String DVCTBSCap3;
  String CapPCTLCap1;
  String CapPCTLCap2;
  String CapPCTLCap3;
  String NoiDungSuaDoi;
  String NguoiDang;
  String NguoiDuyet;
  String LoaiTL;
  String FileUrl;
  String FileTitle;
  int FileID;
  String AreaCategoryTitle;
  String Department2;
  String IssueDate1;
  String Text8;
  String DVPhanPhoi;
  String NguoiXemXet;
  String NguoiPheChuan;
  String NguoiChapNhan;
  String NguoiBienSoan;
  String TuVT;
  String TuKhoa;
  int ResourceCategoryId;
  int ResourceSubCategoryId;
  bool IsPilot;
  Document({
    required this.ID,
    required this.DocumentId,
    required this.Thumbnail,
    required this.IssueDate,
    required this.Title,
    required this.Url,
    required this.IsMostViewed,
    required this.IsFavorite,
    required this.TitleEN,
    required this.DocumentTypeId,
    required this.DocumentGroupId,
    required this.IsArchived,
    required this.StorageCode,
    required this.Status,
    required this.LastTimeView,
    required this.IsMostViewedL,
    required this.IsNewestL,
    required this.IsFavoriteL,
    required this.AreaCategoryId,
    required this.Code,
    required this.Version,
    required this.EffectiveStartDate,
    required this.EffectiveEndDate,
    required this.PublishDate,
    required this.Publisher,
    required this.Int1,
    required this.Int2,
    required this.Int5,
    required this.Int6,
    required this.Text5,
    required this.Text6,
    required this.Text7,
    required this.Text11,
    required this.Title1,
    required this.DocUrl,
    required this.IsDivSection,
    required this.DVCTBSCap1,
    required this.DVCTBSCap2,
    required this.DVCTBSCap3,
    required this.CapPCTLCap1,
    required this.CapPCTLCap2,
    required this.CapPCTLCap3,
    required this.NoiDungSuaDoi,
    required this.NguoiDang,
    required this.NguoiDuyet,
    required this.LoaiTL,
    required this.FileUrl,
    required this.FileTitle,
    required this.FileID,
    required this.AreaCategoryTitle,
    required this.Department2,
    required this.IssueDate1,
    required this.Text8,
    required this.DVPhanPhoi,
    required this.NguoiXemXet,
    required this.NguoiPheChuan,
    required this.NguoiChapNhan,
    required this.NguoiBienSoan,
    required this.TuVT,
    required this.TuKhoa,
    required this.ResourceCategoryId,
    required this.ResourceSubCategoryId,
    required this.IsPilot,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};
  
    result.addAll({'ID': ID});
    result.addAll({'DocumentId': DocumentId});
    result.addAll({'Thumbnail': Thumbnail});
    result.addAll({'IssueDate': IssueDate});
    result.addAll({'Title': Title});
    result.addAll({'Url': Url});
    result.addAll({'IsMostViewed': IsMostViewed});
    result.addAll({'IsFavorite': IsFavorite});
    result.addAll({'TitleEN': TitleEN});
    result.addAll({'DocumentTypeId': DocumentTypeId});
    result.addAll({'DocumentGroupId': DocumentGroupId});
    result.addAll({'IsArchived': IsArchived});
    result.addAll({'StorageCode': StorageCode});
    result.addAll({'Status': Status});
    result.addAll({'LastTimeView': LastTimeView});
    result.addAll({'IsMostViewedL': IsMostViewedL});
    result.addAll({'IsNewestL': IsNewestL});
    result.addAll({'IsFavoriteL': IsFavoriteL});
    result.addAll({'AreaCategoryId': AreaCategoryId});
    result.addAll({'Code': Code});
    result.addAll({'Version': Version});
    result.addAll({'EffectiveStartDate': EffectiveStartDate});
    result.addAll({'EffectiveEndDate': EffectiveEndDate});
    result.addAll({'PublishDate': PublishDate});
    result.addAll({'Publisher': Publisher});
    result.addAll({'Int1': Int1});
    result.addAll({'Int2': Int2});
    result.addAll({'Int5': Int5});
    result.addAll({'Int6': Int6});
    result.addAll({'Text5': Text5});
    result.addAll({'Text6': Text6});
    result.addAll({'Text7': Text7});
    result.addAll({'Text11': Text11});
    result.addAll({'Title1': Title1});
    result.addAll({'DocUrl': DocUrl});
    result.addAll({'IsDivSection': IsDivSection});
    result.addAll({'DVCTBSCap1': DVCTBSCap1});
    result.addAll({'DVCTBSCap2': DVCTBSCap2});
    result.addAll({'DVCTBSCap3': DVCTBSCap3});
    result.addAll({'CapPCTLCap1': CapPCTLCap1});
    result.addAll({'CapPCTLCap2': CapPCTLCap2});
    result.addAll({'CapPCTLCap3': CapPCTLCap3});
    result.addAll({'NoiDungSuaDoi': NoiDungSuaDoi});
    result.addAll({'NguoiDang': NguoiDang});
    result.addAll({'NguoiDuyet': NguoiDuyet});
    result.addAll({'LoaiTL': LoaiTL});
    result.addAll({'FileUrl': FileUrl});
    result.addAll({'FileTitle': FileTitle});
    result.addAll({'FileID': FileID});
    result.addAll({'AreaCategoryTitle': AreaCategoryTitle});
    result.addAll({'Department2': Department2});
    result.addAll({'IssueDate1': IssueDate1});
    result.addAll({'Text8': Text8});
    result.addAll({'DVPhanPhoi': DVPhanPhoi});
    result.addAll({'NguoiXemXet': NguoiXemXet});
    result.addAll({'NguoiPheChuan': NguoiPheChuan});
    result.addAll({'NguoiChapNhan': NguoiChapNhan});
    result.addAll({'NguoiBienSoan': NguoiBienSoan});
    result.addAll({'TuVT': TuVT});
    result.addAll({'TuKhoa': TuKhoa});
    result.addAll({'ResourceCategoryId': ResourceCategoryId});
    result.addAll({'ResourceSubCategoryId': ResourceSubCategoryId});
    result.addAll({'IsPilot': IsPilot});
  
    return result;
  }

  factory Document.fromMap(Map<String, dynamic> map) {
    return Document(
      ID: map['ID']?.toInt() ?? 0,
      DocumentId: map['DocumentId']?.toInt() ?? 0,
      Thumbnail: map['Thumbnail'] ?? '',
      IssueDate: map['IssueDate'] ?? '',
      Title: map['Title'] ?? '',
      Url: map['Url'] ?? '',
      IsMostViewed: map['IsMostViewed'] ?? false,
      IsFavorite: map['IsFavorite'] ?? false,
      TitleEN: map['TitleEN'] ?? '',
      DocumentTypeId: map['DocumentTypeId']?.toInt() ?? 0,
      DocumentGroupId: map['DocumentGroupId']?.toInt() ?? 0,
      IsArchived: map['IsArchived']?.toInt() ?? 0,
      StorageCode: map['StorageCode'] ?? '',
      Status: map['Status']?.toInt() ?? 0,
      LastTimeView: map['LastTimeView'] ?? '',
      IsMostViewedL: map['IsMostViewedL'] ?? false,
      IsNewestL: map['IsNewestL'] ?? false,
      IsFavoriteL: map['IsFavoriteL'] ?? false,
      AreaCategoryId: map['AreaCategoryId']?.toInt() ?? 0,
      Code: map['Code'] ?? '',
      Version: map['Version']?.toInt() ?? 0,
      EffectiveStartDate: map['EffectiveStartDate'] ?? '',
      EffectiveEndDate: map['EffectiveEndDate'] ?? '',
      PublishDate: map['PublishDate'] ?? '',
      Publisher: map['Publisher'] ?? '',
      Int1: map['Int1']?.toInt() ?? 0,
      Int2: map['Int2']?.toInt() ?? 0,
      Int5: map['Int5']?.toInt() ?? 0,
      Int6: map['Int6']?.toInt() ?? 0,
      Text5: map['Text5'] ?? '',
      Text6: map['Text6'] ?? '',
      Text7: map['Text7'] ?? '',
      Text11: map['Text11'] ?? '',
      Title1: map['Title1'] ?? '',
      DocUrl: map['DocUrl'] ?? '',
      IsDivSection: map['IsDivSection']?.toInt() ?? 0,
      DVCTBSCap1: map['DVCTBSCap1'] ?? '',
      DVCTBSCap2: map['DVCTBSCap2'] ?? '',
      DVCTBSCap3: map['DVCTBSCap3'] ?? '',
      CapPCTLCap1: map['CapPCTLCap1'] ?? '',
      CapPCTLCap2: map['CapPCTLCap2'] ?? '',
      CapPCTLCap3: map['CapPCTLCap3'] ?? '',
      NoiDungSuaDoi: map['NoiDungSuaDoi'] ?? '',
      NguoiDang: map['NguoiDang'] ?? '',
      NguoiDuyet: map['NguoiDuyet'] ?? '',
      LoaiTL: map['LoaiTL'] ?? '',
      FileUrl: map['FileUrl'] ?? '',
      FileTitle: map['FileTitle'] ?? '',
      FileID: map['FileID']?.toInt() ?? 0,
      AreaCategoryTitle: map['AreaCategoryTitle'] ?? '',
      Department2: map['Department2'] ?? '',
      IssueDate1: map['IssueDate1'] ?? '',
      Text8: map['Text8'] ?? '',
      DVPhanPhoi: map['DVPhanPhoi'] ?? '',
      NguoiXemXet: map['NguoiXemXet'] ?? '',
      NguoiPheChuan: map['NguoiPheChuan'] ?? '',
      NguoiChapNhan: map['NguoiChapNhan'] ?? '',
      NguoiBienSoan: map['NguoiBienSoan'] ?? '',
      TuVT: map['TuVT'] ?? '',
      TuKhoa: map['TuKhoa'] ?? '',
      ResourceCategoryId: map['ResourceCategoryId']?.toInt() ?? 0,
      ResourceSubCategoryId: map['ResourceSubCategoryId']?.toInt() ?? 0,
      IsPilot: map['IsPilot'] ?? false,
    );
  }

  String toJson() => json.encode(toMap());

  factory Document.fromJson(String source) => Document.fromMap(json.decode(source));
}
