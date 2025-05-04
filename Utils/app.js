
const baseUrl=
'https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=412f48031a9b6c0c10beb43a34c5281e&units=metric';

const APIKEY='412f48031a9b6c0c10beb43a34c5281e';

const input=document.querySelector('#input');
const searchButton=document.querySelector('#searchButton');




const searchHandler=()=>{
    const cityName=input.value;
    if(!cityName){
        alert("Please enter the cityName")
    };
}

searchButton.addEventListener('click',searchHandler);