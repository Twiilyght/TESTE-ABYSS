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
    console.log(`Rolando ${qtd}d20 para ${label}`); // Teste de debug
    
    // Se o atributo for 0 ou menor, rola 2d20 e pega o pior (regra comum), 
    // mas aqui faremos o simples: rolar pelo menos 1 dado.
    let quantidadeEfetiva = qtd <= 0 ? 1 : qtd;
    
    let resultados = [];
    for (let i = 0; i < quantidadeEfetiva; i++) {
        resultados.push(Math.floor(Math.random() * 20) + 1);
    }
    
    const melhorDado = Math.max(...resultados);
    const total = melhorDado + mod;
    
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
