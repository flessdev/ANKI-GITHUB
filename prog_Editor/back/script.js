const identifier = generateIdentifier(bad_code + good_code)

  
let retrievedData;
try{
  retrievedData = JSON.parse(localStorage.getItem(identifier));
}catch(e){
  console.error(`retrievedData no es objeto: ${e}`)
}
const badCodeObj = retrievedData?.code ?? separateCode(bad_code)

let index = retrievedData?.index ?? 0;

    
  const goodCodeObj = separateCode(good_code)
  
  
  /*window.onload = _=> {
  update()
  $goodIframe.attr('srcdoc', good_code);
  }*/
  enabledLanguages = (enabledLanguages != "")
  ? enabledLanguages.split(/\s+/): sortByLength(good_code)//["html", "css", "js"];


  $youIframe = $('iframe').eq(0)
  $goodIframe = $('iframe').eq(1)

  $(".instructions").text(instructions)
  /* $good = $('.good')
  $you = $('.you')
  $changeBtn = $('.change');
  $saveBtn = $('button.save');
  let i = 0;
  $saveBtn.click(_=>{
  let a = grouphtml?.editor.getValue().trim();
  let b = css?.editor.getValue().trim();
  let c = js?.editor.getValue().trim();
  a = a ? a : false;
  b = b ? `<style>\n${b}\n<\/style>` : false;
  c = c ? `<script>\n${c}\n<\/script>` : false;
  copyToClipboard([a,b,c].filter(e => e).join('\n'))
  })
  */

  class createGroup {
    constructor(selector, code, iframe) {
      this.CODE = code;
      this.editor = ace.edit(selector, {
        theme: 'ace/theme/monokai',
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        printMargin: false,
        scrollPastEnd: true

      })

      //LINTER
      /*const provider = LanguageProvider.fromCdn("https://www.unpkg.com/ace-linters@latest/build/");
      provider.registerEditor(this.editor);*/

      this.EDITORS = enabledLanguages.reduce((a, b, c) => {
        const lang = (b == 'js') ? 'javascript': b;
        a[b] = ace.createEditSession(this.CODE[b]);
        a[b].setOptions({
          tabSize: 1,
          mode: `ace/mode/${lang}`,
          wrap: true
        })
        return a
      }, {})


      this.getValues = function() {
        const values = {
          html: this.EDITORS['html']?.getValue() ?? this.CODE.html,
          css: this.EDITORS['css']?.getValue() ?? this.CODE.css,
          js: this.EDITORS['js']?.getValue() ?? this.CODE.js
        }
        return createHtml(values)
      }




    }
  }

  const group1 = new createGroup($('.front .editor').get(1), goodCodeObj, $goodIframe);
  const group2 = new createGroup($('.front .editor').get(0), badCodeObj, $youIframe);

  function changer() {
    index = (index + 1) % enabledLanguages.length
    $(".front").attr('language', enabledLanguages[index])
    group1.editor.setSession(group1.EDITORS[enabledLanguages[index]])
    group2.editor.setSession(group2.EDITORS[enabledLanguages[index]])
  }
  $(".front").attr('language', enabledLanguages[index])
  group1.editor.setSession(group1.EDITORS[enabledLanguages[index]])
  group2.editor.setSession(group2.EDITORS[enabledLanguages[index]])
  /*
  const good = new createEditors($('.good .editor')[0], good_code, $goodIframe)
  const you = new createEditors($youTemplate, $('.you .editor-files'), $youIframe);
  const group = [good, you]
  */
  $(window).resize(_ => {
    $('.instructions').addClass('compress')
  });

  $('.instructions').click(function() {
    $(this).toggleClass('compress')
  })
  /*
  $('.banner').click(focusCurrent )
  function focusCurrent(){
  keyboard ? group[current].list[i].editor.focus() : null
  }*/
  let sideIndex = 0;
  $('.mostrar').on('touchstart', _ => {
    side = [".front", ".back"]
    sideIndex = ++sideIndex % side.length;
    $currentSide = $(side[sideIndex]);
    $(".side").removeClass('active');
    $currentSide.addClass('active')
    update()
  }); /*
  $('mostrar').click(focusCurrent);
  const DIRECTIONS = {
  right: (r, i) => ++i % r,
  left: (r, i) => (--i + r) % r,
  undefined: _ => i
  }
  $changeBtn.click( _=> changer('right') );
  function changer(direction) {
  let $editorFilesChilds = group[current].container.children()
  //console.log($editorFilesChilds)
  range = $editorFilesChilds.length //starts from 1
  console.log(range)
  i = DIRECTIONS[direction](range, i);
  group[0].container.children().css('z-index', -10)
  group[0].container.children().eq(i).css('z-index', '')
  group[1].container.children().css('z-index', -10)
  group[1].container.children().eq(i).css('z-index', '')
  focusCurrent()
  }*/
  //changer()
  addSwipeListener({
    distance: 70,
    callback: d => changer(d)
  });
  $('.update').click(update)

  /*
  const consoleCode = ` < pre id = 'prekio'><\/pre > < script >
  console.log = s => {
  //let code = document.createElement('code');
  //code.id = 'codekio';
  prekio.insertAdjacentHTML('afterbegin', JSON.stringify(s, undefined, 1) + '<br>');
  //prekio.append(code)
  } < \/script > < style >
  #prekio {
  position: fixed;
  margin: 0;
  background-color: #000a;
  box-sizing: border-box;
  overflow: scroll;
  padding: 3px;
  max-height: 80%;
  max-width: 100%;
  word-wrap: break-word;
  white-space: pre-wrap;
  bottom: 0;
  right: 0;
  color: lime;
  }
  #codekio {
  color: lime;
  word-wrap: break-word;
  white-space: pre-wrap;
  } < \/style >`*/
  function update() {
    $goodIframe.attr('srcdoc', group1.getValues());
    $youIframe.attr('srcdoc', group2.getValues());
  }

  /*
  window.onresize = _=> {
  setTimeout(_ => {
  group[current].list[i].editor.centerSelection()
  }, 0)
  }*/