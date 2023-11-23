$ = s => document.querySelector(s);
$literal = $('#literal');
$english = $('#english');
$spanish = $('#spanish');
$explanation = $('.explanation');
$playBtn = $('button');
$a = $("a.downloadAudio");



$explanation.textContent = explanation

$playBtn
  .addEventListener('click', playAudio);

const [english, spanish] = example.split('\n');

$spanish.textContent = spanish



function sanitizeFilename(filename) {
  // Reemplaza cualquier caracter no válido con un guión bajo
  const sanitized = filename.replace(/[^a-zA-Z0-9-_.]/g, "_");
  // Elimina los puntos al final del nombre del archivo
  const cleanSanitized = sanitized.replace(/\.*$/, "");
  return cleanSanitized;
}

$a.href = `tasker://secondary?sentence=${english}&filename=${sanitizeFilename(english)}`





/*Pronunciación TTS
 const WORD = encodeURIComponent(english);
 const URL = `https://code.responsivevoice.org/getvoice.php?t=${WORD}&tl=en-US&key=7ymL04OE`
 $audio.href = `playsound:${URL}`
 window.location = $audio*/

/**Pronunciacion TTS Amazon**/

function playAudio() {
  /*new Audio(`file:///storage/3EBD-19EE/Videos_Ingles_Anki/${sanitizeFilename(english)}.wav`).play();*/

  window.location = `playsound:file:///storage/3EBD-19EE/Videos_Ingles_Anki/${sanitizeFilename(english)}.wav`
}

//playAudio()



//Traducción Literal

var apiURL = `https://api.mymemory.translated.net/get?q=${english}&langpair=en-US|es-ES`;


const lsData = localStorage.getItem(cardId);

if (lsData) {
  $literal.textContent = lsData
}
else {
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      totext = data.responseData.translatedText;
      $literal.textContent = totext
      localStorage.setItem(cardId, totext)
    })
}




function loadLiteral() {
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      totext = data
        .responseData.translatedText;
      $literal.textContent = totext
    })
}
//loadLiteral()