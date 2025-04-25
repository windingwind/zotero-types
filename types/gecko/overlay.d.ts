export {};

declare global {
	interface nsIXPCComponents_Utils {
        import(aResourceURI: string, targetObj?: any): any;
    }
}