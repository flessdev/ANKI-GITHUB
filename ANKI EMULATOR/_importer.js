const remoteDir = "http://localhost:8000/Android/data/io.spck/files/anki_Github/"
let insideDir;

function copyAttribute(node, $elem){
  for (let i = 0; i < node.attributes.length; i++) {
    const attribute = node.attributes[i];
    $elem.setAttribute(attribute.name, attribute.value);
  }
}
async function loadScript(container, elem) {
  return new Promise((resolve, reject) => {
    if (elem.tagName === 'SCRIPT') {
        const script = document.createElement('script');
        copyAttribute(elem, script)
        script.setAttribute('crossorigin', 'anonymous')
      if (elem.src) {
        script.onload = resolve;
        script.onerror = reject;
        container.appendChild(script);
      } else if (elem.textContent) {
        script.textContent = elem.textContent;
        container.appendChild(script);
        resolve();
      }
    } else if (elem.tagName === 'LINK') {
      const link = document.createElement('link');
      /*link.rel = elem.rel;
      link.href = elem.href;*/
      copyAttribute(elem, link)
      link.onload = resolve;
      link.onerror = reject;
      container.appendChild(link);
    } else {
      // Handle other elements as needed
      resolve();
    }
  });
}


async function insertHtmlCode(container, code) {
  const div = document.createElement('div');
  div.innerHTML = code;
  
 // console.log(container)
  nodeArray = [...div.children]
  //console.log(nodeArray.map(e => e.outerHTML))
  for(node of nodeArray){
    //console.log(node.outerHTML)
  }
  for(node of nodeArray){
    if (node.nodeType === Node.TEXT_NODE) {
      container.appendChild(document.createTextNode(node.textContent));
    }
    else if (node.nodeType === Node.ELEMENT_NODE) {
      //console.log(node.outerHTML)
     
      if(node.nodeName == 'SCRIPT' || node.nodeName == 'LINK'){
       await loadScript(container, node)
      }
      else {
        const $elem = document.createElement(node.nodeName);
        for (let i = 0; i < node.attributes.length; i++) {
          const attribute = node.attributes[i];
          $elem.setAttribute(attribute.name, attribute.value);
        }
        $elem.innerHTML = node.innerHTML;
        container.appendChild($elem);
      }
      
    }
  }
}


async function extractHtml(dir, debug = false){
//lastCode = document.documentElement.textContent
//const erudaX = consoleX ? `<script src="eruda.js"><\/script><script>eruda.init()<\/script>` : ""
const debugX = debug ? `<script src="checkErrors.js"><\/script>` : ""
insideDir = `${remoteDir}${dir}`;
const baseStart = `<base />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

<script>
 const $base = document.querySelector("base");
 $base.href= "${insideDir}";
<\/script>`

const baseEnd = `
${debugX}
<script>
  $base.href= ""
  window.dispatchEvent(new Event('load'));
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
        /*const doc = new DOMParser().parseFromString(xhr.responseText, 'text/html')
        const scripts = doc.querySelectorAll('script')
        scripts.forEach(script => {
          script.setAttribute('crossorigin', 'anonymous');
        });
        document.open();
        document.write(baseStart + doc.documentElement.outerHTML + baseEnd);
        document.close();*/
        //document.body.innerHTML += baseStart
        
        text = `<script>console.log('gato')<\/script>`
        
        let code = baseStart + xhr.responseText + baseEnd
        
        //console.log(code)
       
          insertHtmlCode(document.querySelector("body"), code)
       
        //document.body.innerHTML += baseEnd
    } else {
        console.error('Error en la solicitud XHR. Código de estado: ' + xhr.status);
    }
};

// Envía la solicit
xhr.send();

}
