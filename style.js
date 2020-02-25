var lat = document.getElementById("lat");
var long = document.getElementById("long");
var speed = document.getElementById("speed").firstChild;
var utim = 1000;   //millisec
var overlay  = document.getElementById("overlay");
var opt = document.getElementById("option");
var acc = document.getElementById("speed").childNodes[5];
opt.addEventListener("click",()=>{
    opt.style.display = "none";
    document.getElementById("menu").style.display = "flex";
});
this.navigator.geolocation.watchPosition((pos)=>{
    console.log(pos);
    overlay.style.display = "none";
      lat.innerHTML = "Latitude : " + pos.coords.latitude;
    long.innerHTML = "Longitude : " + pos.coords.longitude;
    speed.innerHTML = "Speed : " + pos.coords.speed;
      acc.innerHTML = "Accuracy : " + pos.coords.accuracy;
},()=>{
    overlay.style.display = "flex";
},{enableHighAccuracy:!0,timeout:5000,maximumAge:1000000});
