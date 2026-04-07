const characterData = {
    atributos: {
        "Força": 2,
        "Constituição": 3,
        "Agilidade": 1,
        "Intelecto": 4,
        "Poder": 2
    },
    pericias: [
        { nome: "Acrobacia", attr: "AGI", mod: 2 },
        { nome: "Atletismo", attr: "FOR", mod: 0 },
        { nome: "Arcanismo", attr: "POD", mod: 4 },
        { nome: "Medicina", attr: "INT", mod: 2 },
        { nome: "Vontade", attr: "POD", mod: 0 }
        // Adicione as outras conforme a lista que você passou
    ]
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    UI.renderAttributes(characterData.atributos);
    UI.renderSkills(characterData.pericias);
});
