
const baseUrl=
'https://api.openweathermap.org/data/2.5';

const APIKEY='412f48031a9b6c0c10beb43a34c5281e';
const input=document.querySelector('#input');
const searchButton=document.querySelector('#searchButton');
const weatherContainer=document.querySelector('#weatherContainer');
const locationIcon=document.querySelector('#location');

async function fetching(url) {
    const response=await fetch(url);
    const json=response.json();
    return json;
  
};

const getCurrentWeatherByName=async (city)=>{
    const url=`${baseUrl}/weather?q=${city}&appid=${APIKEY}&units=metric`;
    const fetchingAPI=await fetching(url);
    return fetchingAPI;

};


const getCurrentWeatherByCoords= async (latitude,longitude)=>{
const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;
const fetchingAPI=await fetching(url);
return fetchingAPI;
};


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



const searchHandler=async()=>{
    const cityName=input.value;
    if(!cityName){
        alert("Please enter the cityName")
    };
    const currentData=await getCurrentWeatherByName(cityName);
    //currentData دیتایی هست که ما به ای پی ای اسم شهرو دادیم و اون فچ کرد و هواشو برگردوند
    renderCurrentWeather(currentData); 
    input.value = '';
}

const pssitionCallback=async (position)=>{
    const { latitude, longitude } = position.coords;
    const coordsWeather=await getCurrentWeatherByCoords(latitude,longitude);
    console.log(coordsWeather);
    renderCurrentWeather(coordsWeather);
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