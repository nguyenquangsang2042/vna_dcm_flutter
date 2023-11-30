// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'app_database.dart';

// **************************************************************************
// FloorGenerator
// **************************************************************************

// ignore: avoid_classes_with_only_static_members
class $FloorAppDatabase {
  /// Creates a database builder for a persistent database.
  /// Once a database is built, you should keep a reference to it and re-use it.
  static _$AppDatabaseBuilder databaseBuilder(String name) =>
      _$AppDatabaseBuilder(name);

  /// Creates a database builder for an in memory database.
  /// Information stored in an in memory database disappears when the process is killed.
  /// Once a database is built, you should keep a reference to it and re-use it.
  static _$AppDatabaseBuilder inMemoryDatabaseBuilder() =>
      _$AppDatabaseBuilder(null);
}

class _$AppDatabaseBuilder {
  _$AppDatabaseBuilder(this.name);

  final String? name;

  final List<Migration> _migrations = [];

  Callback? _callback;

  /// Adds migrations to the builder.
  _$AppDatabaseBuilder addMigrations(List<Migration> migrations) {
    _migrations.addAll(migrations);
    return this;
  }

  /// Adds a database [Callback] to the builder.
  _$AppDatabaseBuilder addCallback(Callback callback) {
    _callback = callback;
    return this;
  }

  /// Creates the database and initializes it.
  Future<AppDatabase> build() async {
    final path = name != null
        ? await sqfliteDatabaseFactory.getDatabasePath(name!)
        : ':memory:';
    final database = _$AppDatabase();
    database.database = await database.open(
      path,
      _migrations,
      _callback,
    );
    return database;
  }
}

class _$AppDatabase extends AppDatabase {
  _$AppDatabase([StreamController<String>? listener]) {
    changeListener = listener ?? StreamController<String>.broadcast();
  }

  DocumentAreaCategoryDao? _documentAreaCategoryDaoInstance;

  FavoriteFolderDao? _favoriteFolderDaoInstance;

  DocumentTypeDao? _documentTypeDaoInstance;

  CommentDao? _commentDaoInstance;

  ConfigNotificationDao? _configNotificationDaoInstance;

  DocumentDao? _documentDaoInstance;

  DocumentCategoryDao? _documentCategoryInstance;

  DocumentFavoriteDao? _documentFavoriteDaoInstance;

  DocumentInteractiveDao? _documentInteractiveDaoInstance;

  DocumentOfflineDao? _documentOfflineDaoInstance;

  DocumentRecentlyDao? _documentRecentlyDaoInstance;

  NotifyDao? _notifyDaoInstance;

  SearchHistoryDao? _searchHistoryDaoInstance;

  StandardDocDao? _standardDocDaoInstance;

  StandardDocDashBoardDao? _standardDocDashBoardDaoInstance;

  StandardDocDetailDao? _standardDocDetailDaoInstance;

  SubSiteDao? _subSiteDaoInstance;

  Future<sqflite.Database> open(
    String path,
    List<Migration> migrations, [
    Callback? callback,
  ]) async {
    final databaseOptions = sqflite.OpenDatabaseOptions(
      version: 1,
      onConfigure: (database) async {
        await database.execute('PRAGMA foreign_keys = ON');
        await callback?.onConfigure?.call(database);
      },
      onOpen: (database) async {
        await callback?.onOpen?.call(database);
      },
      onUpgrade: (database, startVersion, endVersion) async {
        await MigrationAdapter.runMigrations(
            database, startVersion, endVersion, migrations);

        await callback?.onUpgrade?.call(database, startVersion, endVersion);
      },
      onCreate: (database, version) async {
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `DocumentAreaCategory` (`ID` INTEGER NOT NULL, `Title` TEXT NOT NULL, `TitleEN` TEXT NOT NULL, `Url` TEXT NOT NULL, `ParentId` INTEGER NOT NULL, `Rank` INTEGER NOT NULL, `Description` TEXT NOT NULL, `Image` TEXT NOT NULL, `Created` TEXT NOT NULL, `Modified` TEXT NOT NULL, PRIMARY KEY (`ID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `FavoriteFolder` (`ID` TEXT NOT NULL, `Title` TEXT NOT NULL, `ParentId` TEXT NOT NULL, `Rank` INTEGER NOT NULL, `ResourceUrl` TEXT NOT NULL, `CreatedBy` TEXT NOT NULL, `Modified` TEXT NOT NULL, `Created` TEXT NOT NULL, PRIMARY KEY (`ID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `DocumentType` (`ID` INTEGER NOT NULL, `Title` TEXT NOT NULL, `TitleEN` TEXT NOT NULL, `LangId` INTEGER NOT NULL, `Url` TEXT NOT NULL, PRIMARY KEY (`ID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `Comment` (`ID` TEXT NOT NULL, `Title` TEXT NOT NULL, `StorageCode` TEXT NOT NULL, `Version` INTEGER NOT NULL, `Content` TEXT NOT NULL, `Created` TEXT NOT NULL, `IsApproved` INTEGER NOT NULL, `ResourceUrl` TEXT NOT NULL, `Status` INTEGER NOT NULL, PRIMARY KEY (`ID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `ConfigNotification` (`Rank` INTEGER NOT NULL, `Title` TEXT NOT NULL, `TitleEN` TEXT NOT NULL, `ActionCategoryId` INTEGER NOT NULL, `IsConfig` INTEGER NOT NULL, `EmailChecked` INTEGER NOT NULL, `NotifyChecked` INTEGER NOT NULL, PRIMARY KEY (`Rank`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `Document` (`ID` INTEGER NOT NULL, `DocumentId` INTEGER NOT NULL, `Thumbnail` TEXT NOT NULL, `IssueDate` TEXT NOT NULL, `Title` TEXT NOT NULL, `Url` TEXT NOT NULL, `IsMostViewed` INTEGER NOT NULL, `IsFavorite` INTEGER NOT NULL, `TitleEN` TEXT NOT NULL, `DocumentTypeId` INTEGER NOT NULL, `DocumentGroupId` INTEGER NOT NULL, `IsArchived` INTEGER NOT NULL, `StorageCode` TEXT NOT NULL, `Status` INTEGER NOT NULL, `LastTimeView` TEXT NOT NULL, `IsMostViewedL` INTEGER NOT NULL, `IsNewestL` INTEGER NOT NULL, `IsFavoriteL` INTEGER NOT NULL, `AreaCategoryId` INTEGER NOT NULL, `Code` TEXT NOT NULL, `Version` INTEGER NOT NULL, `EffectiveStartDate` TEXT NOT NULL, `EffectiveEndDate` TEXT NOT NULL, `PublishDate` TEXT NOT NULL, `Publisher` TEXT NOT NULL, `Int1` INTEGER NOT NULL, `Int2` INTEGER NOT NULL, `Int5` INTEGER NOT NULL, `Int6` INTEGER NOT NULL, `Text5` TEXT NOT NULL, `Text6` TEXT NOT NULL, `Text7` TEXT NOT NULL, `Text11` TEXT NOT NULL, `Title1` TEXT NOT NULL, `DocUrl` TEXT NOT NULL, `IsDivSection` INTEGER NOT NULL, `DVCTBSCap1` TEXT NOT NULL, `DVCTBSCap2` TEXT NOT NULL, `DVCTBSCap3` TEXT NOT NULL, `CapPCTLCap1` TEXT NOT NULL, `CapPCTLCap2` TEXT NOT NULL, `CapPCTLCap3` TEXT NOT NULL, `NoiDungSuaDoi` TEXT NOT NULL, `NguoiDang` TEXT NOT NULL, `NguoiDuyet` TEXT NOT NULL, `LoaiTL` TEXT NOT NULL, `FileUrl` TEXT NOT NULL, `FileTitle` TEXT NOT NULL, `FileID` INTEGER NOT NULL, `AreaCategoryTitle` TEXT NOT NULL, `Department2` TEXT NOT NULL, `IssueDate1` TEXT NOT NULL, `Text8` TEXT NOT NULL, `DVPhanPhoi` TEXT NOT NULL, `NguoiXemXet` TEXT NOT NULL, `NguoiPheChuan` TEXT NOT NULL, `NguoiChapNhan` TEXT NOT NULL, `NguoiBienSoan` TEXT NOT NULL, `TuVT` TEXT NOT NULL, `TuKhoa` TEXT NOT NULL, `ResourceCategoryId` INTEGER NOT NULL, `ResourceSubCategoryId` INTEGER NOT NULL, `IsPilot` INTEGER NOT NULL, PRIMARY KEY (`ID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `DocumentCategory` (`ID` INTEGER NOT NULL, `Title` TEXT NOT NULL, `Url` TEXT NOT NULL, `DocumentId` INTEGER NOT NULL, `StorageCode` TEXT NOT NULL, `AreaCategoryId` INTEGER NOT NULL, `Version` INTEGER NOT NULL, `IssueDate` TEXT NOT NULL, `Status` INTEGER NOT NULL, `StatusName` TEXT NOT NULL, `Code` TEXT NOT NULL, `Thumbnail` TEXT NOT NULL, PRIMARY KEY (`ID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `DocumentFavorite` (`ID` TEXT NOT NULL, `ResourceTitle` TEXT NOT NULL, `ResourceUrl` TEXT NOT NULL, `ResourceId` TEXT NOT NULL, `FolderId` TEXT NOT NULL, `CreatedBy` TEXT NOT NULL, `Modified` TEXT NOT NULL, `Created` TEXT NOT NULL, `FolderTitle` TEXT NOT NULL, `Thumbnail` TEXT NOT NULL, `DocumentId` INTEGER NOT NULL, PRIMARY KEY (`ID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `DocumentInteractive` (`ID` TEXT NOT NULL, `Title` TEXT NOT NULL, `ResourceId` TEXT NOT NULL, `ResourceUrl` TEXT NOT NULL, `Created` TEXT NOT NULL, `Type` TEXT NOT NULL, `StorageCode` TEXT NOT NULL, `VersionShow` INTEGER NOT NULL, `DocumentType` TEXT NOT NULL, `Department` TEXT NOT NULL, `IsAutoFollow` INTEGER NOT NULL, `DocumentId` INTEGER NOT NULL, `Thumbnail` TEXT NOT NULL, PRIMARY KEY (`ID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `DocumentOffline` (`DocumentID` INTEGER NOT NULL, `Path` TEXT NOT NULL, `Modified` TEXT NOT NULL, PRIMARY KEY (`DocumentID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `DocumentRecently` (`documentID` INTEGER NOT NULL, `modified` TEXT NOT NULL, PRIMARY KEY (`documentID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `Notify` (`ID` TEXT NOT NULL, `UserId` TEXT NOT NULL, `Content` TEXT NOT NULL, `ContentEN` TEXT NOT NULL, `Link` TEXT NOT NULL, `FlgRead` INTEGER NOT NULL, `flgConfirm` INTEGER NOT NULL, `ResourceId` TEXT NOT NULL, `Modified` TEXT NOT NULL, `Created` TEXT NOT NULL, PRIMARY KEY (`ID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `SearchHistory` (`Title` TEXT NOT NULL, `Modified` TEXT NOT NULL, PRIMARY KEY (`Title`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `StandardDoc` (`ID` INTEGER NOT NULL, `Title` TEXT NOT NULL, `TitleEN` TEXT NOT NULL, `Rank` INTEGER NOT NULL, PRIMARY KEY (`ID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `StandardDocDashBoard` (`documentID` INTEGER NOT NULL, `modified` TEXT NOT NULL, PRIMARY KEY (`documentID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `StandardDocDetail` (`ID` INTEGER NOT NULL, `Title` TEXT NOT NULL, `Url` TEXT NOT NULL, `DocumentId` INTEGER NOT NULL, `StorageCode` TEXT NOT NULL, `AreaCategoryId` INTEGER NOT NULL, `Version` INTEGER NOT NULL, `IssueDate` TEXT NOT NULL, `Status` INTEGER NOT NULL, `StatusName` TEXT NOT NULL, `Code` TEXT NOT NULL, `Thumbnail` TEXT NOT NULL, PRIMARY KEY (`ID`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `SubSite` (`ID` INTEGER NOT NULL, `subSite` TEXT NOT NULL, `Title` TEXT NOT NULL, `TitleEN` TEXT NOT NULL, `Acronyms` TEXT NOT NULL, `Rank` INTEGER NOT NULL, PRIMARY KEY (`ID`))');

        await callback?.onCreate?.call(database, version);
      },
    );
    return sqfliteDatabaseFactory.openDatabase(path, options: databaseOptions);
  }

  @override
  DocumentAreaCategoryDao get documentAreaCategoryDao {
    return _documentAreaCategoryDaoInstance ??=
        _$DocumentAreaCategoryDao(database, changeListener);
  }

  @override
  FavoriteFolderDao get favoriteFolderDao {
    return _favoriteFolderDaoInstance ??=
        _$FavoriteFolderDao(database, changeListener);
  }

  @override
  DocumentTypeDao get documentTypeDao {
    return _documentTypeDaoInstance ??=
        _$DocumentTypeDao(database, changeListener);
  }

  @override
  CommentDao get commentDao {
    return _commentDaoInstance ??= _$CommentDao(database, changeListener);
  }

  @override
  ConfigNotificationDao get configNotificationDao {
    return _configNotificationDaoInstance ??=
        _$ConfigNotificationDao(database, changeListener);
  }

  @override
  DocumentDao get documentDao {
    return _documentDaoInstance ??= _$DocumentDao(database, changeListener);
  }

  @override
  DocumentCategoryDao get documentCategory {
    return _documentCategoryInstance ??=
        _$DocumentCategoryDao(database, changeListener);
  }

  @override
  DocumentFavoriteDao get documentFavoriteDao {
    return _documentFavoriteDaoInstance ??=
        _$DocumentFavoriteDao(database, changeListener);
  }

  @override
  DocumentInteractiveDao get documentInteractiveDao {
    return _documentInteractiveDaoInstance ??=
        _$DocumentInteractiveDao(database, changeListener);
  }

  @override
  DocumentOfflineDao get documentOfflineDao {
    return _documentOfflineDaoInstance ??=
        _$DocumentOfflineDao(database, changeListener);
  }

  @override
  DocumentRecentlyDao get documentRecentlyDao {
    return _documentRecentlyDaoInstance ??=
        _$DocumentRecentlyDao(database, changeListener);
  }

  @override
  NotifyDao get notifyDao {
    return _notifyDaoInstance ??= _$NotifyDao(database, changeListener);
  }

  @override
  SearchHistoryDao get searchHistoryDao {
    return _searchHistoryDaoInstance ??=
        _$SearchHistoryDao(database, changeListener);
  }

  @override
  StandardDocDao get standardDocDao {
    return _standardDocDaoInstance ??=
        _$StandardDocDao(database, changeListener);
  }

  @override
  StandardDocDashBoardDao get standardDocDashBoardDao {
    return _standardDocDashBoardDaoInstance ??=
        _$StandardDocDashBoardDao(database, changeListener);
  }

  @override
  StandardDocDetailDao get standardDocDetailDao {
    return _standardDocDetailDaoInstance ??=
        _$StandardDocDetailDao(database, changeListener);
  }

  @override
  SubSiteDao get subSiteDao {
    return _subSiteDaoInstance ??= _$SubSiteDao(database, changeListener);
  }
}

class _$DocumentAreaCategoryDao extends DocumentAreaCategoryDao {
  _$DocumentAreaCategoryDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<DocumentAreaCategory>> findAll() async {
    return _queryAdapter.queryList('SELECT * FROM DocumentAreaCategory',
        mapper: (Map<String, Object?> row) => DocumentAreaCategory(
            row['ID'] as int,
            row['Title'] as String,
            row['TitleEN'] as String,
            row['Url'] as String,
            row['ParentId'] as int,
            row['Rank'] as int,
            row['Description'] as String,
            row['Image'] as String,
            row['Created'] as String,
            row['Modified'] as String));
  }
}

class _$FavoriteFolderDao extends FavoriteFolderDao {
  _$FavoriteFolderDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<FavoriteFolder>> findAll() async {
    return _queryAdapter.queryList('SELECT * FROM FavoriteFolder',
        mapper: (Map<String, Object?> row) => FavoriteFolder(
            ID: row['ID'] as String,
            Title: row['Title'] as String,
            ParentId: row['ParentId'] as String,
            Rank: row['Rank'] as int,
            ResourceUrl: row['ResourceUrl'] as String,
            CreatedBy: row['CreatedBy'] as String,
            Modified: row['Modified'] as String,
            Created: row['Created'] as String));
  }
}

class _$DocumentTypeDao extends DocumentTypeDao {
  _$DocumentTypeDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<DocumentType>> findAll() async {
    return _queryAdapter.queryList('SELECT * DocumentType',
        mapper: (Map<String, Object?> row) => DocumentType(
            ID: row['ID'] as int,
            Title: row['Title'] as String,
            TitleEN: row['TitleEN'] as String,
            LangId: row['LangId'] as int,
            Url: row['Url'] as String));
  }
}

class _$CommentDao extends CommentDao {
  _$CommentDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<Comment>> findAll() async {
    return _queryAdapter.queryList('SELECT * FROM Comment',
        mapper: (Map<String, Object?> row) => Comment(
            ID: row['ID'] as String,
            Title: row['Title'] as String,
            StorageCode: row['StorageCode'] as String,
            Version: row['Version'] as int,
            Content: row['Content'] as String,
            Created: row['Created'] as String,
            IsApproved: row['IsApproved'] as int,
            ResourceUrl: row['ResourceUrl'] as String,
            Status: row['Status'] as int));
  }
}

class _$ConfigNotificationDao extends ConfigNotificationDao {
  _$ConfigNotificationDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<ConfigNotification>> findAll() async {
    return _queryAdapter.queryList('SELECT * FROM ConfigNotification',
        mapper: (Map<String, Object?> row) => ConfigNotification(
            Rank: row['Rank'] as int,
            Title: row['Title'] as String,
            TitleEN: row['TitleEN'] as String,
            ActionCategoryId: row['ActionCategoryId'] as int,
            IsConfig: row['IsConfig'] as int,
            EmailChecked: (row['EmailChecked'] as int) != 0,
            NotifyChecked: (row['NotifyChecked'] as int) != 0));
  }
}

class _$DocumentDao extends DocumentDao {
  _$DocumentDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<Document>> findAll() async {
    return _queryAdapter.queryList('SELECT * Document',
        mapper: (Map<String, Object?> row) => Document(
            ID: row['ID'] as int,
            DocumentId: row['DocumentId'] as int,
            Thumbnail: row['Thumbnail'] as String,
            IssueDate: row['IssueDate'] as String,
            Title: row['Title'] as String,
            Url: row['Url'] as String,
            IsMostViewed: (row['IsMostViewed'] as int) != 0,
            IsFavorite: (row['IsFavorite'] as int) != 0,
            TitleEN: row['TitleEN'] as String,
            DocumentTypeId: row['DocumentTypeId'] as int,
            DocumentGroupId: row['DocumentGroupId'] as int,
            IsArchived: row['IsArchived'] as int,
            StorageCode: row['StorageCode'] as String,
            Status: row['Status'] as int,
            LastTimeView: row['LastTimeView'] as String,
            IsMostViewedL: (row['IsMostViewedL'] as int) != 0,
            IsNewestL: (row['IsNewestL'] as int) != 0,
            IsFavoriteL: (row['IsFavoriteL'] as int) != 0,
            AreaCategoryId: row['AreaCategoryId'] as int,
            Code: row['Code'] as String,
            Version: row['Version'] as int,
            EffectiveStartDate: row['EffectiveStartDate'] as String,
            EffectiveEndDate: row['EffectiveEndDate'] as String,
            PublishDate: row['PublishDate'] as String,
            Publisher: row['Publisher'] as String,
            Int1: row['Int1'] as int,
            Int2: row['Int2'] as int,
            Int5: row['Int5'] as int,
            Int6: row['Int6'] as int,
            Text5: row['Text5'] as String,
            Text6: row['Text6'] as String,
            Text7: row['Text7'] as String,
            Text11: row['Text11'] as String,
            Title1: row['Title1'] as String,
            DocUrl: row['DocUrl'] as String,
            IsDivSection: row['IsDivSection'] as int,
            DVCTBSCap1: row['DVCTBSCap1'] as String,
            DVCTBSCap2: row['DVCTBSCap2'] as String,
            DVCTBSCap3: row['DVCTBSCap3'] as String,
            CapPCTLCap1: row['CapPCTLCap1'] as String,
            CapPCTLCap2: row['CapPCTLCap2'] as String,
            CapPCTLCap3: row['CapPCTLCap3'] as String,
            NoiDungSuaDoi: row['NoiDungSuaDoi'] as String,
            NguoiDang: row['NguoiDang'] as String,
            NguoiDuyet: row['NguoiDuyet'] as String,
            LoaiTL: row['LoaiTL'] as String,
            FileUrl: row['FileUrl'] as String,
            FileTitle: row['FileTitle'] as String,
            FileID: row['FileID'] as int,
            AreaCategoryTitle: row['AreaCategoryTitle'] as String,
            Department2: row['Department2'] as String,
            IssueDate1: row['IssueDate1'] as String,
            Text8: row['Text8'] as String,
            DVPhanPhoi: row['DVPhanPhoi'] as String,
            NguoiXemXet: row['NguoiXemXet'] as String,
            NguoiPheChuan: row['NguoiPheChuan'] as String,
            NguoiChapNhan: row['NguoiChapNhan'] as String,
            NguoiBienSoan: row['NguoiBienSoan'] as String,
            TuVT: row['TuVT'] as String,
            TuKhoa: row['TuKhoa'] as String,
            ResourceCategoryId: row['ResourceCategoryId'] as int,
            ResourceSubCategoryId: row['ResourceSubCategoryId'] as int,
            IsPilot: (row['IsPilot'] as int) != 0));
  }
}

class _$DocumentCategoryDao extends DocumentCategoryDao {
  _$DocumentCategoryDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<DocumentCategory>> findAll() async {
    return _queryAdapter.queryList('SELECT * FROM DocumentCategory',
        mapper: (Map<String, Object?> row) => DocumentCategory(
            ID: row['ID'] as int,
            Title: row['Title'] as String,
            Url: row['Url'] as String,
            DocumentId: row['DocumentId'] as int,
            StorageCode: row['StorageCode'] as String,
            AreaCategoryId: row['AreaCategoryId'] as int,
            Version: row['Version'] as int,
            IssueDate: row['IssueDate'] as String,
            Status: row['Status'] as int,
            StatusName: row['StatusName'] as String,
            Code: row['Code'] as String,
            Thumbnail: row['Thumbnail'] as String));
  }
}

class _$DocumentFavoriteDao extends DocumentFavoriteDao {
  _$DocumentFavoriteDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<DocumentFavorite>> findAll() async {
    return _queryAdapter.queryList('SELECT * FROM DocumentFavorite',
        mapper: (Map<String, Object?> row) => DocumentFavorite(
            ID: row['ID'] as String,
            ResourceTitle: row['ResourceTitle'] as String,
            ResourceUrl: row['ResourceUrl'] as String,
            ResourceId: row['ResourceId'] as String,
            FolderId: row['FolderId'] as String,
            CreatedBy: row['CreatedBy'] as String,
            Modified: row['Modified'] as String,
            Created: row['Created'] as String,
            FolderTitle: row['FolderTitle'] as String,
            Thumbnail: row['Thumbnail'] as String,
            DocumentId: row['DocumentId'] as int));
  }
}

class _$DocumentInteractiveDao extends DocumentInteractiveDao {
  _$DocumentInteractiveDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<DocumentInteractive>> findAll() async {
    return _queryAdapter.queryList('SELECT * FROM DocumentInteractive',
        mapper: (Map<String, Object?> row) => DocumentInteractive(
            ID: row['ID'] as String,
            Title: row['Title'] as String,
            ResourceId: row['ResourceId'] as String,
            ResourceUrl: row['ResourceUrl'] as String,
            Created: row['Created'] as String,
            Type: row['Type'] as String,
            StorageCode: row['StorageCode'] as String,
            VersionShow: row['VersionShow'] as int,
            DocumentType: row['DocumentType'] as String,
            Department: row['Department'] as String,
            IsAutoFollow: row['IsAutoFollow'] as int,
            DocumentId: row['DocumentId'] as int,
            Thumbnail: row['Thumbnail'] as String));
  }
}

class _$DocumentOfflineDao extends DocumentOfflineDao {
  _$DocumentOfflineDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<DocumentOffline>> findAll() async {
    return _queryAdapter.queryList('SELECT * FROM DocumentOffline',
        mapper: (Map<String, Object?> row) => DocumentOffline(
            DocumentID: row['DocumentID'] as int,
            Path: row['Path'] as String,
            Modified: row['Modified'] as String));
  }
}

class _$DocumentRecentlyDao extends DocumentRecentlyDao {
  _$DocumentRecentlyDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<DocumentRecently>> findAll() async {
    return _queryAdapter.queryList('SELECT * DocumentRecently',
        mapper: (Map<String, Object?> row) => DocumentRecently(
            documentID: row['documentID'] as int,
            modified: row['modified'] as String));
  }
}

class _$NotifyDao extends NotifyDao {
  _$NotifyDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<Notify>> findAll() async {
    return _queryAdapter.queryList('SELECT * Notify',
        mapper: (Map<String, Object?> row) => Notify(
            ID: row['ID'] as String,
            UserId: row['UserId'] as String,
            Content: row['Content'] as String,
            ContentEN: row['ContentEN'] as String,
            Link: row['Link'] as String,
            FlgRead: (row['FlgRead'] as int) != 0,
            flgConfirm: (row['flgConfirm'] as int) != 0,
            ResourceId: row['ResourceId'] as String,
            Modified: row['Modified'] as String,
            Created: row['Created'] as String));
  }
}

class _$SearchHistoryDao extends SearchHistoryDao {
  _$SearchHistoryDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<SearchHistory>> findAll() async {
    return _queryAdapter.queryList('SELECT * SearchHistory',
        mapper: (Map<String, Object?> row) => SearchHistory(
            Title: row['Title'] as String,
            Modified: row['Modified'] as String));
  }
}

class _$StandardDocDao extends StandardDocDao {
  _$StandardDocDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<StandardDoc>> findAll() async {
    return _queryAdapter.queryList('SELECT * StandardDoc',
        mapper: (Map<String, Object?> row) => StandardDoc(
            ID: row['ID'] as int,
            Title: row['Title'] as String,
            TitleEN: row['TitleEN'] as String,
            Rank: row['Rank'] as int));
  }
}

class _$StandardDocDashBoardDao extends StandardDocDashBoardDao {
  _$StandardDocDashBoardDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<StandardDocDashBoard>> findAll() async {
    return _queryAdapter.queryList('SELECT * StandardDocDashBoard',
        mapper: (Map<String, Object?> row) => StandardDocDashBoard(
            documentID: row['documentID'] as int,
            modified: row['modified'] as String));
  }
}

class _$StandardDocDetailDao extends StandardDocDetailDao {
  _$StandardDocDetailDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<StandardDocDetail>> findAll() async {
    return _queryAdapter.queryList('SELECT * StandardDocDetail',
        mapper: (Map<String, Object?> row) => StandardDocDetail(
            ID: row['ID'] as int,
            Title: row['Title'] as String,
            Url: row['Url'] as String,
            DocumentId: row['DocumentId'] as int,
            StorageCode: row['StorageCode'] as String,
            AreaCategoryId: row['AreaCategoryId'] as int,
            Version: row['Version'] as int,
            IssueDate: row['IssueDate'] as String,
            Status: row['Status'] as int,
            StatusName: row['StatusName'] as String,
            Code: row['Code'] as String,
            Thumbnail: row['Thumbnail'] as String));
  }
}

class _$SubSiteDao extends SubSiteDao {
  _$SubSiteDao(
    this.database,
    this.changeListener,
  ) : _queryAdapter = QueryAdapter(database);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  @override
  Future<List<SubSite>> findAll() async {
    return _queryAdapter.queryList('SELECT * SubSite',
        mapper: (Map<String, Object?> row) => SubSite(
            ID: row['ID'] as int,
            subSite: row['subSite'] as String,
            Title: row['Title'] as String,
            TitleEN: row['TitleEN'] as String,
            Acronyms: row['Acronyms'] as String,
            Rank: row['Rank'] as int));
  }
}
