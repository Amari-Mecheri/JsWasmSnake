## provides serve and build commands to JsWasmSnake

serve:
	node index.js

build:
	tinygo build -no-debug -o gameState.wasm -target wasm ./gameState.go

fastify-install:
	npm install fastify

## tinygo-install on debian linux
tinygo-install:
	wget https://github.com/tinygo-org/tinygo/releases/download/v0.21.0/tinygo_0.21.0_amd64.deb
	sudo dpkg -i tinygo_0.21.0_amd64.deb
