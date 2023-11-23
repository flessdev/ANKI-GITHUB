/* console.log = _=> false;
 console.warn = _=> false*/
hljs.addPlugin(mergeHTMLPlugin);
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);
    const $badAnswerAudio = $('.badAnswer');
    const $correctAnswer = $('.correctAnswer');
    const $code = $('#code');
    $code.classList.add(language)
    $("#instructions").textContent = instructions
    let answersIsShowed = false;
    const correct_code = correct
     let HIDDEN_WORDS_FIELD = words

    console.log('template', correct_code)

    const hidden_words = HIDDEN_WORDS_FIELD ? HIDDEN_WORDS_FIELD.split(/\n/) : [];

    
    function escapeHTML(str) {
        return str.replace(/<([^>]+)>|<\/([^>]+)>/g, (match, openTag, closeTag) => {
          if (openTag) {
            return `&lt;${openTag}&gt;`;
          } else if (closeTag) {
            return `&lt;/${closeTag}&gt;`;
          }
        });
    }    
        //function(match) {
        /*   return {
             //'&': '&amp;',
             //'<': '&lt;',
             //'>': '&gt;',
             //'"': '&quot;',
             //"'": '&#39;'
             '/>' : '/&gt;'
           } [match];
         });*/
    

    function unescapeHTML(str) {
      return str.replace(/&lt;([^&]+)&gt;|&lt;\/([^&]+)&gt;/g, (match, openTag, closeTag) => {
        if (openTag) {
          return `<${openTag}>`;
        } else if (closeTag) {
          return `</${closeTag}>`;
        }
      });
    }

    function beatify(cod) {
        let code = cod.trim()
        //Remove leading spaces
        var array = code.split(/\n/);
        array[0] = array[0].trim();
        console.log(array[0])
        code = array.join("\n");
        //Actual beautify (prettify)
        //code = js_beautify(code);
        return code
    }

    function getCharacterWidth(elem, character = 'a') {
        const fontSize = window.getComputedStyle(elem).fontSize;
        const fontFamily = window.getComputedStyle(elem).fontFamily;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        context.font = `${fontSize} ${fontFamily}`;
        const characterWidth = context.measureText(character).width;

        return characterWidth;
    }

    String.prototype.escapeSpecialChars = function() {
        return this.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') //.replace(/\s/g, "\\s")
    }
    String.prototype.unescapeSpecialChars = function() {
        return this.replace(/\\([-/\\^$*+?.()|[\]{}])/g, '$1');
    };


    HIDDEN_WORDS_FIELD = HIDDEN_WORDS_FIELD.escapeSpecialChars();
   

    // Función para reemplazar las palabras ocultas con un input
    function ocultarPalabrasCodigo(codigo, palabrasOcultas, start = '123', end = '321') {
        let modifiedCode = codigo;
        console.log(modifiedCode)
        modifiedCode = escapeHTML(modifiedCode)
        console.log(modifiedCode)
        //ENCLOSE_WORDS

        palabrasOcultas = palabrasOcultas.map(escapeHTML)
        console.log(palabrasOcultas)
        var regex = new RegExp(`(${palabrasOcultas.join('|')})`, 'g');
        //var regex = `/(${palabrasOcultas.map(x => x.escapeSpecialChars()).map(escapeHTML).join('|')})/g`;
        console.log(regex)
        //modifiedCode = modifiedCode.replace(regex, `[[[$1]]]`)

        const charWidth = getCharacterWidth($code);
        modifiedCode = modifiedCode.replace(regex, (match, content) => {
            text = unescapeHTML(match);
            console.log(match, content)
            return `<input data-correct="${text}" style="width:${text.length * charWidth}px" maxlength="${text.length}" oninput="input()" value="${answersIsShowed ? text : ''}"/>`;
        });
        console.log(modifiedCode)
        return modifiedCode;
    }

    function input() {
        const el = event.target;

        if (el.value.length != el.getAttribute('maxlength')) return
        if (event.target.dataset.correct == event.target.value) {
            $correctAnswer.load()
            event.target.classList.add("accert");
            $('code input:not(.accert)')?.focus()
            event.target.disabled = true
            return
        }
        $badAnswerAudio.load()
    }

    HTMLMediaElement.prototype.load = function() {
        this.currentTime = 0;
        this.play()
    }

    // Muestra el código modificado
    function mostrarCodigoModificado() {
        const codigoModificado = ocultarPalabrasCodigo(correct_code, hidden_words);
        $code.innerHTML = codigoModificado;
    }
    mostrarCodigoModificado()

    // Comprueba las respuestas
    function comprobarRespuestas() {
        mostrarCodigoModificado();
        // Agrega aquí la lógica para comprobar las respuestas del usuario
    }

    function showAnswers() {
        $$('code input:not(.accert)').forEach(el => {
            el.value = "";
            el.placeholder = el.dataset.correct
        })
    }
    //EL INPUT AL INICIO AL PARECER SE HA DESABILITADO
    hljs.highlightAll();