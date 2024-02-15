import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(),
	{
		name: "configure-response-headers",
		configureServer: (server) => {
			server.middlewares.use((_req, res, next) => {
				const ori = _req.headers.origin
				const referer = _req.headers.referer
				if ((ori == "https://example.com" || !ori)) {
					_req.headers.origin = "http://localhost:5173"
				}
				next();
				// _req.headers.origin = originalOrigin
			});
		}
	}
	]
});
