import {Model, Q, tableSchema} from "@nozbe/watermelondb";
import {field} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";
import {isNullOrEmpty} from "../../../utils/function";

export class Comment extends Model {
    static table = 'comment';
    // @ts-ignore
    @field('PrimaryKey') PrimaryKey;
    // @ts-ignore
    @field('Title') Title;
    // @ts-ignore
    @field('StorageCode') StorageCode;
    // @ts-ignore
    @field('Version') Version;
    // @ts-ignore
    @field('Content') Content;
    // @ts-ignore
    @field('Created') Created;
    // @ts-ignore
    @field('IsApproved') IsApproved;
    // @ts-ignore
    @field('ResourceUrl') ResourceUrl;
    // @ts-ignore
    @field('Status') Status;

    static getSchema() {
        return tableSchema({
            name: Comment.table,
            columns: [
                {name: 'PrimaryKey', type: 'string'},
                {name: 'Title', type: 'string'},
                {name: 'StorageCode', type: 'string'},
                {name: 'Version', type: 'number'},
                {name: 'Content', type: 'string'},
                {name: 'Created', type: 'string'},
                {name: 'IsApproved', type: 'number'},
                {name: 'ResourceUrl', type: 'string'},
                {name: 'Status', type: 'number'},

            ],
        });
    }

    // @ts-ignore
    static async getAll(limit, offset) {
        // @ts-ignore
        const table = database.get<Comment>(Comment.table);
        const data: Comment[] = await table.query(
            Q.skip(offset), // Apply the offset
            Q.take(limit) // Apply the limit
        ).unsafeFetchRaw();
        return data;
    }

    static async deleteAll() {
        // @ts-ignore
        const table = database.get<Comment>(Comment.table);
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
        const table = database.get<Comment>(Comment.table);
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
                        form.StorageCode = model.StorageCode;
                        form.Version = model.Version;
                        form.Content = model.Content;
                        form.Created = model.Created;
                        form.IsApproved = model.IsApproved;
                        form.ResourceUrl = model.ResourceUrl;
                        form.Status = model.Status;
                    });
                    if (__DEV__)
                        console.log('Update Comment:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert Comment:', model);
                    // @ts-ignore
                    table.create(field => {
                        field.PrimaryKey = model.ID;
                        field.Title = model.Title;
                        field.StorageCode = model.StorageCode;
                        field.Version = model.Version;
                        field.Content = model.Content;
                        field.Created = model.Created;
                        field.IsApproved = model.IsApproved;
                        field.ResourceUrl = model.ResourceUrl;
                        field.Status = model.Status;
                    });
                }
            }
        });
    }

}
