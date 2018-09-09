import * as Collections from 'typescript-collections';
import { RequestItem } from "./RequestItem";
import { MainDomain } from '../Domain/MainDomain';

export class CollectionsSetHelper {

    public static serializer(set: Collections.Set<RequestItem>): string {
        const json: { originMainDomain: string, requestMainDomain: string }[] = [];
        set.forEach(element => {
            json.push({
                originMainDomain: element.originMainDomain.getMainDomain(),
                requestMainDomain: element.requestMainDomain.getMainDomain()
            });
        });
        return JSON.stringify(json);
    }

    public static deserializer(str: string): Collections.Set<RequestItem> {
        const json: { originMainDomain: string, requestMainDomain: string }[] = JSON.parse(str);
        const set = new Collections.Set<RequestItem>();
        json.forEach(element => {
            set.add(new RequestItem(MainDomain.parse(element.originMainDomain),
                                    MainDomain.parse(element.requestMainDomain)));
        });
        return set;
    }

}