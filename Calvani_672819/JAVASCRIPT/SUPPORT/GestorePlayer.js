import { MessaggioFinale, statoGioco } from "./GestoreTurni.js";
import { drawPlayer } from "./GestoreRefresh.js";

const cuoreImg = new Image();
cuoreImg.src = "/Calvani_672819/IMG/ANIMA/red.svg";

let ultimoBlink = 0;
let visibile = true;

export function Cuore(x, y) {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");


    const adesso = Date.now();

    ctx.save();

    if (statoGioco.invincibile) {

        // Cambia stato ogni 150ms
        if (adesso - ultimoBlink > 150) {
            visibile = !visibile;
            ultimoBlink = adesso;
        }

        ctx.globalAlpha = visibile ? 1 : 0;

    } else {
        ctx.globalAlpha = 1;
        visibile = true; // reset quando finisce l'invincibilità
    }

    ctx.drawImage(cuoreImg, x - 15, y - 15, 30, 30);

    ctx.restore();



    /* prova posizione hitbox cuore
    ctx.strokeStyle = "green"; 
    ctx.beginPath();
    ctx.arc(x-6, y-4, 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x+6, y-4, 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y+4, 6, 0, 2 * Math.PI);
    ctx.stroke();*/
};

//per rappresentare il più precisamente possibile l'hitbox del player ho fatto delle prove con dei cerchi, grazie
//ai quali ho trovato le coordinate da controllare
export function LimitiColisione(x,y) {
    //info cerchio 1
    const c1 = { x: x - 6, y: y - 4, r: 8 };
    //info cerchio 2
    const c2 = { x: x + 6, y: y - 4, r: 8 };
    //info cerchio 3
    const c3 = { x: x, y: y + 4, r: 6 };
    return {c1, c2, c3};
}

let TempoInvulnerabile = 0;

function CollisionePlayerCerchio(x1, y1, r1, x2, y2, r2) {
    const dx = x1 - x2; //distanza lungo x dei centri
    const dy = y1 - y2; //distanza lungo y dei centri
    const distanza = dx * dx + dy * dy 
    const lunghezzaRaggi = (r1 + r2) * (r1 + r2);
    return distanza <= lunghezzaRaggi;  //collidono se i 2 centri distano tra di loro meno della somma dei raggi
}
//? source https://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle
// funzione per rilevare collisione tra player e ostacoli rettangolari
function CollisionePlayerRettangolo(cx, cy, cr, rx, ry, rw, rh) {
    let distX = Math.abs(cx - rx - rw / 2);
    let distY = Math.abs(cy - ry - rh / 2);

    if (distX > (rw / 2 + cr)) { return false; }
    if (distY > (rh / 2 + cr)) { return false; }

    if (distX <= (rw / 2)) { return true; } 
    if (distY <= (rh / 2)) { return true; }

    let dx=distX-rw/2;
    let dy=distY-rh/2;
    return (dx*dx+dy*dy<=(cr*cr));
}
//? endsource

// hitboxP: {c1, c2, c3}
// hitboxA: array di hitbox {x,y,r} oppure {x,y,w,h}
export function controlloCollisione(hitboxP, hitboxA) {
    if (!hitboxP || !hitboxA || !Array.isArray(hitboxA)) return;
    const now = Date.now();//mi serve per gestire il tempo di invulnerabilità dopo aver subito un colpo, in modo da non subire danni multipli in un breve lasso di tempo a causa di hitbox multiple o frame rate elevati
    // se siamo invulnerabili non applichiamo danno
    if (now <= TempoInvulnerabile) return;
    statoGioco.invincibile = false; // fine invulnerabilità, il player può subire danno di nuovo
    const playerHitbox = [hitboxP.c1, hitboxP.c2, hitboxP.c3];
    for (let i = hitboxA.length - 1; i >= 0; i--) {
        const hb = hitboxA[i];
        let collided = false;
        for (const p of playerHitbox) {
            if (hb.r !== undefined) {
                if (CollisionePlayerCerchio(p.x, p.y, p.r, hb.x, hb.y, hb.r)) {
                    collided = true;
                }
            } else if (hb.w !== undefined && hb.h !== undefined) {
                if (CollisionePlayerRettangolo(p.x, p.y, p.r, hb.x, hb.y, hb.w, hb.h)) {
                    collided = true;
                }
            }
        }

        if (collided) {
            // applica danno usando il danno del nemico disponibile nello stato di gioco
            const dmg = statoGioco.nemico.danno;
            statoGioco.player.vita = Math.max(0, statoGioco.player.vita - dmg);
            //trovo percentuale di vita rimasta e applico come width sulla barra della vita come effetto
            document.getElementById("riempimentoBarraPg").style.width = (statoGioco.player.vita / statoGioco.player.vitaMax * 100) + "%";
            document.getElementById("vitaPg").textContent = statoGioco.player.vita + " / " + statoGioco.player.vitaMax;
            // imposta invulnerabilità breve
            TempoInvulnerabile = now + 800; // 800ms
            //in questo tempo il player lampeggia
            statoGioco.invincibile = true;
            // segnala morte se necessario e ferma il gioco (basta tornare al turno del player)
            if (statoGioco.player.vita <= 0) {
                MessaggioFinale(false);
                window.requestAnimationFrame(drawPlayer); 
            }
            return;
        }
    }
}