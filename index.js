let loc = document.getElementById("location");
let temp = document.getElementById("temp");
let weather = document.getElementById("msg");
let min = document.getElementById("min");
let max = document.getElementById("max");
let humid = document.getElementById("humid");
let press = document.getElementById("press");
let windSpeed = document.getElementById("speed");
let rise = document.getElementById("sunrise");
let set = document.getElementById("sunset");
let time = document.getElementById("time");

function changeBackground(id){
    let changeTo;
    if(id>=200 && id<233)
        changeTo = "url(images/wall2-thunder.jpg)";
    else if(id>=300 && id<322)
        changeTo = "url(images/wall2-drizzle.jpg)";
    else if(id>=500 && id<532)
        changeTo = "url(images/wall2-rain.jpg)";
    else if(id>=600 && id<623)
        changeTo = "url(images/wall2-snow.jpg)";
    else if(id>=701 && id<782){
        if(id===701 || id===711 || id===721 || id===741)
            changeTo = "url(images/wall2-mist.jpg)";
        else if(id===731 || id===761 || id===762)
            changeTo = "url(images/wall2-dust.jpg)";
        else if(id===751)
            changeTo = "url(images/wall2-sand.jpg)";
        else if(id===771 || id===781)
            changeTo = "url(images/wall2-wind.jpg)";
        else{
            console.log("Wrong ID");
        }
    }
    else if(id===800)
        changeTo = "url(images/wall2-clear.jpg)";
    else if(id>800 && id<805)
        changeTo = "url(images/wall2-clouds.jpg)";
    else{
        console.log("Wrongs ID");
    }

    $("body").fadeOut(300, 
        function () { 
            $(this).css("background-image", changeTo).fadeIn();
    });
}

function showSystemTime(){
    var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return hours+':'+minutes+" - "+days[d.getDay()]+', '+d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear().toString().substr(2,2);
}

function timeStampConvert(time){
    let date = new Date(time*1000);
    let hours = date.getHours();
    let mins = "0"+date.getMinutes();
    return hours+":"+mins.substr(-2);
}

window.addEventListener("load", function(){
    let long;
    let lat;
    time.innerHTML = showSystemTime();
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=876e8c245f496abbff404eb049199580`;
            fetch(api)
                .then((response) => {
                    return response.json();
                }) 
                .then(data => {
                    const {name} = data;
                    const {feels_like, temp_min, temp_max, pressure, humidity} = data.main;
                    const {id, description} = data.weather[0];
                    const {speed} = data.wind;
                    const {sunrise, sunset} = data.sys;

                    changeBackground(id);
                    loc.innerHTML = name;
                    temp.innerHTML = Math.round(feels_like-273) + "&deg";
                    weather.innerHTML = description;
                    min.innerHTML = Math.round(temp_min-273) + "&deg";
                    max.innerHTML = Math.round(temp_max-273) + "&deg";
                    press.innerHTML = pressure + " hPa";
                    humid.innerHTML = humidity+" %";
                    rise.innerHTML = timeStampConvert(sunrise);
                    set.innerHTML = timeStampConvert(sunset);
                    windSpeed.innerHTML = speed + " m/s";
                    console.log(data);
                })
        });
    }
});
