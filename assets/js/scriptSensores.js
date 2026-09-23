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
