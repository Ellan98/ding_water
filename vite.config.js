import {
	defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

// target: 'https://ellan.online/api/v2',
// 'http://127.0.0.1:3030/api/v2'
import {
	fileURLToPath,
	URL
} from "node:url";
export default defineConfig({
	plugins: [
		uni()
	],
	server: {
		host: true,
		port: 5173,
		proxy: {
			'/api-dev': {
				target: 'http://127.0.0.1:3030/api/v2',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api-dev/, ''), // 此处进行路径重写
			}
		}
	},
	resolve: {
		alias: {
			'@': './' // 这里配置根目录的别名+
		},
	},

	
});