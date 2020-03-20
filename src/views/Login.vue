<template>
    <div>
        <!--表单验证-->
        <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <!--aut-complete表示自动补全-->
                <el-input type="text" v-model="loginForm.username"
                          auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <!--aut-complete表示自动补全-->
                <el-input type="password" v-model="loginForm.password"
                          auto-complete="off" placeholder="请输入密码" @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
            <!--记录密码-->
            <el-checkbox class="loginRemember" v-model="checked">记录密码</el-checkbox>
            <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data(){
            return {
                loginForm:{
                    username: 'admin',
                    password: '123'
                },
                checked: true,
                rules:{
                    username:[{required:true,message:'请输入用户名', trigger:'blur'}],
                    password:[{required:true,message:'请输入密码', trigger:'blur'}],
                }
            }
        },
        methods: {
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{
                            if (resp) {
                                //JSON.stringify把对象转换成JSON字符串
                               alert(JSON.stringify(resp));
                               //把响应得obj转成json字符串后，保存到session
                               window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
                               console.log(this.$route.query.redirect)
                               let path = this.$route.query.redirect;
                               //跳转页面
                               // this.$router.replace('/home')
                                //登录时候如果有输出指定得网址，那么点击登录后会去到指定网址，没有输入，则去主页
                                this.$router.replace((path=='/' || path==undefined) ? '/home':path);
                            }
                        })
                        // alert('登录成功!');
                    } else {
                        this.$message.error('请输入所有字段');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .loginContainer{
        /*倒角*/
        border-radius: 15px;
        background-clip: padding-box;
        /*居中*/
        margin: 180px auto;
        /*整个宽度*/
        width: 350px;
        padding: 30px 35px 20px 35px;
        background: #ffffff;
        border: 1px solid #eaeaea;
        /*阴影部分*/
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle{
        margin: 0px auto 20px auto;
        text-align: center;
        color: darkgrey;
    }
    .loginRemember{
        text-align: left;
        margin: 0px 20px 10px 0px;
    }
</style>