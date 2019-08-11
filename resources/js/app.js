require('./bootstrap');

window.Vue = require('vue');

import RegisterComponent from "./components/RegisterComponent";
import MainApp from "./components/MainApp";
import ItemComponent from "./components/ItemComponent";
import Router from 'vue-router';
import axios from 'axios';

//페이지 컴포넌트 들
import TodoComponent from "./components/TodoComponent";
import CompleteComponent from "./components/CompleteComponent";
import CalendarComponent from "./components/CalendarComponent";

Vue.use(Router);
Vue.prototype.$http = axios;

Vue.component ('register-compo', RegisterComponent);
Vue.component ('main-app', MainApp);
Vue.component ('item-compo', ItemComponent);

const router = new Router({

    routes:[
        {path:'/', component:TodoComponent},
        {path:'/complete', component:CompleteComponent},
        {path:'/calendar', component:CalendarComponent},
    ]
});

Date.prototype.gondr = function() {
    let str = this.toLocaleDateString();
    console.log(str);
    let arr = str.split(".");
    return arr.filter(x => x != "").map(x => {
        if(x.length >= 4) return x;
        let dstr = "0" + x.trim();
        return dstr.substring(dstr.length - 2);
    }).join("-");
};

const app = new Vue({
    el: '#app',
    router,
    data:{
        list: [],
        user:null,
        id:0,
    },
    created(){
        this.$http.get('/check')
            .then(res => {
                if(res.data.result) {
                    this.user = res.data.user;
                    if(res.data.result) {
                        this.$http.get('/todo').then( res => {
                            const data = res.data;
                            this.list = data.list.map( x => {
                                x.date = new Date(x.date);
                                return x;
                            })
                        });
                    }
                }
            })
    },
    methods:{
        addTodo(name, date){
            this.$http.post('/todo', {name:name, date:date}).then(res => {
                const data = res.data;
                if(data.success) {
                    this.list.push({id : this.id++, name : name, date : new Date(date), complete: 0});
                }
            })
            this.list.push({id:this.data.id, name:name, date: new Date(date), complete:0});
        },
        comTodo(id) {
            this.$http.post('/comTodo', {
                id : id,
            }).then( res => {
                console.log(res);
            });
        },
        delTodo(id){
            let idx = this.list.findIndex(x => x.id == id);
            this.list.splice(idx, 1);

            this.$http.post('/delTodo', {
                id : id,
            }).then( res => {
                console.log(res);
            });
        },
    },
    computed:{
        sortList(){
            return this.list.sort((a, b) => {
                if(a.date == b.date) return 0;
                return a.date < b.date ? -1 : 1;
            });
        }
    }
});
