let favoriteCities;

let apiKey = 'a98bacd5e04d94e1bbd3afd506d56bb2';
let apiLink = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&';

window.onload = function (){
    localStorage.clear()
    loadFavorites()
}

async function getWeather(url){
    let response = await fetch(url);
    if (response.ok) {
        return await response.json()
    } else {
        alert("Ошибка HTTP: " + response.status);
        return null
    }
}

function getWeatherByName(cityName){
    let requestURL = apiLink + 'q=' + cityName + '&appid=' + apiKey;
    return getWeather(requestURL);
}

function recieveWeatherData(cityName) {
    return {
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
  };
}
function weatherIdToIcon(id){
    if(id === 800)
        return 'sunny';
    if(id === 801)
        return 'partly-sunny';
    if(id === 802)
        return 'cloudy';
    if(id >= 803)
        return 'very-cloudy';
    if(id >= 700)
        return 'very-cloudy';
    if(id >= 600)
        return 'snow';
    if(id >= 500 && id <= 504)
        return 'rain-sun';
    if((id >= 300) || (id >= 520 && id <= 531))
        return 'rain';
    if(id >= 200)
        return 'thunder';
    return '';
}

function degreesToDirection(degrees) {
    const directions = [
        "северный", "северо-северо-восточный", "северо-восточный", "восточно-северо-восточный",
        "восточный", "восточно-юго-восточный", "юго-восточный", "юго-юго-восточный",
        "южный", "юго-юго-западный", "юго-западный", "западно-юго-западный",
        "западный", "западно-северо-западный", "северо-западный", "северо-северо-западный", "северный"];
    return directions[Math.round(degrees/22.5)]
}

function cityParameters(data) {
    let items = []

    let params = [
        {name: 'Ветер', value: data.wind.speed + ' м/с, ' + degreesToDirection(data.wind.deg)},
        {name: 'Облачность', value: data.clouds.all + '%'},
        {name: 'Давление', value: data.main.pressure + ' гПа'},
        {name: 'Влажность', value: data.main.humidity + '%'},
        {name: 'Координаты', value: '[' + data.coord.lon + ', ' + data.coord.lat + ']'}];

    for (const param of params) {
        let infoItem = document.getElementById('parameters').content.cloneNode(true);
        infoItem.querySelector('b').innerHTML = param.name;
        infoItem.querySelector('span').innerHTML = param.value;
        items.push(infoItem);
    }

    return items;
}

/*
<li>
            <div class="description">
                <h3></h3>
                <p>&deg;C</p>
                <div class="icon icon-partly-sunny"></div>
                <button class="btn-cancel">&times;</button>
            </div>
            <ul class="parameters">
            </ul
        </li>
 */
function createCityCard(data) {
    let card = document.getElementById('favorite_city').content.cloneNode(true);
    card.querySelector('li').setAttribute('data-city_id', data.id);
    card.querySelector('h3').innerHTML = data.name;
    card.querySelector('p').insertAdjacentHTML('afterbegin', data.main.temp);
    card.querySelector('div.icon').classList.add('icon-' + weatherIdToIcon(data.weather[0].id));
    card.querySelector('button').addEventListener('click', deleteCity);
    let item;
    for (item of cityParameters(data)) {
        card.querySelector('ul.parameters').append(item);
    }
    return card
}

async function addCity() {
    let cityName = document.getElementById('new-city').value;
    if(cityName === ''){
        return;
    }
    if(favoriteCities.includes(cityName)) {
        alert('Город уже есть в списке');
        return;
    }
    favoriteCities.push(cityName)

    let card_loader = document.getElementById('favorite_city_loading').content.cloneNode(true);
    card_loader.querySelector('h3').innerHTML = cityName;
    card_loader.querySelector('li').id = cityName

    document.querySelector('ul.favorites-ul').append(card_loader);
    localStorage.setItem('favoriteList', JSON.stringify(favoriteCities));
    document.querySelector('ul.favorites-ul').replaceChild(createCityCard(await getWeatherByName(cityName)), document.getElementById(cityName));
}

function deleteCity(event) {
    let el = event.currentTarget
    let cityName = el.parentNode.querySelector('h3');
    let index = favoriteCities.indexOf(cityName);
    favoriteCities.splice(index, 1);
    localStorage.setItem('favoriteList', JSON.stringify(favoriteCities));
    let card = el.parentNode.parentNode;
    card.parentNode.removeChild(card);
}

function loadFavorites() {
    if (localStorage.getItem('favoriteList') === null) {
        favoriteCities = [];
        return;
    }
    favoriteCities = JSON.parse(localStorage.getItem('favoriteList'));
    console.log(favoriteCities);
    for (let cityName of favoriteCities) {
        console.log(cityName);
        createCityCard(getWeatherByName(cityName));
    }
}