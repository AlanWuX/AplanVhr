<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">微人事</div>
                <el-dropdown class="userInfo" @command="commandHandler">
                    <span class="el-dropdown-link">
                        {{user.name}}
                        <i><img :src="user.userface" alt=""></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">个人设置</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </el-header>

            <el-container>
                <el-aside width="200px">

                    <el-menu router unique-opened>   <!-- unique-opened:每次只能打开一个 -->
                                                    <!-- 这里得routes就是下面computed计算函数中获得得routes  -->
                        <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i style="color: #1c8fff;margin-right: 5px;" :class="item.iconCls"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item v-for="(child,indexj) in item.children" :index="child.path" :key="indexj">
                                <i style="color: #1c8fff;margin-right: 5px;" :class="child.iconCls"></i>{{child.name}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div v-if="this.$router.currentRoute.path=='/home'" class="homeWellcome">
                        欢迎来到微人事
                    </div>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                // JSON.parse把JSON字符串转换成对象
                user:JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        computed: {
            routes(){
                //因为再menus.js中 store.commit('initRoutes',fmtRoutes); 给store赋值了，所以里面包含了返回得所有数据
                return this.$store.state.routes;
            }
        },
        methods: {
            commandHandler(cmd){
                if(cmd=='logout'){
                    this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        window.sessionStorage.removeItem("user");
                        this.$store.commit('initRoutes',[]);  //这里把保存再store中得数据清空，不然另外一个账户登录会有数据显示
                        this.$router.replace("/")
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '此操作已经取消'
                        });
                    });
                }
            }
        }
    }
</script>

<style>
    .homeWellcome{
        text-align: center;
        font-size: 30px;
        font-family: 华文楷体;
        color: #409eff;
        padding-top: 50px;
    }
    .homeHeader{
        background-color: #409eff;
        display: flex;          /*是一种布局方式 */
        align-items: center;    /*垂直居中*/
        justify-content: space-between;    /*元素优先往左右两边放*/
        padding: 0px 15px;
        box-sizing: border-box;
    }
    .homeHeader .title {
        font-size: 30px;
        font-family: 华文楷体;
        color: #ffffff;
    }
    .homeHeader .userInfo{
        cursor: pointer;
    }
    .el-dropdown-link img{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }
    .el-dropdown-link{
        display: flex;
        align-items: center;
    }
</style>