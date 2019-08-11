<template>
    <div>
        <h1>Calendar</h1>
        <table id="calendar" align="center">
            <tr class="month-box">
                <td id="prev"><i class="fas fa-arrow-right"></i></td>
                <td align="center" id="tbCalendarYM" colspan="5">
                    yyyy년 m월
                </td>
                <td id="next"><i class="fas fa-arrow-right"></i></td>
            </tr>
            <tr class="week">
                <td align="center" style="color: #ef5350">일</td>
                <td align="center">월</td>
                <td align="center">화</td>
                <td align="center">수</td>
                <td align="center">목</td>
                <td align="center">금</td>
                <td align="center" style="color: #42a5f5">토</td>
            </tr>
        </table>
    </div>
</template>

<script>

    window.onload = function () {

        let today = new Date();//오늘 날짜//내 컴퓨터 로컬을 기준으로 today에 Date 객체를 넣어줌
        let date = new Date();//today의 Date를 세어주는 역할

        function prevCalendar() {//이전 달
            today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            buildCalendar(); //달력 cell 만들어 출력
        }

        let prev = document.getElementById("prev").addEventListener("click", prevCalendar);

        function nextCalendar() {//다음 달
            today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
            buildCalendar();//달력 cell 만들어 출력
        }

        let next = document.getElementById("next").addEventListener("click", nextCalendar);

        function buildCalendar(){//현재 달 달력 만들기
            let doMonth = new Date(today.getFullYear(),today.getMonth(),1);
            let lastDate = new Date(today.getFullYear(),today.getMonth()+1,0);
            let tbCalendar = document.getElementById("calendar");
            let tbCalendarYM = document.getElementById("tbCalendarYM");
            tbCalendarYM.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월";

            /*while은 이번달이 끝나면 다음달로 넘겨주는 역할*/
            while (tbCalendar.rows.length > 2) {
                tbCalendar.deleteRow(tbCalendar.rows.length-1);
            }
            let row = null;
            row = tbCalendar.insertRow();
            let cnt = 0;
            for (let i=0; i<doMonth.getDay(); i++) {
                let cell = row.insertCell();
                cnt = cnt + 1;
            }

            /*달력 출력*/
            for (let i=1; i<=lastDate.getDate(); i++) {
                let cell = row.insertCell();
                cell.innerHTML = i;
                cnt = cnt + 1;
                if (cnt % 7 == 1) {
                    cell.innerHTML = "<font color='#ef5350'>" + i + "</span>";
                }
                if (cnt%7 == 0){
                    cell.innerHTML = "<font color='#42a5f5'>" + i + "</font>";
                    row = calendar.insertRow();
                }
                if (today.getFullYear() == date.getFullYear()
                    && today.getMonth() == date.getMonth()
                    && i == date.getDate()) {
                    cell.bgColor = "#FAF58C";
                }
            }
        }

        buildCalendar();
    }

    export default {
        name: "CalendarComponent",
    }

</script>

<style scoped>
    #calendar {
        width: 100%;
        border: 0;
    }

    .month-box {
        width: 100%;
        height: 70px;
        background-color: #66bb6a;
        font-size: 1.5rem;
        text-align: center;
        color: #fff;
        font-weight: bold;
    }

    #prev i {
        transform: rotate(180deg);
    }

    td {
        width: 50px;
        height: 50px;
        text-align: center;
        font-size: 20px;
    }
</style>
