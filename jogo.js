let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Número máximo de tentativas
const maxTentativas = 10;

// Contador de tentativas restantes
let tentativasRestantes = maxTentativas;

// Seleção dos elementos da página
const inputEl = document.getElementById('palpite');
const buttonEl = document.getElementById('chute');
const messageEl = document.getElementById('dicas');
const attemptsEl = document.getElementById('tentativas');
const restartButton = document.getElementById('reiniciar');


// Mostra inicialmente o número de tentativas
function attTentativas() {
  attemptsEl.textContent = `Tentativas restantes: ${tentativasRestantes}`;
}
attTentativas();

function palpitar() {
  // Lê o valor do input e converte para inteiro
  const numChutado = inputEl.value;
  const guess = parseInt(numChutado, 10);

  // Validação
  if (isNaN(guess) || guess < 1 || guess > 100) {
    messageEl.textContent = 'Por favor, digite um número válido entre 1 e 100.';
    return;
  }

  // Comparação com o número secreto
  if (guess === numeroSecreto) {
    messageEl.textContent = `Você acertou! O número secreto era ${numeroSecreto}.`;
    endGame(true);
    return;
  }

  // Se errou, decrementa as tentativas
  tentativasRestantes -= 1;

  // Dica se o número secreto é maior ou menor
  if (guess < numeroSecreto) {
    messageEl.textContent = 'O número secreto é maior.';
  } else {
    messageEl.textContent = 'O número secreto é menor.';
  }

  // Verifica se as tentativas acabaram
  if (tentativasRestantes <= 0) {
    messageEl.textContent = `Você perdeu! O número secreto era ${numeroSecreto}.`;
    endGame(false);
  } else {
    attTentativas();
  }

  // Limpa o campo e devolve o foco
  inputEl.value = '';
  inputEl.focus();
}

// Quando o jogo termina
function endGame(won) {
  buttonEl.disabled = true;
  inputEl.disabled = true;
  restartButton.style.display = 'inline-block';
  attTentativas();
  }

// Reinicia o jogo
function resetGame() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  tentativasRestantes = maxTentativas;
  messageEl.textContent = '';
  inputEl.value = '';
  inputEl.disabled = false;
  buttonEl.disabled = false;
  restartButton.style.display = 'none';
  attTentativas();
  inputEl.focus();
}

// Eventos
buttonEl.addEventListener('click', palpitar);
inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') palpitar(); });
restartButton.addEventListener('click', resetGame);