import { RequestItem } from "./RequestItem";
import { SyncEvent } from "ts-events";
import { CollectionsLinkedListHelper } from "./CollectionsLinkedListHelper"
import * as Collections from 'typescript-collections';

export class RecentBlockMainDomain {

    private constructor(recentList?: Collections.LinkedList<RequestItem>) {
        this.recentList = recentList != null ? recentList : new Collections.LinkedList<RequestItem>();
    }

    private onChanged: (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => void
        = (changes, areaName) => {
        for (const key in changes) {
            if (key !== RecentBlockMainDomain.recentListStorageKey) {
                continue;
            }
            chrome.storage.local.get([RecentBlockMainDomain.recentListStorageKey], result => {
                if (!this.autoReloadAtferChanged) {
                    return;
                }
                const recentListStr: string = result[RecentBlockMainDomain.recentListStorageKey];
                if (recentListStr == null || recentListStr.length === 0) {
                    this.recentList = new Collections.LinkedList<RequestItem>();
                }
                else {
                    this.recentList = CollectionsLinkedListHelper.deserializer(recentListStr);
                }
            });
        }
    };

    private _recentList: Collections.LinkedList<RequestItem> = new Collections.LinkedList<RequestItem>();
    private get recentList(): Collections.LinkedList<RequestItem> {
        return this._recentList;
    }
    private set recentList(value: Collections.LinkedList<RequestItem>) {
        let dataChange = false;
        if (this.recentList == null) {
            if (value != null) {
                dataChange = true;
            }
        }
        else if (value == null) {
            dataChange = true;
        }
        else if (this.recentList.toString() !== value.toString()) {
            dataChange = true;
        }
        if (dataChange) {
            this._recentList = value;
            this.dataChanged.post(this._recentList);
        }
    }

    public readonly dataChanged = new SyncEvent<Collections.LinkedList<RequestItem>>();

    private static readonly recentListStorageKey = "recentList";

    public static async load(): Promise<RecentBlockMainDomain> {
        return new Promise<RecentBlockMainDomain>((resolve, reject) => {
            chrome.storage.local.get([RecentBlockMainDomain.recentListStorageKey], result => {
                const recentListStr: string = result[RecentBlockMainDomain.recentListStorageKey];
                let recentBlockMainDomain: RecentBlockMainDomain;
                if (recentListStr == null || recentListStr.length === 0) {
                    recentBlockMainDomain = new RecentBlockMainDomain();
                }
                else {
                    recentBlockMainDomain = new RecentBlockMainDomain(CollectionsLinkedListHelper.deserializer(recentListStr));
                }
                resolve(recentBlockMainDomain);
            });
        });
    }

    public static async loadWithAutoReload(): Promise<RecentBlockMainDomain> {
        return new Promise<RecentBlockMainDomain>((resolve, reject) => {
            chrome.storage.local.get([RecentBlockMainDomain.recentListStorageKey], result => {
                const recentListStr: string = result[RecentBlockMainDomain.recentListStorageKey];
                let recentBlockMainDomain: RecentBlockMainDomain;
                if (recentListStr == null || recentListStr.length === 0) {
                    recentBlockMainDomain = new RecentBlockMainDomain();
                }
                else {
                    recentBlockMainDomain = new RecentBlockMainDomain(CollectionsLinkedListHelper.deserializer(recentListStr));
                }
                recentBlockMainDomain.autoReloadAtferChanged = true;
                resolve(recentBlockMainDomain);
            });
        });
    }

    private async save(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const str: string = CollectionsLinkedListHelper.serializer(this.recentList);
            chrome.storage.local.set({[RecentBlockMainDomain.recentListStorageKey]: str}, () => {
                resolve(true);
            });
        });
    }

    private _autoReloadAtferChanged: boolean = false;

    public get autoReloadAtferChanged(): boolean {
        return this._autoReloadAtferChanged;
    }

    public set autoReloadAtferChanged(value: boolean) {
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

    private _maxRecentNumber: number = 10;

    public get maxRecentNumber(): number {
        return this._maxRecentNumber;
    }

    public set maxRecentNumber(num: number) {
        if (num < 0) {
            throw "num must more then zero";
        }
        if (this.maxRecentNumber === num) {
            return;
        }
        this._maxRecentNumber = num;
        this.save();
    }

    public add(item: RequestItem): boolean {
        if (item == null) {
            throw "argument must not be null";
        }
        if (this.maxRecentNumber === 0) {
            return false;
        }
        const last: RequestItem | undefined = this.recentList.last();
        if (last != null && last.toString() === item.toString()) {
            return true;
        }
        if (this.recentList.add(item) === false) {
            return false;
        }
        if (this.recentList.size() > this.maxRecentNumber) {
            this.recentList.removeElementAtIndex(0);
        }
        this.save();
        return true;
    }

}
