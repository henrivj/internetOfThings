document.addEventListener('DOMContentLoaded', () => {
	if (typeof AOS !== 'undefined') {
		document.querySelectorAll('main section:not(:first-of-type) .row > [class*="col-"]').forEach((col) => {
			if (!col.hasAttribute('data-aos')) col.setAttribute('data-aos', 'fade-up');
		});
		AOS.init({ duration: 700, once: true, offset: 80 });
	}
});

document.addEventListener('DOMContentLoaded', () => {
	const secaoExemplos = document.querySelectorAll('main details');
	if (secaoExemplos.length === 0) return;

	const botaoToggle = document.createElement('button');
	botaoToggle.textContent = 'Expandir Todos os Exemplos';
	botaoToggle.className = 'filter-btn mb-3';

	const tituloExemplos = [...document.querySelectorAll('h2')].find((h) => h.textContent.includes('Exemplos de Programação'));
	if (tituloExemplos) {
		tituloExemplos.insertAdjacentElement('afterend', botaoToggle);
	}

	let expandido = false;
	botaoToggle.addEventListener('click', () => {
		expandido = !expandido;
		secaoExemplos.forEach((detalhe) => (detalhe.open = expandido));
		botaoToggle.textContent = expandido ? 'Recolher Todos os Exemplos' : 'Expandir Todos os Exemplos';
	});
});
