console.log('Hello World!');





let index =0
let solution = 0
 function createList(sequence){
let lists = sequence.split("\n")
  
  let whites = []
  let blacks = []
  
  let index = 0
  
  for (let command of lists){
    let moves = command.split(" ")
    let list_white = []
    let list_black = []
    
    for (let move of moves){
      if (index % 2 == 0){
        list_white.push(move)
        
      } else {
        list_black.push(move)
      }
      index++
    }
    
    index = 0
    whites.push(list_white)
    blacks.push(list_black)
  }
  return [whites, blacks]
}
let white_moves =createList(moves)[0];
let black_moves=createList(moves)[1]




    let table = new ChessTable(document.querySelector("body"))
    
    table.init(fen, {
      interactive: true,
      sound_move: document.getElementById("move"),
        sound_check: document.getElementById("check"),
        sound_checkmate: document.getElementById("checkmate"),
        
        theme: "emoji",
        colorate_king_in_check:  true,
        
        onMoveEnd: onMoveFinished
    })

function onMoveFinished(move){
  //alert(JSON.stringify(move))
  let san = move.san
  
  if (white_moves[solution][index] == san){
    table.move(black_moves[solution][index])
    
    
  } else {/*
   setTimeout(function(){
    undo()
   },80)*/
  
    //alert(white_moves)
  // prompt(`${white_moves[solution][index]} vs ${san}`)
  }
}
function undo(){
  table.undo()
}