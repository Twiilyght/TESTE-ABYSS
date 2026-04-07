const characterData = {
    atributos: { "FOR": 0, "VIG": 0, "AGI": 0, "INT": 0, "POD": 0},
    pericias: [
        { nome: "Acrobacia", attr: "AGI", mod: 0 },
        { nome: "Adestramento", attr: "PRE", mod: 0 },
        { nome: "Artes", attr: "PRE", mod: 0 },
        { nome: "Atletismo", attr: "FOR", mod: 0 },
        { nome: "Atualidades", attr: "INT", mod: 0 },
        { nome: "Ciências", attr: "INT", mod: 0 },
        { nome: "Crime", attr: "AGI", mod: 0 },
        { nome: "Diplomacia", attr: "PRE", mod: 0 },
        { nome: "Enganação", attr: "PRE", mod: 0 },
        { nome: "Fortitude", attr: "VIG", mod: 0 },
        { nome: "Furtividade", attr: "AGI", mod: 0 },
        { nome: "Iniciativa", attr: "AGI", mod: 0 },
        { nome: "Intimidação", attr: "PRE", mod: 0 },
        { nome: "Intuição", attr: "PRE", mod: 0 },
        { nome: "Investigação", attr: "INT", mod: 0 },
        { nome: "Luta", attr: "FOR", mod: 0 },
        { nome: "Medicina", attr: "INT", mod: 0 },
        { nome: "Arcanismo", attr: "POD", mod: 0 },
        { nome: "Monstrologia", attr: "INT", mod: 0 },
        { nome: "Percepção", attr: "PRE", mod: 0 },
        { nome: "Pilotagem", attr: "AGI", mod: 0 },
        { nome: "Pontaria", attr: "AGI", mod: 0 },
        { nome: "Profissão", attr: "INT", mod: 0 },
        { nome: "Reflexos", attr: "AGI", mod: 0 },
        { nome: "Religião", attr: "PRE", mod: 0 },
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

// Função centralizada de rolagem e exibição
function executarRolagem(label, qtd, mod) {
    let resultados = [];
    for (let i = 0; i < qtd; i++) {
        resultados.push(Math.floor(Math.random() * 20) + 1);
    }
    
    const melhorDado = Math.max(...resultados);
    const total = melhorDado + mod;
    
    const htmlResultado = `
        <p>Dados: <strong>[${resultados.join(", ")}]</strong></p>
        <p>Melhor: ${melhorDado} ${mod !== 0 ? `+ Mod: ${mod}` : ''}</p>
        <hr style="border-color: var(--border-color)">
        <h2 style="color: var(--text-gold); text-align: center; margin: 5px 0;">Total: ${total}</h2>
    `;
    
    UI.showPopup(label, htmlResultado);
}

document.addEventListener('DOMContentLoaded', () => {
    UI.renderAttributes(characterData.atributos);
    UI.renderSkills(characterData.pericias);
});
