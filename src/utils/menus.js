import {getRequest} from "./api";

//添加两个参数，1.因为要把数据加入到 router中，2.要往sotre保存一份
export const initMenu=(router,store)=>{
    if (store.state.routes.length>0){
        return;
    }
    getRequest("/system/config/menu").then(data=>{
        if(data){
            let fmtRoutes = formatRoutes(data);
            //给router初始化数据
            router.addRoutes(fmtRoutes);
            console.log(router);
            // 给store.state.routes初始化数据,
            // 第一个参数mutations下的方法名
            // 第二个参数上面定义的值
            store.commit('initRoutes',fmtRoutes);
        }
    })
}

export const formatRoutes=(routes)=>{
    let fmRoutes = [];  //最终返回的
    //循环遍历routes: let router = routes[0]....
    routes.forEach(router=>{
        //批量定义 let path = router.path  || let path = routes[0].path
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        //因为返回值中，有些children = null，避开这种
        if(children && children instanceof Array) {
            //递归调用,也就是不空的children中也有上面批量定义的数据，再定义一次
            children = formatRoutes(children);
        }
        let fmRouter = {
            path : path,
            name : name,
            iconCls : iconCls,
            meta : meta,
            children : children,   //这里因为上面children已经格式化了，直接赋值就行
            // resolve => require(['../pages/home.vue'], resolve)这种写法是异步模块获取，
            // 打包的时候每次访问这个路由的时候会单调单个文件，按需加载。还有种写法就是用import，
            // 这种是把component打包到一个文件里面，初次就读取全部
            // vuex5写法 require这段相当于把打包好的component 导入到router.js中
            component(resolve){
                if (component.startsWith("Home")){
                    require(['../views/' + component + '.vue'],resolve);
                } else if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'],resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'],resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'],resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'],resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'],resolve);
                }

            }
        }
        fmRoutes.push(fmRouter);
    })


    return fmRoutes;
}