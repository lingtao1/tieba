module.exports = {
    publicPath:'/',
    devServer:{
        proxy:{
            '/index': {     //这里最好有一个 /
            target: 'http://localhost/tp/public/index.php',  // 后台接口域名
            // ws: false,        //如果要代理 websockets，配置这个参数
            // secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            // pathRewrite:{
            //     '^/rng':''
            // }
            }
        }
    }
}