// Ababa
const UI = {
    renderAttributes(attributes) {
        const container = document.getElementById('attr-container');
        if (!container) return;
        container.innerHTML = Object.entries(attributes).map(([name, value]) => `
            <div class="attr-card">
                <span class="attr-name">${name}</span>
                <input type="number" class="attr-value-input" value="${value}" 
                       onchange="updateAttr('${name}', this.value)">
                <button class="roll-attr-btn" onclick="rolarDadoPuro('${name}')" title="Rolar teste puro">ROLAR</button>
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
                <input type="number" class="skill-mod-input" value="${skill.mod}" 
                       onchange="updateSkillMod(${index}, this.value)">
            </div>
        `).join('');
    },
    
    renderHabilidades(habilidades) {
        const container = document.getElementById('habilidades-container');
        if (!container) return;
        
        // Uso de (habilidades || []) evita erros caso a lista venha nula
        container.innerHTML = (habilidades || []).map((hab, index) => `
            <div class="habilidade-item">
                <div class="hab-header">
                    <input type="text" class="hab-name-input" value="${hab.nome}" 
                           oninput="updateHabilidade(${index}, 'nome', this.value)">
                    <button class="remove-hab-btn" onclick="removerHabilidade(${index})" title="Remover Habilidade">✖</button>
                </div>
                <textarea class="hab-desc-input" 
                          placeholder="Descreva o efeito da habilidade..."
                          oninput="updateHabilidade(${index}, 'desc', this.value)">${hab.desc}</textarea>
            </div>
        `).join('');
    },

    showPopup(title, content) {
        const popup = document.getElementById('dice-popup');
        const contentDiv = document.getElementById('popup-content');
        
        if (!popup || !contentDiv) return;

        contentDiv.innerHTML = `
            <span class="popup-title">${title}</span>
            <div>${content}</div>
        `;
        popup.style.display = 'block';
    }
};
