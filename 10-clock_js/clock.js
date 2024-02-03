
let name = prompt("Adınızı giriniz.")
let myName = document.querySelector("#myName")
myName.innerHTML = name

let clock = document.querySelector("#myClock")

function showTime(){
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let d = getDayName(today.getDay());
    m = checkTime(m);
    s = checkTime(s);
    clock.innerHTML =  h + ":" + m + ":" + s + " " + d;
    setTimeout(showTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
  function getDayName(dayIndex) {
    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    return days[dayIndex];
}

  showTime()