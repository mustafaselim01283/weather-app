
var data=[]
var nextd;
var afterNextd;

async function apidata(city){
    var list=await fetch(`https://api.weatherapi.com/v1/forecast.json?key= 57b5036cff3b43699b202240232002&q=${city}&days=3&aqi=no&alerts=no`)
    var listdata=await list.json()
    data=listdata
    document.querySelector('.lod').classList.add('d-none')
    nextd=data.forecast.forecastday[1]
    afterNextd=data.forecast.forecastday[2]
    
    console.log(data);
    
    
}

var submit=document.querySelector("#subm")
var input=document.querySelector("#input");
input.addEventListener('input', function(){
    var code=input.value;
    (async function(){
    await apidata(code)
    
curr()
next()
afternext()

    })();
 
});
(async function(){
await apidata('london')
 curr()
 next()
 afternext()
 
 
})();

function curr(){
    var creatcurr=`
    <div class="cont-head d-flex justify-content-between  align-items-center p-2">
    <p>${getDayName(0)}</p>
    <p>${getmonthe()}</p>
</div>
<div class="cont-body px-4 h-100">
    <div class="text-start">
        <p class="pt-3 fs-4">${data.location.name}</p>
        <div class="d-flex align-items-center justify-content-around text-white my-3">
            <p class=" degre ">${data.current.temp_c}°c</p>
            <img src="${data.current.condition.icon}" class='img-fluid'>
        </div>
        <p class="text-primary my-4">${data.current.condition.text}</p>
        <div class="wind fs-4">
            <span class="me-4 "><i class="fas fa-umbrella"></i>${data.current.humidity}%</span>
            <span class="me-4 "><i class="fas fa-wind"></i>${data.current.wind_kph}km/h</span>
            <span ><i class="far fa-compass"></i>${data.current.wind_dir}</span>
        </div>
        
    </div>
</div>
 
    `
document.querySelector(".curr").innerHTML=creatcurr
}



function next(){
    var nextday=`
    <div class="cont-head2 py-2 ">
    <p>${getDayName(1)}</p>
</div>
<div class=" cont-body2  h-100 pt-5">
    <img src="${nextd.day.condition.icon}" class="img-fluid mb-3">
    <p class="fs-1 text-white">${nextd.day.maxtemp_c}°</p>
    <p>${nextd.day.mintemp_c}°</p>
    <p class="text-primary my-4">${nextd.day.condition.text}</p>
</div>
    `
    document.querySelector(".next").innerHTML=nextday
}

function afternext(){
    var after=`
    <div class="cont-head py-2 ">
    <p>${getDayName(2)}</p>
</div>
<div class="cont-body  h-100 pt-5">
<img src="${afterNextd.day.condition.icon}" class="img-fluid mb-3">
    <p class="fs-1 text-white">${afterNextd.day.maxtemp_c}°</p>
    <p>${afterNextd.day.mintemp_c}°</p>
    <p class="text-primary my-4">${afterNextd.day.condition.text}</p>
</div>
    `
    document.querySelector(".after").innerHTML=after
}


function getmonthe(){

    var monthes=['Janury', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var date=new Date(data.location.localtime)
var monthe=monthes[date.getMonth()]
var daynumber=date.getDate()
var daymounth=daynumber+monthe
return daymounth
};


function getDayName(add){
    var daysList= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var dateday=new Date(data.location.localtime)
    var dayname=daysList[dateday.getDay()+add]
    if((dateday.getDay()+add)>6){
        dayname=daysList[0]
    }
    return dayname

}



