import { readAsStringAsync } from 'expo-file-system';
import MyModule from './assets/wasm/MyClass.js';

async function loadWasmModule() {
    // Load the .wasm binary
    const wasmBinary = await readAsStringAsync(
        require('./assets/wasm/MyClass.wasm'),
        'base64'
    );

    const wasmBuffer = Uint8Array.from(atob(wasmBinary), c => c.charCodeAt(0));

    // Initialize the WebAssembly module
    const {
        // Bill class methods
        _Bill_new,
        _Bill_delete,
        _Bill_getId,
        _Bill_getUserId,
        _Bill_getName,
        _Bill_getAmount,
        _Bill_getIsMonthly,
        _Bill_getPayDate,
        _Bill_getDescription,
        _Bill_getCategory,

    } = await MyModule({
        wasmBinary: wasmBuffer,
    });

    // Create and interact with the C++ class
    const namePointer = new TextEncoder().encode('World');
    const instance = _MyClass_new(namePointer);

    const greetPointer = _MyClass_greet(instance);
    const greetMessage = new TextDecoder().decode(greetPointer);

    console.log(greetMessage); // Output: Hello, World!

    // Clean up memory
    _MyClass_delete(instance);
}

loadWasmModule();
