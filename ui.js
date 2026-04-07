// Ababa
const UI = {
    renderAttributes(attributes) {
        const container = document.getElementById('attr-container');
        container.innerHTML = Object.entries(attributes).map(([name, value]) => `
            <div class="attr-card">
                <span class="attr-name">${name}</span>
                <input type="number" class="attr-value-input" value="${value}" 
                       onchange="updateAttr('${name}', this.value)">
                <button class="roll-attr-btn" onclick="rolarDadoPuro('${name}')">ROLAR</button>
            </div>
        `).join('');
    },

    renderSkills(skills) {
        const container = document.getElementById('skills-container');
        container.innerHTML = skills.map((skill, index) => `
            <div class="skill-item">
                <div class="skill-info" onclick="rolarPericia('${skill.nome}', '${skill.attr}', ${index})">
                    <strong class="skill-name">${skill.nome}</strong>
                    <span class="skill-attr-tag">${skill.attr}</span>
                </div>
                <input type="number" class="skill-mod-input" value="${skill.mod}" 
                       onchange="updateSkillMod(${index}, this.value)">
            </div>
        `).join('');
    },

    showPopup(title, content) {
        const popup = document.getElementById('dice-popup');
        const contentDiv = document.getElementById('popup-content');
        
        contentDiv.innerHTML = `
            <span class="popup-title">${title}</span>
            <div>${content}</div>
        `;
        popup.style.display = 'block';
    }
};
