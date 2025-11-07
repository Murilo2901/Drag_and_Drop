const times = document.querySelectorAll('.draggable');
const galeria = document.querySelector('#galeria .times');
const favoritos = document.querySelector('#favoritos .times');
const contador = document.getElementById('contador');

let timeSelecionado = null;

times.forEach(time => {
    time.addEventListener('dragstart', () => {
        timeSelecionado = time;
        setTimeout(() => time.style.opacity = '0.5', 0);
    });

    time.addEventListener('dragend', () => {
        time.style.opacity = '1';
        timeSelecionado = null;
    });
});

document.querySelectorAll('.zona-drop').forEach(zona => {
    zona.addEventListener('dragover', e => {
        e.preventDefault();
        zona.classList.add('dragover');
    });

    zona.addEventListener('dragleave', () => {
        zona.classList.remove('dragover');
    });

    zona.addEventListener('drop', () => {
        zona.classList.remove('dragover');

        if (zona.id === 'favoritos') {
            const existe = [...favoritos.children].some(el => el.alt === timeSelecionado.alt);
            if (!existe) {
                const clone = timeSelecionado.cloneNode(true);
                clone.addEventListener('click', () => {
                    clone.remove();
                    atualizarContador();
                });
                favoritos.appendChild(clone);
                atualizarContador();

                clone.style.transform = 'scale(1.2)';
                setTimeout(() => clone.style.transform = 'scale(1)', 300);
            }
        }

        if (zona.id === 'galeria' && timeSelecionado.parentElement.id === 'favoritos') {
            galeria.appendChild(timeSelecionado);
            atualizarContador();
        }
    });
});

function atualizarContador() {
    contador.textContent = favoritos.children.length;
}
