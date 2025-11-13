const imagens = document.querySelectorAll("#galeria img");
const favoritos = document.querySelector("#favoritos .times");
const contador = document.getElementById("contador");
const somTorcida = document.getElementById("somTorcida");

let imagemArrastada = null;

window.addEventListener("load", () => {
  somTorcida.volume = 0.4;
  somTorcida.play().catch(() => console.log("Som bloqueado pelo navegador."));
});

imagens.forEach(img => {
  img.addEventListener("dragstart", e => {
    imagemArrastada = e.target;
    e.dataTransfer.setData("text/plain", e.target.src);
  });
});

const areaDrop = document.querySelector(".area-drop");

areaDrop.addEventListener("dragover", e => {
  e.preventDefault();
  areaDrop.classList.add("dragover");
});

areaDrop.addEventListener("dragleave", () => {
  areaDrop.classList.remove("dragover");
});

areaDrop.addEventListener("drop", e => {
  e.preventDefault();
  areaDrop.classList.remove("dragover");

  const src = e.dataTransfer.getData("text/plain");
  if (!src) return;

  const existe = [...favoritos.querySelectorAll("img")].some(img => img.src === src);
  if (!existe) {
    const novo = imagemArrastada.cloneNode(true);
    novo.addEventListener("click", () => {
      novo.parentElement.remove();
      atualizarContador();
    });
    const div = document.createElement("div");
    div.classList.add("time-card");
    div.appendChild(novo);
    favoritos.appendChild(div);
    atualizarContador();
  }
});

function atualizarContador() {
  contador.textContent = favoritos.querySelectorAll(".time-card").length;
}
