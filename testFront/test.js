// describe('App', () => {
//     let sandbox
//
//     beforeEach(() => {
//         sandbox = sinon.createSandbox()
//     })
//
//     afterEach(() => {
//         sandbox.restore()
//     })
//     console.log(this)
//     sinon.stub(this, 'getWeatherByName').returns({
//         "name": 'name',
//         "temp": 100,
//         "pressure": 100,
//         "clouds": 1,
//         "humidity": 75,
//         "coord": {
//             "lon": 33.33,
//             "lat": 44.44
//         },
//         "wind": {
//             "speed": 2.5,
//             "deg": 330
//         },
//         "weather": 1,
//         "success": true,
//         "message": ""
//     })
//     describe('#loadFavorites', () => {
//         it('Should get 3 cities', async () => {
//             sandbox.stub(this, 'getFavourites').returns({success: true, cities: ["Аша", "Москва", "Челябинск"]})
//             await loadFavorites()
//             assert.equal(document.getElementsByClassName('favorites-ul')[0].children.length, 3)
//             for (let child of document.getElementsByClassName('favorites-ul')[0].children){
//                 document.getElementsByClassName('favorites-ul')[0].removeChild(child)
//             }
//
//         })
//     })
//     describe('#loadFavorites', () => {
//         it('Should get 4 cities', async () => {
//             sandbox.stub(this, 'getFavourites').returns({success: true, cities: ["Аша", "Москва", "Челябинск","City17"]})
//             await loadFavorites()
//             console.log(document.getElementsByClassName('favorites-ul')[0].children)
//             assert.equal(document.getElementsByClassName('favorites-ul')[0].children.length, 4)
//         })
//     })
// })