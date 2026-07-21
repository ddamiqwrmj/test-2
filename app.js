let words = [];

let currentWord = null;


let blockedWords =
JSON.parse(
localStorage.getItem("blockedWords")
) || [];



async function init(){


let response =
await fetch("words.json");


words =
await response.json();



filterBlocked();


randomWord();


updateStats();


}




function filterBlocked(){


words =
words.filter(item =>

!blockedWords.includes(
item.value.word.toLowerCase()
)

);


}





function randomWord(){


if(words.length===0){

document.getElementById("word").innerHTML =
"No words available";

return;

}



let newWord;


do{


newWord =
words[
Math.floor(
Math.random()*words.length
)
];


}
while(

currentWord &&
newWord.value.word ===
currentWord.value.word

);



currentWord = newWord;


showWord();


}





function showWord(){


let w =
currentWord.value;



document.getElementById("word").innerHTML =
w.word;



document.getElementById("level").innerHTML =
"Level: "+(w.level || "-");



document.getElementById("type").innerHTML =
"Type: "+(w.type || "-");




document.getElementById("phonetics").innerHTML =

"🇺🇸 "+
(w.phonetics?.us || "-")
+
" &nbsp; "
+
"🇬🇧 "
+
(w.phonetics?.uk || "-");





let examples = "";



if(w.examples){


w.examples
.slice(0,5)
.forEach(sentence=>{


examples +=
"<p>💬 "+sentence+"</p>";


});


}



document.getElementById("example").innerHTML =
examples;



}




function playUS(){


if(!currentWord)
return;



let audio =
new Audio(
currentWord.value.us.mp3
);


audio.play();


}




function playUK(){


if(!currentWord)
return;



let audio =
new Audio(
currentWord.value.uk.mp3
);


audio.play();


}




function blockWord(){


let word =
currentWord.value.word.toLowerCase();



if(
!blockedWords.includes(word)
){


blockedWords.push(word);



localStorage.setItem(

"blockedWords",

JSON.stringify(blockedWords)

);


}



words =
words.filter(item =>

item.value.word.toLowerCase()
!== word

);



randomWord();


updateStats();


}




function updateStats(){


document.getElementById("stats").innerHTML =

"Blocked words: "
+
blockedWords.length;


}



if(
"serviceWorker" in navigator
){

navigator.serviceWorker.register(
"sw.js"
);

}



init();
