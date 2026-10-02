const questoesOriginais = [
	{
		categoria: "Robô",
		contexto: "Uma linha de montagem eletrônica precisa inserir pequenos componentes em posições repetitivas. O movimento ocorre principalmente no plano horizontal e exige alta velocidade e boa repetibilidade.",
		gatilho: "O engenheiro procura uma configuração com dois eixos rotativos paralelos no plano horizontal e um eixo linear vertical.",
		pergunta: "Qual tipo de robô atende melhor à descrição apresentada?",
		alternativas: ["Robô cartesiano", "Robô SCARA", "Robô polar", "Robô cilíndrico"],
		correta: 1
	},

	{
		categoria: "Sensor",
		contexto: "Uma câmara fria precisa registrar temperatura e umidade do ar no mesmo ponto de medição e enviar os valores para um sistema de monitoramento.",
		gatilho: "A equipe quer um sensor digital que forneça as duas grandezas em um único componente.",
		pergunta: "Qual sensor é mais adequado para essa aplicação?",
		alternativas: ["HC-SR04", "LM35", "DHT22", "LDR"],
		correta: 2
	},

	{
		categoria: "Sensor",
		contexto: "Em uma esteira industrial, peças metálicas precisam ser detectadas sem contato físico. Poeira e vibração tornam indesejável o uso de chaves mecânicas.",
		gatilho: "O dispositivo deve identificar a aproximação de metal por meio de um campo eletromagnético.",
		pergunta: "Qual sensor atende ao requisito?",
		alternativas: ["Sensor indutivo", "Sensor PIR", "Sensor de umidade do solo", "DHT22"],
		correta: 0
	},

	{
		categoria: "Multímetro",
		contexto: "Durante a manutenção de um circuito de baixa tensão, um técnico precisa conferir a tensão contínua fornecida por uma fonte antes de ligá-la ao Arduino.",
		gatilho: "A medição deve ser feita entre dois pontos do circuito, sem interromper o caminho da corrente.",
		pergunta: "Como o multímetro deve ser configurado e conectado?",
		alternativas: ["Na escala de corrente, em série com a fonte", "Na escala de tensão contínua, em paralelo aos pontos medidos", "Na escala de resistência, com o circuito energizado", "Na escala de continuidade, em série com a carga"],
		correta: 1
	},

	{
		categoria: "Arduino",
		contexto: "Um Arduino Uno recebe o estado de um botão e controla um LED. O programa precisa definir corretamente o sentido de cada pino antes do loop principal.",
		gatilho: "O botão envia informação para a placa. O LED recebe um comando da placa.",
		pergunta: "Qual configuração representa corretamente entrada e saída?",
		alternativas: ["Botão como OUTPUT e LED como INPUT", "Botão como INPUT e LED como OUTPUT", "Botão e LED como INPUT", "Botão e LED como OUTPUT"],
		correta: 1
	},

	{
		categoria: "Arduino",
		contexto: "Um projeto precisa ler um sensor analógico no Arduino Uno e controlar um atuador digital. O sensor varia sua tensão de saída conforme a grandeza medida.",
		gatilho: "A leitura precisa retornar um valor proporcional ao nível do sinal, em vez de apenas HIGH ou LOW.",
		pergunta: "Qual combinação de recurso e porta é adequada para a leitura do sensor?",
		alternativas: ["digitalRead() em um pino PWM", "analogRead() em uma entrada A0 a A5", "digitalWrite() em uma entrada A0 a A5", "Serial.read() em um pino digital"],
		correta: 1
	},

	{
		categoria: "ESP8266",
		contexto: "Uma estação de monitoramento precisa coletar dados de sensores e enviá-los pela rede Wi-Fi para um sistema de supervisão, sem depender de um computador conectado o tempo todo.",
		gatilho: "A equipe escolheu uma placa ESP8266 por possuir microcontrolador e conectividade Wi-Fi integrada.",
		pergunta: "Qual função do ESP8266 é mais importante nesse cenário de IoT?",
		alternativas: ["Substituir sensores físicos por dados simulados", "Medir tensão diretamente como um multímetro", "Processar dados e realizar comunicação pela rede Wi-Fi", "Atuar apenas como fonte de alimentação de 5 V"],
		correta: 2
	},

	{
		categoria: "Código",
		contexto: "Um sensor PIR foi ligado ao pino 3 e um LED ao pino 13. Quando o PIR detectar movimento, o LED deve acender.",
		gatilho: "O PIR fornece HIGH quando há detecção.",
		pergunta: "Qual trecho executa corretamente a decisão?",
		alternativas: ["if (digitalRead(3) == HIGH) { digitalWrite(13, HIGH); }", "if (digitalWrite(3) == HIGH) { analogRead(13); }", "if (analogRead(13) == LOW) { digitalRead(3); }", "while (13 == HIGH) { pinMode(3, OUTPUT); }"],
		correta: 0
	},

	{
		categoria: "Código",
		contexto: "Um sensor HC-SR04 mede a distância usando o tempo entre o disparo ultrassônico e o retorno do eco.",
		gatilho: "Depois de obter a duração do pulso de retorno, o programa usa a velocidade do som para estimar a distância.",
		pergunta: "Por que a expressão da distância divide o resultado por 2?",
		alternativas: ["Porque o Arduino trabalha com dois pinos digitais", "Porque o pulso percorre o caminho de ida até o objeto e de volta ao sensor", "Porque o sensor envia dois pulsos ao mesmo tempo", "Porque a função pulseIn() sempre retorna o dobro do tempo real"],
		correta: 1
	},

	{
		categoria: "Código",
		contexto: "Um sistema lê um sensor MQ-2 no pino A2. Quando o valor ultrapassa 400, um alarme conectado ao pino 8 deve ser ativado.",
		gatilho: "Considere que a variável nivelGas já recebeu analogRead(A2).",
		pergunta: "Qual condição implementa corretamente o comportamento descrito?",
		alternativas: ["if (nivelGas < 400) { digitalWrite(8, HIGH); }", "if (nivelGas == A2) { digitalWrite(8, LOW); }", "if (nivelGas > 400) { digitalWrite(8, HIGH); } else { digitalWrite(8, LOW); }", "if (digitalRead(8) > 400) { analogWrite(A2, HIGH); }"],
		correta: 2
	}
]

let questoes = []
let questaoAtual = 0
let respostas = []

const quiz = document.querySelector("#quiz")
const resultado = document.querySelector("#resultado")

const btnIniciar = document.querySelector("#btn-iniciar")
const btnAnterior = document.querySelector("#btn-anterior")
const btnProxima = document.querySelector("#btn-proxima")
const btnReiniciar = document.querySelector("#btn-reiniciar")

const categoria = document.querySelector("#categoria")
const contador = document.querySelector("#contador")
const respondidas = document.querySelector("#respondidas")

const contexto = document.querySelector("#contexto")
const gatilho = document.querySelector("#gatilho")
const pergunta = document.querySelector("#pergunta")

const alternativas = document.querySelector("#alternativas")
const indicadores = document.querySelector("#indicadores")

function embaralhar(array) {
	const copia = [...array]

	for (let i = copia.length - 1; i > 0; i--) {
		const indiceAleatorio = Math.floor(Math.random() * (i + 1))

		const temporario = copia[i]

		copia[i] = copia[indiceAleatorio]
		copia[indiceAleatorio] = temporario
	}

	return copia
}

function prepararQuestoes() {
	questoes = []

	for (let i = 0; i < questoesOriginais.length; i++) {
		const questaoOriginal = questoesOriginais[i]

		const alternativasPreparadas = []

		for (let j = 0; j < questaoOriginal.alternativas.length; j++) {
			alternativasPreparadas.push({
				texto: questaoOriginal.alternativas[j],
				correta: j === questaoOriginal.correta
			})
		}

		questoes.push({
			categoria: questaoOriginal.categoria,
			contexto: questaoOriginal.contexto,
			gatilho: questaoOriginal.gatilho,
			pergunta: questaoOriginal.pergunta,
			alternativas: embaralhar(alternativasPreparadas)
		})
	}
}

function iniciarQuiz() {
	prepararQuestoes()

	questaoAtual = 0

	respostas = Array(questoes.length).fill(null)

	resultado.classList.add("d-none")

	quiz.classList.remove("d-none")

	renderizarQuestao()

	quiz.scrollIntoView({
		behavior: "smooth"
	})
}

function renderizarQuestao() {
	const questao = questoes[questaoAtual]

	categoria.textContent = questao.categoria

	contador.textContent = "Questão " + (questaoAtual + 1) + " de " + questoes.length

	contexto.textContent = questao.contexto

	gatilho.textContent = questao.gatilho

	pergunta.textContent = questao.pergunta

	alternativas.innerHTML = ""

	for (let i = 0; i < questao.alternativas.length; i++) {
		const botao = document.createElement("button")

		const letra = String.fromCharCode(65 + i)

		botao.type = "button"

		botao.className = "quiz-option bg-grey-light rounded-4 p-3 text-start"

		botao.innerHTML = '<span class="hvj-text fw-bold me-2">' + letra + ".</span>" + questao.alternativas[i].texto

		if (respostas[questaoAtual] === i) {
			botao.classList.add("active")
		}

		botao.addEventListener("click", function () {
			selecionarAlternativa(i)
		})

		alternativas.appendChild(botao)
	}

	atualizarNavegacao()

	renderizarIndicadores()
}

function selecionarAlternativa(indice) {
	respostas[questaoAtual] = indice

	renderizarQuestao()
}

function atualizarNavegacao() {
	let totalRespondidas = 0

	for (let i = 0; i < respostas.length; i++) {
		if (respostas[i] !== null) {
			totalRespondidas++
		}
	}

	respondidas.textContent = totalRespondidas + " de " + questoes.length + " respondidas"

	btnAnterior.disabled = questaoAtual === 0

	btnProxima.disabled = respostas[questaoAtual] === null

	if (questaoAtual === questoes.length - 1) {
		btnProxima.innerHTML = 'Finalizar <i class="fa-solid fa-check ms-2"></i>'
	} else {
		btnProxima.innerHTML = 'Próxima <i class="fa-solid fa-arrow-right ms-2"></i>'
	}
}

function renderizarIndicadores() {
	indicadores.innerHTML = ""

	for (let i = 0; i < questoes.length; i++) {
		const botao = document.createElement("button")

		botao.type = "button"

		botao.className = "catalog-dot quiz-dot"

		if (respostas[i] !== null) {
			botao.classList.add("respondida")
		}

		if (i === questaoAtual) {
			botao.classList.add("active")
		}

		botao.title = "Questão " + (i + 1)

		botao.addEventListener("click", function () {
			questaoAtual = i

			renderizarQuestao()
		})

		indicadores.appendChild(botao)
	}
}

function proximaQuestao() {
	if (respostas[questaoAtual] === null) {
		return
	}

	if (questaoAtual < questoes.length - 1) {
		questaoAtual++

		renderizarQuestao()

		return
	}

	let primeiraPendente = -1

	for (let i = 0; i < respostas.length; i++) {
		if (respostas[i] === null) {
			primeiraPendente = i

			break
		}
	}

	if (primeiraPendente !== -1) {
		questaoAtual = primeiraPendente

		renderizarQuestao()

		return
	}

	finalizarQuiz()
}

function finalizarQuiz() {
	let acertos = 0

	for (let i = 0; i < questoes.length; i++) {
		const indiceResposta = respostas[i]

		const alternativaSelecionada = questoes[i].alternativas[indiceResposta]

		if (alternativaSelecionada.correta) {
			acertos++
		}
	}

	const percentual = Math.round((acertos / questoes.length) * 100)

	const pontuacao = document.querySelector("#pontuacao")

	const mensagem = document.querySelector("#mensagem")

	const revisao = document.querySelector("#revisao")

	pontuacao.textContent = acertos + "/" + questoes.length + " · " + percentual + "%"

	if (percentual >= 80) {
		mensagem.textContent = "Bom desempenho. Você demonstrou domínio dos principais conteúdos avaliados."
	} else if (percentual >= 60) {
		mensagem.textContent = "Desempenho intermediário. Revise os conteúdos das questões incorretas."
	} else {
		mensagem.textContent = "Revise os conteúdos do site antes de refazer o quiz."
	}

	revisao.innerHTML = ""

	for (let i = 0; i < questoes.length; i++) {
		const indiceResposta = respostas[i]

		const alternativaSelecionada = questoes[i].alternativas[indiceResposta]

		const acertou = alternativaSelecionada.correta

		const item = document.createElement("div")

		item.className = "bg-grey-light rounded-4 p-3 d-flex justify-content-between gap-3"

		const textoQuestao = document.createElement("span")

		textoQuestao.textContent = "Questão " + (i + 1) + " · " + questoes[i].categoria

		const status = document.createElement("strong")

		if (acertou) {
			status.textContent = "Correta"

			status.className = "text-success"
		} else {
			status.textContent = "Incorreta"

			status.className = "text-danger"
		}

		item.appendChild(textoQuestao)

		item.appendChild(status)

		revisao.appendChild(item)
	}

	quiz.classList.add("d-none")

	resultado.classList.remove("d-none")

	resultado.scrollIntoView({
		behavior: "smooth"
	})
}

btnIniciar.addEventListener("click", iniciarQuiz)

btnAnterior.addEventListener("click", function () {
	if (questaoAtual > 0) {
		questaoAtual--

		renderizarQuestao()
	}
})

btnProxima.addEventListener("click", proximaQuestao)

btnReiniciar.addEventListener("click", iniciarQuiz)
