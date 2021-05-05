const key = 'at_GinPIoU3Gs7Kur1WqgcQMGakOYcGa'
let ipAddress = '';
//1.輸入資料後
const input = document.querySelector("input");
const button = document.querySelector("button");
button.addEventListener("click",()=>{
// 2.取得input值
ipAddress = input.value.trim();
if(ipAddress =='')alert("this cannot be empty!");
console.log(input.value);
// 3.帶入axios中
axios.get(`https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ipAddress}`)
// .then(item=>console.log(item))
.then(item=>item = item.data)
.then(item=>setInput(item.ip,item.location.country,item.location.timezone,item.isp,item.location.lat,item.location.lng))
.catch((err) => console.log(err))
})


input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      ipAddress = input.value.trim();
      if(ipAddress =='')alert("this cannot be empty!");
      console.log(input.value);
      // 3.帶入axios中
      axios.get(`https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ipAddress}`)
      // .then(item=>console.log(item))
      .then(item=>item = item.data)
      .then(item=>setInput(item.ip,item.location.country,item.location.timezone,item.isp,item.location.lat,item.location.lng))
      .catch((err) => console.log(err));
      input.value = ""
    }
});



function setInput(ipValue,locationValue,timeZoneValue,ISPValue,latValue,lngValue){
    const ip = document.getElementById("ip");
    const location = document.getElementById("location");
    const timeZone = document.getElementById("timeZone");
    const isp = document.getElementById("isp");
    ip.innerHTML = ipValue;
    location.innerHTML=locationValue;
    timeZone.innerHTML = `UTC ${timeZoneValue}`;
    isp.innerHTML = ISPValue;
    setMarker(latValue,lngValue);
}


setMarker(37.38605, -122.08385);
var mymap = L.map("map",{
    center:[37.38605, -122.08385],
    zoom:13
})
function setMarker(latValue,lngValue){
mymap = L.map('map').setView([latValue, lngValue], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);
    var blackIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    var marker = L.marker([latValue, lngValue],{icon:blackIcon}).addTo(mymap);
}






