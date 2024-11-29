import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate"

self.onmessage = function(e) {
    const { type, data } = e.data
    
    if (type === 'compress') {
        const buffer = strToU8(data)
        const zipped = zlibSync(buffer, { level: 9 })
        const str = strFromU8(zipped, true)
        const result = btoa(str)
        self.postMessage({ type: 'compress', result })
    }
    else if (type === 'uncompress') {
        const binary = atob(data)
        const buffer = strToU8(binary, true)
        const unzipped = unzlibSync(buffer)
        const result = strFromU8(unzipped)
        self.postMessage({ type: 'uncompress', result })
    }
} 