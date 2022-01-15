// holds a gameState object and exposes its method in a WebAssembly file
// tinygo build -no-debug -o gameState.wasm -target wasm ./gameState.go
package main

import (
	"syscall/js"

	"fmt"

	gamestate "github.com/Amari-Mecheri/GoSnakeLogic"
	"github.com/Amari-Mecheri/GoSnakeLogic/pkg/common"
)

var aGameState gamestate.GameStater

func main() {
	aGameState = gamestate.New()
	js.Global().Set("FreeSpace", js.FuncOf(FreeSpace))
	js.Global().Set("SnakePart", js.FuncOf(SnakePart))
	js.Global().Set("CandyBody", js.FuncOf(CandyBody))
	js.Global().Set("InitBoard", js.FuncOf(InitBoard))
	js.Global().Set("CreateObjects", js.FuncOf(CreateObjects))
	js.Global().Set("Start", js.FuncOf(Start))
	js.Global().Set("Play", js.FuncOf(Play))
	js.Global().Set("GameInProgress", js.FuncOf(GameInProgress))
	js.Global().Set("Dirty", js.FuncOf(Dirty))
	js.Global().Set("HighScore", js.FuncOf(HighScore))
	js.Global().Set("Score", js.FuncOf(Score))
	js.Global().Set("Round", js.FuncOf(Round))
	js.Global().Set("MoveLeft", js.FuncOf(MoveLeft))
	js.Global().Set("MoveRight", js.FuncOf(MoveRight))
	js.Global().Set("MoveDown", js.FuncOf(MoveDown))
	js.Global().Set("MoveUp", js.FuncOf(MoveUp))
	js.Global().Set("SnakePosition", js.FuncOf(SnakePosition))
	js.Global().Set("SnakeSize", js.FuncOf(SnakeSize))
	<-make(chan bool)
}

func FreeSpace(this js.Value, args []js.Value) interface{} {
	return aGameState.FreeSpace()
}

func SnakePart(this js.Value, args []js.Value) interface{} {
	return aGameState.SnakePart()
}

func CandyBody(this js.Value, args []js.Value) interface{} {
	return aGameState.CandyBody()
}

func InitBoard(this js.Value, args []js.Value) interface{} {
	return js.ValueOf(aGameState.InitBoard(convertToSize(args[0])))
}

func convertToSize(v js.Value) common.Size {
	return common.Size{
		Width:  v.Get("Width").Int(),
		Height: v.Get("Height").Int(),
	}
}

func convertListSpriteToJson(listSprite []common.Sprite) string {
	// tinygo 0.21 doesn't support full reflect
	// json.Marshal(struct) => panic: unimplemented: (reflect.Type).Name()
	var result string = "["
	for _, sprite := range listSprite {
		if result != "[" {
			result += ","
		}
		result += "{\"Value\": " + fmt.Sprint(sprite.Value) +
			",\"Position\":{\"X\":" + fmt.Sprint(sprite.Position.X) +
			",\"Y\":" + fmt.Sprint(sprite.Position.Y) + "}}"
	}
	result += "]"
	return result
}

func CreateObjects(this js.Value, args []js.Value) interface{} {
	listSprite, _ := aGameState.CreateObjects()
	return convertListSpriteToJson(listSprite)
}

func Start(this js.Value, args []js.Value) interface{} {
	aGameState.Start()
	return nil
}

func Play(this js.Value, args []js.Value) interface{} {
	listSprite, _ := aGameState.Play()
	return convertListSpriteToJson(listSprite)
}

func GameInProgress(this js.Value, args []js.Value) interface{} {
	return js.ValueOf(aGameState.GameInProgress())
}

func Dirty(this js.Value, args []js.Value) interface{} {
	return js.ValueOf(aGameState.Dirty())
}

func HighScore(this js.Value, args []js.Value) interface{} {
	return js.ValueOf(aGameState.HighScore())
}

func Score(this js.Value, args []js.Value) interface{} {
	return js.ValueOf(aGameState.Score())
}

func Round(this js.Value, args []js.Value) interface{} {
	return js.ValueOf(aGameState.Round())
}

func MoveLeft(this js.Value, args []js.Value) interface{} {
	aGameState.MoveLeft()
	return nil
}

func MoveRight(this js.Value, args []js.Value) interface{} {
	aGameState.MoveRight()
	return nil
}

func MoveDown(this js.Value, args []js.Value) interface{} {
	aGameState.MoveDown()
	return nil
}

func MoveUp(this js.Value, args []js.Value) interface{} {
	aGameState.MoveUp()
	return nil
}

func SnakePosition(this js.Value, args []js.Value) interface{} {
	position, _ := aGameState.SnakePosition()
	return convertPositionToJson(position)
}

func convertPositionToJson(position common.Position) string {
	// tinygo 0.21 doesn't support full reflect
	// json.Marshal(struct) => panic: unimplemented: (reflect.Type).Name()
	var result string = "{\"X\":" + fmt.Sprint(position.X) +
		",\"Y\":" + fmt.Sprint(position.Y) + "}"
	return result
}

func SnakeSize(this js.Value, args []js.Value) interface{} {
	size, _ := aGameState.SnakeSize()
	return js.ValueOf(size)
}
