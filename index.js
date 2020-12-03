let loc = document.getElementById("location");
let temp = document.getElementById("temp");
let weather = document.getElementById("msg");

window.addEventListener("load", function(){
    let long;
    let lat;
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
                    const {feels_like} = data.main;
                    const {main} = data.weather[0];
                    loc.innerHTML = name;
                    temp.innerHTML = Math.round(feels_like-273) + "&deg";
                    weather.innerHTML = main;
                    console.log(data);
                })
        });
    }
});
