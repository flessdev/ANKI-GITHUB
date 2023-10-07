ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.9.6')

const identifier = generateIdentifier(good_code)
const retrievedData = JSON.parse(localStorage.getItem(identifier));



console.log(retrievedData)
let badCodeObj;

if(retrievedData?.code){
  badCodeObj = retrievedData.code
}else badCodeObj = separateCode(bad_code);

enabledLanguages = enabledLanguages
? enabledLanguages.split(/\s+/): good_code
? sortByLength(good_code): ["html",
  "css",
  "js"];


$(".instructions").text(instructions)
//$('#console').dragable()

limpiarLocalStorage('ultimaLimpieza', 1);

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
  let a = group1['html']?.getValue().trim();
  let b = group1['css']?.getValue().trim();
  let c = group1['js']?.getValue().trim();

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
      theme: 'ace/theme/monokai',
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
let index = retrievedData?.index ? retrievedData.index: 0;

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

addSwipeListener({
  distance: 70,
  callback: d => changer(d)
});

$banner.click(function() {
  //alert(keyboard.isOpen())
  if (keyboard.isOpen()) group1.editor.focus()
})



$(window).resize(_ => {
  $('.instructions').addClass('compress');
});


$('.instructions').click(function() {
  $(this).toggleClass('compress')
})

$('.mostrar').on('touchstart',
  _ => {
    $goodIframe.toggleClass('zindex');
  });






$('.update').click(_ => {
  $goodIframe.attr('srcdoc', good_code);
  update()
})

document.addEventListener('DOMContentLoaded',
  () => {

    window.addEventListener("message", function(event) {
      if (event.source === $badIframe.get(0).contentWindow) {
        $("#console")[0].textContent += event.data + '\n';
      }
    });

  })

let interval = null;
const now = new Date().getTime();

function update(language, code) {
  if (interval) clearInterval(interval)
  $("#console").text('')


  //updatePreview(page)
  //$iframe.src =  getPreviewUrl()
console.log("update")
  interval = setTimeout(_ => {
    $badIframe.attr('srcdoc', group1.getValues());
    console.log('index')
      const value = {
      code: {
        html: group1.html?.getValue() ?? "",
        css: group1.css?.getValue() ?? "",
        js: group1.js?.getValue() ?? ""
      },
      now,
      index
      }
      
    console.log(index)


    localStorage.setItem(identifier, JSON.stringify(value))
  }, 500)
}