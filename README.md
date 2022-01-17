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

  * index.html and index.css were copied and adapted from the Angular version.
  * gameState.go specifically written to be compiled to wasm. It holds a gameState object and exposes its methods.
    => it is compiled to gameState.wasm with tinygo.
  * wasm_exec.js is provided by tinygo (it has to match the version). It is the "glue" between go=>wasm and js
  * initWsm.js loads gameState.wasm and instiantes it. Original file: https://gitlab.com/k33g_org/suborbital-demo
    => Added a custom event fired when the wasm functions are ready to use
  * createViews.js holds the functions to generate the boardView, stateView and messageView
  * launchGame.js initializes the views and controls the game
    => it is an adapted copy from the Angular version.
    => The functions from createView.js are called synchronously when the state is modified.
  * index.js is used to launch startify. Original file: https://gitlab.com/k33g_org/suborbital-demo
  * makefile provides commands like make build, make serve (http://localhost:8080), fastify-install and tinygo-install (for debian platforms)<br><br><br>

## Make commands:

- make build
- make serve
- make fastify-install
- make tinygo-install
<br><br><br>
<b> Developed with Visual Studio Code on Linux Mint
