'use strict'
import { avviso } from "./VarDiSupporto.js";

document.addEventListener("DOMContentLoaded", function (){
//variabile del banner
    const al=avviso((window.innerHeight<700|| window.innerWidth<981)?"flex":"none");
//variabili per il controllo della musica
    const mus=document.getElementById("CtrMus");
    const aud=document.getElementById("Audio");
    mus.addEventListener("click",canzone);
//funzione per far partire/stoppare la musica
    function canzone(){
        let src=mus.getAttribute("src");
        if(src==="/Calvani_672819/IMG/musN.svg"){
            mus.setAttribute("src","/Calvani_672819/IMG/musS.svg");
            aud.play();
        }
        else{
            mus.setAttribute("src","/Calvani_672819/IMG/musN.svg");
            aud.pause();
        }
    }

//funzione per assicurare che la finestra abbia sempre almeno le dimensioni minime necessarie per un'ottimale visualizzazione
window.addEventListener('resize',DimMin);
function DimMin(){
    if(window.innerWidth< 981 || window.innerHeight< 700){
        // il banner di avviso appare
        al.style.display="flex";
    }
    else{
       al.style.display="none";
    }
}
//funzione per avere carosello degli sfondi



//funzione per far sparire il messaggio di errore dopo qualche secondo

const status = document.getElementById('statusConnection');
if (status) {
    const p = status.querySelector('p');
    if (p && p.textContent.trim()) {
        status.classList.remove('fade');   // reset
        status.classList.add('show');      // mostra (fade-in)
        setTimeout(() => {
            status.classList.remove('show'); // avvia fade-out
            status.classList.add('fade');
        }, 2000);
    }
}


});

export const carosello=['/Calvani_672819/IMG/SMB-Mondo-1-1.png',
  '/Calvani_672819/IMG/Home_location.jpg',
  '/Calvani_672819/IMG/FirePlace.jpg'];
export function SettaSfondo(bg){

const Logged=document.getElementById("account");
const overlay = document.getElementById("bg_overlay");
let i=0;

if(!overlay) return;

// se il setting è stato cambiato, mostra subito lo sfondo scelto e disattiva il carosello
if(bg&& bg!=="carosello"){
    overlay.style.backgroundImage = 'url(' + bg + ')';
    overlay.style.animation = 'none';
    overlay.style.opacity = '1';
    return;
}

// altrimenti esegui il carosello esistente
// mostra subito l'immagine corrente e disattiva animazione
overlay.style.backgroundImage = 'url('+carosello[i]+')';
overlay.style.animation = 'none';

const displayMs = 500;    // tempo di visualizzazione prima di avviare la transizione
const transitionMs = 5000; // durata della transizione (ms)
let transitionTimeout = null;

clearTimeout(transitionTimeout);
transitionTimeout = setTimeout(() => {
    overlay.style.animation = `sfondo_passaggio ${transitionMs}ms ease-in-out 1`;
}, displayMs);

overlay.addEventListener('animationend', (ev) => {
    if (ev.animationName !== 'sfondo_passaggio') return;
    overlay.style.animation = 'none';
    i = (i + 1) % carosello.length;
    overlay.style.backgroundImage = 'url('+carosello[i]+')';
    clearTimeout(transitionTimeout);
    transitionTimeout = setTimeout(() => {
        overlay.style.animation = `sfondo_passaggio ${transitionMs}ms ease-in-out 1`;
    }, displayMs);
});
}
//funzione per attivare/disattivare il pulsante "continue" in base alla presenza o meno di salvataggi

export function PresenzaSalvataggi(numSaves){
    const C=document.getElementById("Continue");
    if(numSaves>0){
        C.classList.remove("no_salvataggi");
        C.disabled = false;
    }else{
        C.classList.add("no_salvataggi");
        C.disabled = true;
    }

}

//funzione per creare gli elementi html tramite javascript
export function CreaElemento(tipo, id, classe){
    const Elem=document.createElement(tipo);
    Elem.id=id;
    if(classe) Elem.classList.add(classe);
    return Elem;
}


//funzione per controllare se il form ha dati validi
export function validaPg(nomeUnico){

    const submit = document.getElementById("submitBtn");
    let valido; // variabile di stato della validità totale

    // controllo del nome
    let nomeValido;
    const nome = document.getElementById("NomePgInput");
    if (!nome || !nome.checkValidity()|| !nomeUnico) {
        nomeValido = false;
    }
    else{nomeValido = true;}

    //controllo delle abilità: devono essere tutte selezionate e diverse tra loro
    let abilitavalide;
    const ab1 = document.getElementById("Ability1").value;
    const ab2 = document.getElementById("Ability2").value;
    const ab3 = document.getElementById("Ability3").value;
    
    if (ab1 && ab2 && ab3) {
        if ((ab1 === ab2 || ab1 === ab3 || ab2 === ab3) || (ab1==="--Seleziona un'abilità--" || ab2==="--Seleziona un'abilità--" || ab3==="--Seleziona un'abilità--")) {
            abilitavalide = false;
        }else{abilitavalide=true;}    
    } else {
        abilitavalide = false;
    }
    
    //come si comporta il bottone di submit in base alla validità del form
    valido = nomeValido && abilitavalide;
    if (valido) {
        submit.disabled = false;
        submit.classList.remove("no_valid");
    } else {
        submit.disabled = true;
        if (!submit.classList.contains("no_valid"))
        submit.classList.add("no_valid");
    }
}

export function SwitchSourceHover(ChiId, secondario){
    const chi=document.getElementById(ChiId);
    let base=chi.getAttribute("src");
    chi.addEventListener("mouseenter", function(){
        chi.setAttribute("src", secondario);
    });
    chi.addEventListener("mouseleave", function(){
        chi.setAttribute("src", base);
    });
    return chi;
}
