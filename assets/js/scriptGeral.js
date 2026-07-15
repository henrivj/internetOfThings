// inicializa as animações de rolagem (AOS) usadas na home
document.addEventListener('DOMContentLoaded', () => {
	if (typeof AOS !== 'undefined') {
		AOS.init({ duration: 700, once: true });
	}
});
