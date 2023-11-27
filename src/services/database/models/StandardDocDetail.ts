import {Model, Q, tableSchema} from "@nozbe/watermelondb";
import {field} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";

export class StandardDocDetail extends Model {
    static table = 'standard_doc_detail';
    // @ts-ignore
    @field('PrimaryKey') PrimaryKey;
    // @ts-ignore
    @field('Title') Title;
    // @ts-ignore
    @field('Url') Url;
    // @ts-ignore
    @field('DocumentId') DocumentId;
    // @ts-ignore
    @field('AreaCategoryId') AreaCategoryId;
    // @ts-ignore
    @field('Version') Version;
    // @ts-ignore
    @field('IssueDate') IssueDate;
    // @ts-ignore
    @field('Status') Status;
    // @ts-ignore
    @field('StatusName') StatusName;
    // @ts-ignore
    @field('Code') Code;
    // @ts-ignore
    @field('Thumbnail') Thumbnail;

    // @ts-ignore
    static async getAll(DocumentTypeId) {
        // @ts-ignore
        const table = database.get<DocumentCategory>(StandardDocDetail.table);
        const data: StandardDocDetail[] = await table.query(
            Q.where('DocumentTypeId',DocumentTypeId)
        ).unsafeFetchRaw();
        return data;
    }
    static getSchema() {
        return tableSchema({
            name: StandardDocDetail.table,
            columns: [
                {name: 'PrimaryKey', type: 'number'},
                {name: 'Title', type: 'string'},
                {name: 'Url', type: 'string'},
                {name: 'DocumentId', type: 'number'},
                {name: 'StorageCode', type: 'string'},
                {name: 'AreaCategoryId', type: 'number'},
                {name: 'Version', type: 'number'},
                {name: 'IssueDate', type: 'string'},
                {name: 'Status', type: 'number'},
                {name: 'StatusName', type: 'string'},
                {name: 'Code', type: 'string'},
                {name: 'Thumbnail', type: 'string'},
            ],
        });
    }
    static async deleteAll()
    {
        // @ts-ignore
        const table = database.get<StandardDocDetail>(StandardDocDetail.table);
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
    static async insertOrUpdateAll(models: any[]): Promise<void> {
        // @ts-ignore
        const table = database.get<StandardDocDetail>(StandardDocDetail.table);
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
                        form.Title = model.Title;
                        form.Url = model.Url;
                        form.DocumentId = model.DocumentId;
                        form.StorageCode = model.StorageCode;
                        form.AreaCategoryId = model.AreaCategoryId;
                        form.Version = model.Version;
                        form.IssueDate = model.IssueDate;
                        form.Status = model.Status;
                        form.StatusName = model.StatusName;
                        form.Code = model.Code;
                        form.Thumbnail = model.Thumbnail;
                    });
                    if (__DEV__)
                        console.log('Update StandardDocDetail:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert StandardDocDetail:', model);
                    // @ts-ignore
                    table.create(form => {
                        form.PrimaryKey = model.ID;
                        form.Title = model.Title;
                        form.Url = model.Url;
                        form.DocumentId = model.DocumentId;
                        form.StorageCode = model.StorageCode;
                        form.AreaCategoryId = model.AreaCategoryId;
                        form.Version = model.Version;
                        form.IssueDate = model.IssueDate;
                        form.Status = model.Status;
                        form.StatusName = model.StatusName;
                        form.Code = model.Code;
                        form.Thumbnail = model.Thumbnail;
                    });
                }
            }
        });
    }
}
