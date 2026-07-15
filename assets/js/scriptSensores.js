// filtra os cards de sensores pela categoria selecionada
const botoesCategoria = document.querySelectorAll('#filtros-categoria .filter-btn');
const cardsSensor = document.querySelectorAll('.sensor-card');
const mensagemVazia = document.getElementById('sem-resultado');

function filtrarPorCategoria(categoria) {
	let visiveis = 0;

	cardsSensor.forEach((card) => {
		const pertence = categoria === 'todos' || card.dataset.categoria === categoria;
		card.classList.toggle('d-none', !pertence);
		if (pertence) visiveis++;
	});

	mensagemVazia.classList.toggle('d-none', visiveis !== 0);
}

botoesCategoria.forEach((botao) => {
	botao.addEventListener('click', () => {
		botoesCategoria.forEach((b) => b.classList.remove('active'));
		botao.classList.add('active');
		filtrarPorCategoria(botao.dataset.categoria);
	});
});
