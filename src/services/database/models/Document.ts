import {Model, Q, Query, tableSchema} from "@nozbe/watermelondb";
import {field, readonly, writer} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";
import DocumentRecently from "services/database/models/DocumentRecently";
import StandardDocDashBoard from "services/database/models/StandardDocDashBoard";

// @ts-ignore
export class Document extends Model {
    static table = 'document'; // Specify the table name
    // @ts-ignore
    @field('PrimaryKey') PrimaryKey;
    // @ts-ignore
    @field('DocumentId') DocumentId;
    // @ts-ignore
    @field('Thumbnail') Thumbnail;
    // @ts-ignore
    @field('IssueDate') IssueDate;
    // @ts-ignore
    @field('Title') Title;
    // @ts-ignore
    @field('Url') Url;
    // @ts-ignore
    @field('IsMostViewed', {defaultValue: false}) IsMostViewed;
    // @ts-ignore
    @field('IsFavorite', {defaultValue: false}) IsFavorite;
    // @ts-ignore
    @field('TitleEN') TitleEN;
    // @ts-ignore
    @field('DocumentTypeId') DocumentTypeId;
    // @ts-ignore
    @field('DocumentGroupId') DocumentGroupId;
    // @ts-ignore
    @field('IsArchived') IsArchived;
    // @ts-ignore
    @field('StorageCode') StorageCode;
    // @ts-ignore
    @field('Status') Status;
    // @ts-ignore
    @field('LastTimeView') LastTimeView;
    // @ts-ignore
    @field('IsMostViewedL') IsMostViewedL;
    // @ts-ignore
    @field('IsNewestL') IsNewestL;
    // @ts-ignore
    @field('IsFavoriteL') IsFavoriteL;
    // @ts-ignore
    @field('AreaCategoryId') AreaCategoryId;
    // @ts-ignore
    @field('Code') Code;
    // @ts-ignore
    @field('Version') Version;
    // @ts-ignore
    @field('EffectiveStartDate') EffectiveStartDate;
    // @ts-ignore
    @field('EffectiveEndDate') EffectiveEndDate;
    // @ts-ignore
    @field('PublishDate') PublishDate;
    // @ts-ignore
    @field('Publisher') Publisher;
    // @ts-ignore
    @field('Int1') Int1;
    // @ts-ignore
    @field('Int2') Int2;
    // @ts-ignore
    @field('Int5') Int5;
    // @ts-ignore
    @field('Int6') Int6;
    // @ts-ignore
    @field('Text5') Text5;
    // @ts-ignore
    @field('Text6') Text6;
    // @ts-ignore
    @field('Text7') Text7;
    // @ts-ignore
    @field('Text11') Text11;
    // @ts-ignore
    @field('Title1') Title1;
    // @ts-ignore
    @field('DocUrl') DocUrl;
    // @ts-ignore
    @field('IsDivSection') IsDivSection;
    // @ts-ignore
    @field('DVCTBSCap1') DVCTBSCap1;
    // @ts-ignore
    @field('DVCTBSCap2') DVCTBSCap2;
    // @ts-ignore
    @field('DVCTBSCap3') DVCTBSCap3;
    // @ts-ignore
    @field('CapPCTLCap1') CapPCTLCap1;
    // @ts-ignore
    @field('CapPCTLCap2') CapPCTLCap2;
    // @ts-ignore
    @field('CapPCTLCap3') CapPCTLCap3;
    // @ts-ignore
    @field('NoiDungSuaDoi') NoiDungSuaDoi;
    // @ts-ignore
    @field('NguoiDang') NguoiDang;
    // @ts-ignore
    @field('NguoiDuyet') NguoiDuyet;
    // @ts-ignore
    @field('LoaiTL') LoaiTL;
    // @ts-ignore
    @field('FileUrl') FileUrl;
    // @ts-ignore
    @field('FileTitle') FileTitle;
    // @ts-ignore
    @field('FileID') FileID;
    // @ts-ignore
    @field('AreaCategoryTitle') AreaCategoryTitle;
    // @ts-ignore
    @field('Department2') Department2;
    // @ts-ignore
    @field('IssueDate1') IssueDate1;
    // @ts-ignore
    @field('Text8') Text8;
    // @ts-ignore
    @field('DVPhanPhoi') DVPhanPhoi;
    // @ts-ignore
    @field('NguoiXemXet') NguoiXemXet;
    // @ts-ignore
    @field('NguoiPheChuan') NguoiPheChuan;
    // @ts-ignore
    @field('NguoiChapNhan') NguoiChapNhan;
    // @ts-ignore
    @field('NguoiBienSoan') NguoiBienSoan;
    // @ts-ignore
    @field('TuVT') TuVT;
    // @ts-ignore
    @field('TuKhoa') TuKhoa;
    // @ts-ignore
    @field('ResourceCategoryId') ResourceCategoryId;
    // @ts-ignore
    @field('ResourceSubCategoryId') ResourceSubCategoryId;
    // @ts-ignore
    @field('IsPilot') IsPilot;


    static getSchema() {
        return tableSchema({
            name: Document.table,
            columns: [
                { name: 'PrimaryKey', type: 'number' },
                { name: 'DocumentId', type: 'number' },
                { name: 'Thumbnail', type: 'string' },
                { name: 'IssueDate', type: 'string' },
                { name: 'Title', type: 'string' },
                { name: 'Url', type: 'string' },
                { name: 'IsMostViewed', type: 'boolean' }, // Example: Adding an index
                { name: 'IsFavorite', type: 'boolean' },
                { name: 'TitleEN', type: 'string' },
                { name: 'DocumentTypeId', type: 'number' },
                { name: 'DocumentGroupId', type: 'number' },
                { name: 'IsArchived', type: 'number' },
                { name: 'StorageCode', type: 'string' },
                { name: 'Status', type: 'number' },
                { name: 'LastTimeView', type: 'string' }, // Assuming this is a timestamp or number
                { name: 'IsMostViewedL', type: 'boolean' },
                { name: 'IsNewestL', type: 'boolean' },
                { name: 'IsFavoriteL', type: 'boolean' },
                { name: 'AreaCategoryId', type: 'number' },
                { name: 'Code', type: 'string' },
                { name: 'Version', type: 'number' },
                { name: 'EffectiveStartDate', type: 'string' },
                { name: 'EffectiveEndDate', type: 'string' },
                { name: 'PublishDate', type: 'string' },
                { name: 'Publisher', type: 'string' },
                { name: 'Int1', type: 'number' },
                { name: 'Int2', type: 'number' },
                { name: 'Int5', type: 'number' },
                { name: 'Int6', type: 'number' },
                { name: 'Text5', type: 'string' },
                { name: 'Text6', type: 'string' },
                { name: 'Text7', type: 'string' },
                { name: 'Text11', type: 'string' },
                { name: 'Title1', type: 'string' },
                { name: 'DocUrl', type: 'string' },
                { name: 'IsDivSection', type: 'number' },
                { name: 'DVCTBSCap1', type: 'string' },
                { name: 'DVCTBSCap2', type: 'string' },
                { name: 'DVCTBSCap3', type: 'string' },
                { name: 'CapPCTLCap1', type: 'string' },
                { name: 'CapPCTLCap2', type: 'string' },
                { name: 'CapPCTLCap3', type: 'string' },
                { name: 'NoiDungSuaDoi', type: 'string' },
                { name: 'NguoiDang', type: 'string' },
                { name: 'NguoiDuyet', type: 'string' },
                { name: 'LoaiTL', type: 'string' },
                { name: 'FileUrl', type: 'string' },
                { name: 'FileTitle', type: 'string' },
                { name: 'FileID', type: 'number' },
                { name: 'AreaCategoryTitle', type: 'string' },
                { name: 'Department2', type: 'string' },
                { name: 'IssueDate1', type: 'string' },
                { name: 'Text8', type: 'string' },
                { name: 'DVPhanPhoi', type: 'string' },
                { name: 'NguoiXemXet', type: 'string' },
                { name: 'NguoiPheChuan', type: 'string' },
                { name: 'NguoiChapNhan', type: 'string' },
                { name: 'NguoiBienSoan', type: 'string' },
                { name: 'TuVT', type: 'string' },
                { name: 'TuKhoa', type: 'string' },
                { name: 'ResourceCategoryId', type: 'number' },
                { name: 'ResourceSubCategoryId', type: 'number' },
                { name: 'IsPilot', type: 'boolean' },
            ],
        });
    }
    static async deleteAll()
    {
        // @ts-ignore
        const table = database.get<Document>(Document.table);
        const tasksToDelete = await table.query().fetch();
        if (tasksToDelete.length > 0) {
            for (const task of tasksToDelete) {
                database.write(async () => {
                    try {
                        await task.markAsDeleted();
                        await task.destroyPermanently();
                    } catch (error) {
                        console.error('Error deleting task:', error);
                    }
                })
            }
        }
    }
    static async  getDocumentByDocumentID(id:number)
    {
        // @ts-ignore
        const table = database.get<Document>(Document.table);
        return await table.query(
            Q.where("DocumentId", id),
        ).unsafeFetchRaw();
    }
    static async getNewDocument(IsMostViewed: string | number | boolean | Readonly<{
        operator: Q.Operator;
        right: Q.ComparisonRight;
        type?: symbol | undefined;
    }> | null, IsFavorite: string | number | boolean | Readonly<{
        operator: Q.Operator;
        right: Q.ComparisonRight;
        type?: symbol | undefined;
    }> | null) {
        // @ts-ignore
        const table = database.get<Document>(Document.table);
        return await table.query(
            Q.where("IsMostViewed", IsMostViewed),
            Q.where("IsFavorite", IsFavorite),
        ).fetch()
    }

    static async getDucmentRecently() {
        // @ts-ignore
        const documentCollection = await database.get<Document>(Document.table).query().unsafeFetchRaw();
        // @ts-ignore
        const documentRecentlyCollection = await database.get<DocumentRecently>(DocumentRecently.table).query().unsafeFetchRaw();
        const data = [];
        if (documentCollection.length > 0) {
            for (const item of documentRecentlyCollection) {
                // @ts-ignore
                data.push(documentCollection.find(doc => doc.DocumentId == item.documentID));
            }
        }
        return data;
    }
    static async getStandardDocDashBoard() {
        // @ts-ignore
        const documentCollection = await database.get<Document>(Document.table).query().unsafeFetchRaw();
        // @ts-ignore
        const documentRecentlyCollection = await database.get<StandardDocDashBoard>(StandardDocDashBoard.table).query().unsafeFetchRaw();
        const data = [];
        if (documentCollection.length > 0) {
            for (const item of documentRecentlyCollection) {
                // @ts-ignore
                data.push(documentCollection.find(doc => doc.DocumentId == item.documentID));
            }
        }
        return data;
    }

    static async insertOrUpdateAll(models: any[]): Promise<void> {
        // @ts-ignore
        const table = database.get<Document>(Document.table);
        database.write(async () => {
            for (const model of models) {
                const data = await table
                    .query(
                        Q.where('PrimaryKey', model.ID)
                    ).fetch();
                if (data?.length > 0) {
                    // @ts-ignore
                    data[0].update(form => {
                        form.PrimaryKey = model.ID;
                        form.DocumentId = model.DocumentId;
                        form.Thumbnail = model.Thumbnail;
                        form.IssueDate = model.IssueDate;
                        form.Title = model.Title;
                        form.Url = model.Url;
                        form.TitleEN = model.TitleEN;
                        form.DocumentTypeId = model.DocumentTypeId;
                        form.DocumentGroupId = model.DocumentGroupId;
                        form.IsArchived = model.IsArchived;
                        form.StorageCode = model.StorageCode;
                        form.Status = model.Status;
                        form.LastTimeView = model.LastTimeView;
                        form.IsMostViewedL = model.IsMostViewedL;
                        form.IsNewestL = model.IsNewestL;
                        form.IsFavoriteL = model.IsFavoriteL;
                        form.AreaCategoryId = model.AreaCategoryId;
                        form.Code = model.Code;
                        form.Version = model.Version;
                        form.EffectiveStartDate = model.EffectiveStartDate;
                        form.EffectiveEndDate = model.EffectiveEndDate;
                        form.PublishDate = model.PublishDate;
                        form.Publisher = model.Publisher;
                        form.Int1 = model.Int1;
                        form.Int2 = model.Int2;
                        form.Int5 = model.Int5;
                        form.Int6 = model.Int6;
                        form.Text5 = model.Text5;
                        form.Text6 = model.Text6;
                        form.Text7 = model.Text7;
                        form.Text11 = model.Text11;
                        form.Title1 = model.Title1;
                        form.DocUrl = model.DocUrl;
                        form.IsDivSection = model.IsDivSection;
                        form.DVCTBSCap1 = model.DVCTBSCap1;
                        form.DVCTBSCap2 = model.DVCTBSCap2;
                        form.DVCTBSCap3 = model.DVCTBSCap3;
                        form.CapPCTLCap1 = model.CapPCTLCap1;
                        form.CapPCTLCap2 = model.CapPCTLCap2;
                        form.CapPCTLCap3 = model.CapPCTLCap3;
                        form.NoiDungSuaDoi = model.NoiDungSuaDoi;
                        form.NguoiDang = model.NguoiDang;
                        form.NguoiDuyet = model.NguoiDuyet;
                        form.LoaiTL = model.LoaiTL;
                        form.FileUrl = model.FileUrl;
                        form.FileTitle = model.FileTitle;
                        form.FileID = model.FileID;
                        form.AreaCategoryTitle = model.AreaCategoryTitle;
                        form.Department2 = model.Department2;
                        form.IssueDate1 = model.IssueDate1;
                        form.Text8 = model.Text8;
                        form.DVPhanPhoi = model.DVPhanPhoi;
                        form.NguoiXemXet = model.NguoiXemXet;
                        form.NguoiPheChuan = model.NguoiPheChuan;
                        form.NguoiChapNhan = model.NguoiChapNhan;
                        form.NguoiBienSoan = model.NguoiBienSoan;
                        form.TuVT = model.TuVT;
                        form.TuKhoa = model.TuKhoa;
                        form.ResourceCategoryId = model.ResourceCategoryId;
                        form.ResourceSubCategoryId = model.ResourceSubCategoryId;
                        form.IsPilot = model.IsPilot;
                    });
                    if (__DEV__)
                        console.log('Update Document:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert Document:', model);
                    // @ts-ignore
                    table.create(form => {
                        form.PrimaryKey = model.ID;
                        form.DocumentId = model.DocumentId;
                        form.Thumbnail = model.Thumbnail;
                        form.IssueDate = model.IssueDate;
                        form.Title = model.Title;
                        form.Url = model.Url;
                        form.TitleEN = model.TitleEN;
                        form.DocumentTypeId = model.DocumentTypeId;
                        form.DocumentGroupId = model.DocumentGroupId;
                        form.IsArchived = model.IsArchived;
                        form.StorageCode = model.StorageCode;
                        form.Status = model.Status;
                        form.LastTimeView = model.LastTimeView;
                        form.IsMostViewedL = model.IsMostViewedL;
                        form.IsNewestL = model.IsNewestL;
                        form.IsFavoriteL = model.IsFavoriteL;
                        form.AreaCategoryId = model.AreaCategoryId;
                        form.Code = model.Code;
                        form.Version = model.Version;
                        form.EffectiveStartDate = model.EffectiveStartDate;
                        form.EffectiveEndDate = model.EffectiveEndDate;
                        form.PublishDate = model.PublishDate;
                        form.Publisher = model.Publisher;
                        form.Int1 = model.Int1;
                        form.Int2 = model.Int2;
                        form.Int5 = model.Int5;
                        form.Int6 = model.Int6;
                        form.Text5 = model.Text5;
                        form.Text6 = model.Text6;
                        form.Text7 = model.Text7;
                        form.Text11 = model.Text11;
                        form.Title1 = model.Title1;
                        form.DocUrl = model.DocUrl;
                        form.IsDivSection = model.IsDivSection;
                        form.DVCTBSCap1 = model.DVCTBSCap1;
                        form.DVCTBSCap2 = model.DVCTBSCap2;
                        form.DVCTBSCap3 = model.DVCTBSCap3;
                        form.CapPCTLCap1 = model.CapPCTLCap1;
                        form.CapPCTLCap2 = model.CapPCTLCap2;
                        form.CapPCTLCap3 = model.CapPCTLCap3;
                        form.NoiDungSuaDoi = model.NoiDungSuaDoi;
                        form.NguoiDang = model.NguoiDang;
                        form.NguoiDuyet = model.NguoiDuyet;
                        form.LoaiTL = model.LoaiTL;
                        form.FileUrl = model.FileUrl;
                        form.FileTitle = model.FileTitle;
                        form.FileID = model.FileID;
                        form.AreaCategoryTitle = model.AreaCategoryTitle;
                        form.Department2 = model.Department2;
                        form.IssueDate1 = model.IssueDate1;
                        form.Text8 = model.Text8;
                        form.DVPhanPhoi = model.DVPhanPhoi;
                        form.NguoiXemXet = model.NguoiXemXet;
                        form.NguoiPheChuan = model.NguoiPheChuan;
                        form.NguoiChapNhan = model.NguoiChapNhan;
                        form.NguoiBienSoan = model.NguoiBienSoan;
                        form.TuVT = model.TuVT;
                        form.TuKhoa = model.TuKhoa;
                        form.ResourceCategoryId = model.ResourceCategoryId;
                        form.ResourceSubCategoryId = model.ResourceSubCategoryId;
                        form.IsPilot = model.IsPilot;
                    });
                }
            }
        });
    }

    static async insertOrUpdateAllMostViewed(models: any[]): Promise<void> {
        // @ts-ignore
        const table = database.get<Document>(Document.table);
        database.write(async () => {
            for (const model of models) {
                const data = await table
                    .query(
                        Q.where('PrimaryKey', model.DocumentId)
                    ).fetch();
                if (data?.length > 0) {
                    // @ts-ignore
                    data[0].update(form => {
                        form.PrimaryKey = model.ID;
                        form.DocumentId = model.DocumentId;
                        form.Thumbnail = model.Thumbnail;
                        form.IssueDate = model.IssueDate;
                        form.Title = model.Title;
                        form.Url = model.Url;
                        form.TitleEN = model.TitleEN;
                        form.DocumentTypeId = model.DocumentTypeId;
                        form.DocumentGroupId = model.DocumentGroupId;
                        form.IsArchived = model.IsArchived;
                        form.StorageCode = model.StorageCode;
                        form.Status = model.Status;
                        form.LastTimeView = model.LastTimeView;
                        form.IsMostViewedL = model.IsMostViewedL;
                        form.IsNewestL = model.IsNewestL;
                        form.IsFavoriteL = model.IsFavoriteL;
                        form.AreaCategoryId = model.AreaCategoryId;
                        form.Code = model.Code;
                        form.Version = model.Version;
                        form.EffectiveStartDate = model.EffectiveStartDate;
                        form.EffectiveEndDate = model.EffectiveEndDate;
                        form.PublishDate = model.PublishDate;
                        form.Publisher = model.Publisher;
                        form.Int1 = model.Int1;
                        form.Int2 = model.Int2;
                        form.Int5 = model.Int5;
                        form.Int6 = model.Int6;
                        form.Text5 = model.Text5;
                        form.Text6 = model.Text6;
                        form.Text7 = model.Text7;
                        form.Text11 = model.Text11;
                        form.Title1 = model.Title1;
                        form.DocUrl = model.DocUrl;
                        form.IsDivSection = model.IsDivSection;
                        form.DVCTBSCap1 = model.DVCTBSCap1;
                        form.DVCTBSCap2 = model.DVCTBSCap2;
                        form.DVCTBSCap3 = model.DVCTBSCap3;
                        form.CapPCTLCap1 = model.CapPCTLCap1;
                        form.CapPCTLCap2 = model.CapPCTLCap2;
                        form.CapPCTLCap3 = model.CapPCTLCap3;
                        form.NoiDungSuaDoi = model.NoiDungSuaDoi;
                        form.NguoiDang = model.NguoiDang;
                        form.NguoiDuyet = model.NguoiDuyet;
                        form.LoaiTL = model.LoaiTL;
                        form.FileUrl = model.FileUrl;
                        form.FileTitle = model.FileTitle;
                        form.FileID = model.FileID;
                        form.AreaCategoryTitle = model.AreaCategoryTitle;
                        form.Department2 = model.Department2;
                        form.IssueDate1 = model.IssueDate1;
                        form.Text8 = model.Text8;
                        form.DVPhanPhoi = model.DVPhanPhoi;
                        form.NguoiXemXet = model.NguoiXemXet;
                        form.NguoiPheChuan = model.NguoiPheChuan;
                        form.NguoiChapNhan = model.NguoiChapNhan;
                        form.NguoiBienSoan = model.NguoiBienSoan;
                        form.TuVT = model.TuVT;
                        form.TuKhoa = model.TuKhoa;
                        form.ResourceCategoryId = model.ResourceCategoryId;
                        form.ResourceSubCategoryId = model.ResourceSubCategoryId;
                        form.IsMostViewed = true;
                        form.IsPilot = model.IsPilot;
                    });
                    if (__DEV__)
                        console.log('Update Document:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert Document:', model);
                    // @ts-ignore
                    table.create(form => {
                        form.PrimaryKey = model.ID;
                        form.DocumentId = model.DocumentId;
                        form.Thumbnail = model.Thumbnail;
                        form.IssueDate = model.IssueDate;
                        form.Title = model.Title;
                        form.Url = model.Url;
                        form.TitleEN = model.TitleEN;
                        form.DocumentTypeId = model.DocumentTypeId;
                        form.DocumentGroupId = model.DocumentGroupId;
                        form.IsArchived = model.IsArchived;
                        form.StorageCode = model.StorageCode;
                        form.Status = model.Status;
                        form.LastTimeView = model.LastTimeView;
                        form.IsMostViewedL = model.IsMostViewedL;
                        form.IsNewestL = model.IsNewestL;
                        form.IsFavoriteL = model.IsFavoriteL;
                        form.AreaCategoryId = model.AreaCategoryId;
                        form.Code = model.Code;
                        form.Version = model.Version;
                        form.EffectiveStartDate = model.EffectiveStartDate;
                        form.EffectiveEndDate = model.EffectiveEndDate;
                        form.PublishDate = model.PublishDate;
                        form.Publisher = model.Publisher;
                        form.Int1 = model.Int1;
                        form.Int2 = model.Int2;
                        form.Int5 = model.Int5;
                        form.Int6 = model.Int6;
                        form.Text5 = model.Text5;
                        form.Text6 = model.Text6;
                        form.Text7 = model.Text7;
                        form.Text11 = model.Text11;
                        form.Title1 = model.Title1;
                        form.DocUrl = model.DocUrl;
                        form.IsDivSection = model.IsDivSection;
                        form.DVCTBSCap1 = model.DVCTBSCap1;
                        form.DVCTBSCap2 = model.DVCTBSCap2;
                        form.DVCTBSCap3 = model.DVCTBSCap3;
                        form.CapPCTLCap1 = model.CapPCTLCap1;
                        form.CapPCTLCap2 = model.CapPCTLCap2;
                        form.CapPCTLCap3 = model.CapPCTLCap3;
                        form.NoiDungSuaDoi = model.NoiDungSuaDoi;
                        form.NguoiDang = model.NguoiDang;
                        form.NguoiDuyet = model.NguoiDuyet;
                        form.LoaiTL = model.LoaiTL;
                        form.FileUrl = model.FileUrl;
                        form.FileTitle = model.FileTitle;
                        form.FileID = model.FileID;
                        form.AreaCategoryTitle = model.AreaCategoryTitle;
                        form.Department2 = model.Department2;
                        form.IssueDate1 = model.IssueDate1;
                        form.Text8 = model.Text8;
                        form.DVPhanPhoi = model.DVPhanPhoi;
                        form.NguoiXemXet = model.NguoiXemXet;
                        form.NguoiPheChuan = model.NguoiPheChuan;
                        form.NguoiChapNhan = model.NguoiChapNhan;
                        form.NguoiBienSoan = model.NguoiBienSoan;
                        form.TuVT = model.TuVT;
                        form.TuKhoa = model.TuKhoa;
                        form.ResourceCategoryId = model.ResourceCategoryId;
                        form.ResourceSubCategoryId = model.ResourceSubCategoryId;
                        form.IsMostViewed = true;
                        form.IsPilot = model.IsPilot;
                    });
                }
            }
        });
    }

    static async insertOrUpdateAllIsFavorite(models: any[]): Promise<void> {
        // @ts-ignore
        const table = database.get<Document>(Document.table);
        database.write(async () => {
            for (const model of models) {
                const data = await table
                    .query(
                        Q.where('DocumentId', model.DocumentId)
                    ).fetch();
                if (data?.length > 0) {
                    // @ts-ignore
                    data[0].update(form => {
                        form.PrimaryKey = model.ID;
                        form.DocumentId = model.DocumentId;
                        form.Thumbnail = model.Thumbnail;
                        form.IssueDate = model.IssueDate;
                        form.Title = model.Title;
                        form.Url = model.Url;
                        form.TitleEN = model.TitleEN;
                        form.DocumentTypeId = model.DocumentTypeId;
                        form.DocumentGroupId = model.DocumentGroupId;
                        form.IsArchived = model.IsArchived;
                        form.StorageCode = model.StorageCode;
                        form.Status = model.Status;
                        form.LastTimeView = model.LastTimeView;
                        form.IsMostViewedL = model.IsMostViewedL;
                        form.IsNewestL = model.IsNewestL;
                        form.IsFavoriteL = model.IsFavoriteL;
                        form.AreaCategoryId = model.AreaCategoryId;
                        form.Code = model.Code;
                        form.Version = model.Version;
                        form.EffectiveStartDate = model.EffectiveStartDate;
                        form.EffectiveEndDate = model.EffectiveEndDate;
                        form.PublishDate = model.PublishDate;
                        form.Publisher = model.Publisher;
                        form.Int1 = model.Int1;
                        form.Int2 = model.Int2;
                        form.Int5 = model.Int5;
                        form.Int6 = model.Int6;
                        form.Text5 = model.Text5;
                        form.Text6 = model.Text6;
                        form.Text7 = model.Text7;
                        form.Text11 = model.Text11;
                        form.Title1 = model.Title1;
                        form.DocUrl = model.DocUrl;
                        form.IsDivSection = model.IsDivSection;
                        form.DVCTBSCap1 = model.DVCTBSCap1;
                        form.DVCTBSCap2 = model.DVCTBSCap2;
                        form.DVCTBSCap3 = model.DVCTBSCap3;
                        form.CapPCTLCap1 = model.CapPCTLCap1;
                        form.CapPCTLCap2 = model.CapPCTLCap2;
                        form.CapPCTLCap3 = model.CapPCTLCap3;
                        form.NoiDungSuaDoi = model.NoiDungSuaDoi;
                        form.NguoiDang = model.NguoiDang;
                        form.NguoiDuyet = model.NguoiDuyet;
                        form.LoaiTL = model.LoaiTL;
                        form.FileUrl = model.FileUrl;
                        form.FileTitle = model.FileTitle;
                        form.FileID = model.FileID;
                        form.AreaCategoryTitle = model.AreaCategoryTitle;
                        form.Department2 = model.Department2;
                        form.IssueDate1 = model.IssueDate1;
                        form.Text8 = model.Text8;
                        form.DVPhanPhoi = model.DVPhanPhoi;
                        form.NguoiXemXet = model.NguoiXemXet;
                        form.NguoiPheChuan = model.NguoiPheChuan;
                        form.NguoiChapNhan = model.NguoiChapNhan;
                        form.NguoiBienSoan = model.NguoiBienSoan;
                        form.TuVT = model.TuVT;
                        form.TuKhoa = model.TuKhoa;
                        form.ResourceCategoryId = model.ResourceCategoryId;
                        form.ResourceSubCategoryId = model.ResourceSubCategoryId;
                        form.IsFavorite = true;
                        form.IsPilot = model.IsPilot;
                    });
                    if (__DEV__)
                        console.log('Update Document:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert Document:', model);
                    // @ts-ignore
                    table.create(form => {
                        form.PrimaryKey = model.ID;
                        form.DocumentId = model.DocumentId;
                        form.Thumbnail = model.Thumbnail;
                        form.IssueDate = model.IssueDate;
                        form.Title = model.Title;
                        form.Url = model.Url;
                        form.TitleEN = model.TitleEN;
                        form.DocumentTypeId = model.DocumentTypeId;
                        form.DocumentGroupId = model.DocumentGroupId;
                        form.IsArchived = model.IsArchived;
                        form.StorageCode = model.StorageCode;
                        form.Status = model.Status;
                        form.LastTimeView = model.LastTimeView;
                        form.IsMostViewedL = model.IsMostViewedL;
                        form.IsNewestL = model.IsNewestL;
                        form.IsFavoriteL = model.IsFavoriteL;
                        form.AreaCategoryId = model.AreaCategoryId;
                        form.Code = model.Code;
                        form.Version = model.Version;
                        form.EffectiveStartDate = model.EffectiveStartDate;
                        form.EffectiveEndDate = model.EffectiveEndDate;
                        form.PublishDate = model.PublishDate;
                        form.Publisher = model.Publisher;
                        form.Int1 = model.Int1;
                        form.Int2 = model.Int2;
                        form.Int5 = model.Int5;
                        form.Int6 = model.Int6;
                        form.Text5 = model.Text5;
                        form.Text6 = model.Text6;
                        form.Text7 = model.Text7;
                        form.Text11 = model.Text11;
                        form.Title1 = model.Title1;
                        form.DocUrl = model.DocUrl;
                        form.IsDivSection = model.IsDivSection;
                        form.DVCTBSCap1 = model.DVCTBSCap1;
                        form.DVCTBSCap2 = model.DVCTBSCap2;
                        form.DVCTBSCap3 = model.DVCTBSCap3;
                        form.CapPCTLCap1 = model.CapPCTLCap1;
                        form.CapPCTLCap2 = model.CapPCTLCap2;
                        form.CapPCTLCap3 = model.CapPCTLCap3;
                        form.NoiDungSuaDoi = model.NoiDungSuaDoi;
                        form.NguoiDang = model.NguoiDang;
                        form.NguoiDuyet = model.NguoiDuyet;
                        form.LoaiTL = model.LoaiTL;
                        form.FileUrl = model.FileUrl;
                        form.FileTitle = model.FileTitle;
                        form.FileID = model.FileID;
                        form.AreaCategoryTitle = model.AreaCategoryTitle;
                        form.Department2 = model.Department2;
                        form.IssueDate1 = model.IssueDate1;
                        form.Text8 = model.Text8;
                        form.DVPhanPhoi = model.DVPhanPhoi;
                        form.NguoiXemXet = model.NguoiXemXet;
                        form.NguoiPheChuan = model.NguoiPheChuan;
                        form.NguoiChapNhan = model.NguoiChapNhan;
                        form.NguoiBienSoan = model.NguoiBienSoan;
                        form.TuVT = model.TuVT;
                        form.TuKhoa = model.TuKhoa;
                        form.ResourceCategoryId = model.ResourceCategoryId;
                        form.ResourceSubCategoryId = model.ResourceSubCategoryId;
                        form.IsFavorite = true;
                        form.IsPilot = model.IsPilot;
                    });
                }
            }
        });
    }
}
