export default class Properties {
    private valueMap: Map<string, string> = new Map()
    public constructor(str: string) {
        this.init(str);
    }

    public init(str: string): Properties {
        let self = this;
        let strs: Array<string> = str.split("\r\n")
        strs.forEach(v => {
            let index = v.indexOf('#');
            if (index != 0) {
                let strIdx = v.indexOf('='),
                    key = v.substr(0, strIdx),
                    value = v.substr(strIdx + 1);
                // 将拆分key、value数据存储到node的全局变量global下的local属性
                self.valueMap.set(key, value)
            }
        })
        return this;
    }
    public getProperty(key: string): string | undefined {
        return this.getString(key);
    }
    public getString(key: string): string | undefined {
        return this.valueMap.get(key);
    }
    public getStringForDefault(key: string, def: string): string  {
        let v = this.getString(key);
        if (v) {
            return v;
        }
        return def;
    }
}