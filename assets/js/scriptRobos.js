// destaca o botão de filtro correspondente à seção de robô visível na tela
const botoesFiltro = document.querySelectorAll('.filter-btn');
const secoesRobo = document.querySelectorAll('main section[id]');

function marcarBotaoAtivo() {
	let idAtual = '';

	secoesRobo.forEach((secao) => {
		const topo = secao.getBoundingClientRect().top;
		if (topo < 140) {
			idAtual = secao.id;
		}
	});

	botoesFiltro.forEach((botao) => {
		const alvo = botao.getAttribute('href')?.replace('#', '');
		botao.classList.toggle('active', alvo === idAtual);
	});
}

window.addEventListener('scroll', marcarBotaoAtivo);
document.addEventListener('DOMContentLoaded', marcarBotaoAtivo);
