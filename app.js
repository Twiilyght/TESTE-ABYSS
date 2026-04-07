const characterData = {
    atributos: {
        "FOR": 2,
        "VIG": 3,
        "AGI": 1,
        "INT": 4,
        "POD": 2,
        "PRE": 2 // Adicionei Presença que aparecia em algumas perícias
    },
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

function rolarPericia(nomePericia, attrSigla, mod) {
    const qtdDados = characterData.atributos[attrSigla] || 1;
    let resultados = [];
    
    for (let i = 0; i < qtdDados; i++) {
        resultados.push(Math.floor(Math.random() * 20) + 1);
    }
    
    const melhorDado = Math.max(...resultados);
    const total = melhorDado + mod;
    
    alert(`Rolagem de ${nomePericia} (${attrSigla}):
Dados: [${resultados.join(", ")}]
Melhor: ${melhorDado} + Mod: ${mod}
Total: ${total}`);
}

document.addEventListener('DOMContentLoaded', () => {
    UI.renderAttributes(characterData.atributos);
    UI.renderSkills(characterData.pericias);
});
