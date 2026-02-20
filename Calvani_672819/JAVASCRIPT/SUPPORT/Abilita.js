//Questo file contiene tutte le abilità che possiamo dare ai personaggi
import { statoGioco } from "./GestoreTurni.js";
import { GAME_WIDTH, GAME_HEIGHT } from "./GestoreRefresh.js";
//Oggett che mi collega i nomi alle funzioni
export const AbilitaPossibili = {
  Sasso: InizializzaSasso,
  Carta: InizializzaCarta,
  Forbici: InizializzaForbici,
  PallaDiFuoco: InizializzaPallaDiFuoco,
  Fiori: InizializzaFiori,
  Gusci: InizializzaGusci,
  MangiaTutto: InizializzaMangiaTutto,
  Ciliegine: InizializzaCiliegine,
  Fantasmi: InizializzaFantasmi
};

export function InizializzaSasso(danno){
  //creo un array che mi contiene le info per ogni oggetto sasso che verrà creato dinamicamente
  const sassolini={quantita:30, dimensioneMin:20,dimensioneMax:25,velocitaMin:1,velocitaMax:3, danno:danno, sprite:"/Calvani_672819/IMG/ABILITA/Sasso.png", disegnati:0, intervalloCreazione:500, tempoPassato:0, movimento:"caduta", posizioneFissaPartenza:GAME_HEIGHT/2};
  return sassolini;
}

export function InizializzaCarta(danno){
  const carta={quantita:5, dimensioneMin:80,dimensioneMax:240,velocitaMin:1,velocitaMax:3, danno:danno, sprite:"", disegnati:0, intervalloCreazione:1000, tempoPassato:0, movimento:"comparsa", posizioneFissaPartenza:0};
  return carta;
}
export function InizializzaForbici(danno){
  const forbici={quantita:4, dimensioneMin:30,dimensioneMax:30,velocitaMin:2,velocitaMax:4, danno:danno, sprite:"/Calvani_672819/IMG/ABILITA/forbici.png", disegnati:0, intervalloCreazione:0, tempoPassato:0, movimento:"scorrimento incrociato", posizioneFissaPartenza:3*GAME_HEIGHT/4-40};
  return forbici;
}
export function InizializzaPallaDiFuoco(danno){
  const pallaDiFuoco={quantita:20, dimensioneMin:8,dimensioneMax:14,velocitaMin:4,velocitaMax:6, danno:danno, sprite:"", disegnati:0, intervalloCreazione:150, tempoPassato:0, movimento:"scorrimento orizzontale", posizioneFissaPartenza:GAME_WIDTH};
  return pallaDiFuoco;
}
export function InizializzaFiori(danno){
  const fiori={quantita:6, dimensioneMin:20,dimensioneMax:20,velocitaMin:3,velocitaMax:4, danno:danno, sprite:"/Calvani_672819/IMG/ABILITA/fiori.png", disegnati:0, intervalloCreazione:200, tempoPassato:0, movimento:"salto verticale", posizioneFissaPartenza:GAME_HEIGHT};
  return fiori;
}
export function InizializzaGusci(danno){
  const gusci={quantita:4, dimensioneMin:20,dimensioneMax:30,velocitaMin:2,velocitaMax:4, danno:danno, sprite:"/Calvani_672819/IMG/ABILITA/gusci.png", disegnati:0, intervalloCreazione:100, tempoPassato:0, movimento:"rimbalzo casuale 4", posizioneFissaPartenza:0};
  return gusci;
}
export function InizializzaCiliegine(danno){
    const ciliegine={quantita:15, dimensioneMin:30,dimensioneMax:35,velocitaMin:1,velocitaMax:3, danno:danno, sprite:"/Calvani_672819/IMG/ABILITA/ciliegine.png", disegnati:0, intervalloCreazione:500, tempoPassato:0, movimento:"caduta", posizioneFissaPartenza:GAME_HEIGHT/2};
  return ciliegine;
}
export function InizializzaMangiaTutto(danno){
  const mangiaTutto={quantita:1, dimensioneMin:80,dimensioneMax:100,velocitaMin:5,velocitaMax:6, danno:danno, sprite:"/Calvani_672819/IMG/NPC/Original_PacMan.png", disegnati:0, intervalloCreazione:0, tempoPassato:0, movimento:"scorrimento obliquo", posizioneFissaPartenza:0};
  return mangiaTutto;
}
export function InizializzaFantasmi(danno){
  const fantasmi={quantita:4, dimensioneMin:20,dimensioneMax:30,velocitaMin:2,velocitaMax:4, danno:danno, sprite:"/Calvani_672819/IMG/ABILITA/fantasmino.png", disegnati:0, intervalloCreazione:0, tempoPassato:0, movimento:"movimento 4", posizioneFissaPartenza:GAME_WIDTH/2};
  return fantasmi;
}

export function AggiornaAttacco(abilita, dt){
  //in base a che tipo di movimento ha l'abilità mi comporto in maniera diversa
  const canvas=document.getElementById("game");
  const ctx=canvas.getContext("2d");
  // accumula tempo per spawn
  abilita.tempoPassato = (abilita.tempoPassato || 0) + (dt || 0);
  // dt è in millisecondi dal requestAnimationFrame; normalizziamo sul frame a 60fps (~16.6667ms)
  const frameScale = dt ? dt / 16.6667 : 1;
  switch (abilita.movimento) {
    case "caduta":
      // inserisco gli oggetti in un array per poterli aggiornare e disegnare ogni frame
      if (!abilita._objects) abilita._objects = [];

      // spawnare nuovi elementi a intervalli
      if (abilita.disegnati === 0 || (abilita.tempoPassato >= abilita.intervalloCreazione && abilita.disegnati < abilita.quantita)) {
        const dimensione = abilita.dimensioneMin + Math.random() * (abilita.dimensioneMax - abilita.dimensioneMin);
        const x = Math.floor(Math.random() * (GAME_WIDTH - Math.ceil(dimensione))) + 4 + Math.floor(dimensione / 2);
        const vy = (abilita.velocitaMin) + Math.random() * ((abilita.velocitaMax) - (abilita.velocitaMin));
        abilita._objects.push({ x, y: abilita.posizioneFissaPartenza, r: dimensione / 2, vy, sprite: abilita.sprite });
        abilita.disegnati++;
        abilita.tempoPassato = 0;
      }

      // aggiornare e disegnare gli oggetti esistenti
      for (let i = abilita._objects.length - 1; i >= 0; i--) {
        const o = abilita._objects[i];
        o.y += o.vy * frameScale;
        if (o.sprite) {
          // carico l'immagine come oggeto per non doverla ridisegnare ogni volta
          if (!abilita._spriteImage) {
            abilita._spriteImage = new Image();
            abilita._spriteImage.src = o.sprite;
          }
          const img = abilita._spriteImage;
          if (img && img.complete && img.naturalWidth) {
            ctx.drawImage(img, o.x - o.r, o.y - o.r, o.r * 2, o.r * 2);
            /*ctx.strokeStyle = "red"; // per debug hitbox
            ctx.beginPath();
            ctx.arc(o.x, o.y, o.r-1, 0, 2 * Math.PI);
            ctx.stroke();*/
          } else {
            // disegna un cerchio bianco se l'immagine non è ancora caricata
            ctx.beginPath();
            ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
          }
        } else {
          ctx.beginPath();
          ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
          ctx.fillStyle = "white";
          ctx.fill();
        }
        // rimuovi se fuori dallo schermo
        if (o.y - o.r > GAME_HEIGHT) {
          abilita._objects.splice(i, 1);
        }
      }
      break;
    case "comparsa":
      // gestione di oggetti che compaiono e scompaiono con effetti di fade in/out
      // inserisco gli oggetti in un array per poterli aggiornare e disegnare ogni frame
      if (!abilita._objects) abilita._objects = [];

      // spawnare nuovi elementi a intervalli
      if (abilita.disegnati === 0 || (abilita.tempoPassato >= abilita.intervalloCreazione && abilita.disegnati < abilita.quantita)) {
        const dimensione = abilita.dimensioneMin + Math.random() * (abilita.dimensioneMax - abilita.dimensioneMin);
        const x = Math.floor(Math.random() * (GAME_WIDTH - Math.ceil(dimensione))) + 4 + Math.floor(dimensione / 2);
        const y = Math.floor(Math.random() * (GAME_HEIGHT/2 - Math.ceil(dimensione))) + 4 + GAME_HEIGHT/2;
        abilita._objects.push({ x, y, dmax: dimensione,datt:abilita.dimensioneMin, step: 0.5, sprite: abilita.sprite });
        abilita.disegnati++;
        abilita.tempoPassato = 0;
      }
      // aggiornare e disegnare gli oggetti esistenti
      for (let i = abilita._objects.length - 1; i >= 0; i--) {
        const o = abilita._objects[i];
        o.datt += o.step * frameScale;
        //creo il rettangolo che rappresenta la carta
        ctx.fillStyle = "white";
        ctx.fillRect(o.x, o.y, o.datt, o.datt);
        /*ctx.strokeStyle = "red"; // per debug hitbox
        ctx.strokeRect(o.x, o.y, o.datt, o.datt);*/
        // rimuovi se fuori dallo schermo
        if (o.datt>o.dmax) {
          abilita._objects.splice(i, 1);
        }
      }
      break;
    case "scorrimento incrociato":
      //scorrimento orizzontale incrociato di due copie dello stesso oggetto
      // inserisco gli oggetti in un array per poterli aggiornare e disegnare ogni frame
      if (!abilita._objects) abilita._objects = [];

      // spawnare nuovi elementi a intervalli
      if (abilita.disegnati === 0 || (abilita.tempoPassato >= abilita.intervalloCreazione && abilita.disegnati < abilita.quantita)) {
        const dimensione = abilita.dimensioneMin //abilita.dimensioneMax in questo caso è uguale a dimensioneMin, per questo qui è inizializzata subito
        const y = Math.floor(Math.random() * (GAME_HEIGHT/2 - Math.ceil(dimensione))) + 4 + GAME_HEIGHT/2;
        const vx = (abilita.velocitaMin) + Math.random() * ((abilita.velocitaMax) - (abilita.velocitaMin));
        abilita._objects.push({ x:0, y, r: dimensione, vx, sprite: abilita.sprite });
        abilita._objects.push({ x:GAME_WIDTH, y, r: dimensione, vx: -vx, sprite: abilita.sprite });
        abilita.disegnati+=2; //disegno due oggetti per volta
        abilita.tempoPassato = 0;
      }

      // aggiornare e disegnare gli oggetti esistenti
      for (let i = abilita._objects.length - 1; i >= 0; i-=2) {
        const o1 = abilita._objects[i];
        const o2 = abilita._objects[i-1];
        o1.x += o1.vx * frameScale;
        o2.x += o2.vx * frameScale;
        if (o1.sprite) {
          // carico l'immagine come oggetto per non doverla ridisegnare ogni volta
          if (!abilita._spriteImage) {
            abilita._spriteImage = new Image();
            abilita._spriteImage.src = o1.sprite;
          }
          const img = abilita._spriteImage;
          if (img && img.complete && img.naturalWidth) {
            ctx.drawImage(img, o1.x, o1.y, o1.r, o1.r);
            /*ctx.strokeStyle = "red"; // per debug hitbox
            ctx.strokeRect(o1.x, o1.y, o1.r-2, o1.r-2);*/
          } else {
            // disegna un quadrato bianco se l'immagine non è ancora caricata
            ctx.fillStyle = "white";
            ctx.fillRect(o1.x, o1.y, o1.r, o1.r);
          }
        } else {
          ctx.fillStyle = "white";
          ctx.fillRect(o1.x, o1.y, o1.r, o1.r);
        }
        //faccio gli stessi controlli per o2
        if (o2.sprite) {
          // carico l'immagine come oggetto per non doverla ridisegnare ogni volta
          if (!abilita._spriteImage) {
            abilita._spriteImage = new Image();
            abilita._spriteImage.src = o2.sprite;
          }
          const img = abilita._spriteImage;
          if (img && img.complete && img.naturalWidth) {
            const w = o2.r;
            const h = o2.r;
            const cx = o2.x + w / 2;
            const cy = o2.y + h / 2;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(Math.PI); // 180 gradi
            ctx.drawImage(img, -w / 2, -h / 2, w, h);
            ctx.restore();
          } else {
            // disegna un quadrato bianco se l'immagine non è ancora caricata
            ctx.fillStyle = "white";
            ctx.fillRect(o2.x, o2.y, o2.r, o2.r);
          }
        } else {
          ctx.fillStyle = "white";
          ctx.fillRect(o2.x, o2.y, o2.r, o2.r);
        }

        // rimuovi se fuori dallo schermo
        if (o2.x + o2.r <0 || o1.x-o1.r > GAME_WIDTH|| o1.x+o1.r <0 || o2.x-o2.r > GAME_WIDTH) {
          abilita._objects.splice(i-1, 2);
        }
      }
      break;
    case "scorrimento orizzontale":
      //scorrono orizzontalmente da destra a sinistra
      // inserisco gli oggetti in un array per poterli aggiornare e disegnare ogni frame
      if (!abilita._objects) abilita._objects = [];

      // spawnare nuovi elementi a intervalli
      if (abilita.disegnati === 0 || (abilita.tempoPassato >= abilita.intervalloCreazione && abilita.disegnati < abilita.quantita)) {
        const dimensione = abilita.dimensioneMin + Math.random() * (abilita.dimensioneMax - abilita.dimensioneMin);
        const y = Math.floor(Math.random() * (GAME_HEIGHT/2 - Math.ceil(dimensione))) + 4 + GAME_HEIGHT/2;
        const vx = (abilita.velocitaMin) + Math.random() * ((abilita.velocitaMax) - (abilita.velocitaMin));
        abilita._objects.push({ x:abilita.posizioneFissaPartenza, y , r: dimensione / 2, vx: -vx, sprite: abilita.sprite });
        abilita.disegnati++;
        abilita.tempoPassato = 0;
      }

      // aggiornare e disegnare gli oggetti esistenti
      for (let i = abilita._objects.length - 1; i >= 0; i--) {
        const o = abilita._objects[i];
        o.x += o.vx * frameScale;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        /*ctx.strokeStyle = "red"; // per debug hitbox
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r-1, 0, 2 * Math.PI);
        ctx.stroke();*/
        // rimuovi se fuori dallo schermo
        if (o.x + o.r < 0) {
          abilita._objects.splice(i, 1);
        }
      }
      break;
    case "salto verticale":
      // salto verticale da terra fino ad un'altezza massima e poi ritorno a terra sono 3 elementi per volta
      // inserisco gli oggetti in un array per poterli aggiornare e disegnare ogni frame
      if (!abilita._objects) abilita._objects = [];

      // spawnare nuovi elementi a intervalli
      if (abilita.disegnati === 0 || (abilita.tempoPassato >= abilita.intervalloCreazione && abilita.disegnati < abilita.quantita)) {
        const dimensione = abilita.dimensioneMin + Math.random() * (abilita.dimensioneMax - abilita.dimensioneMin);
        const x = Math.floor(Math.random() * (GAME_WIDTH - Math.ceil(dimensione))) + 4;
        const vy = (abilita.velocitaMin) + Math.random() * ((abilita.velocitaMax) - (abilita.velocitaMin));
        const ymax= abilita.posizioneFissaPartenza - GAME_HEIGHT/4 - Math.random() * 150; // altezza massima del salto
        abilita._objects.push({ x, y: abilita.posizioneFissaPartenza, r: dimensione, l: dimensione*2, vy: -vy, ymax, sprite: abilita.sprite });
        abilita._objects.push({ x:x+dimensione*3, y: abilita.posizioneFissaPartenza, r: dimensione, l: dimensione*2, vy: -vy, ymax, sprite: abilita.sprite });
        abilita._objects.push({ x:x+dimensione*6, y: abilita.posizioneFissaPartenza, r: dimensione, l: dimensione*2, vy: -vy, ymax, sprite: abilita.sprite });
        abilita.disegnati+=3; //disegno tre oggetti per volta
        abilita.tempoPassato = 0;
      }
      // aggiornare e disegnare gli oggetti esistenti
      for (let i = abilita._objects.length - 1; i >= 0; i-=3) {
        const o1 = abilita._objects[i];
        const o2 = abilita._objects[i-1];
        const o3 = abilita._objects[i-2];
        o1.y += o1.vy * frameScale;
        o2.y += o2.vy * frameScale;
        o3.y += o3.vy * frameScale;
        if (o1.sprite) {
          // carico l'immagine come oggetto per non doverla ridisegnare ogni volta
          if (!abilita._spriteImage) {
            abilita._spriteImage = new Image();
            abilita._spriteImage.src = o1.sprite;
          }
          const img = abilita._spriteImage;
          if (img && img.complete && img.naturalWidth) {
            ctx.drawImage(img, o1.x, o1.y, o1.r, o1.l);
            /*ctx.strokeStyle = "red"; // per debug hitbox
            ctx.strokeRect(o1.x+2, o1.y+2, o1.r-4, o1.l-4);*/
          } else {
            // disegna un rettangolo bianco se l'immagine non è ancora caricata
            ctx.fillStyle = "white";
            ctx.fillRect(o1.x, o1.y, o1.r, o1.l);
          }
        } else {
          ctx.fillStyle = "white";
          ctx.fillRect(o1.x, o1.y, o1.r, o1.l);
        }
        //faccio gli stessi controlli per o2
        if (o2.sprite) {
          // carico l'immagine come oggetto per non doverla ridisegnare ogni volta
          if (!abilita._spriteImage) {
            abilita._spriteImage = new Image();
            abilita._spriteImage.src = o2.sprite;
          }
          const img = abilita._spriteImage;
          if (img && img.complete && img.naturalWidth) {
            ctx.drawImage(img, o2.x, o2.y, o2.r, o2.l);
          } else {
            // disegna un rettangolo bianco se l'immagine non è ancora caricata
            ctx.fillStyle = "white";
            ctx.fillRect(o2.x, o2.y, o2.r, o2.l);
          }
        } else {
          ctx.fillStyle = "white";
          ctx.fillRect(o2.x, o2.y, o2.r, o2.l);
        }
        //faccio gli stessi controlli per o3
        if (o3.sprite) {
          // carico l'immagine come oggetto per non doverla ridisegnare ogni volta
          if (!abilita._spriteImage) {
            abilita._spriteImage = new Image();
            abilita._spriteImage.src = o3.sprite;
          }
          const img = abilita._spriteImage;
          if (img && img.complete && img.naturalWidth) {
            ctx.drawImage(img, o3.x, o3.y, o3.r, o3.l);
          } else {
            // disegna un rettangolo bianco se l'immagine non è ancora caricata
            ctx.fillStyle = "white";
            ctx.fillRect(o3.x, o3.y, o3.r, o3.l);
          }
        } else {
          ctx.fillStyle = "white";
          ctx.fillRect(o3.x, o3.y, o3.r, o3.l);
        }

        // se hanno raggiunto o superato l'apice, inverti la velocità verso il basso
        if (o1.y <= o1.ymax) {
          o1.vy = Math.abs(o1.vy);
          o2.vy = Math.abs(o2.vy);
          o3.vy = Math.abs(o3.vy);
        }
        // se sono tornati alla posizione di partenza (o sotto), rimuovili
        if (o1.y >= abilita.posizioneFissaPartenza) {
          abilita._objects.splice(i-2, 3);
        }
      }
      break;
    case "rimbalzo casuale 4":
      // gusci: rimbalzi multipli sulle pareti (fino a 4 rimbalzi per oggetto)
      if (!abilita._objects) abilita._objects = [];

      // spawnare nuovi elementi a intervalli
      if (abilita.disegnati === 0 || (abilita.tempoPassato >= abilita.intervalloCreazione && abilita.disegnati < abilita.quantita)) {
        const dimensione = abilita.dimensioneMin + Math.random() * (abilita.dimensioneMax - abilita.dimensioneMin);
        const x = Math.floor(Math.random() * (GAME_WIDTH - Math.ceil(dimensione))) + 4 + Math.floor(dimensione / 2);
        const y = Math.floor(Math.random() * (GAME_HEIGHT/2 - Math.ceil(dimensione))) + 4 + GAME_HEIGHT/2;
        const vx = ((Math.random() < 0.5) ? -1 : 1) * ((abilita.velocitaMin) + Math.random() * ((abilita.velocitaMax) - (abilita.velocitaMin)));
        const vy = -((abilita.velocitaMin) + Math.random() * ((abilita.velocitaMax) - (abilita.velocitaMin)));
        // RimbRim: numero di rimbalzi contro le pareti rimanenti
        abilita._objects.push({ x, y, r: dimensione / 2, vx, vy, RimbRim: 4, sprite: abilita.sprite });
        abilita.disegnati++;
        abilita.tempoPassato = 0;
      }

      // aggiornare e disegnare gli oggetti esistenti
      for (let i = abilita._objects.length - 1; i >= 0; i--) {
        const o = abilita._objects[i];
        // applica movimento
        o.x += o.vx * frameScale;
        o.y += o.vy * frameScale;

        // collisioni con i bordi e gestione rimbalzi
        let bounced = false;
        // sinistra/destra
        if (o.x - o.r <= 0) {
          o.x = o.r; // evita incastramento
          o.vx = Math.abs(o.vx) * 0.9; // inverti verso destra con un po' di damping
          bounced = true;
        } else if (o.x + o.r >= GAME_WIDTH) {
          o.x = GAME_WIDTH - o.r;
          o.vx = -Math.abs(o.vx) * 0.9;
          bounced = true;
        }
        // sopra/sotto
        if (o.y - o.r <= GAME_HEIGHT/2+4) {
          o.y =  GAME_HEIGHT/2+4+o.r;
          o.vy = Math.abs(o.vy) * 0.9;
          bounced = true;
        } else if (o.y + o.r >= GAME_HEIGHT) {
          o.y = GAME_HEIGHT - o.r;
          o.vy = -Math.abs(o.vy) * 0.9;
          bounced = true;
        }
        if (bounced) {
          o.RimbRim = Math.max(0, (o.RimbRim || 0) - 1);
        }

        // disegna
        if (o.sprite) {
          if (!abilita._spriteImage) {
            abilita._spriteImage = new Image();
            abilita._spriteImage.src = o.sprite;
          }
          const img = abilita._spriteImage;
          if (img && img.complete && img.naturalWidth) {
            ctx.drawImage(img, o.x - o.r, o.y - o.r, o.r * 2, o.r * 2);
            /*ctx.strokeStyle = "red"; // per debug hitbox
            ctx.beginPath();
            ctx.arc(o.x, o.y, o.r-2, 0, 2 * Math.PI);
            ctx.stroke();*/
          } else {
            ctx.beginPath();
            ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
          }
        } else {
          ctx.beginPath();
          ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
          ctx.fillStyle = "white";
          ctx.fill();
        }

        // rimuovi se i rimbalzi sono finiti o se esce completamente dallo schermo
        const outOfBounds = (o.x + o.r < 0) || (o.x - o.r > GAME_WIDTH) || (o.y + o.r < 0) || (o.y - o.r > GAME_HEIGHT);
        if ((o.RimbRim !== undefined && o.RimbRim <= 0) || outOfBounds) {
          abilita._objects.splice(i, 1);
        }
      }
      break;
    case "movimento 4":
      //4 fantasmi nascono dal centro e si muovono lungo le diagonali fino al bordo, quando lo toccano spariscono
      if (!abilita._objects) abilita._objects = [];
      // spawnare nuovi elementi a intervalli e calcolare velocità in modo che arrivino esattamente agli angoli
      if (abilita.disegnati === 0 || (abilita.tempoPassato >= abilita.intervalloCreazione && abilita.disegnati < abilita.quantita)) {
        const dimensione = abilita.dimensioneMin + Math.random() * (abilita.dimensioneMax - abilita.dimensioneMin);
        const startX = abilita.posizioneFissaPartenza;
        const startY = Math.floor(3*GAME_HEIGHT / 4);
        const corners = [
          { tx: 0, ty: GAME_HEIGHT/2 },
          { tx: GAME_WIDTH, ty: GAME_HEIGHT/2 },
          { tx: 0, ty: GAME_HEIGHT },
          { tx: GAME_WIDTH, ty: GAME_HEIGHT }
        ];
        for (let c = 0; c < 4; c++) {
          const dx = corners[c].tx - startX;
          const dy = corners[c].ty - startY;
          const dist = Math.hypot(dx, dy) || 1;
          const speed = (abilita.velocitaMin || 1) + Math.random() * (((abilita.velocitaMax || abilita.velocitaMin) - (abilita.velocitaMin || 1)) || 0);
          const vx = dx / dist * speed;
          const vy = dy / dist * speed;
          abilita._objects.push({ x: startX, y: startY, r: dimensione / 2, vx, vy, sprite: abilita.sprite, targetX: corners[c].tx, targetY: corners[c].ty });
        }
        abilita.disegnati += 4; //disegno quattro oggetti per volta
        abilita.tempoPassato = 0;
      }

      // aggiornare e disegnare gli oggetti esistenti; se raggiungono il corner, snap e rimuovi
      for (let i = abilita._objects.length - 1; i >= 0; i--) {
        const o = abilita._objects[i];
        o.x += o.vx * frameScale;
        o.y += o.vy * frameScale;

        if (o.sprite) {
          if (!abilita._spriteImage) {
            abilita._spriteImage = new Image();
            abilita._spriteImage.src = o.sprite;
          }
          const img = abilita._spriteImage;
          if (img && img.complete && img.naturalWidth) {
            ctx.drawImage(img, o.x - o.r, o.y - o.r, o.r * 2, o.r * 2);
          } else {
            ctx.beginPath();
            ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
          }
        } else {
          ctx.beginPath();
          ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
          ctx.fillStyle = "white";
          ctx.fill();
        }

        const tx = (o.targetX !== undefined) ? o.targetX : (o.vx < 0 ? 0 : GAME_WIDTH);
        const ty = (o.targetY !== undefined) ? o.targetY : (o.vy < 0 ? 0 : GAME_HEIGHT);
        const dToTarget = Math.hypot(o.x - tx, o.y - ty);
        const reachDist = Math.max(6, o.r);
        if (dToTarget <= reachDist) {
          o.x = tx;
          o.y = ty;
          abilita._objects.splice(i, 1);
        }
      }
      break;
    case "scorrimento obliquo":
      //nasce in alto a destra e si muove lungo una diagonale verso il basso a sinistra, quando tocca il bordo sparisce
      if (!abilita._objects) abilita._objects = [];
      // spawnare l'elemento (condizionale come le altre abilità)
      if (abilita.disegnati === 0 || (abilita.tempoPassato >= abilita.intervalloCreazione && abilita.disegnati < abilita.quantita)) {
        const dimensione = abilita.dimensioneMin + Math.random() * (abilita.dimensioneMax - abilita.dimensioneMin);
        // punto di partenza: i alto a sx
        const startX = abilita.posizioneFissaPartenza;
        const startY = GAME_HEIGHT/2;
        // target: angolo in basso a destra
        const targetX = GAME_WIDTH;
        const targetY = GAME_HEIGHT;
        const dx = targetX - startX;
        const dy = targetY - startY;
        const distance = Math.hypot(dx, dy);
        const speed = (abilita.velocitaMin) + Math.random() * (abilita.velocitaMax || abilita.velocitaMin);
        const T = distance / speed;
        const vx = dx / T;
        const vy = dy / T;
        abilita._objects.push({ x: startX, y: startY, r: dimensione / 2, vx, vy, sprite: abilita.sprite, targetX, targetY });
        abilita.disegnati++;
        abilita.tempoPassato = 0;
      }

      // aggiorno e disegno l'oggetto con immagine ruotata per un effetto più gradevole
      for (let i = abilita._objects.length - 1; i >= 0; i--) {
        const o = abilita._objects[i];
        o.x += o.vx * frameScale;
        o.y += o.vy * frameScale;

        if (o.sprite) {
          if (!abilita._spriteImage) {
            abilita._spriteImage = new Image();
            abilita._spriteImage.src = o.sprite;
          }
          const img = abilita._spriteImage;
          if (img && img.complete && img.naturalWidth) {
            const w = o.r * 2;
            const h = o.r * 2;
            const angle = Math.atan2(o.vy, o.vx);
            ctx.save();
            ctx.translate(o.x, o.y);
            ctx.rotate(angle);
            ctx.drawImage(img, -w / 2, -h / 2, w, h);
            ctx.restore();
          } else {
            ctx.beginPath();
            ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
          }
        } else {
          ctx.beginPath();
          ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
          ctx.fillStyle = "white";
          ctx.fill();
        }

        // rimuovi se raggiunge il target (angolo in basso a sinistra) o esce dallo schermo
        const reachDist = Math.max(6, o.r);
        const tx = (o.targetX !== undefined) ? o.targetX : 0;
        const ty = (o.targetY !== undefined) ? o.targetY : GAME_HEIGHT;
        const dToTarget = Math.hypot(o.x - tx, o.y - ty);
        if (dToTarget <= reachDist || o.x + o.r < 0 || o.y - o.r > GAME_HEIGHT || o.x - o.r > GAME_WIDTH || o.y + o.r < 0) {
          // opzionale: forzo la posizione esatta nell'angolo prima di rimuovere
          if (dToTarget <= reachDist) {
            o.x = tx;
            o.y = ty;
          }
          abilita._objects.splice(i, 1);
        }
      }
    default:
      // movimento non riconosciuto
      break;
  }
}
//creazione hitbox per ogni abilità
export function GetHitbox(abilita, mossa) {
  if (!abilita._objects) return [];
  switch (mossa) {
    case "Sasso":
      abilita._objects.forEach(o => {
        o.hitbox = { x: o.x, y: o.y, r: o.r-1 };
      });
      break;
    case "Carta":
      abilita._objects.forEach(o => {
        o.hitbox = { x: o.x, y: o.y, w: o.datt, h: o.datt };
      });
      break;
    case "Forbici":
        abilita._objects.forEach(o => {
          o.hitbox = { x: o.x, y: o.y, w: o.r-2, h: o.r-2 };
        });
        break;
    case "PallaDiFuoco":
      abilita._objects.forEach(o => {
        o.hitbox = { x: o.x, y: o.y, r: o.r-1 };
      });
      break;
    case "Fiori":
      abilita._objects.forEach(o => {
        o.hitbox = { x: o.x+2, y: o.y+2, w: o.r-4, h: o.l-4 };
      });
      break;
    case "Gusci":
      abilita._objects.forEach(o => {
        o.hitbox = { x: o.x, y: o.y, r: o.r-2 };
      });
      break;
    case "Fantasmi":
      abilita._objects.forEach(o => {
        o.hitbox = { x: o.x, y: o.y, r: o.r-1 };
      });
      break;
    case "Ciliegine":
      abilita._objects.forEach(o => {
        o.hitbox = { x: o.x, y: o.y, r: o.r-1 };
      });
      break;
    case "MangiaTutto":
      abilita._objects.forEach(o => {
        o.hitbox = { x: o.x, y: o.y, r: o.r-1 };
      });
      break;
    default:
  }
  return  abilita._objects.map(o => o.hitbox);//array
}
