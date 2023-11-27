import {Model, Q, tableSchema} from "@nozbe/watermelondb";
import {field} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";

export class SubSite extends Model{
    static table = 'sub_site';
    // @ts-ignore
    @field('PrimaryKey') PrimaryKey;
    // @ts-ignore
    @field('SubSite') SubSite;
    // @ts-ignore
    @field('Title') Title;
    // @ts-ignore
    @field('TitleEN') TitleEN;
    // @ts-ignore
    @field('Acronyms') Acronyms;
    // @ts-ignore
    @field('Rank') Rank;
    static getSchema() {
        return tableSchema({
            name: SubSite.table,
            columns: [
                {name: 'PrimaryKey', type: 'number'},
                {name: 'SubSite', type: 'string'},
                {name: 'Title', type: 'string'},
                {name: 'TitleEN', type: 'string'},
                {name: 'Acronyms', type: 'string'},
                {name: 'Rank', type: 'number'},
            ],
        });
    }
    // @ts-ignore
    static async getBySubSite(subSite:string) {
        // @ts-ignore
        const table = database.get<Comment>(SubSite.table);
        let data: SubSite[] = await table.query(
            Q.where('SubSite',subSite)
        ).unsafeFetchRaw();
        return data;
    }
    // @ts-ignore
    static async getAll() {
        // @ts-ignore
        const table = database.get<SubSite>(SubSite.table);
        let data: SubSite[] = await table.query(
        ).unsafeFetchRaw();
        if(data!=null&&data.length>0)
        {
            data=data.sort((a,b)=> a.Rank - b.Rank);
        }
        return data;
    }
    static async insertOrUpdateAll(models: any[]): Promise<void> {
        // @ts-ignore
        const table = database.get<SubSite>(SubSite.table);
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
                        form.SubSite = model.SubSite;
                        form.Title = model.Title;
                        form.TitleEN = model.TitleEN;
                        form.Acronyms = model.Acronyms;
                        form.Rank = model.Rank;
                    });
                    if (__DEV__)
                        console.log('Update SubSite:', model);
                } else {
                    if (__DEV__)
                        console.log('Insert SubSite:', model);
                    // @ts-ignore
                    table.create(form => {
                        form.PrimaryKey = model.ID;
                        form.SubSite = model.SubSite;
                        form.Title = model.Title;
                        form.TitleEN = model.TitleEN;
                        form.Acronyms = model.Acronyms;
                        form.Rank = model.Rank;
                    });
                }
            }
        });
    }
}
