const screen = document.querySelector(".display__text")
const cells = document.querySelectorAll(".game-board__cell")

const gameBoard = (() =>{
    let _board = []
   
    if(_board == ""){
        for(let i = 0; i < 9; i++){
            _board[i] = ['']
        }
    }
    const resetBoard =() =>{
        for(let i = 0; i < 9; i++){
            _board[i] = ['']
        }
    }
    const checkBoard =(l) => _board[l]
    const getBoard = () => _board
    const setBoard = (symbol, position)=>{
        if(_board[position - 1] != ""){return false}
        _board[position - 1] = symbol
    }

    return {getBoard, setBoard, checkBoard, resetBoard}
})()


const players = (player, symbol,isActive) =>{
    
    return {player, symbol,isActive}
}

const player1 = players("player1", "X", true)
const player2 = players("player2", "O", false)

const validCell = (value) =>{
    let cell = value

    if(gameBoard.checkBoard([cell - 1]) == ''){
        if(player1.isActive === true){
            player1.isActive = false
            player2.isActive = true   
            return cell
        
        }
    
        if(player2.isActive === true){
            player2.isActive = false
            player1.isActive = true     
            return cell
        }
    }

}

const checkWin = () =>{
    let win = 0
    let compare = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
   
    compare.forEach(el =>{
        let [a, b, c] = el

        if((gameBoard.checkBoard([a]) == gameBoard.checkBoard([b])) && gameBoard.checkBoard([a]) == gameBoard.checkBoard([c])){
            
            if(gameBoard.checkBoard([a]) == "X"){
                screen.textContent = "Player 1 has won"
                win = 1
                return false
            }
            if(gameBoard.checkBoard([a]) == "O"){
                screen.textContent = "Player 2 has won"
                win = 1
                return false
            }
        }
    })
    return {win}
    
}

const playRound =(value) =>{
  if(!gameBoard.getBoard().find((el) =>el == "")){
    screen.textContent = "Tie!"
    return false
  }
    
   if(player1.isActive===true){
       gameBoard.setBoard(player1.symbol, validCell(value))
    console.log(gameBoard.getBoard())
    return false
   }
   
   if(player2.isActive===true){
       gameBoard.setBoard(player2.symbol, validCell(value))
    console.log(gameBoard.getBoard())
    return false
   }
  
}

const reset = () =>{
    gameBoard.resetBoard()
    screen.textContent = ""
    cells.forEach(el =>{
        el.textContent = ""
    })
}
const tick =() =>{
    if(player1.isActive == true) return "X"
    if(player2.isActive == true) return "O"
}


document.addEventListener("click", e =>{
    if(e.target.matches(".game-board__cell")){
        let value = parseInt(e.target.value)
        
        if(checkWin().win == 1){
            return
        }
        if(e.target.textContent == ""){
            e.target.textContent = tick()
        }
        playRound(value)
        checkWin() 
        
    }

    if(e.target.matches(".reset")){
        reset()
        player1.isActive = true
        player2.isActive = false
    }
})


