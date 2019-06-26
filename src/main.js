import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import axios from 'axios'
// 先找文件,没有就找目录
// 如果找到目录,优先加载目录中的index
import router from './router'
// 引入公共样式文件,最好在 element 样式之后,可以自定义修改element内置样式
import './styles/index.css'
// 配置axios的基础路径
// 发请求的时候就不需要每次都写 axios（{ url: '/authorizations'}）
// 路径最后的 /,多退少补
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

Vue.use(ElementUI)

// 所有的组件都是vue的实例
// 我们可以把一些需要在组件中频繁的使用的成员放到 Vue.prototype 中
// Vue.prototype.foo = 'bar'
// 给Vue原型对象扩展成员的时候,最后加上一个$前缀,避免和组件内部的数据成员冲突
// 几乎所有组件都要去发送请求,这样配置完成以后,我们在组件中发送请求就可以直接 this.$http({ method,url'''})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
