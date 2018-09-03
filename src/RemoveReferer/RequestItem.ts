import { MainDomain } from "../Domain/MainDomain";

import * as Collections from 'typescript-collections';

export class RequestItem {
    
    public constructor(originMainDomain: MainDomain , requestMainDomain: MainDomain) {
        if (originMainDomain == null || requestMainDomain == null) {
            throw "Argument must not be null";
        }
        this._originMainDomain = originMainDomain;
        this._requestMainDomain = requestMainDomain;
    }

    private _originMainDomain: MainDomain;
    public get originMainDomain(): MainDomain {
        return this._originMainDomain;
    }

    public _requestMainDomain: MainDomain;
    public get requestMainDomain(): MainDomain {
        return this._requestMainDomain;
    }

    public toString(): string {
        return Collections.util.makeString(this);
    }

}