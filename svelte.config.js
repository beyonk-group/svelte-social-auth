import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		package: {
			exports: filepath => {
        return filepath.endsWith('.js') || filepath.endsWith('.json')
      }
		}
	}
};

export default config
