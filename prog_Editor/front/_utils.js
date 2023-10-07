function copyToClipboard(text) {
  let temp = document.createElement('textarea');
  temp.value = text;
  document.body.append(temp);
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);
}


function beauty(code) {
  return code?.trim() ?? ''
}
Object.defineProperty(Object.prototype, 'map', {
  value: function (callback) {
    const result = {};
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        result[key] = callback(this[key], key);
      }
    }
    return result;
  },
});

function separateCode(code) {
  const html = code.replace(/<(style|script)>.*?<\/\1>/gis,
    "")
  const css = code.match(/(?<=<(style)>).*?(?=<\/\1>)/gis,
    "")?.join("\n");
  const js = code.match(/(?<=<(script)>).*?(?=<\/\1>)/gis,
    "")?.join("\n");

  return {
    html, css, js
  }.map(beauty)
}

function sortByLength(code) {
  const CODE = separateCode(code);
  const keysWithContent = Object.keys(CODE).filter(key => CODE[key].length > 0);
  keysWithContent.sort((a, b) => CODE[b].length - CODE[a].length);

  return keysWithContent;

}

/*function addSwipeListener(options) {
    const { distance = 100, callback } = options;
    let startX = 0;
    function handleTouchStart(event) {
      startX = event.touches[0].clientX;
    }
    function handleTouchEnd(event) {
      const endX = event.changedTouches[0].clientX;
      const swipeDistance = endX - startX;
      if (Math.abs(swipeDistance) >= distance) {
        const swipeDirection = (swipeDistance > 0) ? 'left' : 'right';
        callback(swipeDirection);
      }
    }
    document.documentElement.addEventListener('touchstart', handleTouchStart);
    document.documentElement.addEventListener('touchend', handleTouchEnd);
  }*/

function addSwipeListener(options) {
  const {
    distance = 80, minSpeed = 0.5, callback
  } = options;
  let startX = 0;
  let startTime = 0;

  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startTime = Date.now();
  }

  function handleTouchEnd(event) {
    const endX = event.changedTouches[0].clientX;
    const swipeDistance = endX - startX;
    const endTime = Date.now();

    const timeDiff = endTime - startTime;

    // Calcula la velocidad en píxeles por milisegundo
    const swipeSpeed = Math.abs(swipeDistance) / timeDiff;

    if (Math.abs(swipeDistance) >= distance && swipeSpeed >= minSpeed) {
      const swipeDirection = (swipeDistance > 0) ? 'left': 'right';
      callback(swipeDirection);
    }
  }

  document.documentElement.addEventListener('touchstart', handleTouchStart);
  document.documentElement.addEventListener('touchend', handleTouchEnd);
}

// Uso de la función con un umbral de velocidad mínimo


function obtenerIndiceStringMasLargo(strings) {
  let indiceMasLargo = 0;
  let longitudMasLarga = 0;

  for (let i = 0; i < strings.length; i++) {
    if (strings[i].length > longitudMasLarga) {
      longitudMasLarga = strings[i].length;
      indiceMasLargo = i;
    }
  }

  return indiceMasLargo;
}


const createHtml = ({
  css, html, js
}) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <base href="${resources}" target="_self"/>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style id="preview-style">
  ${css}
  </style>
  <script>
  function logToConsole(message){
  setTimeout(_=> window.parent.postMessage(message, "*") , 500)

  }
  for (const key of Object.keys(console)) {
  window.console[key] = function(...args) {
  const logArgs = args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg);
  logToConsole(key + ": " + logArgs.join(" "));
  };
  }
  </script>
  </head>
  <body>
  ${html}
  <script>
  ${js}
  </script>
  </body>
  </html>`
}


let previewUrl = null;

function getPreviewUrl() {
  return previewUrl
}

function updatePreview( {
  html, css, js
}) {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl)
  }

  const htmlForPreview = createHtml({
    html, css, js
  })

  const blob = new window.Blob([htmlForPreview], {
    type: 'text/html'
  })

  previewUrl = URL.createObjectURL(blob)

  /* if (previewWindowRef?.deref()) {
     previewWindowRef.deref().location = previewUrl
   }*/
}

function generateIdentifier(inputString) {
  const hash = inputString.hashCode(); // Usamos la función hashCode() como ejemplo
  const identifier = String(hash)//.slice(0, 4); // Tomamos los primeros 3 dígitos del hash

  return identifier;
}

String.prototype.hashCode = function () {
  let hash = 0;
  if (this.length === 0) return hash;

  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convierte a un valor entero de 32 bits
  }

  return hash;
};


function limpiarLocalStorage(claveUltimaLimpieza, tiempoLimpiezaEnDias) {
  const now = new Date().getTime();
  const tiempoLimpiezaEnMilisegundos = tiempoLimpiezaEnDias * 24 * 60 * 60 * 1000; // Convertir días a milisegundos

  // Obtenemos la fecha de la última limpieza (si existe)
  const ultimaLimpieza = localStorage.getItem(claveUltimaLimpieza);

  // Verificamos si no existe registro de la última limpieza
  // o si ha pasado más de tiempoLimpiezaEnMilisegundos desde la última limpieza
  if (!ultimaLimpieza || (now - parseInt(ultimaLimpieza)) >= tiempoLimpiezaEnMilisegundos) {
    // Realizamos la limpieza de datos
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i);
      let datos;
      try{
        datos = JSON.parse(localStorage.getItem(clave));
      }
      catch(error){
        console.log(`Hubo un error al acceder a la clave ${clave}: ${error}`)
        continue
      }
      
//console.log(datos)
      if (datos?.now && (now - datos.now) >= tiempoLimpiezaEnMilisegundos) {
        console.log('remove')
        // Los datos son más antiguos de tiempoLimpiezaEnMilisegundos, así que los eliminamos
        localStorage.removeItem(clave);
      }
      console.log("dndjdb")
    }

    // Guardamos la nueva fecha de la última limpieza
    localStorage.setItem(claveUltimaLimpieza, now.toString());
  }
}

