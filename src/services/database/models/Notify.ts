import {Model, Q, tableSchema} from "@nozbe/watermelondb";
import {field} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";

export class Notify extends Model{
    static table = 'notify';
    // @ts-ignore
    @field('PrimaryKey') PrimaryKey;
    // @ts-ignore
    @field('UserId') UserId;
    // @ts-ignore
    @field('Content') Content;
    // @ts-ignore
    @field('ContentEN') ContentEN;
    // @ts-ignore
    @field('Link') Link;
    // @ts-ignore
    @field('FlgRead') FlgRead;
    // @ts-ignore
    @field('flgConfirm') flgConfirm;
    // @ts-ignore
    @field('ResourceId') ResourceId;
    // @ts-ignore
    @field('Modified') Modified;
    // @ts-ignore
    @field('Created') Created;
    static getSchema() {
        return tableSchema({
            name: Notify.table,
            columns: [
                {name: 'PrimaryKey', type: 'string'},
                {name: 'UserId', type: 'string'},
                {name: 'Content', type: 'string'},
                {name: 'ContentEN', type: 'string'},
                {name: 'Link', type: 'string'},
                {name: 'FlgRead', type: 'boolean'},
                {name: 'flgConfirm', type: 'boolean'},
                {name: 'ResourceId', type: 'string'},
                {name: 'Modified', type: 'string'},
                {name: 'Created', type: 'string'},
            ],

        })
    }
    static async insertOrUpdateAll(models: any[]): Promise<void> {
        // @ts-ignore
        const table = database.get<Notify>(Notify.table);
        database.write(async () => {
            for (const model of models) {
                // @ts-ignore
                const data = await table
                    .query(
                        Q.where('PrimaryKey', model.ID)
                    ).fetch();
                if (data?.length > 0) {
                    // @ts-ignore
                    data[0].update(form => {
                        form.PrimaryKey = model.ID;
                        form.UserId = model.UserId;
                        form.Content = model.Content;
                        form.ContentEN = model.ContentEN;
                        form.Link = model.Link;
                        form.FlgRead = model.FlgRead;
                        form.flgConfirm = model.flgConfirm;
                        form.ResourceId = model.ResourceId;
                        form.Modified = model.Modified;
                        form.Created = model.Created;

                    });
                    if (__DEV__)
                        console.log('update Notify:', model);
                } else {
                    if (__DEV__)
                        console.log('insert Notify:', model);
                    // @ts-ignore
                    table.create(form => {
                        form.PrimaryKey = model.ID;
                        form.UserId = model.UserId;
                        form.Content = model.Content;
                        form.ContentEN = model.ContentEN;
                        form.Link = model.Link;
                        form.FlgRead = model.FlgRead;
                        form.flgConfirm = model.flgConfirm;
                        form.ResourceId = model.ResourceId;
                        form.Modified = model.Modified;
                        form.Created = model.Created;
                    })
                }
            }
        })
    }

    static async deleteAll()
    {
        // @ts-ignore
        const table = database.get<Notify>(Notify.table);
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
    static async getAll(isRead:boolean)
    {
        // @ts-ignore
        const table = database.get<Notify>(Notify.table);
        // @ts-ignore
        return await table.query(Q.where("FlgRead",true)).unsafeFetchRaw();
    }
}
