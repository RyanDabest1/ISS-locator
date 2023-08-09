let tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
let attribution = "© OpenStreetMap"
var map = L.map('ISSmap').setView([0, 0], 2);
L.tileLayer(tileURL, {attribution, maxZoomout : 2}).addTo(map)
var ISS = L.icon({
    iconUrl: './ISS.png',
    iconSize: [62, 32],
});
let marker = L.marker([0,0], {icon : ISS}).addTo(map)

let firstTime = true;
async function getISS(){
    let response = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
    let data = await response.json()
    let {latitude, longitude} = data;
    marker.setLatLng([latitude, longitude])
    if(firstTime){
        map.setView([latitude, longitude], 1)
        firstTime = false;
    }
    document.getElementById('latitude').innerHTML = latitude +"°";
    document.getElementById('longitude').innerHTML = longitude+"°"
}
getISS()

setInterval(getISS, 1000)

