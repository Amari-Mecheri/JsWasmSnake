const wasmFile = "gameState.wasm"

if (!WebAssembly.instantiateStreaming) { // polyfill
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
        const source = await (await resp).arrayBuffer()
        return await WebAssembly.instantiate(source, importObject)
    }
}

function loadWasm(path) {
    const go = new Go()
    //remove the message: syscall/js.finalizeRef not implemented
    // https://github.com/tinygo-org/tinygo/issues/1140
    go.importObject.env["syscall/js.finalizeRef"] = () => {}

    return new Promise((resolve, reject) => {
        WebAssembly.instantiateStreaming(fetch(path), go.importObject)
        .then(result => {
            go.run(result.instance)
            resolve(result.instance)
        }).catch(error => {
            reject(error)
        })
    })
}

loadWasm(wasmFile).then(wasm => {
    const wasmLoaded = new Event('wasmLoaded', {
        bubbles: false,
        cancelable: true,
        composed: false
      })
    document.dispatchEvent(wasmLoaded)
    console.log("wasmLoaded")

    }).catch(error => {
        console.log(error)
    })
