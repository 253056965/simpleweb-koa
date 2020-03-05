import Koa = require('koa');
import { useControllers } from 'koa-controllers';
import * as  serve from 'koa-static'
import * as  path from 'path'
import "reflect-metadata";
import { createConnections } from "typeorm";

import * as cors from 'koa2-cors'
import { useKoaServer } from "routing-controllers";
// import * as  session from "koa-session"
const app = new Koa();
const port = 9897;
    // create koa app
    // app.use(async (ctx, next) => {
    //     ctx.set("Access-Control-Allow-Origin", "*")
    //     // ctx.set("Access-Control-Allow-Headers", "X-Requested-With")
    //     ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //     ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    //     const start = new Date()
    //     await next()

    // })
    const CONFIG = {
        key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 86400000,
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: true, /** (boolean) httpOnly or not (default true) */
        signed: true, /** (boolean) signed or not (default true) */
        rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
        renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    };
    // app.use(session(CONFIG, app));
    app.use(cors());
    app.use(serve(path.join(__dirname + "/public")));
    useKoaServer(app, {
        controllers: [__dirname + "/controllers/*.js"]
    })
    // useControllers(app, __dirname + '/controllers/*.js', {
    //     multipart: {
    //         dest: './uploads'
    //     }
    // });
    app.listen(port, () => {
        console.log(`Koa application is up and running on port ${port}`);
        console.log(`http://127.0.0.1:${port}`)
    });

