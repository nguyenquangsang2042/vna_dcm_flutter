import {Model, Q, tableSchema} from "@nozbe/watermelondb";
import {database} from "services/database/database";
import {field} from "@nozbe/watermelondb/decorators";

export class FavoriteFolder extends Model {
    static table = 'favorite_folder';
    // @ts-ignore
    @field('PrimaryKey') PrimaryKey;
    // @ts-ignore
    @field('Title') Title;
    // @ts-ignore
    @field('ParentId') ParentId;
    // @ts-ignore
    @field('Rank') Rank;
    // @ts-ignore
    @field('ResourceUrl') ResourceUrl;
    // @ts-ignore
    @field('CreatedBy') CreatedBy;
    // @ts-ignore
    @field('Modified') Modified;
    // @ts-ignore
    @field('Created') Created;

    static getSchema() {
        return tableSchema({
            name: FavoriteFolder.table,
            columns: [
                {name: 'PrimaryKey', type: 'string'},
                {name: 'Title', type: 'string'},
                {name: 'ParentId', type: 'string'},
                {name: 'Rank', type: 'number'},
                {name: 'ResourceUrl', type: 'string'},
                {name: 'CreatedBy', type: 'string'},
                {name: 'Modified', type: 'string'},
                {name: 'Created', type: 'string'},
            ],
        });
    }
    static async deleteAll()
    {
        // @ts-ignore
        const table = database.get<FavoriteFolder>(FavoriteFolder.table);
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
    static async getParentFavorites() {
        // @ts-ignore
        return await database.get<FavoriteFolder>(FavoriteFolder.table).query(Q.where('ParentId',"")).unsafeFetchRaw();
    }

    static async getChildByParentId(id: number) {
        // @ts-ignore
        return await database.get<FavoriteFolder>(FavoriteFolder.table).query(Q.where("ParentId", id)).unsafeFetchRaw();
    }
    static async insertOrUpdateAll(models: any[]): Promise<void> {
        // @ts-ignore
        const table = database.get<FavoriteFolder>(FavoriteFolder.table);
        await database.write(async () => {
            for (const model of models) {
                console.log("FavoriteFolder",model.ID)

                const data = await table
                    .query(
                        Q.where('PrimaryKey', model.ID)
                    ).fetch();
                if (data?.length > 0) {
                    // @ts-ignore
                    data[0].update(form => {
                        form.PrimaryKey = model.ID;
                        form.Title = model.Title;
                        form.ParentId = model.ParentId;
                        form.Rank = model.Rank;
                        form.ResourceUrl = model.ResourceUrl;
                        form.CreatedBy = model.CreatedBy;
                        form.Modified = model.Modified;
                        form.Created = model.Created;
                    });
                    if (__DEV__)
                        console.log('Update DocumentAreaCategory:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert DocumentAreaCategory:', model);
                    // @ts-ignore
                    table.create(form => {
                        form.PrimaryKey = model.ID;
                        form.Title = model.Title;
                        form.ParentId = model.ParentId;
                        form.Rank = model.Rank;
                        form.ResourceUrl = model.ResourceUrl;
                        form.CreatedBy = model.CreatedBy;
                        form.Modified = model.Modified;
                        form.Created = model.Created;
                    });
                }
            }
        });
    }
}
