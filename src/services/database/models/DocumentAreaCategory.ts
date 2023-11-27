import {Model, Q, tableSchema} from "@nozbe/watermelondb";
import {field} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";

export class DocumentAreaCategory extends Model {
    static table = 'document_area_category';
    // @ts-ignore
    @field('PrimaryKey') PrimaryKey;
    // @ts-ignore
    @field('Title') Title;
    // @ts-ignore
    @field('TitleEN') TitleEN;
    // @ts-ignore
    @field('Url') Url;
    // @ts-ignore
    @field('ParentId') ParentId;
    // @ts-ignore
    @field('Rank') Rank;
    // @ts-ignore
    @field('Description') Description;
    // @ts-ignore
    @field('Image') Image
    // @ts-ignore
    @field('Created') Created;
    // @ts-ignore
    @field('Modified') Modified;

    static getSchema() {
        return tableSchema({
            name: DocumentAreaCategory.table,
            columns: [
                {name: 'PrimaryKey', type: 'number'},
                {name: 'Title', type: 'string'},
                {name: 'TitleEN', type: 'string'},
                {name: 'Url', type: 'string'},
                {name: 'ParentId', type: 'number'},
                {name: 'Rank', type: 'number'},
                {name: 'Description', type: 'string'},
                {name: 'Image', type: 'string'},
                {name: 'Created', type: 'string'},
                {name: 'Modified', type: 'string'},
            ],
        });
    }
    static async deleteAll()
    {
        // @ts-ignore
        const table = database.get<DocumentAreaCategory>(DocumentAreaCategory.table);
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
    static async getParentCategories() {
        // @ts-ignore
        return await database.get<DocumentAreaCategory>(DocumentAreaCategory.table).query(Q.where("ParentId", 0)).unsafeFetchRaw();
    }

    static async getChildByParentId(id: number) {
        // @ts-ignore
        return await database.get<DocumentAreaCategory>(DocumentAreaCategory.table).query(Q.where("ParentId", id)).unsafeFetchRaw();
    }

    static async insertOrUpdateAll(models: any[]): Promise<void> {
        // @ts-ignore
        const table = database.get<DocumentAreaCategory>(DocumentAreaCategory.table);
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
                        form.Url = model.Url;
                        form.ParentId = model.ParentId;
                        form.Rank = model.Rank;
                        form.Description = model.Description;
                        form.Image = model.Image;
                        form.Created = model.Created;
                        form.Modified = model.Modified;

                    });
                    if (__DEV__)
                        console.log('Update DocumentAreaCategory:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert DocumentAreaCategory:', model);
                    // @ts-ignore
                    table.create(field => {
                        field.PrimaryKey = model.ID;
                        field.Title = model.Title;
                        field.TitleEN = model.TitleEN;
                        field.Url = model.Url;
                        field.ParentId = model.ParentId;
                        field.Rank = model.Rank;
                        field.Description = model.Description;
                        field.Image = model.Image;
                        field.Created = model.Created;
                        field.Modified = model.Modified;
                    });
                }
            }
        });
    }
}
