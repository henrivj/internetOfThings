document.addEventListener('DOMContentLoaded', () => {
	if (typeof AOS !== 'undefined') {
		AOS.init({ duration: 700, once: true });
	}

	if (typeof initCatalog === 'function') {
		initCatalog({
			filters: '#filtros-categoria',
			carousel: '#carrossel-sensores',
			indicators: '#indicadores-sensores',
			pool: '#pool-sensores',
			empty: '#sem-resultado',
			chunk: 6,
			interval: 5000
		});
	}
});
