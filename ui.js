const UI = {
    renderAttributes(attributes) {
        const container = document.getElementById('attr-container');
        if (!container) return;
        container.innerHTML = Object.entries(attributes).map(([name, value]) => `
            <div class="attr-card">
                <div class="attr-number-hexagon">
                    <input class="attr-value-input" type="number" value="${value}" 
                           onchange="updateAttr('${name}', this.value)"
                           step="1">
                </div>
                <span class="attr-name">${name}</span>
                <div class="d20-icon" onclick="rolarDadoPuro('${name}')" title="Rolar Teste Puro"></div>
            </div>
        `).join('');
    },

    renderSkills(skills) {
        const container = document.getElementById('skills-container');
        if (!container) return;
        container.innerHTML = skills.map((skill, index) => `
            <div class="skill-item">
                <div class="skill-info" onclick="rolarPericia('${skill.nome}', '${skill.attr}', ${index})" title="Rolar ${skill.nome}">
                    <strong class="skill-name">${skill.nome}</strong>
                    <span class="skill-attr-tag">${skill.attr}</span>
                </div>
                <select class="skill-training-select" onchange="updateSkillTraining(${index}, this.value)">
                    <option value="0" ${skill.treino == 0 ? 'selected' : ''}>+0</option>
                    <option value="2" ${skill.treino == 2 ? 'selected' : ''}>+2</option>
                    <option value="4" ${skill.treino == 4 ? 'selected' : ''}>+4</option>
                </select>
                <input type="number" class="skill-bonus-input" value="${skill.bonus || 0}" 
                       onchange="updateSkillBonus(${index}, this.value)"
                       step="1" title="Bônus Manual">
            </div>
        `).join('');
    },

    renderHabilidades(habilidades) {
        const container = document.getElementById('habilidades-container');
        if (!container) return;
        container.innerHTML = (habilidades || []).map((hab, index) => `
            <div style="background:rgba(255,255,255,0.03); border:1px solid #3e2723; border-radius:4px; padding:10px; margin-bottom:10px">
                <input type="text" value="${hab.nome}" style="background:transparent; border:none; border-bottom:1px solid #6a1b9a; color:#c5a059; font-family:'Cinzel'; width:80%" oninput="updateHabilidade(${index}, 'nome', this.value)">
                <button onclick="removerHabilidade(${index})" style="background:none; border:none; color:red; cursor:pointer">✖</button>
                <textarea style="background:rgba(0,0,0,0.2); border:1px solid #6a1b9a; color:white; width:100%; margin-top:5px; font-family:'Quicksand'; min-height:60px" oninput="updateHabilidade(${index}, 'desc', this.value)">${hab.desc}</textarea>
            </div>
        `).join('');
    },

    showPopup(title, content) {
        const popup = document.getElementById('dice-popup');
        const contentDiv = document.getElementById('popup-content');
        contentDiv.innerHTML = `<h4 style="color:#9c4dcc; font-family:'Cinzel'; margin-top:0">${title}</h4>${content}`;
        popup.style.display = 'block';
    }
};
