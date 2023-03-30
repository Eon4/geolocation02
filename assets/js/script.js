//CONSTANT FOR OUR BUTTON
const button = document.querySelector("button");
//OUR ADVENTLISTENER FOR PERMISSION TO LOCATE USER
button.addEventListener("click", ()=>{
    if(navigator.geolocation){
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        button.innerText = "Your browser does not support this";
    }
});
//FUNCTION FOR DETECTING LOCATIONG - BY USING FETCH WITH AN OPEN API AND A APIKEY CAN WE FIND LONGITUDE AND ALTITUDE + MORE INFO AS CITY, NUMBER AND MORE
function onSuccess(position){
    button.innerText = "Detecting your location...";
    let {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e440bc1538c24e3084bc4c993d6025a6`)
    .then(response => response.json()).then(response =>{
        let allDetails = response.results[0].components;
        console.table(allDetails);
//HERE CAN BE ADDED MORE INFO THAT NEEDS TO BE DISPLAYED WHICH IS SHOWN IN THE CONSOLE LOG
        let {road, house_number, postal_city, postcode, country} = allDetails;
        button.innerText = `${road} ${house_number}, ${postal_city}, ${postcode}, ${country}`;
    }).catch(()=>{
        button.innerText = "Something went wrong";
    });
}
//IF AN ERROR ACCOUR - EACH OF THESE MESSAGES WILL POP UP
function onError(error){
    if(error.code == 1){
        button.innerText = "You denied the request";
    }else if(error.code == 2){
        button.innerText = "Location is unavailable";
    }else{
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}