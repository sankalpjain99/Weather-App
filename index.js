
// Get Elements from DOM 
let searchBtn = document.getElementById("search-btn");
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
let day1 = document.getElementById("day1");
let day2 = document.getElementById("day2");
let day3 = document.getElementById("day3");
let day4 = document.getElementById("day4");
let forecast_days = [day1, day2, day3, day4];

time.innerHTML = showSystemTime();

// Fucntion to change Backgroung Image depending upon the weather 
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

// Function to convert weather description to camel case 
function camelCase(text){
    let words = text.split(" ");
    var ans="";
    for(var j=0;j<words.length;j++){
        ans += words[j].substr(0,1).toUpperCase();
        ans += words[j].substr(1,)
        ans += " ";
    }
    return ans;
}

// Function to update System Time 
function showSystemTime(){
    var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return hours+':'+minutes+" - "+days[d.getDay()]+', '+d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear().toString().substr(2,2);
}

// Function to Convert Unix UTC time to system Time 
function timeStampConvert(time){
    let date = new Date(time*1000);
    let hours = date.getHours();
    let mins = "0"+date.getMinutes();
    return hours+":"+mins.substr(-2);
}

function changeValues(data){
    let currentData = data.list[0];
    const {name, sunrise, sunset, country} = data.city;
    const {feels_like, temp_min, temp_max, pressure, humidity} = currentData.main;
    const {id, description} = currentData.weather[0];
    const {speed} = currentData.wind;

    // For Current Weather 
    changeBackground(id);
    loc.innerHTML = name+", "+country;
    temp.innerHTML = Math.round(feels_like-273) + "&deg";
    weather.innerHTML = camelCase(description);
    min.innerHTML = Math.round(temp_min-273) + "&deg";
    max.innerHTML = Math.round(temp_max-273) + "&deg";
    press.innerHTML = pressure + " hPa";
    humid.innerHTML = humidity+" %";
    rise.innerHTML = timeStampConvert(sunrise);
    set.innerHTML = timeStampConvert(sunset);
    windSpeed.innerHTML = speed + " m/s";

    // For Forecast 
    let count=0;
    for(var i=8;i<data.list.length;i+=8){
        let forecastData = data.list[i];
        const {feels_like} = forecastData.main;
        forecast_days[count].innerHTML = Math.round(feels_like-273) + "&deg";
        count++;
    }
}

// Event Listener for GeoLocation 
window.addEventListener("load", function(){
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=876e8c245f496abbff404eb049199580`;
            fetch(api)
                .then((response) => {
                    return response.json();
                }) 
                .then(data => {
                    changeValues(data);
                })
        });
    }
});

// Event Listener for Search Bar 
searchBtn.addEventListener("click", function(){
    let city_name = document.getElementById("city_name").value;
    if(city_name.length){
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api_city = `${proxy}api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=876e8c245f496abbff404eb049199580`;
        fetch(api_city)
            .then((response) => {
                return response.json();
            }) 
            .then(data => {
                console.log(data);
                changeValues(data);
            })
    }
})
