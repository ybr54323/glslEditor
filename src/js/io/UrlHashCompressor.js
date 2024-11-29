export default class UrlHashCompressor {
    constructor(main) {
        this.main = main;
        this.worker = new Worker(new URL('../workers/compress.worker.js?worker', import.meta.url), { type: 'module' });
        this.pendingPromises = new Map();
        
        this.worker.onmessage = (e) => {
            const { type, result } = e.data;
            const resolve = this.pendingPromises.get(type);
            if (resolve) {
                resolve(result);
                this.pendingPromises.delete(type);
            }
        };
    }

    async getContentFromHash() {
        const hash = window.location.hash.slice(1);
        return new Promise((resolve) => {
            this.pendingPromises.set('uncompress', resolve);
            this.worker.postMessage({ type: 'uncompress', data: hash });
        });
    }
    
    async setHashFromContent(content) {
        const compressed = await new Promise((resolve) => {
            this.pendingPromises.set('compress', resolve);
            this.worker.postMessage({ type: 'compress', data: content });
        });
        window.location.hash = compressed;
    }
}

