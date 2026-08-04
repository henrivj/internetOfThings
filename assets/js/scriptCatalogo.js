(function () {
	'use strict';

	function chunk(arr, size) {
		const grupos = [];
		for (let i = 0; i < arr.length; i += size) grupos.push(arr.slice(i, i + size));
		return grupos;
	}

	function initCatalog(opts) {
		const barraFiltros = document.querySelector(opts.filters);
		const carrosselEl = document.querySelector(opts.carousel);
		const inner = carrosselEl && carrosselEl.querySelector('.carousel-inner');
		const indicadores = document.querySelector(opts.indicators);
		const pool = document.querySelector(opts.pool);
		const vazio = opts.empty ? document.querySelector(opts.empty) : null;
		if (!barraFiltros || !carrosselEl || !inner || !indicadores || !pool) return;

		const itens = Array.from(pool.children);
		const tamanho = opts.chunk || 6;
		const rowClass = opts.rowClass || 'row g-3 g-md-4 justify-content-center';
		let carrossel = null;

		function renderizar(filtro) {
			const visiveis = itens.filter(function (el) {
				return filtro === 'todos' || el.dataset.filterValue === filtro;
			});

			if (carrossel) { carrossel.dispose(); carrossel = null; }
			inner.innerHTML = '';
			indicadores.innerHTML = '';
			if (vazio) vazio.classList.toggle('d-none', visiveis.length !== 0);

			chunk(visiveis, tamanho).forEach(function (grupo, i) {
				const slide = document.createElement('div');
				slide.className = 'carousel-item' + (i === 0 ? ' active' : '');
				const row = document.createElement('div');
				row.className = rowClass;
				grupo.forEach(function (node) { row.appendChild(node); });
				slide.appendChild(row);
				inner.appendChild(slide);

				const dot = document.createElement('button');
				dot.type = 'button';
				dot.className = 'catalog-dot' + (i === 0 ? ' active' : '');
				dot.setAttribute('aria-label', 'Página ' + (i + 1));
				dot.addEventListener('click', function () { if (carrossel) carrossel.to(i); });
				indicadores.appendChild(dot);
			});

			const totalSlides = inner.children.length;
			indicadores.classList.toggle('d-none', totalSlides <= 1);

			const autoScroll = opts.interval && totalSlides > 1;
			carrossel = bootstrap.Carousel.getOrCreateInstance(carrosselEl, {
				interval: autoScroll ? opts.interval : false,
				ride: autoScroll ? 'carousel' : false,
				pause: 'hover',
				wrap: true
			});
			if (autoScroll) carrossel.cycle();
		}

		function aplicarFiltro(el) {
			const valor = el.dataset.filter;
			barraFiltros.querySelectorAll('[data-filter]').forEach(function (b) {
				b.classList.toggle('active', b.dataset.filter === valor);
			});
			const rotulo = barraFiltros.querySelector('.filter-dropdown-toggle');
			if (rotulo) rotulo.textContent = el.textContent.trim();
			renderizar(valor);
		}

		barraFiltros.addEventListener('click', function (e) {
			const el = e.target.closest('[data-filter]');
			if (el && barraFiltros.contains(el)) aplicarFiltro(el);
		});

		carrosselEl.addEventListener('slid.bs.carousel', function (e) {
			indicadores.querySelectorAll('.catalog-dot').forEach(function (d, i) {
				d.classList.toggle('active', i === e.to);
			});
		});

		renderizar('todos');
	}

	window.initCatalog = initCatalog;
})();
