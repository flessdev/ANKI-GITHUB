const remoteDir = "http://localhost:8000/Android/data/io.spck/files/anki_Github/"
let insideDir;
const cardId = AnkiDroidJS.ankiGetCardId();
const cardSide = AnkiDroidJS.ankiIsDisplayingAnswer() ? 'back' : 'front';
const newCardCount = AnkiDroidJS.ankiGetNewCardCount();
const revCardCount = AnkiDroidJS.ankiGetRevCardCount();
const ETA = AnkiDroidJS.ankiGetETA();

function extractHtml(direction, consoleX) {
  let dir;
  if (direction.includes('/')) {
    dir = direction;
  } else {
    dir = `${direction}/${cardSide}/index.html`
  }

  const erudaX = consoleX ? `<script src="${remoteDir}eruda.js"><\/script><script>eruda.init()<\/script>` : "";

  insideDir = `${remoteDir}${dir}`;

  const baseStart = `
  <base>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  
  ${erudaX}
  <script>
  const $base = document.querySelector("base");
  $base.href = insideDir;
  <\/script>`

  const baseEnd = `
  <script>
  $base.href= ""
  <\/script>`



  var xhr = new XMLHttpRequest();
  xhr.open('GET', insideDir);
  xhr.setRequestHeader('Content-Type', 'text/plain');

  // Configura el manejo de errores
  xhr.onerror = function() {
    console.error('Hubo un error en la solicitud XHR.');
  };

  xhr.onload = function() {
    if (xhr.status === 200) {
      // La solicitud se completó con éxito
      doc = new DOMParser().parseFromString(xhr.responseText, 'text/html');
      const scripts = doc.querySelectorAll('script')
      scripts.forEach(script => {
        script.setAttribute('crossorigin', 'anonymous');
      });
      const code = doc.documentElement.outerHTML

      document.open();
      document.write(baseStart + code + baseEnd);
      document.close();
    } else {
      console.error('Error en la solicitud XHR. Código de estado: ' + xhr.status);
    }
  };

  // Envía la solicitud
  xhr.send();

}