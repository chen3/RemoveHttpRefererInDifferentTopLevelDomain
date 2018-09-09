import { RequestItem } from "./RequestItem";
import { SyncEvent } from "ts-events";
import { CollectionsSetHelper } from "./CollectionsSetHelper"
import * as Collections from 'typescript-collections';

export class MainDomainWhiteList {

    private _whiteListSet: Collections.Set<RequestItem> = new Collections.Set<RequestItem>();
    private get whiteListSet(): Collections.Set<RequestItem> {
        return this._whiteListSet;
    }
    private set whiteListSet(value: Collections.Set<RequestItem>) {
        let dataChange = false;
        if (this.whiteListSet == null) {
            if (value != null) {
                dataChange = true;
            }
        }
        else if (value == null) {
            dataChange = true;
        }
        else if (this.whiteListSet.toString() !== value.toString()) {
            dataChange = true;
        }
        if (dataChange) {
            this._whiteListSet = value;
            this.dataChanged.post(this._whiteListSet);
        }
    }

    private constructor(whiteListSet?: Collections.Set<RequestItem>) {
        this.whiteListSet = whiteListSet != null ? whiteListSet : new Collections.Set<RequestItem>();
    }

    public readonly dataChanged = new SyncEvent<Collections.Set<RequestItem>>();

    private onChanged: (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => void
        = (changes, areaName) => {
        for (const key in changes) {
            if (key !== MainDomainWhiteList.whiteListSetStorageKey) {
                continue;
            }
            chrome.storage.local.get([MainDomainWhiteList.whiteListSetStorageKey], result => {
                if (!this.autoReloadAtferChanged) {
                    return;
                }
                const whiteListSetStr: string = result[MainDomainWhiteList.whiteListSetStorageKey];
                if (whiteListSetStr == null || whiteListSetStr.length === 0) {
                    this.whiteListSet = new Collections.Set<RequestItem>();
                }
                else {
                    this.whiteListSet = CollectionsSetHelper.deserializer(whiteListSetStr);
                }
            });
        }
    };

    private static readonly whiteListSetStorageKey = "WhiteList";

    public static async loadWithAutoReload(): Promise<MainDomainWhiteList> {
        return new Promise<MainDomainWhiteList>((resolve, reject) => {
            chrome.storage.local.get([MainDomainWhiteList.whiteListSetStorageKey], result => {
                const whiteListSetStr: string = result[MainDomainWhiteList.whiteListSetStorageKey];
                let mainDomainWhiteList: MainDomainWhiteList;
                if (whiteListSetStr == null || whiteListSetStr.length === 0) {
                    mainDomainWhiteList = new MainDomainWhiteList();
                }
                else {
                    mainDomainWhiteList = new MainDomainWhiteList(CollectionsSetHelper.deserializer(whiteListSetStr));
                }
                mainDomainWhiteList.setAutoReloadAtferChanged(true);
                resolve(mainDomainWhiteList);
            });
        });
    }

    private async save(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const str: string = CollectionsSetHelper.serializer(this.whiteListSet);
            chrome.storage.local.set({[MainDomainWhiteList.whiteListSetStorageKey]: str}, () => {
                resolve(true);
            });
        });
    }

    private _autoReloadAtferChanged: boolean = false;

    public get autoReloadAtferChanged(): boolean {
        return this._autoReloadAtferChanged;
    }

    private setAutoReloadAtferChanged(value: boolean) {
        if (value == undefined) {
            throw "argument must not be null";
        }
        if (this.autoReloadAtferChanged === value) {
            return;
        }
        this._autoReloadAtferChanged = value;
        if (value) {
            chrome.storage.onChanged.addListener(this.onChanged);
        }
        else {
            chrome.storage.onChanged.removeListener(this.onChanged);
        }
    }

    public add(item: RequestItem): boolean {
        if (item == null) {
            throw "argument must not be null";
        }
        if (this.whiteListSet.add(item) === false) {
            return false;
        }
        this.save();
        this.dataChanged.post(this.whiteListSet);
        return true;
    }

    public contains(item: RequestItem): boolean {
        if (item == null) {
            throw "Argument must not be null";
        }
        return this.whiteListSet.contains(item);
    }

    public remove(item: RequestItem): boolean {
        if (item == null) {
            throw "Argument must not be null";
        }
        if (this.whiteListSet.remove(item)) {
            this.save();
            this.dataChanged.post(this.whiteListSet);
            return true;
        }
        else {
            return false;
        }
    }

}
