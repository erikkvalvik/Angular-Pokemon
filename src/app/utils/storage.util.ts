export class StorageUtil {

    public static storageSave<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    public static storageDelete<T>(key: string): void {
        sessionStorage.removeItem(key);
    }
    
    public static storageRead<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key);
        try{
            if(storedValue){
                return JSON.parse(storedValue) as T;
            }
            return undefined;
        }
        catch(e) {
            sessionStorage.removeItem(key);
            return undefined;
        }
    }
}
