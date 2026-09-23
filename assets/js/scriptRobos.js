function adicionarLinkProjetos() {
	const nav = document.querySelector('#navPrincipal .navbar-nav');
	if (!nav || nav.querySelector('a[href="./projetos.html"]')) return;

	const link = document.createElement('a');
	link.href = './projetos.html';
	link.className = 'nav-link hvj-text px-2';
	link.textContent = 'Projetos';
	nav.appendChild(link);
}

document.addEventListener('DOMContentLoaded', () => {
	adicionarLinkProjetos();

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
