let dificuldadeAtual = "normal";

function setDificuldade(nivel) {
    dificuldadeAtual = nivel;
    alert("Dificuldade: " + nivel);
}

const characterData = {
    // PRE Removido aqui
    atributos: { "FOR": 0, "VIG": 0, "AGI": 0, "INT": 0, "POD": 0 },
    pericias: [
        { nome: "Acrobacia", attr: "AGI", mod: 0 },
        { nome: "Adestramento", attr: "INT", mod: 0 },
        { nome: "Artes", attr: "POD", mod: 0 },
        { nome: "Atletismo", attr: "FOR", mod: 0 },
        { nome: "Atualidades", attr: "INT", mod: 0 },
        { nome: "Ciências", attr: "INT", mod: 0 },
        { nome: "Crime", attr: "AGI", mod: 0 },
        { nome: "Diplomacia", attr: "POD", mod: 0 }, 
        { nome: "Enganação", attr: "POD", mod: 0 },  
        { nome: "Fortitude", attr: "VIG", mod: 0 },
        { nome: "Furtividade", attr: "AGI", mod: 0 },
        { nome: "Iniciativa", attr: "AGI", mod: 0 },
        { nome: "Intimidação", attr: "POD", mod: 0 }, 
        { nome: "Intuição", attr: "POD", mod: 0 },  
        { nome: "Investigação", attr: "INT", mod: 0 },
        { nome: "Luta", attr: "FOR", mod: 0 },
        { nome: "Medicina", attr: "INT", mod: 0 },
        { nome: "Arcanismo", attr: "POD", mod: 0 },
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
function rolarPericia(nomePericia, attrSigla, mod) {
    const qtdDados = characterData.atributos[attrSigla] || 1;
    let resultados = [];
    
    for (let i = 0; i < qtdDados; i++) {
        resultados.push(Math.floor(Math.random() * 20) + 1);
    }

    const dadoFinal = escolherDado(resultados);
    const total = dadoFinal + mod;
    const classificacao = classificarResultado(dadoFinal);

    alert(`Rolagem de ${nomePericia} (${attrSigla})
Dados: [${resultados.join(", ")}]
Resultado usado: ${dadoFinal}
Total: ${total}

>>> ${classificacao} <<<`);
}

function executarRolagem(label, qtd, mod) {
    console.log(`Rolando ${qtd}d20 para ${label}`); 
    
    let quantidadeEfetiva = qtd <= 0 ? 1 : qtd;
    
    let resultados = [];
    for (let i = 0; i < quantidadeEfetiva; i++) {
        resultados.push(Math.floor(Math.random() * 20) + 1);
    }
    
function escolherDado(resultados) {
    const sorted = [...resultados].sort((a, b) => b - a);

    // Se tiver 2 dados e cair 1 e 20 → média = 13
    if (resultados.length === 2 && resultados.includes(1) && resultados.includes(20)) {
        return 13;
    }

    // Se tiver 3+ dados e tiver 1 e 20 → pega o segundo maior
    if (resultados.length >= 3 && resultados.includes(1) && resultados.includes(20)) {
        return sorted[1];
    }

    // normal → maior dado
    return sorted[0];
}

function classificarResultado(valor) {
    if (valor === 1) return "Falha Crítica";
    if (valor === 20) return "Sucesso Extremo";

    const tabela = {
        facil: {
            falha: [2, 9],
            sucesso: [10, 19]
        },
        normal: {
            falha: [2, 12],
            sucesso: [13, 19]
        },
        dificil: {
            falha: [2, 15],
            sucesso: [16, 19]
        }
    };

    const zona = tabela[dificuldadeAtual];

    if (valor >= zona.falha[0] && valor <= zona.falha[1]) {
        return "Falha Normal";
    }

    if (valor >= zona.sucesso[0] && valor <= zona.sucesso[1]) {
        return "Sucesso Normal";
    }

    return "Erro";
}
    
    const htmlResultado = `
        <div style="font-family: 'Quicksand', sans-serif; color: #e0e0e0;">
            <p style="margin: 5px 0;">Dados: <strong style="color: #9c4dcc;">[${resultados.join(", ")}]</strong></p>
            <p style="margin: 5px 0;">Melhor: ${melhorDado} ${mod !== 0 ? `<span style="color: #c5a059;">+ ${mod}</span>` : ''}</p>
            <hr style="border: 0; border-top: 1px solid #3e2723; margin: 10px 0;">
            <h2 style="color: #c5a059; text-align: center; margin: 0; font-family: 'Cinzel';">Total: ${total}</h2>
        </div>
    `;
    
    UI.showPopup(label, htmlResultado);
}

document.addEventListener('DOMContentLoaded', () => {
    UI.renderAttributes(characterData.atributos);
    UI.renderSkills(characterData.pericias);
});
