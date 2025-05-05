import { readAsStringAsync } from 'expo-file-system';
import MyModule from '../FinanceApp.js';

async function loadBillModule() {
    // Load the .wasm binary
    const wasmBinary = await readAsStringAsync(
        require('../FinanceApp.wasm'),
        'base64'
    );

    const wasmBuffer = Uint8Array.from(atob(wasmBinary), c => c.charCodeAt(0));

    // Initialize the WebAssembly module
    const {
        // Bill class methods
        _Bill_new,
        _Bill_delete,

        // Getters
        _Bill_getId,
        _Bill_getUserId,
        _Bill_getName,
        _Bill_getAmount,
        _Bill_getIsMonthly,
        _Bill_getPayDate,
        _Bill_getDescription,
        _Bill_getCategory,

        // Setters
        _Bill_setId,
        _Bill_setUserId,
        _Bill_setName,
        _Bill_setAmount,
        _Bill_setIsMonthly,
        _Bill_setPayDate,
        _Bill_setDescription,
        _Bill_setCategory,

    } = await MyModule({
        wasmBinary: wasmBuffer,
    });

    // Create and interact with the C++ class
    const instance = _Bill_new();

    // Clean up memory
    _Bill_delete(instance);
}

loadBillModule();
