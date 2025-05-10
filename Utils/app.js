
import getWeatherData from "../httpreq.js"
const days=[
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
];
// const APIKEY='412f48031a9b6c0c10beb43a34c5281e';
const input=document.querySelector('#input');
const searchButton=document.querySelector('#searchButton');
const weatherContainer=document.querySelector('#weatherContainer');
const locationIcon=document.querySelector('#location');
const forecast=document.querySelector('#forecast');


const renderCurrentWeather=(data)=>{
console.log(data);
const weatherJsx=`
<h1>${data.name}, ${data.sys.country}<h1/>
<div id="main">
<img alt="weather icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
<span>${data.weather[0].main}</span>
<span>${Math.round(data.main.temp)}°C</span>
</div>

<div id="info">
<p> Humidity : <span> ${data.main.humidity}%</span> </p>
<p> Wind Speed : <span> ${data.wind.speed}m/s </span> </p>
</div>
`

weatherContainer.innerHTML=weatherJsx;
};


const getWeekDays=(date)=>{
    return days[new Date (date *1000).getDay()];
}

const renderForecastWeather=async (data)=>{
    forecast.innerHTML=" ";
    const filteredData=data.list.filter(obj=>obj.dt_txt.endsWith("12:00:00"));
    console.log(filteredData);
    filteredData.forEach(i => {
        const forecastJsx=`
        <div>
        <img alt="weather icon" src="https://openweathermap.org/img/w/${i.weather[0].icon}.png"/>
        <h3>${getWeekDays(i.dt)}</h3>
        <p>${Math.round(i.main.temp)}</p>
        <span>${i.weather[0].main}</span>
        </div>
        `;
        forecast.innerHTML+=forecastJsx;
    });
};


const searchHandler=async()=>{
    const cityName=input.value;
    if(!cityName){
        alert("Please enter the cityName")
    };
    const currentData=await getWeatherData('current',cityName);
    //currentData دیتایی هست که ما به ای پی ای اسم شهرو دادیم و اون فچ کرد و هواشو برگردوند
    renderCurrentWeather(currentData);

    const forecastData=await getWeatherData('forecast',cityName);
    renderForecastWeather(forecastData);
    input.value = '';
}

const pssitionCallback = async (position) => {
    const { latitude, longitude } = position.coords;

    const coordsWeather = await getWeatherData('current', position.coords);
    renderCurrentWeather(coordsWeather);

    const forecastData = await getWeatherData('forecast', position.coords);
    renderForecastWeather(forecastData);
};


const errorCallback =(error)=>{
    console.log(error);
}



const locationGandler=()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pssitionCallback,errorCallback) ;

    }else{
        alert('your browser doesnt support ')
    }
}


searchButton.addEventListener('click',searchHandler);
locationIcon.addEventListener('click',locationGandler);