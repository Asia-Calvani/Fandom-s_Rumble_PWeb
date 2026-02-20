import { SfondoForm, ContenitoreForm, CreaBottone, chiudi } from "./Forms.js";
import { CreaElemento } from "./FunzioniDiSupporto.js";
import { drawPlayer } from "./GestoreRefresh.js";
//Importo valori necessari per la partita e il salvo in variabili
export let statoGioco = {
    player: { danno: 0, vitaMax: 0, vita: 0, anima: "anima" },
    nemico: { abilita: [], danno: 0, vitaMax: 0, vita: 40, immagine: "" },
    CounterAction: 0,
    CounterVictoryAction: 10,
    mossaInUso:"",
    invincibile: false
};


//Funzioni per prende i dati del player e del nemico
export function DatiPg(danno, vitaMax, anima) {
    statoGioco.player.danno = danno;
    statoGioco.player.vitaMax = vitaMax;
    statoGioco.player.vita = vitaMax;
    statoGioco.player.anima = anima;
}

// Handlers per i pulsanti: hover, out e click
export function ScrittaHover(e){
    e.preventDefault();
    e.stopPropagation();
    const selezionato=e.target.id;
    const canvas = document.getElementById('game');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle="white";
    ctx.font="22px VT323";
    let messaggio="";
    switch(selezionato){    
        case "Attacco":
            messaggio="Infliggi al nemico "+statoGioco.player.danno+" di danno.";
            break;
        case "Azione":
            messaggio="Interagisci pacificamente con il tuo nemico.";
            break;
        case "Cura":
            messaggio="Cura te stesso di 5 punti vita.";
            break;
        case "Fuggi":
            messaggio="Scappa dalla battaglia e perdi la partita.";
            break;
        default:
    }
    ctx.clearRect(20, canvas.height/2+2, canvas.width-24, canvas.height/2-55);
    ctx.fillText(messaggio,20,canvas.height/2+50);
}

export function EliminaScrittaHover(e){
    e.preventDefault();
    e.stopPropagation();
    const canvas = document.getElementById('game');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(20, canvas.height/2+2, canvas.width-24, canvas.height/2-55);
}

export function ScrittaSelez(e){
    e.preventDefault();
    e.stopPropagation();
    const ContenitoreBottoni = document.getElementById("bottoniBattaglia");
    if (!ContenitoreBottoni) return;
    const btns = ContenitoreBottoni.querySelectorAll("button");
    // rimuovo solo il listener click per evitare click multipli durante il messaggio
    btns.forEach(btn => {
        btn.removeEventListener("click", ScrittaSelez);
    });
    const selezionato=e.target.id;
    const canvas = document.getElementById('game');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(20, canvas.height/2+2, canvas.width-24, canvas.height/2-55);
    ctx.fillStyle="white";
    ctx.font="22px VT323";
    let messaggio="Hai usato: "+selezionato;
    ctx.fillText(messaggio,20,canvas.height/2+50);
    // eseguo la logica d'azione e poi avvio il turno nemico dopo 2s tramite evento
    settaAzione(e);
    // avvia il turno nemico solo se l'azione scelta non è "Fuggi"
    if (selezionato !== "Fuggi") {
        setTimeout(function(){
            // segnalo a GestoreRefresh di avviare l'animazione del nemico
            window.dispatchEvent(new Event('startEnemyAnim'));
        },2000);
    }
}

export function DatiNemico(danno, vitaMax, immagine) {
    statoGioco.nemico.danno = danno;
    statoGioco.nemico.vitaMax = vitaMax;
    statoGioco.nemico.vita = vitaMax;
    statoGioco.nemico.immagine = immagine;
}

export function caricaAbilità(ab1, ab2, ab3) {
    statoGioco.nemico.abilita = [ab1, ab2, ab3];
}

export function FineTurnoNemico() {
    const risultato = ControlloVittoria();
    if (risultato === "vittoria") {
        MessaggioFinale(true);
        return;
    }
    if (risultato === "sconfitta") {
        MessaggioFinale(false);
        return;
    }
    // rimuovi la classe turno-nemico e riattiva i bottoni
    document.querySelectorAll("#bottoniBattaglia button").forEach(b => {
        b.classList.remove("turno-nemico");
        b.disabled = false;
    });
    TurnoPlayer();
}

//Il gioco inizia con il turno del player che  sceglie cosa fare tramite i bottoni
export function TurnoPlayer() {
const buttons = document.querySelectorAll("#bottoniBattaglia button");
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('turno-nemico');
        btn.addEventListener("mouseover", ScrittaHover);
        btn.addEventListener("mouseout", EliminaScrittaHover);
        btn.addEventListener("click", ScrittaSelez);
    });
}

export function settaAzione(e) {
     e.preventDefault();
    e.stopPropagation();

    const selezionato = e.target.id;

    switch(selezionato){    
            case "Attacco":
                statoGioco.nemico.vita -= statoGioco.player.danno;
                break;
            case "Azione":
                statoGioco.CounterAction += (statoGioco.player.anima === "/Calvani_672819/IMG/ANIMA/yellow.svg") ? 1.25 : 1;
                break;
            case "Cura":
                statoGioco.player.vita = Math.min(statoGioco.player.vita + 5, statoGioco.player.vitaMax);
                document.getElementById("riempimentoBarraPg").style.width = (statoGioco.player.vita / statoGioco.player.vitaMax * 100) + "%";
            document.getElementById("vitaPg").textContent = statoGioco.player.vita + " / " + statoGioco.player.vitaMax;
                break;
            case "Fuggi":
                MessaggioFinale(false);
                window.requestAnimationFrame(drawPlayer);
                break;
            default:
        }
    let risultato=ControlloVittoria(); //controllo se la partita è finita dopo l'azione del player se la scelta fatta non è "fuggi"
    if (risultato === "vittoria") {
        MessaggioFinale(true);
    } else {
        document.querySelectorAll("#bottoniBattaglia button").forEach(b => {
        b.disabled = true;
        b.classList.add("turno-nemico");
        b.removeEventListener("mouseover", ScrittaHover);
        b.removeEventListener("mouseout", EliminaScrittaHover);
        b.removeEventListener("click", ScrittaSelez);
    });
        TurnoNemico();
    }
    //durante il turno del player a meno che non si scelga di fuggire non si può perdere
}

function TurnoNemico() {
    document.getElementById("game").focus();
    const mossa = statoGioco.nemico.abilita[Math.floor(Math.random() * statoGioco.nemico.abilita.length)];
    console.log('Nemico usa mossa:', mossa);
    //Passo il nome della mossa scelta in modo che venga riprodotta come attacco nel canvas
    statoGioco.mossaInUso =mossa;
    
}

function ControlloVittoria() {
    if (statoGioco.nemico.vita <= 0 || statoGioco.CounterAction >= statoGioco.CounterVictoryAction) return "vittoria";//player ha vinto
    if (statoGioco.player.vita <= 0) return "sconfitta";//player ha perso
    return "nessuno";//la partita continua
}

//Funzione che viene chiamata a fine partita per permetterne il salvataggio in database
export function MessaggioFinale(vittoria) {
    const Sfondo = SfondoForm();
    const Contenitore = ContenitoreForm("30%", "30%");
    const Messaggio = CreaElemento("form", "MessaggioFine", "MessaggioFine");
    Messaggio.method = "POST";
    Messaggio.action = "/Calvani_672819/PHP/SUPPORT/RegistrazioneBattaglia.php";

    Contenitore.appendChild(Messaggio);
    Sfondo.appendChild(Contenitore);
    document.body.appendChild(Sfondo);

    const Testo = CreaElemento("h1", "TestoFine");
    Testo.textContent = vittoria ? "Hai vinto!" : "Hai perso!";
    Messaggio.appendChild(Testo);

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "esitoBattaglia";
    input.value = (vittoria ? "vittoria" : "sconfitta") + "-" + statoGioco.CounterAction;
    Messaggio.appendChild(input);

    const button = CreaBottone("Fine", "submit");
    Messaggio.appendChild(button);
    Sfondo.style.display = "flex";
    Sfondo.removeEventListener("click", chiudi);
}

document.addEventListener("DOMContentLoaded",function(){
    TurnoPlayer();
});