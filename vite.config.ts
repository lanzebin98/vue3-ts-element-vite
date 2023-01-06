import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    plugins: [vue(),
      // 添加下面这块
      eslintPlugin({
        include: ['src/!**!/!*.js', 'src/!**!/!*.vue', 'src/!*.js', 'src/!*.vue']
      })],
    server: {
      // 自动打开浏览器
      open: false,
      // 设置为0.0.0.0则所有的地址均能访问
      host: '0.0.0.0',
      port: 8080,
      https: false,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '') // 将请求中/api用空值替换重写，根据实际业务修改
        }
      }
    }
  }
})
