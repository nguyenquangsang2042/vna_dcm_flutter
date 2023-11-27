import {Model, Q, tableSchema} from "@nozbe/watermelondb";
import {field} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";

export class StandardDoc extends Model{
    static table = 'standard_doc';
    // @ts-ignore
    @field('PrimaryKey') PrimaryKey;
    // @ts-ignore
    @field('Title') Title;
    // @ts-ignore
    @field('TitleEN') TitleEN;
    // @ts-ignore
    @field('Rank') Rank;
    /*// @ts-ignore
    @field('ParentId') ParentId;
    // @ts-ignore
    @field('DefineTypeId') DefineTypeId;
    // @ts-ignore
    @field('Status') Status;
    // @ts-ignore
    @field('CharCode') CharCode;
    // @ts-ignore
    @field('Url') Url;
    // @ts-ignore
    @field('Modified') Modified;
    // @ts-ignore
    @field('Created') Created;*/

    static getSchema() {
        return tableSchema({
            name: StandardDoc.table,
            columns: [
                {name: 'PrimaryKey', type: 'number'},
                {name: 'Title', type: 'string'},
                {name: 'TitleEN', type: 'string'},
                {name: 'Rank', type: 'number'},
            ],
        });
    }
    // @ts-ignore
    static async getAll() {
        // @ts-ignore
        const table = database.get<StandardDoc>(StandardDoc.table);
        let data: StandardDoc[] = await table.query(
        ).unsafeFetchRaw();
        if(data!=null&&data.length>0)
        {
            data=data.sort((a,b)=> a.Rank - b.Rank);
        }
        return data;
    }
    static async insertOrUpdateAll(models: any[]): Promise<void> {
        // @ts-ignore
        const table = database.get<StandardDoc>(StandardDoc.table);
        await database.write(async () => {
            for (const model of models) {
                const data = await table
                    .query(
                        Q.where('PrimaryKey', model.ID)
                    ).fetch();
                if (data?.length > 0) {
                    // @ts-ignore
                    await data[0].update(form => {
                        form.PrimaryKey = model.ID;
                        form.Title = model.Title;
                        form.TitleEN = model.TitleEN;
                        form.Rank = model.Rank;
                    });
                    if (__DEV__)
                        console.log('Update StandardDoc:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert StandardDoc:', model);
                    // @ts-ignore
                    await table.create(form => {
                        form.PrimaryKey = model.ID;
                        form.Title = model.Title;
                        form.TitleEN = model.TitleEN;
                        form.Rank = model.Rank;
                    });
                }
            }
        });
    }
}
