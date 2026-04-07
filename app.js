const characterData = {
    atributos: { "FOR": 1, "VIG": 1, "AGI": 1, "INT": 1, "POD": 1 },
    pericias: [
        { nome: "Acrobacia", attr: "AGI", mod: 0 },
        { nome: "Adestramento", attr: "INT", mod: 0 },
        { nome: "Artes", attr: "POD", mod: 0 },
        { nome: "Atletismo", attr: "FOR", mod: 0 },
        { nome: "Atualidades", attr: "INT", mod: 0 },
        { nome: "Ciências", attr: "INT", mod: 0 },
        { nome: "Crime", attr: "AGI", mod: 0 },
        { nome: "Diplomacia", attr: "POD", mod: 0 }, // Era PRE
        { nome: "Enganação", attr: "POD", mod: 0 },  // Era PRE
        { nome: "Fortitude", attr: "VIG", mod: 0 },
        { nome: "Furtividade", attr: "AGI", mod: 0 },
        { nome: "Iniciativa", attr: "AGI", mod: 0 },
        { nome: "Intimidação", attr: "POD", mod: 0 }, // Era PRE
        { nome: "Intuição", attr: "POD", mod: 0 },    // Era PRE
        { nome: "Investigação", attr: "INT", mod: 0 },
        { nome: "Luta", attr: "FOR", mod: 0 },
        { nome: "Medicina", attr: "INT", mod: 0 },
        { nome: "Arcanismo", attr: "POD", mod: 0 },
        { nome: "Monstrologia", attr: "INT", mod: 0 },
        { nome: "Percepção", attr: "POD", mod: 0 },   // Era PRE
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

let dificuldadeAtual = 'normal'; // Valor padrão

const zonasDeAcerto = {
    facil: { falha: 9, sucesso: 10 },
    normal: { falha: 12, sucesso: 13 },
    dificil: { falha: 15, sucesso: 16 }
};

function definirDificuldade(nivel) {
    dificuldadeAtual = nivel;
    // Atualiza visualmente os botões (opcional, mas bom para o usuário)
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.dataset.nivel === nivel) btn.classList.add('active');
    });
}

// Atualiza o valor do atributo no objeto
function updateAttr(name, value) {
    characterData.atributos[name] = parseInt(value) || 0;
}

// Atualiza o modificador da perícia no objeto
function updateSkillMod(index, value) {
    characterData.pericias[index].mod = parseInt(value) || 0;
}

// Rola apenas os dados do atributo (ex: Força 2 rola 2d20)
function rolarDadoPuro(attrSigla) {
    const qtdDados = characterData.atributos[attrSigla] || 1;
    executarRolagem(`Teste de ${attrSigla}`, qtdDados, 0);
}

// Rola perícia pegando o modificador atualizado
function rolarPericia(nomePericia, attrSigla, index) {
    const qtdDados = characterData.atributos[attrSigla] || 1;
    const mod = characterData.pericias[index].mod;
    executarRolagem(nomePericia, qtdDados, mod);
}

function executarRolagem(label, qtd, mod) {
    let resultados = [];
    let qtdDados = qtd <= 0 ? 2 : qtd;
    
    for (let i = 0; i < qtdDados; i++) {
        resultados.push(Math.floor(Math.random() * 20) + 1);
    }

    let dadoFinal;
    let mensagemExtra = "";
    let resultadosFiltrados = [...resultados];

    // Lógica para Atributo 0 (Pega o menor antes de anular, ou aplica anulação?)
    // Seguindo sua regra de anulação para qualquer rolagem:
    
    if (qtd <= 0) {
        // Na desvantagem (attr 0), se tirar 1 e 20, eles se anulam e vira 13.
        let tem20 = resultados.includes(20);
        let tem1 = resultados.includes(1);
        
        if (tem20 && tem1) {
            dadoFinal = 13;
            mensagemExtra = "<span style='color:#c5a059'>1 e 20 se anularam! Assumiu 13.</span>";
        } else {
            dadoFinal = Math.min(...resultados);
            mensagemExtra = "<span style='color:#ff5252'>Desvantagem (Menor dado).</span>";
        }
    } else {
        // Regra de Anulação para 1 ou mais dados
        let uns = resultados.filter(d => d === 1).length;
        let vintes = resultados.filter(d => d === 20).length;
        let anulacoes = Math.min(uns, vintes);

        if (anulacoes > 0) {
            // Remove um '1' para cada '20'
            for (let i = 0; i < anulacoes; i++) {
                resultadosFiltrados.splice(resultadosFiltrados.indexOf(1), 1);
                resultadosFiltrados.splice(resultadosFiltrados.indexOf(20), 1);
            }
            mensagemExtra = `<span style='color:#c5a059'>${anulacoes} anulação(ões) entre 1 e 20!</span>`;
        }

        if (resultadosFiltrados.length === 0) {
            dadoFinal = 13; // Se todos se anularam
        } else {
            let maiorRestante = Math.max(...resultadosFiltrados);
            // Regra do 13: se o maior for menor que 13 e houve anulação, assume 13
            if (anulacoes > 0 && maiorRestante < 13) {
                dadoFinal = 13;
                mensagemExtra += " <br>Valor 13 assumido.";
            } else {
                dadoFinal = maiorRestante;
            }
        }
    }

    // Determinar Nível de Sucesso baseado no dadoFinal (sem bônus)
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
                <p style="margin:5px 0">Dado: ${dadoFinal} + Mod: ${mod}</p>
                <h2 style="color:#c5a059; margin:0; font-family:'Cinzel'">TOTAL: ${total}</h2>
            </div>
        </div>
    `;
    UI.showPopup(label, html);
}

document.addEventListener('DOMContentLoaded', () => {
    UI.renderAttributes(characterData.atributos);
    UI.renderSkills(characterData.pericias);
});
