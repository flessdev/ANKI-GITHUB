const $ = s => document.querySelector(s);

/*let completo = `<h1>He<h1>

function gato(){
  console.log(gatiquiur)
}`;
let incompleto = `f{
   conle g
  }`;
let resultado = '';
completoArray = Array.from(completo)
//incompletoArray = Array.from(incompleto).filter(char => char != ' ' )
let  inc = 0;
//console.log(incompletoArray)
//for (let i = 0; i < completo.length; i++) {
const resultado = Array.from(completo).map(char => {
  if(incompleto.charAt(inc) == char) {
    inc++
    return char
  }
  else if(char == ' '){
    return ' '
  }
  else if(char == '\n'){
    return '\n'
  }
  else{
    return '_'
  }
  
})

console.log(resultado);*/


  console.log('Hello World!');
/*const completo = `Pxepito grillo</h1> 
se va a comprar heladito
const hello = "proto"
hello = hello + "gato"
function(){
 console.log('gatiquiur')
}
<style>
h1{
  color: 'red'
  }
</style>`
const incompleto = `Pyepito  grill</>  ompra  eldito
const llo = ""
hello =  + "ga
fu(){
  console.('gat')
 
 color: 'r'
 
 </style>`

/* completo = `Hello Papitos fritas
 gato raul`
incompleto = `Hello Petos itas
geto fuera`*/

$instructions.innerHTML = instructions
completo = good_code
incompleto = bad_code
/*
const com = Array.from(completo);
const inc = Array.from(incompleto.replace(/\s+/g, ""))
//console.log(inc)
let c = 0;
let i = 0;
let cx = 1;
let ix = 1
let result = "";

console.log(com.length)

let iterations = 0;
while (c < com.length && iterations < 5000) {
  iterations++
  if (com[c] == " ") {
    result += " "
    c++
    cx = c + 1
  }
  else if (com[c] == "\n") {
    result += "\n"
    c++
    cx = c + 1
  }
  //console.log(x, result[i])
  else if (com[c] == inc[i]) {
    result += com[c];
    c++;
    i++;
    cx = c + 1; // Reinicia x
    ix = i + 1
  }
  else {
    //Si ya no hay más carácteres (osea nada coincidió) 
    if (cx >= com.length || ix >= inc.length) {
      result += "?"
      cx = ++c
      ix = ++i
    }

    //si el limite fue activado porque se encontró coincidencia
    //Abajo => Arriba
    else if (inc[i] == com[cx] && inc[i + 1] == com[cx + 1]) {
      result += "_"
      c++
      ix = i
    }
    //Si encuentra dos carácteres similares
    //Arriba => Abajo
    else if (com[c] == inc[ix] && com[c + 1] == inc[ix + 1]) {
      result += com[c]
      cx = ++c
      ix = ++i

    }
    else {
      ix++;
      cx++
    }
  }
}
console.log(result);
console.log(iterations) 

*/
result = replaceByUnderScores(completo, incompleto)




const $editor = $('.editor')
$editor.value = result



var evento = new KeyboardEvent('keyup', {
  key: 'Delete',
  code: '',
  keyCode: 46,
  charCode: 0,
  which: 46,
  shiftKey: false,
  ctrlKey: false,
  altKey: false,
  metaKey: false,
});

window.prompt = () => false

let failChar = false
let spacePressed = false
let enterPressed = false
let insertWord = "";

initialLength = $editor.value.length
$editor.addEventListener("keydown", function() {
  prompt('keydown')
 lastValue = this.value
 lastStartPost = this.selectionStart
 lastEndPost = this.selectionEnd
 
})
$editor.addEventListener('keyup', function(e){
  //prompt('')
 //evitar borrado de texto
 if(event.keyCode == 8 || this.value.length != initialLength ){
  alert("no borrado")
  this.value = lastValue
  this.selectionEnd = lastEndPost
  this.selectionStart = lastStartPost
 }
 if (spacePressed) {
   spacePressed = false
   //El menos 1 es para eliminar el espacio al tocar el boton espacio
   updateCursorPosition($editor, insertWord.length - 1)
   
 
 }
 else if(failChar && !spacePressed){
   //alert("fail char no space")
   this.selectionEnd = lastEndPost
   this.selectionStart = lastStartPost
   failChar = false
   
 }
 
   console.log('Pressed')
   
})
function updateCursorPosition(elem, num){
  const startPos = elem.selectionStart;
  const endPos = elem.selectionEnd;
  elem.selectionStart = elem.selectionEnd = startPos + num
}


//https://www.codingbeautydev.com/blog/javascript-simulate-keypress
function insertTextAtCursor(element, text) {
  element.focus();
  let access;
  if(element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement
  ){
    console.log("Hola+")
    access = "value"
  }else{
    access = "textContent"
  }
  const startPos = element.selectionStart;
  const endPos = element.selectionEnd;
  const before = element[access].substring(0, startPos);
  const after = element[access].substring(endPos+ text.length, element[access].length);
  element[access] = before + text + after;
  insertWord = text 
  window.dispatchEvent(new Event('keyup'));
}

$editor.addEventListener('textInput', function(event)
{
  console.log("textUnput Funcccqqq")
  char = event.data
  event.preventDefault()
  const cursorPosition = this.selectionStart 
  const textBeforeCursor = completo.substring(cursorPosition - 1, cursorPosition);
  
  const textAfterCursor = completo.substring(cursorPosition, cursorPosition + 1);
  
  if(char == ' ') {
    spacePressed = true
    const next = getNextAfterCursor(completo, cursorPosition);
    insertTextAtCursor(this, next)
  }
  //console.log(event)
  else if(char == '\n'){
    enterPressed = true
    console.log("enter")
  }
    
    //alert(textAfterCursor +  "/"+ char)
    
  else if (textAfterCursor == char) {
    insertTextAtCursor(this, char)
      
     // event.preventDefault()
    //alert("correct")
  }
  else {
    event.preventDefault()
    failChar = true
  }
});

//$('button').onclick = hint

function getNextAfterCursor(el, cursorPosition = el.selectionStart){
  const textBeforeCursor = el.substring(cursorPosition);
  return text = textBeforeCursor.split(/([A-Za-z]+|\W)/).filter(word => word !== '')[0];  //.split(/(\W+)/).filter(word => word !== '')[0]
}
//insertTextAtCursor(editor, text)


/*const editor = ace.edit($editor, {
  theme: "ace/theme/monokai",
  mode: "ace/mode/html",
  value: $editor.value
});*/



/*$editor.addEventListener('keyup', function(event) {
  var key = String.fromCharCode(event.charCode); // Obtén la letra ingresada
  console.log(key);
  
  // Verifica si la letra ingresada es "a"
 // if (key === 'a') {
    event.preventDefault(); // Evita que se muestre la letra "a"
  //}
});*/


/*document.addEventListener('input', check);

function check(){
  //event.preventDefault()
  char = event.data
  console.log(char)
  /*const cursorPosition = this.selectionStart
  const textBeforeCursor = completo.substring(cursorPosition - 1, cursorPosition);
  
  const textAfterCursor = completo.substring(cursorPosition, cursorPosition +1);
  //alert(textBeforeCursor, char)
  if(textBeforeCursor == char){
    alert("coote")
    lastValue = this.value
  }
  else{
    event.preventDefault()
  }
  console.log(textAfterCursor)
}*/


/*

let completo = `este 
es un texto cecd`;
let incompleto = `te es un texto c`;
let resultado = "";

let inc = 0;
completoArray = Array.from(completo)
incompletoArray = Array.from(incompleto)

resultado = completoArray.map((char, i) => {
  if(!(incompletoArray[inc] == char)){
    return "_"
  }
  else {
  inc++
  return char
  }
})
console.log(resultado);

/*




function dividirCadena(cadena) {
  // Utiliza una expresión l para dividir la cadena
  const partes = cadena.split(/(\W)/).filter(part => part !== '' && part !== ' ');

  return partes;
}

const codigo = `function saludar(){ console.log("Gato") }`;
 resultado = dividirCadena(codigo);
console.log(resultado);





const correctText = "Cristobal Colón descubrió America"
const incompleteText = "Cristobal descubrió"


const $ = s => document.querySelector(s);

const $editor = $('textarea')

$editor.value = incompleteText

$('button').onclick = autocompleteWord

function autocompleteWord() {
  const cursorPosition = $editor.selectionStart
  const textBeforeCursor = incompleteText.substring(0, cursorPosition);
  const textAfterCursor = incompleteText.substring(cursorPosition);
  console.log(textBeforeCursor)
  
  correctText.split()     
}





"Cristobal Colon descubrio"
"bal Colon des"*/