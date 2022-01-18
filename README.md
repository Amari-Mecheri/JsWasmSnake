amari.mecheri@gmail.com
https://github.com/Amari-Mecheri
# A version of the Snake Game using HTML/CSS/JavaScript and WebAssembly

### Architecture of JsWasmSnake:

- This version is a port of GoSnake to JavaScript + WebAssembly
<br>GoSnake, ReactSnake and AngularSnake where made prior to this version
<br>ReactSnake and AngularSnake use a rewritten TypeScript version of the go files.
<br>With this WebAssembly version, the aim is the direct usage of the original go files
<br>Hence, the game logic was published to https://github.com/Amari-Mecheri/GoSnakeLogic
<br>=> One source file is shared among different platform specific versions.

- JsWasmSnake contains the following files:

  * The view: index.html and index.css were copied and adapted from the Angular version.
  	* createViews.js holds the functions to generate the boardView, stateView and messageView
  * The model: gameState.go specifically written to be compiled to wasm. It holds a gameState object and exposes its methods.
    => it is compiled to gameState.wasm with tinygo.
  	* wasm_exec.js is provided by tinygo (it has to match the version). It is the "glue" between go=>wasm and js
  	* initWsm.js loads gameState.wasm and instiantes it. Original file: https://gitlab.com/k33g_org/suborbital-demo
    => Added a custom event fired when the wasm functions are ready to use
  * The view model: launchGame.js controls the game (gamestate and events) and updates the view
    <br>=> it is an adapted copy from the Angular version.
    <br>=> The functions from createView.js are called synchronously when the state is modified.
	<br><br>
- Commands files:
  * index.js is used to launch startify. Original file: https://gitlab.com/k33g_org/suborbital-demo
  * makefile provides commands like make build, make serve (http://localhost:8080), fastify-install and tinygo-install (for debian platforms)<br><br>

## Make commands:

- make build
- make serve
- make fastify-install
- make tinygo-install

## Remarks:

- When compiled with go build, the resulting WASM file is rather impressive in size even though the go program is simple and uses only crypto/rand and math/big libraries.

- Tinygo help reduce the size by a large amount but it is to be noted that not all functions/libraries are available (tinygo 0.21). It took me some time to realize that the issues I had with crypto/rand (resolved with tinygo 0.21) and json.Marshal were [due to tinygo](https://github.com/tinygo-org/tinygo/issues/2519)

## Remains:
- Unit tests
- Exceptions and errors handling process
<br><br>
<b> Developed with Visual Studio Code on Linux Mint
