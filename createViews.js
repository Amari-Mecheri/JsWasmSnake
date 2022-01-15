createBoardView(boardSize)
function createBoardView_(size){
    if(size){
        if( size.Width && size.Height){
            console.log(Date.now())
            let boardView = document.createElement("div")
            boardView.style = getBoardStyle(size.Width,size.Height)
            boardView.className = "boardView"
            for(let x=0;x<size.Width;x++){
                for(let y=0;y<size.Height;y++){
                    let spot = document.createElement("div")
                    spot.className = "spot"
                    spot.id = getId(x,y)
                    spot.style = getStyle(x,y)
                    boardView.insertBefore(spot, boardView.nextSibling)
                }
            }
            console.log(Date.now())
            let board = document.getElementById('board')
            board.innerHTML = boardView.outerHTML
            console.log(Date.now())
        }
    }
}

function createBoardView(size){
    if(size){
        if( size.Width && size.Height){
            console.log(Date.now())
            let htmltTobeInserted='<div class="boardView" style="' + 
            getBoardStyle(size.Width,size.Height)+'" >'
            //let boardView = document.createElement("div")
            //boardView.style = getBoardStyle(size.Width,size.Height)
            //boardView.className = "boardView"
            for(let x=0;x<size.Width;x++){
                for(let y=0;y<size.Height;y++){
                    let spotTobeInserted ='<div class="spot" id="' + getId(x,y) + '"' +
                    'style="'+ getStyle(x,y) + '"></div>'
                    //let spot = document.createElement("div")
                    //spot.className = "spot"
                    //spot.id = getId(x,y)
                    //spot.style = getStyle(x,y)
                    //boardView.insertBefore(spot, boardView.nextSibling)
                    htmltTobeInserted += spotTobeInserted;
                }
            }
            htmltTobeInserted +='</div>'
            console.log(Date.now())
            let board = document.getElementById('board')
            board.innerHTML = htmltTobeInserted
            console.log(Date.now())
        }
    }
}


function getBoardStyle(x,y) {
    return `display: grid; border: yellow 1px solid;
    gridTemplateColumns: repeat(${x}, 10px);
    gridTemplateRows: repeat(${y}, 10px);`
}

function getId(x,y) {
    return "spot"+x.toString().padStart(2,"0")+y.toString().padStart(2,"0");
}

function getStyle(x,y) {
    return `grid-column:${x+1}; grid-row:${y+1};`
}

function updateStateView(){
    let boardSizeElem = document.getElementById('boardSize')
    boardSizeElem.innerHTML = `${boardSize.Width}, ${boardSize.Height}`
    let scoreElem = document.getElementById('score')
    scoreElem.innerHTML = score
    let highScoreElem = document.getElementById('highScore')
    highScoreElem.innerHTML = highScore
    let snakeLengthElem = document.getElementById('snakeLength')
    snakeLengthElem.innerHTML = snakeLength
    let snakePositionElem = document.getElementById('snakePosition')
    snakePositionElem.innerHTML = `${snakePosition.X}, ${snakePosition.Y}`
}

function updateMessage(message){
    let messageElem = document.createElement("div")
    messageElem.id = "messageView"
    messageElem.innerHTML = message
    let messageView = document.getElementById('message')
    messageView.innerHTML = messageElem.outerHTML
}