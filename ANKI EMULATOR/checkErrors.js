( function(){

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



function check(){
const codeaxx = `
  <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify-html.min.js"><\/script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/monokai.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"><\/script>
  
  <style>
   pre{
     height: 60vh;
     width: 100%;
     border: 1px solid green;
     overflow: auto;
   }
   code{
     height: inherit;
     width: inherit
   }
  </style>
  <pre><code class="language-html"></code></pre>
  <script>
     const $code = document.querySelector("code")
     $code.textContent += html_beautify(document.documentElement.outerHTML)
     hljs.highlightAll()
  <\/script>
  `
  insertHtmlCode(document.body,codeaxx)
  
}
setTimeout(check, 2500)

})()
