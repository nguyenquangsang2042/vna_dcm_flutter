import {Model, Q, tableSchema} from "@nozbe/watermelondb";
import {field} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";
import {isNullOrEmpty} from "../../../utils/function";

export class SearchHistory extends Model {
    static table = 'search_history';
    // @ts-ignore
    @field('Title') Title;
    // @ts-ignore
    @field('Modified') Modified;
    static getSchema() {
        return tableSchema({
            name: SearchHistory.table,
            columns: [
                {name: 'Title', type: 'string'},
                {name: 'Modified', type: 'string'},
            ],

        })
    }
    // @ts-ignore
    static async getAll()
    {
        // @ts-ignore
        const table = database.get<SearchHistory>(SearchHistory.table);
        // @ts-ignore
        const data= await table.query().unsafeFetchRaw();
        return data.filter((r:any)=>!isNullOrEmpty(r.Title))
    }
    static async deleteItemByTitle(Title:string){
        // @ts-ignore
        const table = database.get<SearchHistory>(SearchHistory.table);
        const tasksToDelete = await table.query(Q.where('Title', Title)).fetch();
        await database.write(async () => {
            if (tasksToDelete.length > 0) {
                await tasksToDelete[0].markAsDeleted() // syncable
                await tasksToDelete[0].destroyPermanently() // permanent
            }
        })
    }
    static async deleteAll()
    {
        // @ts-ignore
        const table = database.get<SearchHistory>(SearchHistory.table);
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
        const table = database.get<SearchHistory>(SearchHistory.table);
        database.write(async () => {
            for (const model of models) {
                // @ts-ignore
                const data = await table
                    .query(
                        Q.where('Title', model.Title)
                    ).fetch();
                if (data?.length > 0) {
                    // @ts-ignore
                    data[0].update(form => {
                        form.Title = model.Title;
                        form.Modified = model.Modified;
                    });
                    if (__DEV__)
                        console.log('update SearchHistory:', model);
                } else {
                    if (__DEV__)
                        console.log('insert SearchHistory:', model);
                    // @ts-ignore
                    table.create(form => {
                        form.Title = model.Title;
                        form.Modified = model.Modified;
                    })
                }
            }
        })
    }
}
