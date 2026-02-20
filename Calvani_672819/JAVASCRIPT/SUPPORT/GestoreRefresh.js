//
import { Cuore, LimitiColisione, controlloCollisione } from "./GestorePlayer.js";
import { statoGioco, FineTurnoNemico } from "./GestoreTurni.js";
import { AbilitaPossibili, AggiornaAttacco, GetHitbox } from "./Abilita.js";
import { getMovimento } from "../PAGES/Setting.js";
//file che si occupa di aggiornare  il canvas ad ogni frame 
export const GAME_WIDTH = 550; //le misure del campo intero
export const GAME_HEIGHT = 550;
const canvas=document.getElementById("game");
const nemico=new Image();
let lastTime;
window.addEventListener("load", init);
// ascolta l'evento lanciato da GestoreTurni per avviare l'animazione nemico
window.addEventListener('startEnemyAnim', () => { lastTime = 0; window.requestAnimationFrame(drawNemico); });

export function AvviaGioco(){
    window.requestAnimationFrame(drawPlayer);
}    

export function setNemicoImage(immagine) {
        nemico.src = immagine;
    }

function init(){  //serve per il disegno iniziale del canvas
    //inizio dalla griglia, compreso il nemico che sarà un immagine presa da database e 
    //passata in un qualche modo a questo file
    const canvas=document.getElementById("game");
    const ctx=canvas.getContext("2d");

    //campo player
    ctx.strokeStyle="white";
    ctx.lineWidth=4;
    ctx.strokeRect(0,GAME_HEIGHT/2,GAME_WIDTH,GAME_HEIGHT/2);
    //immagine nemico (sostituita da un retangolo rosso per ora)
    ctx.fillStyle="red";

    console.log("Immagine nemico:", statoGioco.nemico.immagine);
    if(nemico) ctx.drawImage(nemico, GAME_WIDTH/2-80, GAME_HEIGHT/2-244, 160, 240);
    else
        ctx.fillRect(GAME_WIDTH/2-40,GAME_HEIGHT/2-124,80,120);
    ctx.save();
    // rendi il canvas focalizzabile per sicurezza
    canvas.tabIndex = 0;

}

export function drawPlayer(){  
    //disegna il canvas ad ogni frame quando è il turno del player
    //cosa disegnare varia in base allo stato del gioco
    //ciò che cambia è l'interno del campo player
    const canvas=document.getElementById("game");
    const ctx=canvas.getContext("2d"); 
    // pulisci tutto il canvas per evitare residui del cuore
    ctx.clearRect(-1,-1,GAME_WIDTH+2,GAME_HEIGHT+2 );
    // ridisegna sfondo e griglie
    ctx.strokeStyle="white";
    ctx.lineWidth=4;
    ctx.strokeRect(0,GAME_HEIGHT/2,GAME_WIDTH,GAME_HEIGHT/2);
    // ridisegna immagine nemico se caricata
    if(nemico && nemico.complete && nemico.naturalWidth) ctx.drawImage(nemico, GAME_WIDTH/2-80, GAME_HEIGHT/2-244, 160, 240);

    const ContenitoreBottoni = document.getElementById("bottoniBattaglia");
    if (!ContenitoreBottoni) return;

    // Il gestore dei bottoni è spostato in GestoreTurni.js per evitare import circolari.
    // Qui non registriamo più gli handler, GestoreTurni si occupa di abilitare i listener.
    isNemicoTurn = false;
    /*di conseguenza il turno del nemico ha una durata abbastanza definita, mentre la durata del turno
    del player non è definita*/
}
//posizione iniziale del player
let x=GAME_WIDTH/2;
let y=3*GAME_HEIGHT/4;
// flag per indicare il turno del nemico
let isNemicoTurn = false;
// set dinamico di tasti premuti (chiavi normalizzate in lowercase)
const pressedKeys = {};
const Mov= getMovimento(); 
// key handlers centralizzati: aggiunti una sola volta
document.addEventListener("keydown", function(e){
    if(e.target.tagName === "INPUT") return;
    const k = e.key.toLowerCase();
    // build current movement keys normalized
    const keys = [Mov.su, Mov.giu, Mov.sx, Mov.dx].map(s => (s||"").toLowerCase());
    if (keys.includes(k)) {
        pressedKeys[k] = true;
        e.preventDefault();
    }
});
document.addEventListener("keyup", function(e){
    if(e.target.tagName === "INPUT") return;
    const k = e.key.toLowerCase();
    if (pressedKeys[k]) {
        pressedKeys[k] = false;
    }
});


function drawNemico(time){
    //disegna il canvas ad ogni frame quando è il turno del nemico
    //cosa disegnare varia in base allo stato del gioco
    //ciò che cambia è l'interno del campo player
    if(!lastTime) lastTime = time;
    const dt = time - lastTime; 
    lastTime = time;
    //se è il turno del nemico
    const canvas=document.getElementById("game");
    // abilita il movimento del nemico
    isNemicoTurn = true;
    console.log('drawNemico start - mossaInUso=', statoGioco.mossaInUso, ' _abilityName=', statoGioco._abilityName);
    // prova a dare il focus al canvas (se possibile)
    canvas.focus(); 
    const ctx=canvas.getContext("2d"); 
    // pulisci l'intero canvas ogni frame per evitare residui di sprite
    ctx.clearRect(-1, -1, GAME_WIDTH+2, GAME_HEIGHT+2);
    if(nemico && nemico.complete && nemico.naturalWidth) ctx.drawImage(nemico, GAME_WIDTH/2-80, GAME_HEIGHT/2-244, 160, 240);
    //disegno del campo player
    ctx.strokeStyle="white";
    ctx.lineWidth=4;
    ctx.strokeRect(0,GAME_HEIGHT/2,GAME_WIDTH,GAME_HEIGHT/2);
    // mostra la mossa scelta dal nemico (se impostata)
    ctx.fillStyle = "white";
    ctx.font = "20px VT323, monospace";
    // messaggio utile per far capire al player il nome della mossa in uso
    const moveName = statoGioco.mossaInUso;
    if (moveName) {
        ctx.clearRect(20, 10, GAME_WIDTH/2 - 40, 30);
        ctx.fillText("Nemico usa: " + moveName, 20, 30);
    }
    // 1. Appare il cuore rosso che si può muovere tramite wasd solo nell'area del campo player
    // aggiorna posizione in base ai tasti premuti (supporta combinazioni)
    const speed = 3;
    if(isNemicoTurn){
        const ks = {
            su: (Mov.su||"").toLowerCase(),
            giu: (Mov.giu||"").toLowerCase(),
            sx: (Mov.sx||"").toLowerCase(),
            dx: (Mov.dx||"").toLowerCase()
        };
        if(pressedKeys[ks.su] && y-15>=GAME_HEIGHT/2+2) y -= speed;
        if(pressedKeys[ks.giu] && y+15<=GAME_HEIGHT-4) y += speed;
        if(pressedKeys[ks.sx] && x-15>=4) x -= speed;
        if(pressedKeys[ks.dx] && x+15<=GAME_WIDTH-4) x += speed;
    }
    Cuore(x,y);
    
    const hitboxP = LimitiColisione(x,y);
    //2. Parte l'attacco del nemico che il player deve evitare
    if (statoGioco.mossaInUso) {
        if (!statoGioco._abilityInstance || statoGioco._abilityName !== statoGioco.mossaInUso) {
            statoGioco._abilityInstance = AbilitaPossibili[statoGioco.mossaInUso](statoGioco.nemico.danno);
            statoGioco._abilityName = statoGioco.mossaInUso;
            console.log('Created ability instance for', statoGioco.mossaInUso, statoGioco._abilityInstance);
        }

        let abilita = statoGioco._abilityInstance;
        AggiornaAttacco(abilita, dt);
        const hitboxA=GetHitbox(abilita, statoGioco.mossaInUso);

        // attendi che tutti gli oggetti siano spariti prima di terminare l'abilità
        const stillActive = Array.isArray(abilita._objects) ? abilita._objects.length > 0 : false;
        if (abilita.disegnati >= abilita.quantita && !stillActive) {
            statoGioco.mossaInUso = "";
            statoGioco._abilityInstance = null;
            statoGioco._abilityName = "";
            isNemicoTurn = false;
            lastTime = 0;
            FineTurnoNemico();
            window.requestAnimationFrame(drawPlayer);
            return;
        }
        //in caso di collisione il player prende danno e risulta "invincibile" al prossimo dannose avviene in un breve tempo definito
        controlloCollisione(hitboxP, hitboxA);
    }
    if(isNemicoTurn) window.requestAnimationFrame(drawNemico);
    else window.requestAnimationFrame(drawPlayer);
    }