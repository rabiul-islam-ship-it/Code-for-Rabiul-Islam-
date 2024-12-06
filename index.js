const numbersHours = document.querySelector(".numbers_Hours");
const barSeconds = document.querySelector(".bar-seconds");


const NumberElement = [];
const barElement = [];


for (let i = 0; i <= 12; i++) {
   
    NumberElement.push(
        `<span style = "--index:${i};"><p>${i}</p></span>`
    )
    
};

numbersHours.insertAdjacentHTML("afterbegin",NumberElement.join(''));



for (let i = 0; i <= 60; i++) {

   
barElement.push(
    `<span style = "--index:${i};"><p></p></span>`
)
   
};


barSeconds.insertAdjacentHTML("afterbegin",barElement.join('')); 


const handHours = document.querySelector(".hand.hours");
const handMinutes = document.querySelector(".hand.minutes");
const handSeconds = document.querySelector(".hand.seconds");

function curentTime() {

    let date = new Date();
    let curentHours = date.getHours();
    let curentMinutes = date.getMinutes();
    let curentSeconds = date.getSeconds();


    handHours.style.transform = `rotate(${curentHours * 30 + curentMinutes /2}deg)`;
    handMinutes.style.transform = `rotate(${curentMinutes * 6}deg)`;

handSeconds.style.transform = `rotate(${curentSeconds * 6}deg)`;

    
}


curentTime();

setInterval(curentTime,1000);



