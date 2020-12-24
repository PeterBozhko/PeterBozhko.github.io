const fetchMock = require("jest-fetch-mock")
fetchMock.enableMocks();
const front = require('../js/script.js')
const sinon = require('sinon')
let sampleRequest = {
    "name": 'name',
    "temp": 100,
    "pressure": 100,
    "clouds": 1,
    "humidity": 75,
    "coord": {
        "lon": 33.33,
        "lat": 44.44
    },
    "wind": {
        "speed": 2.5,
        "deg": 330
    },
    "weather": 1,
    "success": true,
    "message": ""
}

fetch.mockResponse(JSON.stringify(sampleRequest));
test("just for test", () => {
    expect(2).toBe(2)
});
test("#wheatherID should return sunny", (done) => {
        expect(front.weatherIdToIcon(800)).toEqual('sunny')
        done()
    }
)

// test('#loadFavorites should get 3 cities', async (done) => {
//     fetch.mockResponseOnce(JSON.stringify({success: true, cities: ["Аша", "Москва", "Челябинск"]}));
//     await front.loadFavorites()
//     expect(document.getElementsByClassName('favorites-ul')[0].children.length).toEqual(3)
//     for (let child of document.getElementsByClassName('favorites-ul')[0].children){
//         document.getElementsByClassName('favorites-ul')[0].removeChild(child)
//     }
// });
// test('#loadFavorites should get 4 cities', async (done) => {
//     sandbox.stub(front, 'getFavourites').returns({success: true, cities: ["Аша", "Москва", "Челябинск", "Казань"]})
//     await front.loadFavorites()
//     expect(document.getElementsByClassName('favorites-ul')[0].children.length).toEqual(3)
//     for (let child of document.getElementsByClassName('favorites-ul')[0].children){
//         document.getElementsByClassName('favorites-ul')[0].removeChild(child)
//     }
// })