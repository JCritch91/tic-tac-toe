//gameboard function to generate gameboard visuals.
function gameboard(row, column){
    const rows = 3
    const columns = 3
    let board = []

    for (let r = 0; r < rows; r++){
        board[r] = []
    
    for (let c = 0; c < columns; c++){
        board[r][c] = cell()
    }}

    const getBoard = () => board
    const dropMarker = (row, column, player) =>{
        board[row][column].addMarker(player)
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }

    const printCell = (row, column) => {
        const selectedCell = board[row][column].getValue()
        return selectedCell
    }

    const resetBoard =() =>{
        board = []
        for (let r = 0; r < rows; r++){
            board[r] = []
        
        for (let c = 0; c < columns; c++){
            board[r][c] = cell()
        }}
    } 

    const resetGrid = () =>{
    const gridCell = document.querySelectorAll('.gridCell')
    gridCell.forEach(function(div){
        div.textContent =''
        })
    }


    const boardValidation = (player) => {
        let columnResult =''
         for (i=0; i<3; i++){
            columnResult = board.map(function(value,index){return value[i].getValue()})
            if (columnResult.toString() == `${player},${player},${player}`){
                return 'win'
            }
        }  
        
        let rowResult = ''

        for (let r = 0 ;r<3;r++){
            for (let c = 0;c<3;c++){
                rowResult += `${board[r][c].getValue()},`
            }
                if (rowResult == `${player},${player},${player},`){
                    return 'win'
                }
                rowResult =''
            }
        
        let diagResult = ''
        for (let r = 0, c = 0; r<3; r++, c++){
            diagResult += `${board[r][c].getValue()},`
        }
            if (diagResult == `${player},${player},${player},`){
                return 'win'
            } else {
                diagResult =''
                for (let r = 0, c = 2; r<3; r++, c--){
                    diagResult += `${board[r][c].getValue()},`
                }
                if (diagResult == `${player},${player},${player},`){
                    return 'win'
                    
            } 
        }

        let availableCells1 = board.filter((row) => row[0].getValue() === 0).map(row => row[0])
        let availableCells2 = board.filter((row) => row[1].getValue() === 0).map(row => row[1])
        let availableCells3 = board.filter((row) => row[2].getValue() === 0).map(row => row[2])
        if (!availableCells1.length && !availableCells2.length && !availableCells3.length){
            return 'draw'
        }
    }

    return{getBoard, dropMarker, printBoard, printCell, boardValidation , resetBoard, resetGrid }
}

// marker / cell function to control how the marker is passed to the gameboard
    function cell(){
        let markerValue = 0
        const addMarker = (player) =>{
            markerValue = player
        }
        const getValue = () => markerValue
        return {addMarker, getValue}
    }

// game conroller function to control how the game flows

    function gameController(
        playerOneName = 'Player One',
        playerTwoName = 'PlayerTwo'
    ){
    const board = gameboard()
    const players = [{
        name: playerOneName,
        marker: 'X'
    },
    {
        name: playerTwoName,
        marker: 'O'
    }
    ]

    let activePlayer = players[0]

    const switchPlayer = () =>{
        if (activePlayer === players[0]){
            activePlayer = players[1]
        }
        else {
            activePlayer = players[0]
        }
    } 

    const getActivePlayer = () => activePlayer
    
    const printRound = () =>{
        board.printBoard()
        console.log(`It's ${getActivePlayer().name}'s turn`)
    }

    const playRound = (row, column, id) =>{
          if (board.printCell(row, column) !== 0){
            return
        } else{
        board.dropMarker(row, column, getActivePlayer().marker)
        board.printCell(row, column)
        const validate = board.boardValidation(getActivePlayer().marker)
        const boardCell = document.getElementById(`${id}`)
        const dialog = document.getElementById('winnerDialog')
        dialog.addEventListener('click',()=>{
            board.resetBoard()
            board.resetGrid()
            dialog.close()

        })

        boardCell.textContent = getActivePlayer().marker
        if (validate == 'win'){
            dialog.inert = true
            dialog.showModal()
            dialog.inert = false
            dialog.textContent = `${getActivePlayer().name} Wins!`
        }
        else if (validate == 'draw'){
            dialog.inert = true
            dialog.showModal()
            dialog.inert = false
            dialog.textContent = `It's a Draw`
        }
        else{
            switchPlayer()
            printRound()
        }
    }}

    const gridCell = document.querySelectorAll('.gridCell')
    gridCell.forEach(function(div){
        div.addEventListener('click', () =>{
        game.playRound(div.id.substring(0,1), div.id.substring(2,3), div.id)
        })
    })

    const resetButton = document.querySelector('.reset')
    resetButton.addEventListener('click', ()=>{
        board.resetBoard()
        board.resetGrid()
    })

    return{
        playRound, getActivePlayer
    }
}

const game = gameController()


