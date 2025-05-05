import { Asset } from 'expo-asset';
import { readAsStringAsync } from 'expo-file-system';
import MyModule from '../assets/FinanceApp.js';

export async function loadIncomeModule() {
    try {
        // Resolve the WASM file using Asset
        const asset = Asset.fromModule(require('../../assets/wasm/FinanceApp.wasm'));
        await asset.downloadAsync();

        // Get the local URI of the WASM file
        const wasmUri = asset.localUri;

        // Read the WASM file as a base64 string
        const wasmBinary = await readAsStringAsync(wasmUri, 'base64');

        // Decode the base64 string into a Uint8Array
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

        // Create a new instance of the Income class
        const incomeInstance = _Income_new();

        // Example: Set and get an Income's properties
        _Income_setId(incomeInstance, 202);
        const namePtr = MyModule.allocateUTF8('Salary');
        _Income_setName(incomeInstance, namePtr);

        const id = _Income_getId(incomeInstance);
        console.log('Income ID:', id);

        const name = MyModule.UTF8ToString(_Income_getName(incomeInstance));
        console.log('Income Name:', name);

        // Clean up memory
        _Income_delete(incomeInstance);
    } catch (error) {
        console.error('Error loading Income WASM module:', error);
    }
}