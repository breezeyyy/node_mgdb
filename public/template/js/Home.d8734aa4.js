(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Home"],{"21bb":function(e,t,n){"use strict";n("2dad")},"2dad":function(e,t,n){},bb51:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:3e3,"show-indicators":!1},on:{change:e.onChange},scopedSlots:e._u([{key:"indicator",fn:function(){return[n("div",{staticClass:"custom-indicator"},[e._v(e._s(e.getCurrent+1)+"/"+e._s(e.getBanner.length))])]},proxy:!0}])},e._l(e.getBanner,(function(t){return n("van-swipe-item",{key:t._id,on:{click:function(n){return e.goToDetails(t._id)}}},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.banner,expression:"item.banner"}]}),n("div",{staticClass:"text-box"},[n("h2",[e._v(e._s(t.title))])])])})),1),n("van-pull-refresh",{attrs:{"success-text":"刷新成功"},on:{refresh:e.onRefresh},model:{value:e.refreshingFlag,callback:function(t){e.refreshingFlag=t},expression:"refreshingFlag"}},[n("van-list",{attrs:{finished:e.getFinished,error:e.getError,"error-text":"请求失败，点击重新加载","finished-text":"没有更多了"},on:{"update:error":function(t){e.getError=t},load:e.onLoad},model:{value:e.loadingFlag,callback:function(t){e.loadingFlag=t},expression:"loadingFlag"}},e._l(e.getArticles,(function(e){return n("van-cell",{key:e._id,staticStyle:{padding:"0.2rem 0.1rem 0.2rem 0.2rem"},attrs:{to:"/details/"+e._id+"?from=home",title:e.title,label:e.des,"is-link":"",center:"",size:"large",icon:e.detail.auth_icon}})})),1)],1)],1)},i=[],s=n("5530"),o=n("2f62"),a=n("44d5"),c={name:"Home",mounted:function(){this.banners()},beforeRouteLeave:function(e,t,n){this.setCurrent({current:0}),n()},methods:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(o["b"])("home",["banners","articles","refresh"])),Object(o["d"])("home",["setRefreshing","setLoading","setCurrent"])),{},{onLoad:Object(a["throttle"])((function(){this.articles()}),500),onRefresh:Object(a["throttle"])((function(){this.refresh()}),500),goToDetails:function(e){this.$router.push("/details/".concat(e,"?from=banner"))},onChange:function(e){this.setCurrent({current:e})}}),computed:Object(s["a"])(Object(s["a"])({},Object(o["e"])("home",{getCurrent:function(e){return e.current},getFinished:function(e){return e.finished},getError:function(e){return e.error},getArticles:function(e){return e.articles},getBanner:function(e){return e.banners}})),{},{refreshingFlag:{get:function(){return this.$store.state.home.refreshing},set:function(e){this.setRefreshing({refreshing:e})}},loadingFlag:{get:function(){return this.$store.state.home.loading},set:function(e){this.setLoading({loading:e})}}})},l=c,u=(n("21bb"),n("2877")),f=Object(u["a"])(l,r,i,!1,null,null,null);t["default"]=f.exports}}]);
//# sourceMappingURL=Home.d8734aa4.js.map