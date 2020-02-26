var lat = document.getElementById("lat");
var long = document.getElementById("long");
var speed = document.getElementById("speed").childNodes[3];
var hs = document.getElementById("speed").childNodes[1];
var overlay  = document.getElementById("overlay");
var opt = document.getElementById("option");
var opt0 = document.getElementById("option0");
var acc = document.getElementById("speed").childNodes[5];
var head = document.getElementById("speed").childNodes[7];
var ssw = document.getElementById("menu").childNodes[3];
var ms = true;
var fact = 1;
var oldts = 0;
var l = 0;
var ll = 0;
function d2r(d)
{
    return d*(Math.PI/180);
}
function l2m(lat1,lat2,lon1,lon2)
{
    var R = 6371000;
    var rlat1 = d2r(lat1);
    var rlat2 = d2r(lat2);
     var dlat = d2r(lat2-lat1);
     var dlon = d2r(lon2-lon1);
    var a = Math.sin(dlat/2)*Math.sin(dlat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(rlat1)*Math.sin(rlat2);
    var c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    var m = R*c;
    return m;
}
ssw.onclick = ()=>{
    ms = !ms;
    if(ms)
        hs.innerHTML = ssw.innerHTML = "SPEED (m/s)";
    else
        hs.innerHTML = ssw.innerHTML = "SPEED (KM/h)";
}
opt.addEventListener("click",()=>{
   opt.style.display = "none";
    document.getElementById("menu").style.display = "flex";
});
opt0.addEventListener("click",()=>{
   opt.style.display = "flex";
    document.getElementById("menu").style.display = "none";
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
    console.log(se);
    if(!ms)
        fact = 3.6;
    else
        fact = 1;
    speed.innerHTML = "Speed : " + pos.coords.speed*fact;
    acc.innerHTML = "Accuracy : " + pos.coords.accuracy;
    head.innerHTML = "Heading : " + pos.coords.heading;
    oldts = pos.timestamp;
    l = nl;
    ll = nll;
},()=>{
    overlay.style.display = "flex";
},{enableHighAccuracy:true,timeout:50000,maximumAge:1000000});