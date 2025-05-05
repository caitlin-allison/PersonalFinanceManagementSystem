import { Asset } from 'expo-asset';
import { readAsStringAsync } from 'expo-file-system';
import MyModule from '../assets/FinanceApp.js';

export async function loadBillModule() {
    try {
        // Resolve the WASM file using Asset
        const asset = Asset.fromModule(require('../assets/wasm/FinanceApp.wasm'));
        await asset.downloadAsync();

        // Get the local URI of the WASM file
        const wasmUri = asset.localUri;

        if (!wasmUri) {
            throw new Error("WASM file local URI not found");
        }

        // Read the WASM file as a binary string
        const wasmBinary = await readAsStringAsync(wasmUri, { encoding: 'utf8' });  // Ensure it's read as binary

        // Now manually encode the binary string as base64
        const wasmBuffer = Uint8Array.from(wasmBinary, c => c.charCodeAt(0));
        const base64Wasm = btoa(String.fromCharCode.apply(null, wasmBuffer));

        // Initialize the WebAssembly module
        const {
            _Bill_new,
            _Bill_delete,
            _Bill_getId,
            _Bill_getName,
            _Bill_setId,
            _Bill_setName,
        } = await MyModule({
            wasmBinary: base64Wasm,
        });

        // Example usage
        const billInstance = _Bill_new();
        _Bill_setId(billInstance, 101);
        const namePtr = MyModule.allocateUTF8("Electric Bill");
        _Bill_setName(billInstance, namePtr);

        // Get values
        const id = _Bill_getId(billInstance);
        const name = MyModule.UTF8ToString(_Bill_getName(billInstance));

        console.log(`Bill ID: ${id}, Bill Name: ${name}`);

        // Clean up memory
        _Bill_delete(billInstance);
    } catch (error) {
        console.error("Error loading WASM module:", error);
    }
}
