import * as Koa from 'koa';
// import { Controller, Get, Ctx, } from 'koa-controllers'
import { JsonController, Param, Body, Get, Post, Put, Delete, BodyParam} from "routing-controllers";


@JsonController()
export default class MainController {
    @Get('/')
    public async index() {
       return  'Hellodddddd';
    }
    @Get('/user')
    public async user() {
        return {"name":'用户中心'}
    }

    @Post('/1')
    public async test(@Body() userName: any) {
        console.log(userName);
        //obj["name"]=usern;
        return userName; 
    }
}