// Link de um som de dados (você pode trocar por um arquivo local se preferir)
const somDados = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-61905/zapsplat_leisure_games_dice_roll_on_hard_surface_001_63587.mp3');

function executarRolagem(label, qtd, mod) {
    // Tocar o som
    somDados.currentTime = 0; // Reinicia o som caso clique rápido
    somDados.play();

    let resultados = [];
    let q = qtd <= 0 ? 2 : qtd;
    
    // Pequeno atraso na exibição do resultado para sincronizar com o som
    setTimeout(() => {
        for (let i = 0; i < q; i++) resultados.push(Math.floor(Math.random() * 20) + 1);
        
        let dadoFinal = (qtd <= 0) ? Math.min(...resultados) : Math.max(...resultados);
        let total = dadoFinal + mod;
        let cor = total >= zonas[dificuldadeAtual] ? "#00e676" : "#ff5252";
        
        UI.showPopup(label, `
            <div style="text-align:center">
                <small>Dados: [${resultados.join(', ')}]</small>
                <h2 style="color:${cor}; margin:10px 0">TOTAL: ${total}</h2>
                <small>Dificuldade: ${zonas[dificuldadeAtual]}</small>
            </div>
        `);
    }, 150); // 150ms de delay para o som começar primeiro
}
