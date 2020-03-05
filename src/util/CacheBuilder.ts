export default class CacheBuilder<K,V>{
    private writeTtl:number=Number.MIN_SAFE_INTEGER;
    private map: Map<K, { "val": V, "ttl": number,"writeTime":number } > =new Map();
    private callbackfn: (key: K) =>Promise< V>;
    /**
     * name
     */
    // public expireAfterWrite(ttl: number): CacheBuilder<K, V>{
    //     this.writeTtl=ttl;
    //     return this;
    // }

    public expireAfterWrite(ttl: number, callbackfn: (key: K) => Promise<V>): CacheBuilder<K, V> {
        this.writeTtl = ttl;
        this.build(callbackfn);
        return this;
    }

    /**
     * name
     */
    public build(callbackfn: (key: K) => Promise<V>): CacheBuilder<K, V> {
        this.callbackfn=callbackfn;
        return this;
    }
    public async get( key:K):Promise<V>{
        let entry:any= this.map.get(key)
        if (entry!=null){
            if (entry["writeTime"] + entry["ttl"]>new Date().getTime()){
                return new Promise<V>((re, rj) => {
                    let val: V = entry["val"];
                    re(val);
                })
            }
        }
        if(this.callbackfn){
          let  val= await this.callbackfn(key)
          if(val!=null){
              this.map.set(key, { "val": val, "ttl": this.writeTtl,"writeTime":new Date().getTime()})
              return val;
          }
        }
        return new Promise<V>((re, rj) => {
            rj(new Error(""+key+"查询出来的值为null"))
        })
    }
}