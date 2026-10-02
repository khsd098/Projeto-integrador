const legenda = document.getElementById("legenda");
const diminuir = document.getElementById("diminuir");
const aumentar = document.getElementById("aumentar");
const btnIniciar = document.getElementById("btnIniciar");
const btnLegenda = document.getElementById("btnLegenda");
const textoBtnLegenda = document.getElementById("textoBtnLegenda");
const btnNovaAula = document.getElementById("btnNovaAula");
const copiarLegenda = document.getElementById("copiarLegenda");
const limparLegenda = document.getElementById("limparLegenda");
const telaCheia = document.getElementById("telaCheia");
const tempo = document.getElementById("tempo");
const statusAula = document.getElementById("statusAula");
const statusTexto = document.getElementById("statusTexto");
const mensagemSuporte = document.getElementById("mensagemSuporte");
const tamanhoFonteInfo = document.getElementById("tamanhoFonteInfo");
const cardLegenda = document.getElementById("cardLegenda");
const btnContraste = document.getElementById("btnContraste");
const disciplinaAtual = document.getElementById("disciplinaAtual");
const botoesDisciplinas = document.querySelectorAll("[data-disciplina]");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let reconhecimento = null;
if (SpeechRecognition) {
    reconhecimento = new SpeechRecognition();
    reconhecimento.lang = "pt-BR";
    reconhecimento.continuous = true;
    reconhecimento.interimResults = true;
    reconhecimento.maxAlternatives = 1;
    mensagemSuporte.textContent = "Reconhecimento de voz disponível.";
} else {
    mensagemSuporte.textContent = "Este navegador não possui suporte ao reconhecimento de voz.";
}
