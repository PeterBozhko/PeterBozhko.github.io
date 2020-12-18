let favoriteCities;

window.onload = function (){
    localStorage.clear()
    loadFavorites()
    // loadHome()
    initialization()
}

serverLink = 'https://localhost:8080'

function initialization() {
    for (let btn of document.querySelector('header').getElementsByClassName('btn')){
        btn.addEventListener('click', updateCoord);
    }
    let form = document.querySelector("form");
    form.addEventListener("submit", addCity);
}

async function getWeatherbyServer(url){
    let response = await fetch(url, {method: 'GET'})
    if (response.ok) {
        return await response.json()
    } else {
        throw "error"
    }
}

async function getWeather(url){
    let response = await fetch(url, );
    if (response.ok) {
        return await response.json()
    } else {
        throw "error"
    }
}

function getWeatherByName(cityName){
    let requestURL = serverLink + '/weather/city?' + 'q=' + cityName;
    return getWeatherbyServer(requestURL);
}

//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
function getWeatherByCoord(lat, lon){
    let requestURL = apiLink + '&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
    return getWeather(requestURL);
}

// function recieveWeatherData(cityName) {
//     return {
//   "coord": {
//     "lon": -122.08,
//     "lat": 37.39
//   },
//   "weather": [
//     {
//       "id": 800,
//       "main": "Clear",
//       "description": "clear sky",
//       "icon": "01d"
//     }
//   ],
//   "base": "stations",
//   "main": {
//     "temp": 282.55,
//     "feels_like": 281.86,
//     "temp_min": 280.37,
//     "temp_max": 284.26,
//     "pressure": 1023,
//     "humidity": 100
//   },
//   "visibility": 16093,
//   "wind": {
//     "speed": 1.5,
//     "deg": 350
//   },
//   "clouds": {
//     "all": 1
//   },
//   "dt": 1560350645,
//   "sys": {
//     "type": 1,
//     "id": 5122,
//     "message": 0.0139,
//     "country": "US",
//     "sunrise": 1560343627,
//     "sunset": 1560396563
//   },
//   "timezone": -25200,
//   "id": 420006353,
//   "name": "Mountain View",
//   "cod": 200
//   };
// }
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
    card.querySelector('li').id = data.name;
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

async function addCity(event) {
    event.preventDefault()
    let input = event.currentTarget.querySelector('input')
    let cityName = input.value.toLowerCase()
    input.value = '';
    if (cityName === '') return;
    let response = await fetch("http://localhost:8080/favourites/" + encodeURI("Asha"), { method: 'POST', credentials: 'include', secure: true})
    if (response.ok) {
        return await response.json()
    } else {
        console.log(response)
    }
    // let card_loader = document.getElementById('favorite_city_loading').content.cloneNode(true);
    // card_loader.querySelector('h3').innerHTML = cityName;
    // card_loader.querySelector('li').id = cityName
    // card_loader.querySelector('button').addEventListener('click', deleteCity);
    // document.querySelector('ul.favorites-ul').append(card_loader);
    // let data;
    // try {
    //     data = await getWeatherByName(cityName);
    // } catch (err) {
    //     await document.querySelector('ul.favorites-ul').removeChild(document.getElementById(cityName));
    //     alert('Не удалось загрузить информацию');
    //     return;
    // }
    // if (favoriteCities.includes(data.name)) {
    //     await document.querySelector('ul.favorites-ul').removeChild(document.getElementById(cityName));
    //     alert('Город уже в списке');
    // }
    // else {
    //     document.querySelector('ul.favorites-ul').replaceChild(createCityCard(data), document.getElementById(cityName));
    //     favoriteCities.push(data.name)
    //     localStorage.setItem('favoriteList', JSON.stringify(favoriteCities));
    // }
}

function deleteCity(event) {
    let el = event.currentTarget
    let cityName = el.parentNode.querySelector('h3').innerHTML;
    let index = favoriteCities.indexOf(cityName);
    favoriteCities.splice(index, 1);
    localStorage.setItem('favoriteList', JSON.stringify(favoriteCities));
    let card = el.parentNode.parentNode;
    card.parentNode.removeChild(card);
}

async function loadFavorites() {
    if (localStorage.getItem('favoriteList') === null) {
        favoriteCities = [];
        return;
    }
    favoriteCities = JSON.parse(localStorage.getItem('favoriteList'));
    console.log(favoriteCities);
    for (let cityName of favoriteCities) {
        let card_loader = document.getElementById('favorite_city_loading').content.cloneNode(true);
        card_loader.querySelector('h3').innerHTML = cityName;
        card_loader.querySelector('li').id = cityName
        card_loader.querySelector('button').addEventListener('click', deleteCity);
        document.querySelector('ul.favorites-ul').append(card_loader);
    }
    let data;
    for (let cityName of favoriteCities) {
        try {
            data = await getWeatherByName(cityName);
        } catch (err) {
            let error = document.getElementById('error').content.cloneNode(true);
            error.querySelector('button').addEventListener("click", updateCity)
            document.getElementById(cityName).replaceChild(error,document.getElementById(cityName).getElementsByClassName('loading')[0])
            continue;
        }
        document.querySelector('ul.favorites-ul').replaceChild(createCityCard(data), document.getElementById(cityName));
    }
}

function loadHome() {
    let home_loader = document.getElementById('loading').content.cloneNode(true);
    home_loader.querySelector('div').id = "home"
    document.querySelector('main').prepend(home_loader)
    async function showLocation(position) {
        let dataHome;
        try {
            dataHome = await getWeatherByCoord(position.coords.latitude, position.coords.longitude);
        }
        catch (err) {
            errorHandler(err);
            return;
        }
        let home = document.getElementById('home_template').content.cloneNode(true);
        home.querySelector('section').id = "home"
        home.querySelector('h2').innerHTML = dataHome.name;
        home.querySelector('span').insertAdjacentHTML('afterbegin', dataHome.main.temp);
        home.querySelector('div.icon').classList.add('icon-' + weatherIdToIcon(dataHome.weather[0].id));
        let item;
        for (item of cityParameters(dataHome)) {
            home.querySelector('ul.parameters').append(item);
        }
        document.querySelector('main').replaceChild(home,document.getElementsByClassName('loading')[0])
    }

    function errorHandler(err) {
        if(err.code === 1) {
            alert("Ошибка: Доступ к геоданным запрещен.\nИспользован город по умолчанию (Москва).");
            showLocation({"coords": {"latitude": 55.75, "longitude": 37.62}});
        } else if( err.code === 2) {
            alert("Ошибка: Позиция невозможна");
        }
        let home_error = document.getElementById('error').content.cloneNode(true);
        home_error.querySelector('div').id = "home"
        home_error.querySelector('button').addEventListener("click", updateCoord)
        document.querySelector('main').replaceChild(home_error,document.getElementsByClassName('loading')[0])
    }
    if(navigator.geolocation) {

        // timeout at 60000 milliseconds (60 seconds)
        const options = {timeout: 60000};
        navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    } else {
        alert("Браузер не поддерживает геолокацию!\n Использован город по умолчанию (Москва).");
        showLocation({"coords": {"latitude": 55.75, "longitude": 37.62}});
    }
}

function updateCoord() {
    document.getElementById('home').remove();
    loadHome();
}

async function updateCity(event) {
    let cityCard = event.target.parentNode.parentNode
    let cityName = cityCard.id
    let data;
    let loading = document.getElementById('loading').content.cloneNode(true);
    document.getElementById(cityName).replaceChild(loading,document.getElementById(cityName).getElementsByClassName('loading')[0])
    try {
        data = await getWeatherByName(cityName);
    } catch (err) {
        let error = document.getElementById('error').content.cloneNode(true);
        error.querySelector('button').addEventListener("click", updateCity)
        document.getElementById(cityName).replaceChild(error,document.getElementById(cityName).getElementsByClassName('loading')[0])
        alert('Не удалось загрузить информацию');
        return;
    }
    document.querySelector('ul.favorites-ul').replaceChild(createCityCard(data), document.getElementById(cityName));
}