
// Get Elements from DOM 
let searchBtn = document.getElementById("search-btn");
let loc = document.getElementById("location");
let temp_val = document.getElementsByClassName("temp-value")[0];
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
let cel = document.getElementsByClassName("cel")[0];
let fah = document.getElementsByClassName("fah")[0];

// Update Time
time.innerHTML = showSystemTime();

// Fucntion to convert temp from celsius to fahrenhiet 
function CtoF(temp){
    return Math.round((temp * 9)/5 +32);
}

// Fucntion to convert temp from fahrenhiet to celsius 
function FtoC(temp){
    return Math.round(((temp-32)*5)/9);
}

// Var to prevent conversion of cel to cel in unit 
var currentUnit = "cel";
$(".cel").addClass("unit-active");

// Event listener for Fahrenhiet
fah.addEventListener("click", function(){
    if(currentUnit==="cel"){
        min.innerHTML = Math.round(CtoF(min.innerHTML.slice(0,-1)))+"&deg";
        max.innerHTML = Math.round(CtoF(max.innerHTML.slice(0,-1)))+"&deg";
        day1.innerHTML = Math.round(CtoF(day1.innerHTML.slice(0,-1)))+"&deg";
        day2.innerHTML = Math.round(CtoF(day2.innerHTML.slice(0,-1)))+"&deg";
        day3.innerHTML = Math.round(CtoF(day3.innerHTML.slice(0,-1)))+"&deg";
        day4.innerHTML = Math.round(CtoF(day4.innerHTML.slice(0,-1)))+"&deg";
        temp_val.innerHTML = Math.round(CtoF(temp_val.innerHTML.slice(0,-1)))+"&deg";
        $(".cel").removeClass("unit-active");
        $(".fah").addClass("unit-active");
        currentUnit = "fah";
    }
})

// Event listener for Celsius
cel.addEventListener("click", function(){
    if(currentUnit==="fah"){
        min.innerHTML = Math.round(FtoC(min.innerHTML.slice(0,-1)))+"&deg";
        max.innerHTML = Math.round(FtoC(max.innerHTML.slice(0,-1)))+"&deg";
        day1.innerHTML = Math.round(FtoC(day1.innerHTML.slice(0,-1)))+"&deg";
        day2.innerHTML = Math.round(FtoC(day2.innerHTML.slice(0,-1)))+"&deg";
        day3.innerHTML = Math.round(FtoC(day3.innerHTML.slice(0,-1)))+"&deg";
        day4.innerHTML = Math.round(FtoC(day4.innerHTML.slice(0,-1)))+"&deg";
        temp_val.innerHTML = Math.round(FtoC(temp_val.innerHTML.slice(0,-1)))+"&deg";
        $(".cel").addClass("unit-active");
        $(".fah").removeClass("unit-active");
        currentUnit = "cel";
    }
})

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

// Function to update info from API repsonse 
function changeValues(data){
    console.log(data);
    $(".fah").removeClass("unit-active");
    currentUnit = "cel";
    $(".cel").addClass("unit-active");
    let currentData = data.list[0];
    const {name, sunrise, sunset, country} = data.city;
    const {feels_like, temp_min, temp_max, pressure, humidity} = currentData.main;
    const {id, description} = currentData.weather[0];
    const {speed} = currentData.wind;

    // For Current Weather 
    changeBackground(id);
    loc.innerHTML = name+", "+country;
    temp_val.innerHTML = Math.round(feels_like-273) + "&deg";
    $(".cel").addClass("unit-active");
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
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            $(".loader-h3").text("Fetching that Data");
            let long = position.coords.longitude;
            let lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=876e8c245f496abbff404eb049199580`;
            fetch(api)
                .then((response) => {
                    return response.json();
                }) 
                .then(data => {
                    changeValues(data);
                    var preloader = $('.preloader-wrapper');
                    preloader.fadeOut(500);
                })
        }, error =>{
            switch(error.code) {
                // If Access Denied, then show weather for Delhi, IN  
                case error.PERMISSION_DENIED:
                    $(".loader-h3").text("Denied, No worries! Weather for Delhi,IN coming up");
                    const proxy = "https://cors-anywhere.herokuapp.com/";
                    const api_city = `${proxy}api.openweathermap.org/data/2.5/forecast?q=Delhi&appid=876e8c245f496abbff404eb049199580`;
                    fetch(api_city)
                        .then((response) => {
                            return response.json();
                        }) 
                        .then(data => {
                            console.log(data);
                            changeValues(data);
                            var preloader = $('.preloader-wrapper');
                            preloader.fadeOut(500);
                        })
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred");
                    break;
            }
        })
    }
});

// Event Listener for Search Bar 
searchBtn.addEventListener("click", function(){
    $(".input-loader-wrapper").removeClass("hide-loader");
    let city_name = document.getElementById("city_name").value;
    if(city_name.length){
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api_city = `${proxy}api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=876e8c245f496abbff404eb049199580`;
        fetch(api_city)
            .then((response) => {
                if(!response.ok)
                    throw response;
                return response.json();
            }) 
            .then(data => {
                changeValues(data);
                $(".input-loader-wrapper").addClass("hide-loader");
                document.getElementById("city_name").value="";
            })
            .catch(error => {
                $(".input-loader-wrapper").addClass("hide-loader");
                error.json().then((body)=>{
                    alert(body.message);
                    document.getElementById("city_name").value="";
                });
             })
        
    }
})
