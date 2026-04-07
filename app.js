const characterData = {
    atributos: { "FOR": 1, "AGI": 1, "INT": 1, "CON": 1, "POD": 1 },
    pericias: [
        { nome: "Acrobacia", attr: "AGI", mod: 0 },
        { nome: "Adestramento", attr: "INT", mod: 0 },
        { nome: "Artes", attr: "POD", mod: 0 },
        { nome: "Alquimia", attr: "INT", mod: 0 },
        { nome: "Arcanismo", attr: "POD", mod: 0 },
        { nome: "Atletismo", attr: "FOR", mod: 0 },
        { nome: "Atualidades", attr: "INT", mod: 0 },
        { nome: "Ciências", attr: "INT", mod: 0 },
        { nome: "Crime", attr: "AGI", mod: 0 },
        { nome: "Diplomacia", attr: "POD", mod: 0 },
        { nome: "Enganação", attr: "POD", mod: 0 },
        { nome: "Fortitude", attr: "CON", mod: 0 },
        { nome: "Furtividade", attr: "AGI", mod: 0 },
        { nome: "Iniciativa", attr: "AGI", mod: 0 },
        { nome: "Intimidação", attr: "POD", mod: 0 },
        { nome: "Intuição", attr: "POD", mod: 0 },
        { nome: "Investigação", attr: "INT", mod: 0 },
        { nome: "Linguística", attr: "POD", mod: 0 },
        { nome: "Luta", attr: "FOR", mod: 0 },
        { nome: "Medicina", attr: "INT", mod: 0 },
        { nome: "Monstrologia", attr: "INT", mod: 0 },
        { nome: "Percepção", attr: "POD", mod: 0 },
        { nome: "Pilotagem", attr: "AGI", mod: 0 },
        { nome: "Pontaria", attr: "AGI", mod: 0 },
        { nome: "Profissão", attr: "INT", mod: 0 },
        { nome: "Reflexos", attr: "AGI", mod: 0 },
        { nome: "Religião", attr: "POD", mod: 0 },
        { nome: "Sobrevivência", attr: "INT", mod: 0 },
        { nome: "Tática", attr: "INT", mod: 0 },
        { nome: "Tecnologia", attr: "INT", mod: 0 },
        { nome: "Vontade", attr: "POD", mod: 0 }
    ]
};

let dificuldadeAtual = 'normal';

const zonasDeAcerto = {
    facil: { falha: 9, sucesso: 10 },
    normal: { falha: 12, sucesso: 13 },
    dificil: { falha: 15, sucesso: 16 }
};

function definirDificuldade(nivel) {
    dificuldadeAtual = nivel;
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.dataset.nivel === nivel) btn.classList.add('active');
    });
}

function updateAttr(name, value) {
    characterData.atributos[name] = parseInt(value) || 0;
}

function updateSkillMod(index, value) {
    characterData.pericias[index].mod = parseInt(value) || 0;
}

function rolarDadoPuro(attrSigla) {
    const qtdDados = characterData.atributos[attrSigla] || 0; // Garantindo que 0 funcione
    executarRolagem(`Teste de ${attrSigla}`, qtdDados, 0);
}

function rolarPericia(nomePericia, attrSigla, index) {
    const qtdDados = characterData.atributos[attrSigla] || 0;
    const mod = characterData.pericias[index].mod;
    executarRolagem(nomePericia, qtdDados, mod);
}

function executarRolagem(label, qtd, mod) {
    let resultados = [];
    let qtdDados = qtd <= 0 ? 2 : qtd; // Regra 1: Atributo 0 gira 2 dados
    
    for (let i = 0; i < qtdDados; i++) {
        resultados.push(Math.floor(Math.random() * 20) + 1);
    }

    let dadoFinal;
    let mensagemExtra = "";
    let resultadosFiltrados = [...resultados];

    // Lógica de Anulação (1 anula 20)
    let uns = resultados.filter(d => d === 1).length;
    let vintes = resultados.filter(d => d === 20).length;
    let anulacoes = Math.min(uns, vintes);

    if (anulacoes > 0) {
        for (let i = 0; i < anulacoes; i++) {
            resultadosFiltrados.splice(resultadosFiltrados.indexOf(1), 1);
            resultadosFiltrados.splice(resultadosFiltrados.indexOf(20), 1);
        }
        mensagemExtra = `<span style='color:#c5a059'>${anulacoes} anulação(ões) entre 1 e 20!</span>`;
    }

    // Definição do dado final com as novas prioridades
    if (qtd <= 0 && anulacoes === 0) {
        // Se for atributo 0 (sem anulação), pega o menor valor
        dadoFinal = Math.min(...resultados);
        mensagemExtra = "<span style='color:#ff5252'>Desvantagem (Atributo 0).</span>";
    } else if (resultadosFiltrados.length === 0) {
        // Todos se anularam (ex: rolou 1 e 20)
        dadoFinal = 13;
        mensagemExtra += " <br>Valores anulados, assumiu 13.";
    } else {
        // Regra 2: Se sobrou algum "1", ele é prioridade (Falha Crítica)
        if (resultadosFiltrados.includes(1)) {
            dadoFinal = 1;
        } else {
            let maiorRestante = Math.max(...resultadosFiltrados);
            // Regra do 13: se houve anulação e o que sobrou é ruim, assume 13
            if (anulacoes > 0 && maiorRestante < 13) {
                dadoFinal = 13;
                mensagemExtra += " <br>Valor 13 assumido.";
            } else {
                dadoFinal = maiorRestante;
            }
        }
    }

    // Determinar Nível de Sucesso baseado no dadoFinal
    let nivelSucesso = "";
    let corSucesso = "";
    const zona = zonasDeAcerto[dificuldadeAtual];

    if (dadoFinal === 1) {
        nivelSucesso = "FALHA CRÍTICA";
        corSucesso = "#ff1744";
    } else if (dadoFinal === 20) {
        nivelSucesso = "SUCESSO EXTREMO";
        corSucesso = "#00e676";
    } else if (dadoFinal <= zona.falha) {
        nivelSucesso = "FALHA";
        corSucesso = "#ff5252";
    } else {
        nivelSucesso = "SUCESSO";
        corSucesso = "#448aff";
    }

    const total = dadoFinal + mod;

    const html = `
        <div style="font-family: 'Quicksand', sans-serif;">
            <p style="font-size:0.8rem; margin:0; opacity:0.7">Dificuldade: ${dificuldadeAtual.toUpperCase()}</p>
            <p style="margin: 5px 0;">Dados: <strong>[${resultados.join(", ")}]</strong></p>
            <p style="font-size:0.9rem;">${mensagemExtra}</p>
            <hr style="border:0; border-top:1px solid #3e2723">
            <div style="text-align:center">
                <h3 style="color:${corSucesso}; margin:0; font-family:'Cinzel'">${nivelSucesso}</h3>
                <p style="margin:5px 0">Dado: ${dadoFinal} ${mod !== 0 ? `+ Mod: ${mod}` : ''}</p>
                <h2 style="color:#c5a059; margin:0; font-family:'Cinzel'">TOTAL: ${total}</h2>
            </div>
        </div>
    `;
    UI.showPopup(label, html);
}

// Função para salvar no LocalStorage do navegador
function salvarFicha() {
    const dataString = JSON.stringify(characterData);
    localStorage.setItem('ficha_abyss_data', dataString);

    // Feedback Visual
    const feedback = document.getElementById('save-feedback');
    feedback.style.display = 'inline';
    
    // Esconde a mensagem após 3 segundos
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 3000);
}

// Função para carregar os dados ao abrir a página
function carregarFicha() {
    const dadosSalvos = localStorage.getItem('ficha_abyss_data');
    if (dadosSalvos) {
        const dadosParseados = JSON.parse(dadosSalvos);
        
        // Atualiza o objeto characterData com os valores salvos
        characterData.atributos = dadosParseados.atributos;
        characterData.pericias = dadosParseados.pericias;
    }
}

// Modifique o seu DOMContentLoaded para carregar antes de renderizar
document.addEventListener('DOMContentLoaded', () => {
    carregarFicha(); // <--- Adicione isso aqui
    UI.renderAttributes(characterData.atributos);
    UI.renderSkills(characterData.pericias);
});
