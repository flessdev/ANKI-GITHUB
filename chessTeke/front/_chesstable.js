
class ChessTable{
    constructor (parent){
      this.game = new Chess();
      
      this.piezaSeleccionada = null;
      this.casillas = [];
      
      this.alerta = null;
      this.parent = parent;
      
      this.sequence = []
      this.index = -1;
      
      this.options = null
      //this.index = document.querySelectorAll("table").length 
     // alert(this.index)
    }
    init (fen, options){
      this.options = options
      this.validateOptions()
      this.createTable(this.parent)
      this.createCoronateDialog(this.parent)
      
      this.cargarFENEnTablero(fen)
      //alert(this.voltearFEN(fen))
      
      this.anadirEventos();
      
    }
    voltearFEN(fen) {
  // Dividir el FEN en sus partes: posiciones de piezas, turno, enroque, captura al paso, mitad de movimientos y número de movimientos
  const parts = fen.split(' ');
 

  // Voltear las posiciones de piezas
  const reversedPosition = parts[0]
    .split('/')
    .reverse()
    
   .map(row => {
      let reversedRow = row.split("").reverse().join("");/*
      for (let char of row) {
        alert(char)
        if (char === char.toLowerCase()) {
          reversedRow += char.toUpperCase();
        } else if (char === char.toUpperCase()) {
          reversedRow += char.toLowerCase();
        }
      }*/
      return reversedRow;
    })
    .join('/');
alert(reversedPosition)
  // Volver a unir todas las partes del FEN
  const reversedFEN = [
    reversedPosition,
    parts[1] === 'w' ? 'b' : 'w',  // Cambiar el turno
    parts[2],  // Mantener enroque igual
    parts[3],  // Mantener captura al paso igual
    parts[4],  // Mantener mitad de movimientos igual
    parts[5]  // Mantener número de movimientos igual
  ].join(' ');

  return reversedFEN;
}


    createTable(parent){
       let table = document.createElement("table")
       
       table.innerHTML = `<style>
  
  /* Clase para la transición del movimiento */

  .alerta{
    display:none;
    
    
  }
  .dialog{
    width:40px;
    height:40px;
    border:1px solid black;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    background: white;
    
    font-size:26px;
  }
  .dialog img{
    width:35px;
    height:35px;
    
    
  }
.figure th{

  width: 150px;
  height:150px;
  
  border:2px solid;
  
  background: #70727F
}

  table{
    empty-cells: show
    border-collapse:collapse;
    
    border-spacing:0;
  }
  table tr td {
    width: 47px;
    height: 43px;
    
    min-width:37px;
    min-height: 37px;
    
    text-align: center;
    
    vertical-align: middle;
  }
  table tr td .img{
    display: flex;
    justify-content:center;
    align-items: center;
    width:37px;
    height:37px;
  }
  
  .selected{
    background: blue !important
  }
  .possible_move{
    background: green !important
  }
  .capture, .capture_king {
    background: orangered !important
  }
  
  table tr:nth-child(1) td:nth-child(even){
    background: rgb(181, 133, 99)
  }
  table tr:nth-child(2) td:nth-child(odd) {
    background: rgb(181, 133, 99);
  }
  table tr:nth-child(3) td:nth-child(even) {
    background: rgb(181, 133, 99);
  }
  table tr:nth-child(4) td:nth-child(odd) {
    background: rgb(181, 133, 99);
  }
  table tr:nth-child(5) td:nth-child(even) {
    background: rgb(181, 133, 99);
  }
  table tr:nth-child(6) td:nth-child(odd) {
    background: rgb(181, 133, 99);
  }
  table tr:nth-child(7) td:nth-child(even) {
    background: rgb(181, 133, 99);
  }
  table tr:nth-child(8) td:nth-child(odd) {
    background: rgb(181, 133, 99);
  }
  table tr:nth-child(1) td:nth-child(odd){
    background: rgb(240, 217, 181)
  }
  table tr:nth-child(2) td:nth-child(even) {
    background: rgb(240, 217, 181);
  }
  table tr:nth-child(3) td:nth-child(odd) {
    background: rgb(240, 217, 181);
  }
  table tr:nth-child(4) td:nth-child(even) {
    background: rgb(240, 217, 181);
  }
  table tr:nth-child(5) td:nth-child(odd) {
    background: rgb(240, 217, 181);
  }
  table tr:nth-child(6) td:nth-child(even) {
    background: rgb(240, 217, 181);
  }
  table tr:nth-child(7) td:nth-child(odd) {
    background: rgb(240, 217, 181);
  }
  table tr:nth-child(8) td:nth-child(even) {
    background: rgb(240, 217, 181);
  }
  /*
  [data-piece="bP"],
  [data-piece="bB"],
  [data-piece="bR"],
  [data-piece="bN"] img,
  [data-piece="bQ"],
  [data-piece="bK"]{
    transform: rotate(180deg) !important
  }*/
  

</style>`
      if (this.options.orientation == "white"){
     
      
      table.border = true
      table.innerHTML += `
      <!--button onclick='table.undo()'>Undo</button-->
        <tr>
          <td class="a8"></td>
          <td class="b8"></td>
          <td class="c8"></td>
          <td class="d8"></td>
          <td class="e8"></td>
          <td class="f8"></td>
          <td class="g8"></td>
          <td class="h8"></td>
        </tr>
        <tr>
          <td class="a7"></td>
          <td class="b7"></td>
          <td class="c7"></td>
          <td class="d7"></td>
          <td class="e7"></td>
          <td class="f7"></td>
          <td class="g7"></td>
          <td class="h7"></td>
        </tr>
        <tr>
          <td class="a6"></td>
          <td class="b6"></td>
          <td class="c6"></td>
          <td class="d6"></td>
          <td class="e6"></td>
          <td class="f6"></td>
          <td class="g6"></td>
          <td class="h6"></td>
        </tr>
        <tr>
          <td class="a5"></td>
          <td class="b5"></td>
          <td class="c5"></td>
          <td class="d5"></td>
          <td class="e5"></td>
          <td class="f5"></td>
          <td class="g5"></td>
          <td class="h5"></td>
        </tr>
        <tr>
          <td class="a4"></td>
          <td class="b4"></td>
          <td class="c4"></td>
          <td class="d4"></td>
          <td class="e4"></td>
          <td class="f4"></td>
          <td class="g4"></td>
          <td class="h4"></td>
        </tr>
        <tr>
          <td class="a3"></td>
          <td class="b3"></td>
          <td class="c3"></td>
          <td class="d3"></td>
          <td class="e3"></td>
          <td class="f3"></td>
          <td class="g3"></td>
          <td class="h3"></td>
        </tr>
        <tr>
          <td class="a2"></td>
          <td class="b2"></td>
          <td class="c2"></td>
          <td class="d2"></td>
          <td class="e2"></td>
          <td class="f2"></td>
          <td class="g2"></td>
          <td class="h2"></td>
        </tr>
        <tr>
          <td class="a1"></td>
          <td class="b1"></td>
          <td class="c1"></td>
          <td class="d1"></td>
          <td class="e1"></td>
          <td class="f1"></td>
          <td class="g1"></td>
          <td class="h1"></td>
        </tr>

      `
      this.parent.append(table)
      this.table = table
    }
      if (this.options.orientation == "black"){
      //  alert(9)
      //  let table = document.createElement("table");

        table.border = true;

  // Creamos el tablero en orden inverso (desde a1 hasta h8) para que esté orientado para las negras
        for (let rank = 1; rank <= 8; rank++) {
            let row = document.createElement("tr");

          for (let file = 'h'; file >= 'a'; file = String.fromCharCode(file.charCodeAt(0) - 1)) {
              let square = file + rank;
              let td = document.createElement("td");
              td.className = square;
              row.appendChild(td);
          }

          table.appendChild(row);
      }

      this.parent.append(table);
      this.table = table;
      }
    }
    cargarFENEnTablero(fen){
     // alert(this.game.)
      this.game.load(fen);
      this.limpiarTablero()// el FEN en el juego
      
      this.game.SQUARES.forEach((square) => {
        var pieza = this.game.get(square);
      
        var casilla = this.table.querySelector("." + square);
        casilla.classList.add("square")
        //console.log(square)
        if (pieza !== null) {
          casilla.dataset.piece = pieza.color + pieza.type.toUpperCase()
          
          let type = ""
          
          if (pieza.color == "w"){
            if (pieza.type.toLowerCase() == "k"){
              type="&#9812"
            }
            if (pieza.type.toLowerCase() == "q") {
              type = "&#9813"
            }
            if (pieza.type.toLowerCase() == "r") {
              type = "&#9814"
            }
            if (pieza.type.toLowerCase() == "b") {
              type = "&#9815"
            }
            if (pieza.type.toLowerCase() == "n") {
              type = "&#9816"
            }
            if (pieza.type.toLowerCase() == "p") {
              type = "&#9817"
            }
          }
          if (pieza.color == "b") {
            if (pieza.type.toLowerCase() == "k") {
              type = "&#9818"
            }
            if (pieza.type.toLowerCase() == "q") {
              type = "&#9819"
            }
            if (pieza.type.toLowerCase() == "r") {
              type = "&#9820"
            }
            if (pieza.type.toLowerCase() == "b") {
              type = "&#9821"
            }
            if (pieza.type.toLowerCase() == "n") {
              type = "&#9822"
            }
            if (pieza.type.toLowerCase() == "p") {
              type = "&#9823"
            }
          }
          if (this.options.theme == "emoji"){
          casilla.innerHTML = `<div class="img" style="width:37px; height:37px; font-size: 26px">${type}</div>`;
          }
         else{
            casilla.innerHTML = `<img class="img" width="37px" height="37px" src="img/chesspieces/wikipedia/${pieza.color + pieza.type.toUpperCase()}.png" />`;
         }
         
        } else {
          casilla.innerHTML = `<div class="img" style="width:30px; height:30px"></div>`;
        }
        
        this.casillas.push(casilla)
      });
    
    }
    limpiarTablero(){
      this.game.SQUARES.forEach((square) => {
        var casilla = this.table.querySelector("." + square);
      
        casilla.dataset.piece = ""
        casilla.innerHTML = '';
      });
    }
    anadirEventos(){
      let this2 = this;
      
      this.alerta.querySelectorAll(".dialog").forEach(x => {
        x.addEventListener("click", function(event){
          this2.coronatePawn_selected(this.classList[0])
          
        }, false)
      })
      this.casillas.forEach((casilla) => {
        casilla.addEventListener("click", function() {
          //alert(this.dataset.piece.match(/^./)[0])
          if (!this2.game.game_over() && this2.options.interactive) {
            if (this2.piezaSeleccionada === null) {
              // Seleccionar una pieza si la casilla tiene una pieza
              if (this.dataset.piece) {
                if (this.dataset.piece.charAt(0) == this2.game.turn()) {
                  this2.piezaSeleccionada = this;
                  if (!this.classList.contains("capture_king")) {
                    this.classList.add("selected");
                  }
                  this2.alerta.style.display = "none"
      
                  this2.resaltarCasillasPosibles(this.classList[0])
                }
              }
            } else {
              // Desseleccionar la pieza si haces clic nuevamente en ella
              if (this2.piezaSeleccionada === this) {
                this2.piezaSeleccionada.classList.remove("selected");
                this2.piezaSeleccionada = null;
      
                this2.casillas.forEach(ca => {
                  ca.classList.remove("possible_move")
                  ca.classList.remove("capture")
                })
              } else if (this2.piezaSeleccionada.dataset.piece && this.dataset.piece) {
                if (this2.piezaSeleccionada.dataset.piece.match(/^./)[0] == this.dataset.piece.match(/^./)[0]) {
                  if (this.dataset.piece) {
                    this2.piezaSeleccionada = this;
                    this2.casillas.forEach(c => c.classList.remove("selected"))
      
                    if (!this.classList.contains("capture_king")) {
                      this.classList.add("selected");
                    }
      
                    this2.resaltarCasillasPosibles(this.classList[0])
                    this2.alerta.style.display = "none"
                  }
                } else {
                  const origen = this2.piezaSeleccionada.classList[0];
                  const destino = this.classList[0];
      
                  if (this2.esMovimientoLegal(origen, destino)) {
                  } 
                }
              } else {
                // Mover la pieza seleccionada a la casilla clicada (validación de movimiento)
                const origen = this2.piezaSeleccionada.classList[0];
                const destino = this.classList[0];
      
                if (this2.esMovimientoLegal(origen, destino)) {
      
                  //document.getElementById("move").play()
     
                  }
                
                }
              }
            }
        })
        }, false);
      };
    
    resaltarCasillasPosibles(origen, destino){
      let possible_moves = this.game.moves({ square: origen, verbose: true })
      
      this.casillas.forEach(ca => {
        ca.classList.remove("possible_move")
        ca.classList.remove("capture")
        //ca.classList.remove("capture_king")
      })
      possible_moves.map((m) => m.to).forEach((sq, i) => {
        let element = this.table.querySelector("." + sq)
      
        element.classList.add("possible_move")
        if (possible_moves[i].san.includes("x")) {
          element.classList.add("capture")
        }
      })
    }
    esMovimientoLegal(origen, destino){
      var juegoTemp = new Chess();
      juegoTemp.load(this.game.fen());
      
      // Intentar mover la pieza en el juego temporal
      var movimiento = juegoTemp.move({
        from: origen,
        to: destino,
        promotion: "q" // Promoción a reina por defecto
      });
      
      if (movimiento !== null && this.options.onClick(movimiento)) {
        this.casillas.forEach(ca => {
        
         // ca.classList.remove("possible_move")
        
        
          ca.classList.remove("capture_king")
        })
        
        if (movimiento.san == "O-O"){
         // alert("Enroque corto!")
          
          let rook;
          
          if (this.game.turn() == "w"){
           rook = this.table.querySelector(".h1")
           
           this.animatePiece("h1", "f1")
           
           rook.dataset.piece =""
          } else {
            rook = this.table.querySelector(".h8")
            
            this.animatePiece("h8", "f8")
            
            rook.dataset.piece = ""
          }
        }
        if (movimiento.san == "O-O-O"){
         // alert("Enroque largo!")
          
          let rook;
          if (this.game.turn() == "w") {
            rook = this.table.querySelector(".a1")
          
            this.animatePiece("a1", "d1")
            
            rook.dataset.piece =""
          } else {
            rook = this.table.querySelector(".a8")
            
            this.animatePiece("a8", "d8")
            
            rook.dataset.piece = ""
          }
        }
        
        if (movimiento.san.match(/=[QRNB]\+?#?$/)) {
          this.show_CoronatePawn(movimiento.to)
         // this.piezaSeleccionada.classList.remove("selected");
      
          
          
        } else {
          //alert("MOVE")
          
       
          this.alerta.style.display = "none"
          delete this.piezaSeleccionada.dataset.piece;
          this.piezaSeleccionada.classList.remove("selected");
          this.piezaSeleccionada = null;
          
          
          this.sequence.push({
            fen: this.game.fen(),
            move: movimiento
          })
          
          
          
          
          this.game.move(movimiento.san)
          this.options.onMoveEnd(movimiento)
          if (this.options.sound_move){
          this.options.sound_move.play()
          
          //this.options.onMove(movimiento)
          }
          if (this.game.in_check()){
            
            if (this.options.sound_check){
            this.options.sound_check.play()
            }
           // this.options.onCheck(movimiento)
           
           let kingPosition;
           
           this.casillas.forEach(x => {
             let type = x.dataset.piece
             //alert(type)
             if (type){
               if (type == "wK" && this.game.turn() == "w"){
                 kingPosition = x.classList[0]
               }
               if (type == "bK" && this.game.turn() == "b") {
                 kingPosition = x.classList[0]
               }
             }
             
           })
            
            let king = this.table.querySelector("." + kingPosition)
            this.last_king_in_check = king
            if (this.options.colorate_king_in_check){
            king.classList.add("capture_king")
            }
          }
          if (this.options.sound_checkmate && this.game.in_checkmate()) {
            this.options.sound_checkmate.play()
            this.options.onCheckMate(this.last_move)
          }
      
          this.casillas.forEach(ca => {
            
            ca.classList.remove("possible_move")
            
            
            ca.classList.remove("capture")
          })
      
          this.animatePiece(origen, destino)
          
          //this.cargarFENEnTablero(this.game.fen())
          
        }
      
        this.last_move = movimiento
        
        this.index++
        
        
        return true
        
      }
    }
   
    undo(){
      if (this.sequence.length > 0 && this.last_move) {
        //this.index--; 
        
        let data = this.sequence[this.index]
        
        this.index--
        
       // alert(JSON.stringify(data, 2))
     // alert(JSON.stringify(this.last_move))
       this.game.load(data.fen)
       //this.cargarFENEnTablero(this.game.fen())
        data.move = this.last_move
       // alert(JSON.stringify(data))
       // this.last_move = data.move
        this.animatePiece(this.last_move.to, this.last_move.from)
        if (data.move.san == "O-O") {
          // alert("Enroque corto!")
        
          let rook;
        
          if (this.game.turn() == "w") {
            rook = this.table.querySelector(".f1")
        
            this.animatePiece("f1", "h1")
        
            rook.dataset.piece = ""
          } else {
            rook = this.table.querySelector(".f8")
        
            this.animatePiece("f8", "h8")
        
            rook.dataset.piece = ""
          }
        }
        if (data.move.san == "O-O-O") {
          // alert("Enroque largo!")
        
          let rook;
          if (this.game.turn() == "w") {
            rook = this.table.querySelector(".d1")
        
            this.animatePiece("d1", "a1")
        
            rook.dataset.piece = ""
          } else {
            rook = this.table.querySelector(".d8")
        
            this.animatePiece("d8", "a8")
        
            rook.dataset.piece = ""
          }
        }
       
       this.piezaSeleccionada = null
       
        this.sequence.pop()
      /**/ this.last_move = this.sequence.at(-1)
      
      if (this.last_move){
        this.last_move = this.last_move.move
      }
      
      
        // Limpia las clases de casillas resaltadas o seleccionadas
        this.casillas.forEach(ca => {
          ca.classList.remove("possible_move");
          ca.classList.remove("capture");
          ca.classList.remove("capture_king")
          ca.classList.remove("selected");
        });
        
        
     }
    }
    show_CoronatePawn(destino){
     
      if (this.options.theme == "emoji"){
      if (this.game.turn() == "b") {
        this.alerta.querySelectorAll(".dialog")[0].innerHTML = "&#9819"
        this.alerta.querySelectorAll(".dialog")[1].innerHTML = "&#9820"
        this.alerta.querySelectorAll(".dialog")[2].innerHTML = "&#9822"
        this.alerta.querySelectorAll(".dialog")[3].innerHTML = "&#9821"
        //HERE
      } else {
        this.alerta.querySelectorAll(".dialog")[0].innerHTML = "&#9813"
        this.alerta.querySelectorAll(".dialog")[1].innerHTML = "&#9814"
        this.alerta.querySelectorAll(".dialog")[2].innerHTML = "&#9816"
        this.alerta.querySelectorAll(".dialog")[3].innerHTML = "&#9815"
      }
      } else {
        if (this.game.turn() == "b") {
          this.alerta.querySelectorAll("img")[0].src = "img/chesspieces/wikipedia/bQ.png"
          this.alerta.querySelectorAll("img")[1].src = "img/chesspieces/wikipedia/bR.png"
          this.alerta.querySelectorAll("img")[2].src = "img/chesspieces/wikipedia/bN.png"
          this.alerta.querySelectorAll("img")[3].src = "img/chesspieces/wikipedia/bB.png"
        } else {
          this.alerta.querySelectorAll("img")[0].src = "img/chesspieces/wikipedia/wQ.png"
          this.alerta.querySelectorAll("img")[1].src = "img/chesspieces/wikipedia/wR.png"
          this.alerta.querySelectorAll("img")[2].src = "img/chesspieces/wikipedia/wN.png"
          this.alerta.querySelectorAll("img")[3].src = "img/chesspieces/wikipedia/wB.png"
        }
      }
      
      this.alerta.style.display = "block"
      
      let destino_el = this.table.querySelector("." + destino)
      let destino_coors = destino_el.getBoundingClientRect()
      
      this.alerta.style.position = "absolute"
      
      if (this.options.orientation == "white"){
        this.alerta.style.top = (destino_coors.top + window.scrollY) + "px"
        this.alerta.style.left = (destino_coors.left + window.scrollX) + "px"
      
        if (this.game.turn() == "b"){
          let height_of_options = parseInt(getComputedStyle(document.querySelector(".dialog")).height)
        
          //alert(height_of_options)
          this.alerta.style.top = (destino_coors.top + window.scrollY - 3 * height_of_options) + "px"
        }
      } else {
        this.alerta.style.top = (destino_coors.top + window.scrollY) + "px"
        this.alerta.style.left = (destino_coors.left + window.scrollX) + "px"
        
        if (this.game.turn() == "w") {
          let height_of_options = parseInt(getComputedStyle(document.querySelector(".dialog")).height)
        
          //alert(height_of_options)
          this.alerta.style.top = (destino_coors.top + window.scrollY - 3 * height_of_options) + "px"
        }
      }
    }
    createCoronateDialog(parent){
      let alerta = document.createElement("div")
      
      alerta.classList.add("alerta")
      
      alerta.innerHTML = `
      <div class="Q dialog">
        <img src="img/chesspieces/wikipedia/wQ.png">
      </div>
      <div class="R dialog">
        <img src="img/chesspieces/wikipedia/wR.png">
      </div>
      <div class="N dialog">
        <img src="img/chesspieces/wikipedia/wN.png">
      </div>
      <div class="B dialog">
        <img src="img/chesspieces/wikipedia/wB.png">
      </div>
      `
      alerta.innerHTML = `
            <div class="Q dialog">
              &#9813
            </div>
            <div class="R dialog">
              &#9814
            </div>
            <div class="N dialog">
              &#9816
            </div>
            <div class="B dialog">
              &#9815
            </div>`
      
      parent.append(alerta)
      
      this.alerta = alerta
    }
    animatePiece(origen, destino){
      //alert(origen + " y " + destino)
      let origen_el = this.table.querySelector("." + origen).querySelector(".img");
      let origen_coors = origen_el.getBoundingClientRect();
      
      let destino_el = this.table.querySelector("." + destino);
      let destino_coors = destino_el.getBoundingClientRect();
      /*
      origen_el.style.position = "absolute";
      origen_el.style.top = origen_coors.top + "px";
      origen_el.style.left = origen_coors.left + "px";*/
      
      // Calcular la diferencia en la posición vertical
      let deltaX = destino_coors.left - origen_coors.left;
      let deltaY = destino_coors.top - origen_coors.top;
      
      let duration = 290; // Duración de la animación en milisegundos
      let interval = 10; // Intervalo de tiempo en milisegundos
      
      let startTime = null;
      
      const movePiece = (timestamp) => {
        if (!startTime) {
          startTime = timestamp;
          //console.log(timestamp)
        }
      
        let progress = timestamp - startTime;
      
        //  console.log(progress)
      
        if (progress < duration) {
          // Calcular la posición actual en función del progreso
          let y = parseInt(origen_coors.top + (deltaY * (progress / duration)) + 2.5);
          let x = String(origen_coors.left + (deltaX * (progress / duration)) + 2.5);
      
          origen_el.style.zIndex = "347"
          origen_el.style.transform = `translate(${x - origen_coors.left}px, ${y - origen_coors.top}px)`;
          //origen_el.style.left = origen_coors.left + "px";
      
          requestAnimationFrame(movePiece);
        } else {
          // La animación ha terminado
          //origen_el.style.transform = "rotate(180deg)"
          origen_el.style.zIndex = "auto"
          
          //this.options.onMoveEnd(this.last_move)
          
          this.cargarFENEnTablero(this.game.fen())
          if (this.game.in_check()) {
            // alert(9)
            if (this.options.sound_check) {
              this.options.sound_check.play()
            }
            // this.options.onCheck(movimiento)
          
            let kingPosition;
          
            this.casillas.forEach(x => {
              let type = x.dataset.piece
              //alert(type)
              if (type) {
                //alert(type)
                if (type == "wK" && this.game.turn() == "w") {
                  kingPosition = x.classList[0]
          
                }
                if (type == "bK" && this.game.turn() == "b") {
                  kingPosition = x.classList[0]
                }
              }
            })
          
            let king = this.table.querySelector("." + kingPosition)
            //alert(king)
            if (this.options.colorate_king_in_check) {
              king.classList.add("capture_king")
            }
            
            
          }
          
         // let game2 = new Chess()
          //game2.move
          
          
         // let move = game2.move(this.last_move.san.replace("Q", type))
        }
      }
      
      requestAnimationFrame(movePiece);
    }
    coronatePawn_selected(type){
      //alert(type)
      this.alerta.style.display = "none"
      
      this.sequence.push({
        fen: this.game.fen(),
        move: this.last_move
      })
     let move =  this.game.move(this.last_move.san.replace("Q", type))
      this.animatePiece(this.last_move.from, this.last_move.to)
      
          this.options.onMoveEnd(move)
      this.casillas.forEach(ca => {
        ca.classList.remove("possible_move")
        ca.classList.remove("capture")
        ca.classList.remove("selected")
       // ca.classList.remove("capture_king")
      })
      if (this.options.sound_move) {
        this.options.sound_move.play()
        this.options.onMove(this.last_move)
      }
      if (this.game.in_check()) {
       // alert(9)
        if (this.options.sound_check) {
          this.options.sound_check.play()
        }
        // this.options.onCheck(movimiento)
      
        let kingPosition;
      
        this.casillas.forEach(x => {
          let type = x.dataset.piece
          //alert(type)
          if (type) {
            //alert(type)
            if (type == "wK" && this.game.turn() == "w") {
              kingPosition = x.classList[0]
              
            }
            if (type == "bK" && this.game.turn() == "b") {
              kingPosition = x.classList[0]
            }
          }
        })
      
        let king = this.table.querySelector("." + kingPosition)
        //alert(king)
        if (this.options.colorate_king_in_check) {
          king.classList.add("capture_king")
        }
      }
      if (this.options.sound_checkmate && this.game.in_checkmate()) {
        this.options.sound_checkmate.play()
        this.options.onCheckMate(this.last_move)
      }
      
      delete this.piezaSeleccionada.dataset.piece;
      this.piezaSeleccionada = null
    }
    validateOptions(){
      let c_options = this.options;
      
      if (c_options == null){
        this.options = {
          interactive: true,
          onClick: () => {
            return true
          },
          onMove: () => {},
          onMoveEnd: (move) => {},
          onCheck: () => {},
          onCheckMate: () => {},
          sound_move: null,
          sound_check: null,
          
          orientation: "white",
          
          sound_checkmate: null
        }
        
        return c_options
      }
      
      if (!c_options.onClick || typeof c_options.onClick !== "function") {
        c_options.onClick = () => {
          return true;
        };
      }
      if (!c_options.onMoveEnd || typeof c_options.onMoveEnd !== "function") {
        c_options.onMoveEnd = (move) => {
          return true;
        };
      }
      if (!c_options.onCheck || typeof c_options.onCheck !== "function") {
        c_options.onCheck = (move) => {
          return true;
        };
      }
      if (!c_options.onMove || typeof c_options.onMove !== "function") {
        c_options.onMove = (move) => {
          return true;
        };
      }
      if (!c_options.onCheckMate || typeof c_options.onCheckMate !== "function") {
        c_options.onCheckMate = () => {
          return true;
        };
      }
      if (!c_options.orientation || c_options.orientation != "black"){
        c_options.orientation = "white"
      }
      
      c_options.colorate_king_in_check = Boolean(c_options.colorate_king_in_check)
      c_options.interactive = Boolean(c_options.interactive)
      
      
      return c_options
      
    }
    move(move_san){
      let old_fen = this.game.fen()
      let move = this.game.move(move_san)
      
      this.animatePiece(move.from, move.to)
      
      this.last_move = move
      
      this.sequence.push({
        fen: old_fen,
        move: this.last_move
      })
     // alert(old_fen)
      
      this.index++
      //this.game.move(this.last_move.san.replace("Q", type))
      //this.animatePiece(this.last_move.from, this.last_move.to)
      
      this.casillas.forEach(ca => {
        ca.classList.remove("possible_move")
        ca.classList.remove("capture")
        ca.classList.remove("selected")
       // ca.classList.remove("capture_king")
      })
      if (this.options.sound_move) {
        this.options.sound_move.play()
        this.options.onMove(this.last_move)
      }
      
      if (this.options.sound_checkmate && this.game.in_checkmate()) {
        this.options.sound_checkmate.play()
        this.options.onCheckMate(this.last_move)
      }
      
      this.options.onMoveEnd(move)
      /*
      delete this.piezaSeleccionada.dataset.piece;
      this.piezaSeleccionada = null
    */
    }
    colorateKingInCheck(){
      
    }
    //table.game.insufficient_material()
    //table.game.in_stalemate()
}
