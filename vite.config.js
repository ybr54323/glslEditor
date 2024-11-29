import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: './',
    // 使用 src/index.html 作为入口
    root: 'src',
    build: {
        // 构建输出目录
        outDir: '../dist1',
        // 确保清空输出目录
        emptyOutDir: true,

        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html')
            }
        }
    },
})