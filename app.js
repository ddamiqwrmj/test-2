let kelimeler=[];
let secilenKelime=null;


async function yukle(){

let cevap =
await fetch("words.json");


kelimeler =
await cevap.json();


randomWord();

}



function randomWord(){


let yeni;


do{

yeni =
kelimeler[
Math.floor(
Math.random()*kelimeler.length
)
];


}
while(
secilenKelime &&
yeni.word === secilenKelime.word
);



secilenKelime=yeni;


document.getElementById("word").innerHTML =
yeni.word;


document.getElementById("meaning").innerHTML =
"🇹🇷 "+yeni.meaning;


document.getElementById("example").innerHTML =
"💬 "+yeni.example;


}



function seslendir(){


let ses =
new SpeechSynthesisUtterance(
secilenKelime.word
);


ses.lang="en-US";


speechSynthesis.speak(ses);


}



if("serviceWorker" in navigator){

navigator.serviceWorker.register("sw.js");

}


yukle();
