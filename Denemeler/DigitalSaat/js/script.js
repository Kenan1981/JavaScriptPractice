const options =()=>{
    hours.innerText = new Date().getHours().toString().padStart(2, "0");
    minutes.innerText = new Date().getMinutes().toString().padStart(2, "0");
    seconds.innerText = new Date().getSeconds().toString().padStart(2, "0");
    ampm.innerText = new Date().getHours() >= 12 ? "PM" : "AM";
}

setInterval(options, 1000);
