import {Model, Q, tableSchema} from '@nozbe/watermelondb'
import {date, field, lazy, writer} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";

export default class StandardDocDashBoard extends Model {
    static table = 'standard_doc_dashboard';
    // @ts-ignore
    @field('documentID', {defaultValue: 0}) documentID: number;
    // @ts-ignore
    @field('modified', {defaultValue: ''}) modified: string;

    static getSchema() {
        return tableSchema({
            name: StandardDocDashBoard.table,
            columns: [
                {name: 'documentID', type: 'number'},
                {name: 'modified', type: 'string'},
            ],

        })
    }
    static async getItemByID(documentID: any) {
        // @ts-ignore
        const table = database.get<StandardDocDashBoard>(StandardDocDashBoard.table);
        const items = await table.query(Q.where('documentID', documentID)).unsafeFetchRaw();
        if (items.length > 0) {
            return items[0];
        } else {
            return null;
        }
    }
    static async deleteAll()
    {
        // @ts-ignore
        const table = database.get<StandardDocDashBoard>(StandardDocDashBoard.table);
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
        console.log('StandardDocDashBoard',models);
        // @ts-ignore
        const table = database.get<StandardDocDashBoard>(StandardDocDashBoard.table);
        database.write(async () => {
            for (const model of models) {
                // @ts-ignore
                const data = await table
                    .query(
                        Q.where('documentID', model.documentID)
                    ).fetch();
                if (data?.length > 0) {
                    // @ts-ignore
                    data[0].update(form => {
                        form.documentID = model.documentID;
                        form.modified = model.modified;
                    });
                    if (__DEV__)
                        console.log('update StandardDocDashBoard:', model);
                } else {
                    if (__DEV__)
                        console.log('insert StandardDocDashBoard:', model);
                    // @ts-ignore
                    table.create(field => {
                        field.documentID = model.documentID;
                        field.modified = model.modified;
                    })
                }
            }
        })
    }

}

