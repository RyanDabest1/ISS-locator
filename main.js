let ISSURL = 'https://api.wheretheiss.at/v1/satellites/25544'
var myIcon = L.icon({
    iconUrl: 'ISS.png',
    iconSize: [53, 45],
});
var map = L.map('map', {
    center: [0,0],
    zoom: 1.6
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

let marker = L.marker([0, 0 ], {icon: myIcon}).addTo(map);
let firsttime = true;
const getISS =  async () => {
    let response = await fetch(ISSURL);
    let ISSData = await response.json()
    document.getElementById('latitude').innerHTML =  ISSData.latitude;
    document.getElementById('longitude').innerHTML =  ISSData.longitude;
    marker.setLatLng([ISSData.latitude, ISSData.longitude])
    if(firsttime){
        map.setView([ISSData.latitude, ISSData.longitude], 1)
        firsttime = false;
    }
}
getISS()
setInterval(getISS, 2000)
