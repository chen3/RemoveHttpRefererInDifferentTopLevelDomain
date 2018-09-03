export class DomainHelper {

    public static getDomainByUrl(url: string): string {
        // if (url == undefined) {
        //     throw "Argument must not be null";
        // }
        const index = url.indexOf("://");
        if (index === -1) {
            throw "url isvaild";
        }
        const startIndex = index + "://".length;
        const slashIndex = url.indexOf("/", startIndex);
        const endIndex = slashIndex;
        if (endIndex === -1) {
            return url.substring(startIndex);
        }
        else {
            return url.substring(startIndex, endIndex);
        }
    }

    public static getMainDomainByDomain(domain: string): string {
        // if (domain == undefined || domain === "") {
        if (domain === "") {
            throw "Argument must not be null";
        }
        return domain.split('.').slice(-2).join('.');
    }

}