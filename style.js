var lat = document.getElementById("lat");
var long = document.getElementById("long");
var speed = document.getElementById("speed").firstChild;
var overlay  = document.getElementById("overlay");
var opt = document.getElementById("option");
var acc = document.getElementById("speed").childNodes[5];
var oldts = 0;
var l = 0;
var ll = 0;
function l2m(lat1,lat2,lon1,lon2)
{
    var R = 6371000;
    var rlat1 = lat1;
    var rlat2 = lat2;
     var dlat = (lat2-lat1);
     var dlon = (lon2-lon1);
    var a = Math.sin(dlat/2)*Math.sin(dlat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(rlat1)*Math.sin(rlat2);
    var c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    var m = R*c;
    return m;
}
opt.addEventListener("click",()=>{
    opt.style.display = "none";
    document.getElementById("menu").style.display = "flex";
});
function sspeed(d,t)
{
    return d/t;
}
this.navigator.geolocation.watchPosition((pos)=>{
    console.log(pos);
    overlay.style.display = "none";
    var nl = pos.coords.latitude;
    var nll = pos.coords.longitude;
    lat.innerHTML = "Latitude : " + pos.coords.latitude;
    long.innerHTML = "Longitude : " + pos.coords.longitude;
    var se = sspeed(l2m(l,ll,nl,nll),(pos.timestamp - oldts)/1000);
    speed.innerHTML = "Speed : " + se;
    acc.innerHTML = "Accuracy : " + pos.coords.accuracy;
    oldts = pos.timestamp;
    l = nl;
    ll = nll;
},()=>{
    console.log("ERROR");
    overlay.style.display = "flex";
},{enableHighAccuracy:true,timeout:5000,maximumAge:1000000});
