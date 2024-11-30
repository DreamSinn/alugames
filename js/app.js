// Estado dos jogos: 0 = disponível, 1 = alugado
const jogos = {
    1: 0, // Monopoly
    2: 0, // Ticket to Ride
    3: 0, // Takenoko
};

// Atualiza a interface para refletir o estado dos jogos
function atualizarUI() {
    document.querySelectorAll('.dashboard__items__item').forEach(item => {
        const gameId = item.id.split('-')[1]; // Extrai o ID do jogo
        const botao = item.querySelector('.dashboard__item__button'); // Botão correspondente

        if (jogos[gameId] === 1) {
            // O jogo está alugado
            botao.textContent = 'Devolver';
            botao.classList.remove('disabled');
            botao.setAttribute('data-action', 'devolver');
        } else if (Object.values(jogos).includes(1)) {
            // Outro jogo está alugado, desabilita este botão
            botao.textContent = 'Alugar';
            botao.classList.add('disabled');
            botao.setAttribute('data-action', 'alugar');
        } else {
            // Nenhum jogo está alugado, o jogo está disponível
            botao.textContent = 'Alugar';
            botao.classList.remove('disabled');
            botao.setAttribute('data-action', 'alugar');
        }
    });
}

// Alterar o estado de um jogo ao clicar no botão
function alterarStatus(gameId) {
    const gameIdInt = parseInt(gameId, 10);

    if (jogos[gameIdInt] === 1) {
        // Devolver o jogo: reseta todos os estados para "disponível"
        Object.keys(jogos).forEach(key => {
            jogos[key] = 0;
        });
        alert('Você devolveu o jogo. Agora pode alugar outro!'); // Alerta ao devolver
    } else if (!Object.values(jogos).includes(1)) {
        // Aluga o jogo: permite alugar apenas se nenhum outro jogo estiver alugado
        jogos[gameIdInt] = 1; // Marca o jogo como alugado
        alert('Você alugou um jogo!'); // Alerta ao alugar
    } else {
        alert('Você já alugou um jogo! Devolva o jogo atual para alugar outro.'); // Alerta caso o usuário tente alugar outro sem devolver
    }

    atualizarUI(); // Atualiza a interface
}

// Adiciona eventos de clique aos botões
document.querySelectorAll('.dashboard__item__button').forEach(botao => {
    botao.addEventListener('click', (event) => {
        event.preventDefault(); // Evita o comportamento padrão do link
        const gameId = event.target.closest('.dashboard__items__item').id.split('-')[1];
        alterarStatus(gameId); // Atualiza o estado baseado no ID do jogo
    });
});

// Inicializa a interface ao carregar a página
atualizarUI();
