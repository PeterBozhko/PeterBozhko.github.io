let favoriteCities = [];

function recieveWeatherData(cityName) {
    return {
        name: cityName,
        temperature: 13,
        wind: 'wind',
        clouds: 'clouds',
        pressure: 'pressure',
        humidity: 'humidity',
        coords: 'coordinates'
    };
}
/*
<li>
                <div class="description">
                    <h3>Moscow</h3>
                    <p>8&deg;C</p>
                    <img class="image" src="img/image.png" alt="weather's icon">
                    <button class="cancel-btn">&times;</button>
                </div>
                <ul class="parameters">
                    <li><b>Ветер</b>5 m/s</li>
                    <li><b>Облачность</b>Низкая</li>
                    <li><b>Давление</b>огорооменное</li>
                    <li><b>Влажность</b>сойдёт %</li>
                    <li><b>Координаты</b>хмммм</li>
                </ul>
            </li>
 */
function createCityCard(city) {
    let card = document.createElement('li');

    let cardDescription = document.createElement('div');
    cardDescription.setAttribute('class', 'description');

    let cardCityName = document.createElement('h3');
    cardCityName.innerHTML = city.name;
    cardDescription.append(cardCityName);

    let cardTemperature = document.createElement('p');
    cardTemperature.innerHTML = city.temperature + '&deg;C';
    cardDescription.append(cardTemperature);

    let cardIcon = document.createElement('img');
    cardIcon.setAttribute('class', 'icon_weather');
    cardIcon.setAttribute('src', 'img/image.png')
    cardIcon.setAttribute('alt',"weather's icon")
    cardDescription.append(cardIcon);

    let cardDeleteButton = document.createElement('button');
    cardDeleteButton.setAttribute('class', 'cancel-btn');
    cardDeleteButton.innerHTML = '&times;'
    cardDeleteButton.setAttribute('onclick', 'deleteCity(this);');
    cardDescription.append(cardDeleteButton);

    card.append(cardDescription);

    let cardInfo = document.createElement('ul');
    cardInfo.setAttribute('class', 'parameters');

    let weatherData = {wind: 'Ветер', clouds: 'Облачность', pressure: 'Давление', humidity: 'Влажность', coords: 'Координаты'};

    for(const [key, value] of Object.entries(weatherData)) {
        let infoItem = document.createElement('li');
        let infoName = document.createElement('b');
        infoName.innerHTML = value;

        infoItem.append(infoName);
        infoItem.append(city[key]);

        cardInfo.append(infoItem);
    }
    card.append(cardInfo);

    document.getElementsByClassName('favorites-ul')[0].append(card);
}

function addCity() {
    let cityName = document.getElementById('new-city').value;
    if(cityName === ''){
        return;
    }
    if(favoriteCities.includes(cityName)) {
        alert('Город уже есть в списке');
        return;
    }
    favoriteCities.push(cityName);
    localStorage.setItem('favoriteList', JSON.stringify(favoriteCities));
    createCityCard(recieveWeatherData(cityName));
}
