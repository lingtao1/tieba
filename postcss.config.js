
/* 
postcss-pxtorem 是一款 postcss 插件，用于将px 转化为 rem
*/

module.exports = {
  plugins: {
      //自动添加浏览器厂商剩秒前缀，兼容不同的浏览器前缀
      // VueCil 已经在内部默认配置了 autoprefixer
    // autoprefixer: {
    //     //用来配置要兼容的浏览器环境
    //     //  browsers 就是写入 根目录下的 browserlist
    //     //  在这边写会报错 但不影响使用 最好在browserlist下写配置
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },
    'postcss-pxtorem': {
      // 转换的根元素基准值
      // 正常情况下按照你的设计稿来
      // 假设 750宽的设计稿 写75
      // 假设 375宽的设计稿 写37.5
      // Vant 组件库基于375宽写的
      // 移动端页面一般基于 iphone6/7/8 设计的
      // Vant 组件库基于逻辑像素写的
      // 设计稿都是基于物理像素 750 宽写
      // 但是Vant 组件基于375宽 所以我们在测量的时候 要除于 2
      // 可以通过PS把设计稿的图像大小转换成375点
      // 移动端开发是以点为单位
      rootValue: 37.5,

      // 需要转换px为rem 元素 
      // * 代表所有元素 
      propList: ['*'],
    },
  },
};