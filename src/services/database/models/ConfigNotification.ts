import {Model, Q, tableSchema} from "@nozbe/watermelondb";
import {field} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";

export class ConfigNotification extends Model {
    static table = 'config_notification';
    // @ts-ignore
    @field('Title') Title;
    // @ts-ignore
    @field('TitleEN') TitleEN;
    // @ts-ignore
    @field('ActionCategoryId') ActionCategoryId;
    // @ts-ignore
    @field('IsConfig') IsConfig;
    // @ts-ignore
    @field('Rank') Rank;
    // @ts-ignore
    @field('EmailChecked') EmailChecked;
    // @ts-ignore
    @field('NotifyChecked') NotifyChecked;

    static getSchema() {
        return tableSchema({
            name: ConfigNotification.table,
            columns: [
                {name: 'Title', type: 'string'},
                {name: 'TitleEN', type: 'string'},
                {name: 'ActionCategoryId', type: 'number'},
                {name: 'IsConfig', type: 'number'},
                {name: 'Rank', type: 'number'},
                {name: 'EmailChecked', type: 'boolean'},
                {name: 'NotifyChecked', type: 'boolean'},
            ],
        });
    }

    // @ts-ignore
    static async getAll() {
        // @ts-ignore
        const table = database.get<ConfigNotification>(ConfigNotification.table);
        return await table.query().fetch();
    }
    static async deleteAll()
    {
        // @ts-ignore
        const table = database.get<ConfigNotification>(ConfigNotification.table);
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
        const table = database.get<ConfigNotification>(ConfigNotification.table);
        database.write(async () => {
            for (const model of models) {
                const data = await table
                    .query(
                        Q.where('Rank', model.Rank)
                    ).fetch();
                if (data?.length > 0) {
                    // @ts-ignore
                    data[0].update(form => {
                        form.Title = model.Title;
                        form.TitleEN = model.TitleEN;
                        form.ActionCategoryId = model.ActionCategoryId;
                        form.IsConfig = model.IsConfig;
                        form.Rank = model.Rank;
                        form.NotifyChecked = model.NotifyChecked;
                        form.EmailChecked = model.EmailChecked;
                    });
                    if (__DEV__)
                        console.log('Update ConfigNotification:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert ConfigNotification:', model);
                    // @ts-ignore
                    table.create(field => {
                        field.Title = model.Title;
                        field.TitleEN = model.TitleEN;
                        field.ActionCategoryId = model.ActionCategoryId;
                        field.IsConfig = model.IsConfig;
                        field.Rank = model.Rank;
                        field.NotifyChecked = model.NotifyChecked;
                        field.EmailChecked = model.EmailChecked;
                    });
                }
            }
        });
    }
}
