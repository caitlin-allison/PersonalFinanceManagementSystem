import { readAsStringAsync } from 'expo-file-system';
import MyModule from '../FinanceApp.js';

async function loadGoalModule() {
    // Load the .wasm binary
    const wasmBinary = await readAsStringAsync(
        require('../FinanceApp.wasm'),
        'base64'
    );

    const wasmBuffer = Uint8Array.from(atob(wasmBinary), c => c.charCodeAt(0));

    // Initialize the WebAssembly module
    const {
        // Goal class methods
        _Goal_new,
        _Goal_delete,

        // Getters
        _Goal_getId,
        _Goal_getUserId,
        _Goal_getName,
        _Goal_getAmount,
        _Goal_getHasDeadline,
        _Goal_getDeadlineDate,
        _Goal_getDescription,
        _Goal_getCategory,

        // Setters
        _Goal_setId,
        _Goal_setUserId,
        _Goal_setName,
        _Goal_setAmount,
        _Goal_setHasDeadline,
        _Goal_setDeadlineDate,
        _Goal_setDescription,
        _Goal_setCategory
    } = await MyModule({
        wasmBinary: wasmBuffer,
    });

    // Create and interact with the C++ class
    const instance = _Goal_new();

    // Clean up memory
    _Goal_delete(instance);
}

loadGoalModule();
