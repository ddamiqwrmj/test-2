let kelimeler = [];
let secilen = null;


async function baslat(){


let cevap = await fetch("words.json");


kelimeler = await cevap.json();



randomWord();


}



function randomWord(){


let index =
Math.floor(
Math.random()*kelimeler.length
);


secilen =
kelimeler[index];


goster();


}



function goster(){


let k =
secilen.value;



document.getElementById("word").innerHTML =
k.word;



document.getElementById("level").innerHTML =
"Seviye: "+k.level;



document.getElementById("meaning").innerHTML =
"Tür: "+k.type;



let ornekler = "";


if(k.examples){

k.examples.forEach(e=>{

ornekler += "💬 "+e+"<br>";

});

}



document.getElementById("example").innerHTML =
ornekler;



}



function seslendir(){


let audio =
new Audio(
secilen.value.us.mp3
);


audio.play();


}



baslat();
