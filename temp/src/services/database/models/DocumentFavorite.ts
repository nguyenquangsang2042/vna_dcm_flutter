import {Model, Q, tableSchema} from "@nozbe/watermelondb";
import {field} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";

export class DocumentFavorite extends Model {
    static table = 'document_favorite';
    // @ts-ignore
    @field('PrimaryKey') PrimaryKey;
    // @ts-ignore
    @field('ResourceTitle') ResourceTitle;
    // @ts-ignore
    @field('ResourceUrl') ResourceUrl;
    // @ts-ignore
    @field('DocumentId') DocumentId;
    // @ts-ignore
    @field('ResourceId') ResourceId;
    // @ts-ignore
    @field('FolderId') FolderId;
    // @ts-ignore
    @field('CreatedBy') CreatedBy;
    // @ts-ignore
    @field('Modified') Modified;
    // @ts-ignore
    @field('Created') Created;
    // @ts-ignore
    @field('FolderTitle') FolderTitle;
    // @ts-ignore
    @field('Thumbnail') Thumbnail;
    // @ts-ignore
    @field('DocumentId') DocumentId;
    static getSchema() {
        return tableSchema({
            name: DocumentFavorite.table,
            columns: [
                {name: 'PrimaryKey', type: 'string'},
                {name: 'ResourceTitle', type: 'string'},
                {name: 'ResourceUrl', type: 'string'},
                {name: 'ResourceId', type: 'string'},
                {name: 'FolderId', type: 'string'},
                {name: 'CreatedBy', type: 'string'},
                {name: 'Modified', type: 'string'},
                {name: 'Created', type: 'string'},
                {name: 'FolderTitle', type: 'string'},
                {name: 'Thumbnail', type: 'string'},
                {name: 'DocumentId', type: 'number'},
            ],
        });
    }
    // @ts-ignore
    static async getAll(FolderId,limit, offset) {
        // @ts-ignore
        const table = database.get<DocumentFavorite>(DocumentFavorite.table);
        const data: DocumentFavorite[] = await table.query(
            Q.where('FolderId',FolderId),
            Q.skip(offset), // Apply the offset
            Q.take(limit) // Apply the limit
        ).unsafeFetchRaw();
        return data;
    }
    static async deleteAll()
    {
        // @ts-ignore
        const table = database.get<DocumentFavorite>(DocumentFavorite.table);
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
        const table = database.get<DocumentFavorite>(DocumentFavorite.table);
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
                        form.ResourceTitle = model.ResourceTitle;
                        form.ResourceUrl = model.ResourceUrl;
                        form.DocumentId = model.DocumentId;
                        form.ResourceId = model.ResourceId;
                        form.FolderId = model.FolderId;
                        form.CreatedBy = model.CreatedBy;
                        form.Modified = model.Modified;
                        form.Created = model.Created;
                        form.FolderTitle = model.FolderTitle;
                        form.Thumbnail = model.Thumbnail;
                        form.DocumentId = model.DocumentId;
                    });
                    if (__DEV__)
                        console.log('Update DocumentFavorite:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert DocumentFavorite:', model);
                    // @ts-ignore
                    table.create(form => {
                        form.PrimaryKey = model.ID;
                        form.ResourceTitle = model.ResourceTitle;
                        form.ResourceUrl = model.ResourceUrl;
                        form.DocumentId = model.DocumentId;
                        form.ResourceId = model.ResourceId;
                        form.FolderId = model.FolderId;
                        form.CreatedBy = model.CreatedBy;
                        form.Modified = model.Modified;
                        form.Created = model.Created;
                        form.FolderTitle = model.FolderTitle;
                        form.Thumbnail = model.Thumbnail;
                        form.DocumentId = model.DocumentId;
                    });
                }
            }
        });
    }
}
