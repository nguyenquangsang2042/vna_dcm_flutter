import {Model, Q, tableSchema} from '@nozbe/watermelondb'
import {date, field, lazy, writer} from "@nozbe/watermelondb/decorators";
import {database} from "services/database/database";
import {Document} from "services/database/models/Document";
import {isNullOrEmpty, removeVietnameseDiacritics} from "../../../utils/function";

export default class DocumentOffline extends Model {
    static table = 'document_offline';
    // @ts-ignore
    @field('documentID', {defaultValue: 0}) documentID: number;
    // @ts-ignore
    @field('modified', {defaultValue: ''}) modified: string;
    // @ts-ignore
    @field('path', {defaultValue: ''}) path: string;

    static getSchema() {
        return tableSchema({
            name: DocumentOffline.table,
            columns: [
                {name: 'documentID', type: 'number'},
                {name: 'path', type: 'string'},
                {name: 'modified', type: 'string'},
            ],

        })
    }

    static async getItemByID(documentID: any) {
        // @ts-ignore
        const table = database.get<DocumentOffline>(DocumentOffline.table);
        const items = await table.query(Q.where('documentID', documentID)).unsafeFetchRaw();
        if (items.length > 0) {
            return items[0];
        } else {
            return null;
        }
    }

    static async getAll(keySearch: string, type: number) {
        // @ts-ignore
        const documentCollection = await database.get<Document>(Document.table).query().unsafeFetchRaw();
        // @ts-ignore
        const documentRecentlyCollection = await database.get<DocumentOffline>(DocumentOffline.table).query().unsafeFetchRaw();

        const data = [];
        if (documentCollection.length > 0) {
            for (const item of documentRecentlyCollection) {
                let itemData;
                if (isNullOrEmpty(keySearch)) {
                    // @ts-ignore
                    itemData = documentCollection.find(doc => doc.DocumentId == item.documentID)
                } else {
                    switch (type)
                    {
                        case 0:
                        default:
                            // @ts-ignore
                            itemData=documentCollection.find(doc => doc.DocumentId == item.documentID && (removeVietnameseDiacritics(doc.Title.toLowerCase()).includes(removeVietnameseDiacritics(keySearch))||removeVietnameseDiacritics(doc.TitleEN.toLowerCase()).includes(removeVietnameseDiacritics(keySearch))));
                            break;
                        case 1:
                            // @ts-ignore
                            itemData=documentCollection.find(doc => doc.DocumentId == item.documentID && (removeVietnameseDiacritics(doc.Title.toLowerCase()).includes(removeVietnameseDiacritics(keySearch))));
                            break;
                        case 2:
                            // @ts-ignore
                            itemData=documentCollection.find(doc => doc.DocumentId == item.documentID && (removeVietnameseDiacritics(doc.TitleEN.toLowerCase()).includes(removeVietnameseDiacritics(keySearch))));
                            break;
                    }
                }
                if (itemData != undefined) {
                    itemData.modified = item.modified
                    data.push(itemData);
                }
            }
        }
        return data;
    }

    static async deleteByDocumentID(documentID: string | number | boolean | Readonly<{
        operator: Q.Operator;
        right: Q.ComparisonRight;
        type?: symbol | undefined;
    }> | null) {
        // @ts-ignore
        const table = database.get<DocumentOffline>(DocumentOffline.table);
        const tasksToDelete = await table.query(Q.where('documentID', documentID)).fetch();
        database.write(async () => {
            if (tasksToDelete.length > 0) {
                await tasksToDelete[0].markAsDeleted() // syncable
                await tasksToDelete[0].destroyPermanently() // permanent
            }
        })
    }
    static async deleteAll()
    {
        // @ts-ignore
        const table = database.get<DocumentOffline>(DocumentOffline.table);
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
        const table = database.get<DocumentOffline>(DocumentOffline.table);
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
                        form.path = model.path;
                    });
                    if (__DEV__)
                        console.log('update DocumentOffline:', model);
                } else {
                    if (__DEV__)
                        console.log('insert DocumentOffline:', model);
                    // @ts-ignore
                    table.create(field => {
                        field.documentID = model.documentID;
                        field.modified = model.modified;
                        field.path = model.path;
                    })
                }
            }
        })
    }

}

