import { SfondoForm, ContenitoreForm, ElementoDelForm, CreaBottone,chiudi} from "../SUPPORT/Forms.js";
import { carosello } from "../SUPPORT/FunzioniDiSupporto.js";

let Movimento = {
  su: "w",
  giu: "s",
  sx: "a",
  dx: "d"
};

export function getMovimento(){
  return Movimento;
}

export function ImpostaTasti(up, down, left, right){
    Movimento.su=up;
    Movimento.giu=down;
    Movimento.sx=left;
    Movimento.dx=right;
}


document.addEventListener("DOMContentLoaded", function() {
    
    const accountEl = document.getElementById("account");
    const loggato = accountEl ? accountEl.classList[0] : null;
    if(loggato === "logged"){
        const Impostazioni = document.getElementById("Settings");
        if (!Impostazioni) return;
        Impostazioni.addEventListener("click", function(e){
            e.stopPropagation();
            const Sfondo=SfondoForm();
            Sfondo.removeEventListener("click", chiudi);
            const Form=document.createElement("form");
            Form.id="FormImpostazioni";
            Form.setAttribute("action","/Calvani_672819/PHP/SUPPORT/Impostazioni.php");
            Form.setAttribute("method","post");
            const Contenitore=ContenitoreForm("50%");
            Contenitore.id="ContenitoreImpostazioni";
            const Titolo=document.createElement("h2");
            Titolo.textContent="Impostazioni";
            const PrimaRiga= document.createElement("div");
            PrimaRiga.id="PrimaRiga";
            const SecondaRiga= document.createElement("div");
            SecondaRiga.id="SecondaRiga";
            //controllo up
            const Up=ElementoDelForm("Up");
            Up.Input.setAttribute("type","text");
            Up.Input.readOnly = true; // impedisce di inserire testo tramite tastiera, forzando a usare la pressione di un tasto per la selezione
            Up.Input.value = Movimento.su;
            Up.Label.textContent="Su:";
            Up.Input.setAttribute("pattern","^(?:[A-Za-z0-9_]|ArrowUp|ArrowDown|ArrowLeft|ArrowRight)$");
            Up.Input.addEventListener("click", RiscritturaTasti);
            //controllo down
            const Down=ElementoDelForm("Down");
            Down.Input.setAttribute("type","text");
            Down.Input.readOnly = true; // impedisce di inserire testo tramite tastiera, forzando a usare la pressione di un tasto per la selezione
            Down.Input.value = Movimento.giu;
            Down.Label.textContent="Giù:";
            Down.Input.setAttribute("pattern","^(?:[A-Za-z0-9_]|ArrowUp|ArrowDown|ArrowLeft|ArrowRight)$");
            Down.Input.addEventListener("click", RiscritturaTasti);
            PrimaRiga.appendChild(Up);
            PrimaRiga.appendChild(Down);
            //controllo left
            const Left=ElementoDelForm("Left");
            Left.Input.setAttribute("type","text");
            Left.Input.readOnly = true; // impedisce di inserire testo tramite tastiera, forzando a usare la pressione di un tasto per la selezione
            Left.Input.value = Movimento.sx;
            Left.Label.textContent="Sx:";
            //controllo right
            const Right=ElementoDelForm("Right");
            Right.Input.setAttribute("type","text");
            Right.Input.readOnly = true; // impedisce di inserire testo tramite tastiera, forzando a usare la pressione di un tasto per la selezione

            Right.Input.value = Movimento.dx;
            Right.Label.textContent="Dx:";

            Left.Input.setAttribute("pattern","^(?:[A-Za-z0-9_]|ArrowUp|ArrowDown|ArrowLeft|ArrowRight)$");
            Right.Input.setAttribute("pattern","^(?:[A-Za-z0-9_]|ArrowUp|ArrowDown|ArrowLeft|ArrowRight)$");
            Left.Input.addEventListener("click", RiscritturaTasti);
            Right.Input.addEventListener("click", RiscritturaTasti);
            SecondaRiga.appendChild(Left);
            SecondaRiga.appendChild(Right);
            const  TerzaRiga=document.createElement("div");
            TerzaRiga.id="TerzaRiga";
            const labelCarosello=document.createElement("label");
            labelCarosello.setAttribute("for","Carosello");
            labelCarosello.textContent="Sfondo:";
            // crea la select e inserisci le opzioni dal carosello importato
            const Carosello=document.createElement("select");
            Carosello.name="Sfondo";
            Carosello.id = "Carosello";

            const currentSfondo = ( window.CurrentSfondo) ? window.CurrentSfondo : 'carosello';

            // se lo sfondo corrente non è 'carosello' e non è presente nella lista, lo aggiungiamo come prima opzione
            if (currentSfondo && currentSfondo !== '' && currentSfondo !== 'carosello' && !carosello.includes(currentSfondo)) {
                const optionCurrent = document.createElement("option");
                optionCurrent.value = currentSfondo;
                optionCurrent.textContent = 'Attuale - ' + currentSfondo.split("/").pop();
                optionCurrent.selected = true;
                Carosello.appendChild(optionCurrent);
            }

            const optionDefault = document.createElement("option");
            optionDefault.value = "carosello";
            optionDefault.textContent = "Carosello";
            // se lo sfondo corrente è 'carosello' selezioniamo l'opzione di default
            if (currentSfondo === 'carosello' || !currentSfondo) {
                optionDefault.selected = true;
            }
            Carosello.appendChild(optionDefault);

            carosello.forEach((sfondo) => {
                const option = document.createElement("option");
                option.value = sfondo;
                option.textContent = sfondo.split("/").pop();
                if (sfondo === currentSfondo) option.selected = true;
                Carosello.appendChild(option);
            });
            TerzaRiga.appendChild(labelCarosello);
            TerzaRiga.appendChild(Carosello);
            const divBottoni=document.createElement("div");
            divBottoni.id="DivBottoni";
            const BottoneAnnulla=CreaBottone("Annulla", "button");
            BottoneAnnulla.addEventListener("click", function(e){
                e.preventDefault();
                Sfondo.style.display="none";
            });
            const BottoneSalva=CreaBottone("Salva", "submit");
            function validaTasti(){
                const saveBtnLocal = BottoneSalva;
                if(!saveBtnLocal) return;
                const vals = [
                    Up.Input.value,
                    Down.Input.value,
                    Left.Input.value,
                    Right.Input.value
                ];
                //Mi assicuro che non ci siano campi vuoti
                for (let i = 0; i < vals.length; i++){
                    if(!vals[i] || vals[i] === ""){
                        saveBtnLocal.disabled = true;
                        return false;
                    }
                }
                    // controllo se ci sono duplicati, se li trovo evidenzio i campi interessati
                    //e disattivo il pulsante salva
                    let hasDuplicates = false;
                    const inputs = [Up.Input, Down.Input, Left.Input, Right.Input];
                    // reset styles
                    for (let k = 0; k < inputs.length; k++) {
                        inputs[k].style.border = '';
                        inputs[k].setCustomValidity("");
                    }
                    for (let i = 0; i < vals.length; i++){
                        for (let j = i + 1; j < vals.length; j++){
                            if(vals[i] === vals[j]){
                                hasDuplicates = true;
                                inputs[i].style.border = '2px solid var(--secondario)';
                                inputs[j].style.border = '2px solid var(--secondario)';
                                inputs[i].setCustomValidity("Tasto già in uso.")
                                inputs[j].setCustomValidity("Tasto già in uso.")
                            }
                        }
                    }
                    if(hasDuplicates){
                        if(!saveBtnLocal.classList.contains("no_valid"));
                            saveBtnLocal.classList.add("no_valid");
                    }else{
                        saveBtnLocal.classList.remove("no_valid");
                    }
                    saveBtnLocal.disabled = hasDuplicates;
                    return !hasDuplicates;
            }

function RiscritturaTasti(e){
    let tasto= e.target;
    e.preventDefault();
    tasto.style.backgroundColor = "var(--secondario)";
    tasto.value = "";
    function onKey(ev){
        ev.preventDefault();
        let key = "";
        if(ev.key === "Backspace"){
            key = "";
        } 
        else if(ev.key.startsWith("Arrow") || ev.key.length === 1){
            key = ev.key;
        }
        tasto.value = key;
        validaTasti();
        // AGGIORNA Movimento
        if(tasto.name === "UpInput") Movimento.su = key;
        if(tasto.name === "DownInput") Movimento.giu = key;
        if(tasto.name === "LeftInput") Movimento.sx = key;
        if(tasto.name === "RightInput") Movimento.dx = key;
        console.log(Movimento);
        tasto.style.backgroundColor = "";
    }

    window.addEventListener('keydown', onKey, {once: true});
}

            validaTasti();
            divBottoni.appendChild(BottoneAnnulla);
            divBottoni.appendChild(BottoneSalva);
            Contenitore.appendChild(Form);
            Form.appendChild(Titolo);
            Form.appendChild(PrimaRiga);
            Form.appendChild(SecondaRiga);
            Form.appendChild(TerzaRiga);
            Form.appendChild(divBottoni);
            Sfondo.appendChild(Contenitore);
            document.body.appendChild(Sfondo);
            // ensure Movimento is up-to-date when opening settings
            console.debug('Movimento on open', Movimento);
            Up.Input.value = Movimento.su || Up.Input.value || '';
            Down.Input.value = Movimento.giu || Down.Input.value || '';
            Left.Input.value = Movimento.sx || Left.Input.value || '';
            Right.Input.value = Movimento.dx || Right.Input.value || '';
            Sfondo.style.display="flex";
        });
    }
});