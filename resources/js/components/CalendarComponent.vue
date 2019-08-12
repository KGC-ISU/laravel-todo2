<template>
    <div>
        <div class="logo">
            <h1>Calendar</h1>
        </div>
        <div id="dayList">
            <div id="now-day">
                <div @click="prevMonth" class="prev">
                    <i class="fas fa-arrow-left"></i>
                </div>
                <div class="now-day">
                    {{this.now.getFullYear() + "년 " + (this.now.getMonth() + 1) + "월"}}
                </div>
                <div @click="nextMonth" class="next">
                    <i class="fas fa-arrow-right"></i>
                </div>
            </div>
            <div class="day-row">
                <div class="day">일</div>
                <div class="day">월</div>
                <div class="day">화</div>
                <div class="day">수</div>
                <div class="day">목</div>
                <div class="day">금</div>
                <div class="day">토</div>
            </div>
            <transition-group name="fade">
                <div class="date-row" v-for="week in list" :key="week.id">
                    <div class="item" v-for="item in week.week">
                        {{item.number}}
                        <p></p>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CalendarComponent",
        created(){
            this.now = new Date();
            this.fillDate(this.now);
            console.log(this.now.getFullYear() + " " + (this.now.getMonth() + 1) + " " + this.now.getDate());
        },
        data(){
            return {
                list:[],
                now:null,
                status : true,
            }
        },
        methods:{
            prevMonth(){
                if(this.status == false) {

                } else {
                    this.status = false;
                    this.now.setMonth(this.now.getMonth() - 1);
                    this.list = [];
                    setTimeout(()=>{
                        this.fillDate(this.now);
                        this.status = true;
                    }, 500);
                }
            },
            nextMonth(){
                if(this.status == false) {

                } else {
                    this.status = false;
                    this.now.setMonth(this.now.getMonth() + 1);
                    this.list = [];
                    setTimeout(()=>{
                        this.fillDate(this.now);
                        this.status = true;
                    }, 500);
                }
            },
            fillDate(now){
                this.list = [];
                let first = now.getFirst();
                console.log(first);
                let day = first.getDay(); //요일 알아내기
                first.addDay(-day);
                let id = 1;
                while(true){
                    let week = [];
                    for(let i = 0; i < 7; i++){
                        week.push({date:first.gondr(), number:first.getDate()});
                        first.addDay(1);
                    }
                    console.log(now.getMonth() + 1);
                    this.list.push({id:id++, week: week});
                    if(first.getMonth() != now.getMonth()){
                        break;
                    }
                }
            }
        }
    }
</script>

<style scoped>

    .now-date {
        background-color: #FFE0B2;
    }

    #dayList {
        margin-bottom: 40px;
    }

    #now-day {
        display: flex;
        background-color: #4caf50;
        width: 99.98%;
    }

    #now-day > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15%;
        height: 70px;
        font-size: 2rem;
        font-weight: bold;
        color: #fff;
    }

    #now-day > .now-day {
        width: 70%;
    }

    .day-row {
        display:grid;
        grid-template-columns:repeat(7, 1fr);
        grid-template-rows:50px;
        font-size: 1.1rem;
        font-weight: bold;
    }

    .date-row {
        margin-top:5px;
        grid-gap:10px;
        display:grid;
        grid-template-columns:repeat(7, 1fr);
        grid-auto-rows:minmax(100px, auto);
        padding:5px;
    }

    .day {
        display:flex;
        justify-content:center;
        align-items:center;
        background-color: #4caf50;
        color:#fff;
    }

    .item {
        box-shadow: 2px 2px 1px 1px rgba(0,0,0,0.2);
        border-radius:0.2rem;
        padding:10px;
    }

</style>
