var FreeSpace, CandyBody, SnakePart
var score, highScore,snakeLength,snakePosition

// launches the game once wasm is ready
document.addEventListener("wasmLoaded",()=>{
      updateMessage("Game Over")
      FreeSpace = FreeSpace()
      CandyBody = CandyBody()
      SnakePart = SnakePart()
      initGame()
      document.addEventListener("keydown", handleKeyDown);    
  })


function initGame(){
    let err = InitBoard(boardSize);
    if (!err) {
      clearBoardView()
      const listSprite = JSON.parse(CreateObjects());
      displayObjects(listSprite);
    }
    updateValues();
}

function ngOnDestroy(){
    document.removeEventListener("keydown", handleKeyDown);
}

function updateValues(){
    score = Score();
    highScore= HighScore();
    snakeLength= SnakeSize();
    snakePosition= JSON.parse(SnakePosition());
    updateStateView()
  }

function clearBoardView() {
    for( let x=0; x<boardSize.Height; x++)
      for( let y=0; y<boardSize.Width; y++)
      clearPixel(x,y)
}

function  updateBoardSize() {
    let size = boardSize.Width
    size += sizeIncrement
    if(size>defaultBoardSize){
      size = sizeIncrement
}

    boardSize = {"Width": size, "Height": size}
}

function launchGame() {
    const interval = setInterval(() => {
        if( GameInProgress())
        {
          const listSprite = JSON.parse(Play());
          displayObjects(listSprite)
          updateValues();
        } else {
            updateMessage("Game Over")
            clearInterval(interval)
        }
    }, refreshInterval);
}

function handleKeyDown(e){
  const key = e.key;
  switch (key) {
    case "ArrowLeft":
      MoveLeft()
      break;

    case "ArrowRight":
      MoveRight()
      break;

    case "ArrowUp":
      MoveUp()
      break;

    case "ArrowDown":
      MoveDown()
      break;

    case "Enter":
      if(!GameInProgress()){
          updateBoardSize()
          createBoardView(boardSize)
          initGame();
      }
      break;

    case " " :
      if(!GameInProgress()){
        if(Dirty()){
            initGame()
        }
        Start()
        updateMessage("")
        launchGame()
      }
      break;

    default:
      break;
  }
}

function displayObjects(listSprite){
  if(listSprite){
    for(let i=0; i<listSprite.length; i++){
      const sprite = listSprite[i]

      switch(sprite.Value){
        case FreeSpace:
          clearPixel(sprite.Position.X,sprite.Position.Y)
          break;
        case CandyBody:
          setPixel(sprite.Position.X,sprite.Position.Y, candyColor)
          break;
        case SnakePart:
          setPixel(sprite.Position.X,sprite.Position.Y)
          break;

        default:
          break;
      }

    }
  }
}

function setPixel(x, y, color = `rgb(${[1].map(x=>Math.random()*256|0)},0,0)`){
  const id = "spot"+x.toString().padStart(2,"0")+y.toString().padStart(2,"0")
  const element = document.getElementById(id);
  if (element != null) element.style.backgroundColor = color;
}

function clearPixel(x,y) {
  setPixel(x,y,boardBackGroundColor)
}