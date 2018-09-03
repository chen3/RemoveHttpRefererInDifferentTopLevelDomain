import { RecentBlockMainDomain } from "./RemoveReferer/RecentBlockMainDomain";
import { MainDomainWhiteList } from "./RemoveReferer/MainDomainWhiteList";
import { DomainHelper } from "./Domain/DomainHelper";
import { MainDomain } from "./Domain/MainDomain";
import { RequestItem } from "./RemoveReferer/RequestItem";

(async () => {
    const recentList: RecentBlockMainDomain = await RecentBlockMainDomain.load();
    const whiteList: MainDomainWhiteList = await MainDomainWhiteList.loadWithAutoReload();
    
    chrome.webRequest.onBeforeSendHeaders.addListener(details => {
            const requestDomain: string = DomainHelper.getDomainByUrl(details.url);
            const requestMainDomain: MainDomain = MainDomain.parse(DomainHelper.getMainDomainByDomain(requestDomain));

            const headers: chrome.webRequest.HttpHeader[] | undefined = details.requestHeaders;
            if (headers != null) {
                for (let i = 0; i < headers.length; ++i) {
                    if (headers[i].name.toLocaleLowerCase() !== "referer") {
                        continue;
                    }
                    const originUrl: string | undefined = headers[i].value;
                    if (originUrl == undefined) {
                        break;
                    }

                    const originDomain: string = DomainHelper.getDomainByUrl(originUrl);
                    const originMainDomain: MainDomain = MainDomain.parse(DomainHelper.getMainDomainByDomain(originDomain));
                    if (originMainDomain.toString() === requestMainDomain.toString()) {
                        break;
                    }
    
                    const item: RequestItem = new RequestItem(originMainDomain, requestMainDomain);
                    if (whiteList.contains(item)) {
                        break;
                    }
                    recentList.add(item);
                    headers.splice(i, 1);
                    break;
                }
            }
            return { requestHeaders: headers };
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]
    );
})();