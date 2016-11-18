
<!-- //Variabels -->
var APPID="90e53429da71f19ea7979a28994c8462";//my key for the API
var cilsious=false;// changing between cilsious and fehrenheit.

<!-- // Functions -->

// Getting the data from the API

function sendRequest(url){
    $.getJSON(url,function(data){
        var tempWeather = {
            icon : data.weather[0].icon,
            humidity : data.main.humidity,
            wind : data.wind.speed,
            location : data.name,
            temperature : data.main.temp
            };
            BackgroundWeatherImage(tempWeather.icon);
            update(tempWeather);
    });
}

// Request weather by city

function updateByCity(city){
    var encodedCity = encodeURIComponent(city);
    var url="http://api.openweathermap.org/data/2.5/weather?units=metric&q="+ encodedCity +"&APPID="+ APPID;
    console.log(url);

    sendRequest(url);
}

// Request weather by Geolocation

function updateByGeo(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var url="http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+ lat +"&lon="+ lon +"&APPID="+ APPID;
    sendRequest(url);
}

// switching between dgree and fehrenheit

function changeTemp(temp,weath){
    cilsious=!cilsious;
    if (cilsious) {
        temp.innerHTML= Math.round(weath.temperature )+ "&#8451";
    }
    else {
        temp.innerHTML= Math.round(weath.temperature*9/5+32 )+ "&#8457";
    }
}

// setting or updating with the new values of the weather.

function update(weather){
    temperature1 = document.getElementById("temperature");
    location1 = document.getElementById("location");
    icon1 = document.getElementById("climate_bg");
    humidity1 = document.getElementById("humidity");
    wind1 = document.getElementById("windspeed");
//assigning the new values.
    wind1.innerHTML= Math.round( weather.wind);
    humidity1.innerHTML=Math.round(weather.humidity);
    location1.innerHTML=weather.location;
    icon1.src="http://openweathermap.org/img/w/"+ weather.icon +".png";
    changeTemp(temperature1,weather);
    $("button").click(function(){
        cilsious=!cilsious;
        if (cilsious) {
            temperature1.innerHTML= Math.round(weather.temperature )+ "&#8451";}
        else {
            temperature1.innerHTML= Math.round(weather.temperature*9/5+32 )+ "&#8457";
        }
    });
    console.log(weather);
}

//discover the state and change the background picture

function BackgroundWeatherImage(weatherIcon){
    
    switch(weatherIcon){
        case "01d":
        updateBackground("images/clear-sky.jpg");            
        break;
        case "01n":
        updateBackground("images/clear-night-sky.jpg");            
        break;
        case "02d":
        updateBackground("images/few-clouds.jpg");            
        break;
        case "02n":
        updateBackground("images/few-clouds-night.jpg");            
        break;
        case "03d":
        updateBackground("images/cloudy_sky.jpg");            
        break;
        case "03n":
        updateBackground("images/cloudy-night.jpg");            
        break;
        case "04d":
        updateBackground("images/broken-clouds.jpg");            
        break;
        case "04n":
        updateBackground("images/brokencloudy-night.jpg");            
        break;
        case "09d","10d":
        updateBackground("images/rain.jpg");            
        break;
        case "09n","10n":
        updateBackground("images/night-rain.jpg");            
        break;
        case "11d":
        updateBackground("images/thunder.jpg");            
        break;
        case "11n":
        updateBackground("images/night-thunder.jpg");            
        break;
        case "13d":
        updateBackground("images/snowing.jpg");            
        break;
        case "13n":
        updateBackground("images/snow-night.jpg");            
        break;
        case "50d":
        updateBackground("images/mist.jpg");            
        break;
        case "50n":
        updateBackground("images/nightmist.jpg");            
        break;
        default: updateBackground("images/Weather-Blog-Image.jpg");
    }
}

//change the backgroundImage of the body
function updateBackground(imgUrl){
    document.body.style.backgroundImage="url("+imgUrl+")";
}

// connecting the variables with html
window.onload = function () {

//testing location if it is available
    if (navigator.geolocation) {
        var location_timeout = setTimeout("geolocFail()", 10000);
        navigator.geolocation.getCurrentPosition(function(position) {
            clearTimeout(location_timeout);
            updateByGeo(position);
            showPage();
        }, function(error) {
            clearTimeout(location_timeout);
            var currentCity = window.prompt("Unavailable location. Please type your city:");
            updateByCity(currentCity);
            showPage();
            });
    } else {
    // Fallback for no geolocation
        var currentCity = window.prompt("Unavilable location. Please type your city:");
        updateByCity(currentCity);
        showPage();
    }
} 

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}





