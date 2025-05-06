import { Asset } from 'expo-asset';
import { readAsStringAsync } from 'expo-file-system';
import MyModule from '../assets/FinanceApp.js';

export async function loadGoalModule() {
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
            _Goal_setCategory,
        } = await MyModule({
            wasmBinary: wasmBuffer,
        });

        // Create a new instance of the Goal class
        const goalInstance = _Goal_new();

        // Example: Set and get a Goal's properties
        _Goal_setId(goalInstance, 1);
        const id = _Goal_getId(goalInstance);
        console.log('Goal ID:', id);

        const namePtr = MyModule.allocateUTF8('New Goal');
        _Goal_setName(goalInstance, namePtr);

        const name = MyModule.UTF8ToString(_Goal_getName(goalInstance));
        console.log('Goal Name:', name);

        // Clean up memory
        _Goal_delete(goalInstance);
    } catch (error) {
        console.error('Error loading Goal WASM module:', error);
    }
}
