const baseUrl = 'https://api.openweathermap.org/data/2.5';
const APIKEY = '412f48031a9b6c0c10beb43a34c5281e';

async function fetching(url) {
    const response = await fetch(url);
    const json = await response.json(); // await here was missing too!
    return json;
}

const getWeatherData = async (type, data) => {
    let url = null;
    switch (type) {
        case "current":
            if (typeof data === "string") {
                url = `${baseUrl}/weather?q=${data}&appid=${APIKEY}&units=metric`;
            } else {
                url = `${baseUrl}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${APIKEY}&units=metric`;
            }
            break;

        case "forecast":
            if (typeof data === "string") {
                url = `${baseUrl}/forecast?q=${data}&appid=${APIKEY}&units=metric`;
            } else {
                url = `${baseUrl}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${APIKEY}&units=metric`;
            }
            break;

        default:
            url = `${baseUrl}/weather?q=tehran&appid=${APIKEY}&units=metric`;
    }

    return await fetching(url); // ✅ return the result
};

export default getWeatherData;
