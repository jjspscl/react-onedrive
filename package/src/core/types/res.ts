
export interface ISharePointItem {
    id: string;
    parentReference: {
        driveId: string;
        sharepointIds: {
            listId: string;
            webId: string;
            siteId: string;
        }
    };
    sharepointIds: {
        listItemUniqueId: string;
        listItemId: string;
        listId: string;
        webId: string;
        siteId: string;
    };
    "@sharePoint.embedUrl": string;
    "@sharePoint.endpoint": string;
}