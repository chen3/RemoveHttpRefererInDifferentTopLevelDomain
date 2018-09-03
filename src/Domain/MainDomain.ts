export class MainDomain {

    private constructor(mainDomain: string) {
        this.mainDomain = mainDomain;
    }

    private mainDomain: string;

    public static parse(mainDomain: string): MainDomain {
        if (!MainDomain.isValidDomain(mainDomain)) {
            throw "not is vaild domain";
        }
        if (mainDomain.split(".").length !== 2) {
            throw "not is vaild main domain";
        }
        return new MainDomain(mainDomain);
    }

    public getMainDomain() {
        return this.mainDomain;
    }

    private static isValidDomain(domain: string): boolean {
        // if (domain == undefined || domain === "") {
        if (domain === "") {
            return false;
        }
        if (domain.indexOf(".") === -1) {
            return false;
        }
        const strArray = domain.split(".");
        for (let index = 0; index < strArray.length; index++) {
            const str = strArray[index];
            if (str.trim() !== str || str.startsWith("-") || str.endsWith("-")) {
                return false;
            }
            if (str.length < 2 && index === strArray.length - 1) {
                return false;
            }
        }
        return true;
    }

    public toString(): string {
        return this.getMainDomain();
    }
    
}