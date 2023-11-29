import {Model, Q, tableSchema} from "@nozbe/watermelondb";
import {date, field} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";
import {isNullOrEmpty} from "../../../utils/function";

export class DocumentInteractive extends Model {
    static table = 'document_interactive';
    // @ts-ignore
    @field('Title') Title;
    // @ts-ignore
    @field('ResourceId') ResourceId;
    // @ts-ignore
    @field('ResourceUrl') ResourceUrl;
    // @ts-ignore
    @date('Created') Created;
    // @ts-ignore
    @field('Type') Type;
    // @ts-ignore
    @field('StorageCode') StorageCode;
    // @ts-ignore
    @field('VersionShow') VersionShow;
    // @ts-ignore
    @field('DocumentType') DocumentType;
    // @ts-ignore
    @field('Department') Department;
    // @ts-ignore
    @field('IsAutoFollow') IsAutoFollow;
    // @ts-ignore
    @field('DocumentId') DocumentId;
    // @ts-ignore
    @field('Thumbnail') Thumbnail;
    // @ts-ignore
    @field('MyID') MyID;

    static getSchema() {
        return tableSchema({
            name: DocumentInteractive.table,
            columns: [
                {name: 'Title', type: 'string'},
                {name: 'ResourceId', type: 'string'},
                {name: 'ResourceUrl', type: 'string'},
                {name: 'Created', type: 'string'},
                {name: 'Type', type: 'string'},
                {name: 'StorageCode', type: 'string'},
                {name: 'VersionShow', type: 'number'},
                {name: 'DocumentType', type: 'string'},
                {name: 'Department', type: 'string'},
                {name: 'IsAutoFollow', type: 'number'},
                {name: 'DocumentId', type: 'number'},
                {name: 'Thumbnail', type: 'string'},
                {name: 'MyID', type: 'string'},
            ],
        });
    }
    static async deleteAll()
    {
        // @ts-ignore
        const table = database.get<DocumentInteractive>(DocumentInteractive.table);
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
    // @ts-ignore
    static async getAll(limit, offset) {
        // @ts-ignore
        const table = database.get<DocumentInteractive>(DocumentInteractive.table);
        const data: DocumentInteractive[] = await table.query(
            Q.skip(offset), // Apply the offset
            Q.take(limit) // Apply the limit
        ).unsafeFetchRaw();
        return data;
    }

    static async insertOrUpdateAll(models: any[]): Promise<void> {
        // @ts-ignore
        const table = database.get<DocumentInteractive>(DocumentInteractive.table);
        database.write(async () => {
            for (const model of models) {
                const data = await table
                    .query(
                        Q.where('MyID', model.ID)
                    ).fetch();
                if (data?.length > 0) {
                    // @ts-ignore
                    data[0].update(form => {
                        form.Title = model.Title;
                        form.ResourceId = model.ResourceId;
                        form.ResourceUrl = model.ResourceUrl;
                        form.Created = model.Created;
                        form.Type = model.Type;
                        form.StorageCode = model.StorageCode;
                        form.VersionShow = model.VersionShow;
                        form.DocumentType = model.DocumentType;
                        form.Department = isNullOrEmpty(model.Department) ? "" : model.Department;
                        form.IsAutoFollow = model.IsAutoFollow;
                        form.DocumentId = model.DocumentId;
                        form.Thumbnail = model.Thumbnail;
                        form.MyID = model.ID;

                    });
                    if (__DEV__)
                        console.log('Update Document:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert Document:', model);
                    // @ts-ignore
                    table.create(field => {

                        field.Title = model.Title;
                        field.ResourceId = model.ResourceId;
                        field.ResourceUrl = model.ResourceUrl;
                        field.Created = model.Created;
                        field.Type = model.Type;
                        field.StorageCode = model.StorageCode;
                        field.VersionShow = model.VersionShow;
                        field.DocumentType = model.DocumentType;
                        field.Department = isNullOrEmpty(model.Department) ? "" : model.Department;
                        field.IsAutoFollow = model.IsAutoFollow;
                        field.DocumentId = model.DocumentId;
                        field.Thumbnail = model.Thumbnail;
                        field.MyID = model.ID;

                    });
                }
            }
        });
    }
}
