let kelimeler = [];
let sonKelime = null;


async function kelimeleriYukle(){

    let cevap = await fetch("words.json");

    kelimeler = await cevap.json();

}


async function randomWord(){

    if(kelimeler.length === 0){
        await kelimeleriYukle();
    }


    let secilen;


    do {

        secilen =
        kelimeler[
            Math.floor(Math.random()*kelimeler.length)
        ];

    } while(
        kelimeler.length > 1 &&
        secilen.word === sonKelime
    );


    sonKelime = secilen.word;


    document.getElementById("word").innerHTML =
    secilen.word;


    document.getElementById("meaning").innerHTML =
    secilen.meaning;


    document.getElementById("example").innerHTML =
    secilen.example;

}



if("serviceWorker" in navigator){

navigator.serviceWorker.register("sw.js");

}
