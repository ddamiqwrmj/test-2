async function randomWord(){


let data =
await fetch("words.json");


let words =
await data.json();


let word =
words[
Math.floor(
Math.random()*words.length
)
];


document.getElementById("word").innerHTML =
word.word;


document.getElementById("meaning").innerHTML =
word.meaning;


document.getElementById("example").innerHTML =
word.example;


}


if("serviceWorker" in navigator){

navigator.serviceWorker.register("sw.js");

}