const UI = {
    renderAttributes(attributes) {
        const container = document.getElementById('attr-container');
        container.innerHTML = Object.entries(attributes).map(([name, value]) => `
            <div class="attr-card">
                <span class="attr-name">${name}</span>
                <span class="attr-value">${value}</span>
            </div>
        `).join('');
    },

    renderSkills(skills) {
        const container = document.getElementById('skills-container');
        container.innerHTML = skills.map(skill => `
            <div class="skill-item" onclick="rolarPericia('${skill.nome}', '${skill.attr}', ${skill.mod})">
                <div class="skill-info">
                    <strong class="skill-name">${skill.nome}</strong>
                    <span class="skill-attr-tag">${skill.attr}</span>
                </div>
                <div class="skill-mod">+${skill.mod}</div>
            </div>
        `).join('');
    }
};
