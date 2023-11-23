ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.9.6')
clearStorage('lastClean', 0.4)



const identifier = cardId;

let retrievedData;
try {
  retrievedData = JSON.parse(localStorage.getItem(identifier));
}catch(e) {
  console.error(`retrievedData no es objeto: ${e}`)
}
const badCodeObj = retrievedData?.code ?? separateCode(bad_code)
const goodCodeObj = separateCode(good_code) 

let index = retrievedData?.index ?? 0;

enabledLanguages = enabledLanguages ? enabledLanguages.split(/\s+/)
: good_code ? goodCodeObj.sortByLength()
: bad_code ? badCodeObj.sortByLength() : ["html", "css", "js"];



$(".instructions").html(instructions.trim())

//$('#console').dragable()

window.onload = () => {
  update()
  $goodIframe.attr('srcdoc', good_code);
}

const $badIframe = $('.front iframe')
const $goodIframe = $('.back iframe');

const $pretiffy = $('.prettify')
//const $changeBtn = $('.change');
const $banner = $('.banner')
const $saveBtn = $('button.save');
console.log('test1')



$saveBtn.click(_ => {
  let a = group1['html']?.getValue()?.trim() ?? badCodeObj.html;
  let b = group1['css']?.getValue()?.trim() ?? badCodeObj.css;
  let c = group1['js']?.getValue()?.trim() ?? badCodeObj.js;
  
  a = a ? a: false;
  b = b ? `<style>\n${b}\n<\/style>`: false;
  c = c ? `<script>\n${c}\n<\/script>`: false;
  copyToClipboard([a, b, c].filter(e => e).join('\n'))
})


async function getBeatify(editor) {
  await import ("https://cdnjs.cloudflare.com/ajax/libs/ace/1.25.1/ext-beautify.min.js");
  const beautify = ace.require("ace/ext/beautify");
  $pretiffy.click(_ => {
    beautify.beautify(editor.session)
  })
}


class createGroup {
  constructor(selector, codeObj, iframe) {
    this.CODE = codeObj//separateCode(code);

    this.editor = ace.edit(selector, {
      fontFamily: window.getComputedStyle(selector).fontFamily,
      theme: 'ace/theme/terminal',
      showGutter: false,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      printMargin: false,
      scrollPastEnd: 1,
    })
  

    //LINTER
    //const provider = LanguageProvider.fromCdn("https://www.unpkg.com/ace-linters@latest/build/");
    //provider.registerEditor(this.editor);
    console.log('test2')
    enabledLanguages.forEach((b, c) => {
      const lang = (b == 'js') ? 'javascript': b;
      this[b] = ace.createEditSession(this.CODE[b]);
      console.log('4')
      this[b].setOptions({
        tabSize: 1,
        mode: `ace/mode/${lang}`,
        wrap: true,

      })
      console.log("test3")
    })
      


    this.editor.on('change', update);


    this.getValues = function() {
      const values = {
        html: this['html']?.getValue() ?? this.CODE.html,
        css: this['css']?.getValue() ?? this.CODE.css,
        js: this['js']?.getValue() ?? this.CODE.js
      }
      return createHtml(values)
    }
  }
}


const group1 = new createGroup($('.front .editor').get(0), badCodeObj, $badIframe)
getBeatify(group1.editor)


const DIRECTIONS = {
  right: (r, i) => ++i % r,
  left: (r, i) => (--i + r) % r,
  undefined: (r, i) => i
}

function changer(direction) {
  const range = enabledLanguages.length;
  index = DIRECTIONS[direction](range, index)
  $(".front").attr('language', enabledLanguages[index])

  group1.editor.setSession(group1[enabledLanguages[index]])
}

$(".front").attr('language', enabledLanguages[index])
group1.editor.setSession(group1[enabledLanguages[index]])
group1.editor.renderer.setPadding(20)

function centerSelection() {
  group1.editor.centerSelection()
 /* //https://stackoverflow.com/questions/19048964/how-to-center-the-selection-in-ace-editor
  var cursorTop = group1.editor.renderer.$cursorLayer.getPixelPosition(0).top;
  //gets distance between cursor and left side of textarea in pixels
  var scrollerWidth = group1.editor.renderer.$size.scrollerHeight;
  //gets the width of the text area (that can be seen)
  group1.editor.renderer.scrollToY(cursorTop - scrollerWidth / 2);
  //moves the scroller so that the left side i at the same point as the cursor minus half the width of the area that can be seen*/
}
group1.editor.on("changeSelection", function(){
  setTimeout(centerSelection, 0)
});
$(window).resize(function(){
  setTimeout(centerSelection, 0)
})
addSwipeListener({
  distance: 70,
  callback: d => changer(d)
});

$banner.click(function() {
  //alert(keyboard.isOpen())
  if (keyboard.isOpen) group1.editor.focus()
})




function toggleInstructions(){
  $('.instructions').toggleClass('hidden');
  $('.slide').toggleClass('hidden')
}

$(".instructions").click(toggleInstructions);
$(".slide").click(toggleInstructions);

$(window).resize(function(){
  $('.instructions').addClass('hidden');
  $('.slide').removeClass('hidden')
  
  //Esta condición soluciona el problema que ocurría al hacer click en el iframe ya que se enfocaba el editor ace abriendo el teclado inespearadamente
  if(!keyboard.isOpen){
    group1.editor.blur()
  }
});


$("#buttons").click(function(e){
  //e.stopPropagation()
})

$('.mostrar').on('touchstart',
  _ => {
    $goodIframe.toggleClass('zindex');
  });




function updateIframe(iframe, srcdoc){
  $base.href = window.location.href;
  iframe.attr('srcdoc', srcdoc);
  iframe.on('load', function() {
    $base.href = insideDir;
  })
}

$('.update').click(_ => {
  updateIframe($goodIframe, good_code)   
  update()
})

document.addEventListener('DOMContentLoaded',
  () => {

    window.addEventListener("message", function(event) {
      if (event.source === $badIframe.get(0).contentWindow) {
        $console = $("#console")[0];
        $console.textContent += event.data + '\n';
        $console.scrollTop = $console.scrollHeight 
      }
    });

  })

let interval = null;
const now = new Date().getTime();
const doc = document.querySelector('.front iframe').contentWindow.document

function update() {
  if (interval) clearInterval(interval)
  $("#console").text('')


  //updatePreview(page)
  //$iframe.src =  getPreviewUrl()

  interval = setTimeout(_ => {
    updateIframe($badIframe, group1.getValues());
    //Lo de abajo es para el localStorage👇
    const value = {
      code: {
        html: group1.html?.getValue() ?? badCodeObj['html'],
        css: group1.css?.getValue() ?? badCodeObj['css'],
        js: group1.js?.getValue() ?? badCodeObj['js']
      },
      now,
      index
    }

    console.log(index)


    localStorage.setItem(identifier, JSON.stringify(value))
  }, 250)
}

//$base.href = lastHref;