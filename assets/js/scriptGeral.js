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
});
