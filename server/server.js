const port = 8080
const host = 'localhost'

let apiKey = 'a98bacd5e04d94e1bbd3afd506d56bb2';
let apiLink = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&';

const http = require('http');
const url = require('url');
const { parse } = require('querystring');
const data = JSON.stringify({
    "coord": {
        "lon": -122.08,
        "lat": 37.39
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 282.55,
        "feels_like": 281.86,
        "temp_min": 280.37,
        "temp_max": 284.26,
        "pressure": 1023,
        "humidity": 100
    },
    "visibility": 16093,
    "wind": {
        "speed": 1.5,
        "deg": 350
    },
    "clouds": {
        "all": 1
    },
    "dt": 1560350645,
    "sys": {
        "type": 1,
        "id": 5122,
        "message": 0.0139,
        "country": "US",
        "sunrise": 1560343627,
        "sunset": 1560396563
    },
    "timezone": -25200,
    "id": 420006353,
    "name": "Mountain View",
    "cod": 200
});

async function getWeather(url){
    let response = await fetch(url);
    if (response.ok) {
        return await response.json()
    } else {
        throw "error"
    }
}
function getWeatherByName(cityName){
    let requestURL = apiLink + 'q=' + cityName + '&appid=' + apiKey;
    return getWeather(requestURL);
}


http.createServer((request, response) => {
    console.log('server work');
    console.log(request.method);
    if (request.method === 'GET') {
        let urlRequest = url.parse(request.url, true);
        console.log(urlRequest)
        // console.log(JSON.parse(data))
        response.statusCode = 201
        response.json(data)
        //
        // // console.log(urlRequest);
        console.log(urlRequest.query.q); // ! GET Params
        // if (urlRequest.query.q !== "") {
        //     let res = getWeatherByName(urlRequest.query.q)
        //     response.end(res);
        // }
        // response.end('odd');
    }
    else {
        // POST
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            console.log(body);
            let params = parse(body);
            console.log(params);
            response.end('ok');
        });
    }

}).listen(port, host, () => console.log('Server is on'));
