document.addEventListener('DOMContentLoaded', () => {
	if (typeof initCatalog === 'function') {
		initCatalog({
			filters: '#filtros-robos',
			carousel: '#carrossel-robos',
			indicators: '#indicadores-robos',
			pool: '#pool-robos',
			chunk: 1,
			rowClass: 'row g-4'
		});

		const irParaHash = () => {
			const alvo = decodeURIComponent(location.hash.replace('#', ''));
			if (!alvo) return;
			const btn = document.querySelector(`#filtros-robos .filter-btn[data-filter="${alvo}"]`);
			if (btn) btn.click();
		};
		irParaHash();
		window.addEventListener('hashchange', irParaHash);
	}

	if (typeof AOS !== 'undefined') {
		AOS.init({ duration: 700, once: true, offset: 80 });
	}
});
