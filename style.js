var lat = document.getElementById("lat");
var long = document.getElementById("long");
var speed = document.getElementById("speed").firstChild;
var utim = 1000;   //millisec
var overlay  = document.getElementById("overlay");
var opt = document.getElementById("option");
opt.addEventListener("click",()=>{
    opt.style.display = "none";
    document.getElementById("menu").style.display = "flex";
});
function update()
{
    this.navigator.geolocation.getCurrentPosition((pos)=>{
    overlay.style.display = "none";
    console.log(pos);
    lat.innerHTML = "Latitude : " + pos.coords.latitude;
    long.innerHTML = "Longitude : " + pos.coords.longitude;
    speed.innerHTML = "Speed : " + pos.coords.speed;
  },()=>{
        overlay.style.display = "flex";
    },{maximumAge:1000000,timeout:500000,enableHighAccuracy:true});
}
setInterval(update,utim);