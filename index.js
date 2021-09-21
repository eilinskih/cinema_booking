const today = new Date();
const day = today.getDate();
const calendar = document.getElementById("calendar");
const slots = document.getElementById("slots");
const monthTitle = createElemWithId("h2", `${today.getMonth()}`);
const days = [
    new Date().setDate(day - 7),
    new Date().setDate(day - 6),
    new Date().setDate(day - 5),
    new Date().setDate(day - 4),
    new Date().setDate(day - 3),
    new Date().setDate(day - 2),
    new Date().setDate(day - 1),
    new Date().setDate(day),
    new Date().setDate(day + 1),
    new Date().setDate(day + 2),
    new Date().setDate(day + 3),
    new Date().setDate(day + 4),
    new Date().setDate(day + 5),
    new Date().setDate(day + 6),
    new Date().setDate(day + 7),
];
let slotsArr = [];

function getSlots(stamp) {
    slotsArr = JSON.parse(localStorage.getItem(stamp));
};

function showSlots(slotDate) {
    getSlots(slotDate);
    slotsArr.forEach((item) => {
        const slot = createElemWithId("div", `${item.time}`);
        const time = createElemWithId("span", `time${item.time}`);
        const movie = createElemWithId("span", `movie${item.time}`);
        appendWithClass(slots, slot, "slot");
        appendWithClass(slot, time, "time");
        appendWithClass(slot, movie, "movie");
        document.getElementById(`time${item.time}`).innerHTML = item.time;
        document.getElementById(`movie${item.time}`).innerHTML = item.movie;
    });
};

function createElemWithId(el, id) {
    const elem = document.createElement(el);
    elem.setAttribute('id', id)
    return elem
};

function formatMonth(month) {
    switch (month) {
        case "0":
            return "January";
        case "1":
            return "February";
        case "2":
            return "March";
        case "3":
            return "April";
        case "4":
            return "May";
        case "5":
            return "June";
        case "6":
            return "July";
        case "7":
            return "August";
        case "8":
            return "September";
        case "9":
            return "October";
        case "10":
            return "November";
        case "11":
            return "December";
    }
};

function formatWeekDay(weekDay) {
    switch (weekDay) {
        case "0":
            return "Sun";
        case "1":
            return "Mon";
        case "2":
            return "Tue";
        case "3":
            return "Wed";
        case "4":
            return "Thu";
        case "5":
            return "Fri";
        case "6":
            return "Sat";
    }
};

function appendWithClass(appendTo, el, classes) {
    appendTo.append(el);
    el.classList.add(classes)
};

function onCalendarClick(e) {
    const calendarDays = Array.from(document.getElementsByClassName("day"));
    calendarDays.forEach((item) => {
        item.classList.remove("active");
    });
    e.target.classList.add("active");
    showSlots(`${new Date(e.target.stamp).getDate()}_${new Date(e.target.stamp).getMonth()}`)
};

if (!localStorage.length) {
    days.forEach((item) => {
        localStorage.setItem(`${new Date(item).getDate()}_${new Date(item).getMonth()}`,
JSON.stringify([
    {time: "10.00", movie: "some interesting movie", isBoocked: false},
    {time: "12.00", movie: "some interesting movie", isBoocked: false},
    {time: "14.00", movie: "some interesting movie", isBoocked: false},
    {time: "16.00", movie: "some interesting movie", isBoocked: false},
    {time: "18.00", movie: "some interesting movie", isBoocked: false},
    {time: "20.00", movie: "some interesting movie", isBoocked: false}
]))
    });
};

calendar.append(monthTitle);
monthTitle.innerHTML = formatMonth(`${today.getMonth()}`);
days.forEach((item) => {
    const date = createElemWithId("div", `day${new Date(item).getDate()}${new Date(item).getMonth()}`);
    const dayMonth = createElemWithId("span", `display-day${new Date(item).getDate()}`);
    const dayWeek = createElemWithId("span", `display-week${new Date(item).getDay()}${new Date(item).getDate()}`);
    appendWithClass(calendar, date, "day");
    appendWithClass(date, dayMonth, "day-span");
    appendWithClass(date, dayWeek, "day-week-span");
    document.getElementById(`display-day${new Date(item).getDate()}`).innerHTML = `${new Date(item).getDate()}`;
    document.getElementById(`display-week${new Date(item).getDay()}${new Date(item).getDate()}`).innerHTML = formatWeekDay(`${new Date(item).getDay()}`);
    document.getElementById(`day${new Date(item).getDate()}${new Date(item).getMonth()}`).setAttribute("stamp", `${item}`);
    if (new Date(item).getDate() === day) {
        date.classList.add("active");
    };
});
//initial slots render
showSlots(`${day}_${today.getMonth()}`);
//handlers
calendar.addEventListener("click", onCalendarClick);




