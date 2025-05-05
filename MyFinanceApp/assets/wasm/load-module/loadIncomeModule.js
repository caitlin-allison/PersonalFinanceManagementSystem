import { readAsStringAsync } from 'expo-file-system';
import MyModule from '../FinanceApp.js';

async function loadIncomeModule() {
    // Load the .wasm binary
    const wasmBinary = await readAsStringAsync(
        require('../FinanceApp.wasm'),
        'base64'
    );

    const wasmBuffer = Uint8Array.from(atob(wasmBinary), c => c.charCodeAt(0));

    // Initialize the WebAssembly module
    const {
        // Income class methods
        _Income_new,
        _Income_delete,

        // Getters
        _Income_getId,
        _Income_getUserId,
        _Income_getName,
        _Income_getAmount,
        _Income_getHasDeadline,
        _Income_getDeadlineDate,
        _Income_getDescription,
        _Income_getCategory,

        // Setters

        // Setters
        _Income_setId,
        _Income_setUserId,
        _Income_setAmount,
        _Income_setIsMonthly,
        _Income_setPayDate,
        _Income_setCategory,
        _Income_setDescription,
        _Income_setName,
    } = await MyModule({
        wasmBinary: wasmBuffer,
    });

    // Create and interact with the C++ class
    const instance = _Income_new();

    // Clean up memory
    _Income_delete(instance);
}

loadIncomeModule();
