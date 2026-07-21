let kelimeler=[];

let secilen=null;


let engellenenler =
JSON.parse(
localStorage.getItem("engellenenler")
) || [];



async function baslat(){


let cevap =
await fetch("words.json");


kelimeler =
await cevap.json();



filtrele();



randomWord();



istatistik();


}




function filtrele(){


kelimeler =
kelimeler.filter(k=>{


return !engellenenler.includes(

k.value.word.toLowerCase()

);


});


}




function randomWord(){


if(kelimeler.length===0){

document.getElementById("word").innerHTML =
"Bitti";

return;

}



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

secilen &&
yeni.value.word ===
secilen.value.word

);



secilen=yeni;


goster();


}





function goster(){


let k =
secilen.value;



document.getElementById("word").innerHTML =
k.word;



document.getElementById("level").innerHTML =
"Seviye: "+(k.level || "-");



document.getElementById("type").innerHTML =
"Tür: "+(k.type || "-");



let yazi="";


if(k.examples){


k.examples
.slice(0,5)
.forEach(ornek=>{


yazi +=
"💬 "+ornek+"<br>";


});


}



document.getElementById("example").innerHTML =
yazi;



document.getElementById("stats").innerHTML =

"Engellenen kelime: "
+
engellenenler.length;



}





function blockla(){


let kelime =
secilen.value.word.toLowerCase();



if(
!engellenenler.includes(kelime)
){


engellenenler.push(kelime);



localStorage.setItem(

"engellenenler",

JSON.stringify(
engellenenler
)

);


}



kelimeler =
kelimeler.filter(k=>

k.value.word.toLowerCase()
!==kelime

);



randomWord();



}




function seslendir(){


if(!secilen)
return;



let ses =
new Audio(
secilen.value.us.mp3
);



ses.play();


}





if(
"serviceWorker" in navigator
){


navigator.serviceWorker.register(
"sw.js"
);


}



baslat();
