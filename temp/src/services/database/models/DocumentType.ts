import {Model, Q, tableSchema} from "@nozbe/watermelondb";
import {field} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";

export class DocumentType extends Model {
    static table = 'document_type';
    // @ts-ignore
    @field('PrimaryKey') PrimaryKey;
    // @ts-ignore
    @field('Title') Title;
    // @ts-ignore
    @field('TitleEN') TitleEN;
    // @ts-ignore
    @field('LangId') LangId;
    // @ts-ignore
    @field('Url') Url;

    static getSchema() {
        return tableSchema({
            name: DocumentType.table,
            columns: [
                {name: 'PrimaryKey', type: 'number'},
                {name: 'Title', type: 'string'},
                {name: 'TitleEN', type: 'string'},
                {name: 'LangId', type: 'number'},
                {name: 'Url', type: 'string'},
            ],
        });
    }
    static async deleteAll()
    {
        // @ts-ignore
        const table = database.get<DocumentType>(DocumentType.table);
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
    static async getItem(id:number) {
        // @ts-ignore
        const table = database.get<DocumentType>(DocumentType.table);
        return await table.query(Q.where('PrimaryKey',id)).unsafeFetchRaw();
    }

    static async insertOrUpdateAll(models: any[]): Promise<void> {
        // @ts-ignore
        const table = database.get<DocumentType>(DocumentType.table);
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
                        form.TitleEN = model.TitleEN;
                        form.LangId = model.LangId;
                        form.Url = model.Url;
                    });
                    if (__DEV__)
                        console.log('Update DocumentType:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert DocumentType:', model);
                    // @ts-ignore
                    table.create(form => {
                        form.PrimaryKey = model.ID;
                        form.Title = model.Title;
                        form.TitleEN = model.TitleEN;
                        form.LangId = model.LangId;
                        form.Url = model.Url;
                    });
                }
            }
        });
    }
}
