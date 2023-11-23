console.log('Hello World!');
hljs.addPlugin(mergeHTMLPlugin);
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
$("#instructions").innerHTML = instructions;

$iframe = $('iframe');
$iframe.srcdoc = good_code
let lastElFocus;
document.addEventListener('focus', function(e){
    //prompt("input")
  if(e.target.tagName === 'INPUT'){
    lastElFocus = e.target
  }
}, true)
$("#showBlock").onclick = showBlock 

function showBlock(){
  lastElFocus.value = lastElFocus.dataset.correct
  lastElFocus.classList.add("accert");
  lastElFocus.disabled = true
  $('code input:not(.accert)')?.focus()
  //lastElFocus.focus()
}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").addEventListener('touchstart', dragTouchStart);
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.addEventListener('touchstart', dragTouchStart);
  }

  function dragTouchStart(e) {
    e = e.changedTouches[0];
    //e.preventDefault();
    // get the touch position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.ontouchend = closeDragElement;
    // call a function whenever the touch moves:
    document.ontouchmove = elementTouchMove;
  }

  function elementTouchMove(e) {
    e = e.changedTouches[0];
    //e.preventDefault();
    // calculate the new touch position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when the touch is released:*/
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

dragElement($("#iframe"))

const text1 = good_code
const text2 = bad_code

var diff = new diff()//{editCost: 9}); // options may be passed to constructor; see below
var textDiff = diff.main(text1, text2); // produces diff array
console.log(textDiff)

function getCharacterWidth(elem, character = 'a') {
        const fontSize = window.getComputedStyle(elem).fontSize;
        const fontFamily = window.getComputedStyle(elem).fontFamily;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        context.font = `${fontSize} ${fontFamily}`;
        const characterWidth = context.measureText(character).width;

        return characterWidth;
    }


//split(/([A-Za-z]+|\W)/).filter(word => word !== '')

const prettyHtml = function(diffs) {
  var html = [];
  var pattern_amp = /&/g;
  var pattern_lt = /</g;
  var pattern_gt = />/g;
  var pattern_br = /\n/g;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];    // Operation (insert, delete, equal)
    var data = diffs[x][1];  // Text of change.
    var text = data/*.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
        .replace(pattern_gt, '&gt;').replace(pattern_br, '<br/>');*/
    switch (op) {
      case DIFF_INSERT:
        //html[x] = `<ins>${text}</ins>`;
        break;
      case DIFF_DELETE:
        arr = text.split(/([A-Za-z]+|\W)/).filter(word => word !== '')
        let data = ""
        for(text of arr){
          //prompt(text)
          if (text == " ") {
            data += " "
            continue
          }
          if(text == "\n"){
            data += "\n"
            continue
          }
          const $input = document.createElement('input');
          //$input.setAttribute("oninput", "input()");
          $input.classList.add('block')
          $input.maxLength = text.length;
          $input.style.width = text.length * getCharacterWidth(document.querySelector('#code')) + "px";
          $input.dataset.correct = text;
          
          data += $input.outerHTML;  //`<input oninput="input()" maxlength="${text.length}" style="width: ${text.length * getCharacterWidth(document.querySelector('body'))}px" data-correct='${text}'>`;
          //prompt($input.outerHTML)
        }
        
        html[x] = data
        
        break;
      case DIFF_EQUAL:
        html[x] = text.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
          .replace(pattern_gt, '&gt;').replace(pattern_br, '<br/>');;
        break;
    }
  }
  return html.join('');
};

console.log("test2")


$("#code").innerHTML = prettyHtml(textDiff)




hljs.highlightElement($("#code"));
var blocks = document.querySelectorAll(".block");

console.log("test3")
blocks.forEach(function(block) {
  block.addEventListener('input', inputX);
  block.addEventListener('textInput', textInputX);
});

console.log("test4")

function textInputX(event) {
  console.log('textInput');
        const el = event.target;
        const correct = event.target.dataset.correct;
        const position = el.selectionStart
        char = event.data
        
        
        //prompt(correct[position])
        if(char == " ") return showBlock.call(this)
        else if(char != correct[position]){
          event.preventDefault()
        }
     
    }
    
    function inputX(event){
      console.log("input")
      const el = this
      const correct = event.target.dataset.correct;
      if (el.value == correct) {
        //$correctAnswer.load()
        event.target.classList.add("accert");
        event.target.disabled = true
        $('code input:not(.accert)')?.focus()
        return
      }
      //$badAnswerAudio.load()*/
    }

 /*console.log = _=> false;
 console.warn = _=> false*/

    
    /*const $badAnswerAudio = $('.badAnswer');
    const $correctAnswer = $('.correctAnswer');
    const $code = $('#code');
    $code.classList.add(language)*/
    
    let answersIsShowed = false;
        
    HTMLMediaElement.prototype.load = function() {
        this.currentTime = 0;
        this.play()
    }

    function showAnswers() {
        $$('code input:not(.accert)').forEach(el => {
            el.value = "";
            el.placeholder = el.dataset.correct
        })
    }
    $('#showAnswers').onclick = showAnswers
    //EL INPUT AL INICIO AL PARECER SE HA DESABILITADO
    
    