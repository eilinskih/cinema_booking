//global variables
const today = new Date();
const day = today.getDate();
const calendar = document.getElementById("calendar");
const slots = document.getElementById("slots");
const monthTitle = createElemWithId("h2", `${today.getMonth()}`);
let slotsArr = [];
const daysBefore = getNDays(7, "before");
const daysAfter = getNDays(7, "after");
const days = [].concat(daysBefore, today, daysAfter);
let currentKey = `${today.getDate()}_${today.getMonth()}`;

//generate dates for calendar
function getNDays(numberOfDays, period) {
    const startingDate = today;
    let datesArray = [];
    let daysCounter = 1;
    const dayNumber = 1000 * 60 * 60 * 24;
    if (period === "after") {
        while (daysCounter < numberOfDays + 1) {
            let newDateAfterStarting = Number(startingDate) + (dayNumber * daysCounter);
            datesArray.push(new Date(newDateAfterStarting));
            daysCounter++;
        }
    }
    else if (period === "before") {
        while (daysCounter < numberOfDays + 1) {
            let newDateBeforeStarting = Number(startingDate) - dayNumber * daysCounter;
            datesArray.unshift(new Date(newDateBeforeStarting));
            daysCounter++;
        }
    }
    return datesArray;
};

//get slots items from local storage
function getSlots(stamp) {
    slotsArr = JSON.parse(localStorage.getItem(stamp));
};

//render slots items
function showSlots(slotDate) {
    getSlots(slotDate);
    slotsArr.forEach((item) => {
        const slot = createElemWithId("div", `${slotsArr.indexOf(item)}`);
        const time = createElemWithId("span", `time${item.time}`);
        const movie = createElemWithId("span", `movie${item.time}`);
        appendWithClass(slots, slot, "slot");
        appendWithClass(slot, time, "time");
        appendWithClass(slot, movie, "movie");
        document.getElementById(`time${item.time}`).innerHTML = item.time;
        document.getElementById(`movie${item.time}`).innerHTML = item.movie;
        if (item.isBoocked === true) {
            document.getElementById(`${slotsArr.indexOf(item)}`).style.backgroundColor = 'red';
        }
    });
};

//utilite for create DOM elements
function createElemWithId(el, id) {
    const elem = document.createElement(el);
    elem.setAttribute('id', id);
    return elem
};

//utilite for append
function appendWithClass(appendTo, el, classes) {
    appendTo.append(el);
    el.classList.add(classes);
};

//handler for days in calendar
function onCalendarClick(e) {
    const stamp = Number(e.target.closest('div').getAttribute('stamp'));
    const slotsParam = `${new Date(stamp).getDate()}_${new Date(stamp).getMonth()}`;
    const calendarDays = Array.from(document.getElementsByClassName("day"));
    const slotsList = Array.from(document.getElementsByClassName("slot"));
    currentKey = slotsParam;
    calendarDays.forEach((item) => {
        item.classList.remove("active");
    });
    e.target.classList.add("active");
    slotsArr = [];
    slotsList.forEach((item) => {
        item.remove();
    });
    showSlots(slotsParam);
};

//handler for slots items
function onSlotsClick(e) {
    const arr = JSON.parse(localStorage.getItem(currentKey));
    const slotsList = Array.from(document.getElementsByClassName("slot"));
    if (!arr[+e.target.id].isBoocked) {
        arr[+e.target.id].isBoocked = true;
    } else arr[+e.target.id].isBoocked = false;
    localStorage.setItem(currentKey, JSON.stringify(arr));
    slotsList.forEach((item) => {
        item.remove();
    });
    showSlots(currentKey);
};

//initial values for local storage
if (!localStorage.length) {
    days.forEach((item) => {
    localStorage.setItem(`${new Date(item).getDate()}_${new Date(item).getMonth()}`,
    JSON.stringify([
        { time: "10.00", movie: "some interesting movie", isBoocked: false },
        { time: "12.00", movie: "some interesting movie", isBoocked: false },
        { time: "14.00", movie: "some interesting movie", isBoocked: false },
        { time: "16.00", movie: "some interesting movie", isBoocked: false },
        { time: "18.00", movie: "some interesting movie", isBoocked: false },
        { time: "20.00", movie: "some interesting movie", isBoocked: false }
    ]));
    });
};

//set month of calendar
calendar.append(monthTitle);
monthTitle.innerHTML = formatMonth(`${today.getMonth()}`);

//calendar render
days.forEach((item) => {
    const date = createElemWithId("div", `day${new Date(item).getDate()}${new Date(item).getMonth()}`);
    const dayMonth = createElemWithId("span", `display-day${new Date(item).getDate()}`);
    const dayWeek = createElemWithId("span", `display-week${new Date(item).getDay()}${new Date(item).getDate()}`);
    appendWithClass(calendar, date, "day");
    appendWithClass(date, dayMonth, "day-span");
    appendWithClass(date, dayWeek, "day-week-span");
    document.getElementById(`display-day${new Date(item).getDate()}`).innerHTML = `${new Date(item).getDate()}`;
    document.getElementById(`display-week${new Date(item).getDay()}${new Date(item).getDate()}`).innerHTML = formatWeekDay(`${new Date(item).getDay()}`);
    document.getElementById(`day${new Date(item).getDate()}${new Date(item).getMonth()}`).setAttribute("stamp", `${Number(item)}`);
    if (new Date(item).getDate() === day) {
        date.classList.add("active");
    };
});

//initial slots render
showSlots(currentKey);

//handlers
calendar.addEventListener("click", onCalendarClick, true);
slots.addEventListener("click", onSlotsClick, true);





