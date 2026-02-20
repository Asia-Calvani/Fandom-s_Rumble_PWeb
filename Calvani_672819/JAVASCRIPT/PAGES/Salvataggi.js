import { SfondoForm, ContenitoreForm, ElementoDelForm, CreaBottone, CreaSelect} from "../SUPPORT/Forms.js";
import {premuto, setPremuto, MenuLogout} from "../SUPPORT/VarDiSupporto.js";
import { CreaElemento, validaPg } from "../SUPPORT/FunzioniDiSupporto.js";
const stored = sessionStorage.getItem("premuto");
if (stored) setPremuto(stored);

document.addEventListener("DOMContentLoaded",function(){
    const Menu= document.getElementById("account");
    Menu.addEventListener("click",function(e){
        e.stopPropagation();
        const Menu=document.getElementById("menu_logout");
        if(!Menu)
            MenuLogout();
        else 
            Menu.style.display=(Menu.style.display==="none")?"flex":"none";    
    });
    let nomeUnico = false;
    const S1=document.getElementById("Slot_1");
    const S2=document.getElementById("Slot_2");
    const S3=document.getElementById("Slot_3");
    const body=document.getElementsByTagName("body")[0];
    let Arr=[S1,S2,S3];
    for(let slot of Arr){
        if(premuto==="continua"){
            if(slot.innerText === "Empty"){
                slot.classList.toggle("no_valid");
                slot.disabled=true;
                slot.addEventListener("click",function(e){
                    e.stopPropagation();
                    e.preventDefault();});
            }else{
                slot.setAttribute("type","submit");
                slot.setAttribute("value",slot.id.split('_')[1]);
                slot.setAttribute("name","slot_selezionato");
                slot.disabled=false;
                /*slot.addEventListener("click",function(e){
                    e.stopPropagation();
                    const slotId = slot.id.split('_')[1]; 
                    sessionStorage.setItem("slot_selezionato", slotId);
                    window.location.href="./ScegliNemico.php";
                });*/
            }
        }
        if(premuto === "nuovo"){
            slot.type="button";
        slot.addEventListener("click",function(e){
            slot.classList.toggle("vuoto", slot.innerText === "Empty");
            slot.classList.toggle("occupato", slot.innerText !== "Empty");
            CreaPg(e);
        });
        }
    }
    
       function CreaPg(e){
        console.log("CreaPg start — target:", e.currentTarget?.id || e.target?.id);

        e.stopPropagation();
        const target = e.currentTarget || e.target;
        const slotId = target.id.split('_')[1]; 
        if(target && target.classList.contains("occupato")){
            if(!confirm("Selezionando e completando la creazione in questo slot sovrascriverai il salvataggio esistente. Premi OK per continuare.")) return;
        }
        if(!document.getElementById("Sfondo")){ // Evita di creare un altro sfondo se già esiste
        const Sfondo = SfondoForm();
        const LForm = ContenitoreForm("50%","70%");
        //const body=document.getElementsByTagName("body")[0];
        //creazione del form generico
        const Form=document.createElement("form");
        Form.setAttribute("action","/Calvani_672819/PHP/SUPPORT/CreazionePg.php");
        Form.setAttribute("method","post");
        Form.id="FormPg";
        //titolo
        const Titolo=document.createElement("h2");
        Titolo.textContent="Create Your Character";
        Titolo.style.textAlign="center";
        Titolo.style.width="100%";
        Form.appendChild(Titolo);
        //campi del form di tipo input
        const slot=ElementoDelForm("Slot");
        slot.Input.setAttribute("type","hidden");
        slot.Input.value=slotId;
        slot.style.display="none";
        Form.appendChild(slot);

        const Nome=ElementoDelForm("NomePg");
        Nome.Input.setAttribute("type","text");
        Nome.Input.setAttribute("pattern","^[A-Za-z][A-Za-z0-9_]{2,10}$");
        Nome.Input.required=true;
        Nome.Input.setAttribute("placeholder","Nome");
        Nome.Label.textContent="Nome Personaggio:";
        Form.appendChild(Nome);

        const Vita=ElementoDelForm("VitaPg");
        Vita.Input.setAttribute("placeholder","20");
        Vita.Input.value = "20";
        Vita.Input.readOnly=true;
        Vita.Label.textContent="Punti Vita:";
        Form.appendChild(Vita);

        const Forza=ElementoDelForm("ForzaPg");
        Forza.Input.setAttribute("placeholder","7");
        Forza.Input.value = "7";
        Forza.Input.readOnly=true;
        Forza.Label.textContent="Forza:";
        Form.appendChild(Forza);
        
        //campi del form di tipo select
        const Anima=CreaSelect("Anime");
        Anima.Label.textContent="Anima:";
        
        Form.appendChild(Anima);
        const Avatar=CreaSelect("Personaggi");
        Avatar.Label.textContent="Avatar:";
        Form.appendChild(Avatar);
        const Ability1=CreaSelect("Abilita","Ability1");
        Ability1.Label.textContent="Abilità 1:";
        Form.appendChild(Ability1);
        const Ability2=CreaSelect("Abilita","Ability2");
        Ability2.Label.textContent="Abilità 2:";
        Form.appendChild(Ability2);
        const Ability3=CreaSelect("Abilita","Ability3");
        Ability3.Label.textContent="Abilità 3:";
        Form.appendChild(Ability3);

        //bottoni
        const BtnDiv=document.createElement("div");
        BtnDiv.classList.add("DivDelForm");
        const CreaPg=CreaBottone("Crea Personaggio","submit");
        CreaPg.classList.add("no_valid");
        BtnDiv.appendChild(CreaPg);
        const Annulla=CreaBottone("Annulla","button");
        Annulla.addEventListener("click",function(){
            const Sfondo = document.getElementById("Sfondo");
            Sfondo.style.display="none";
            Sfondo.remove();
        });
        BtnDiv.appendChild(Annulla);
        Form.appendChild(BtnDiv);
        LForm.appendChild(Form);
        Sfondo.appendChild(LForm);
        body.appendChild(Sfondo);
        Sfondo.style.display = "flex";

        //Parte dell'anteprima del form
        const PreviewPg=CreaElemento("div","PreviewPg");
        PreviewPg.style.textAlign="center";
        //titolo
        const TitAnteprima= document.createElement("h3");
        TitAnteprima.textContent="Anteprima Personaggio";
        PreviewPg.appendChild(TitAnteprima);
        //i valori inseriti sono quelli predefiniti all'apertura del form
        //anteprima dell'avatar
        const anteprimaAvatar=CreaElemento("img","ImgPg");
        const avatarSelect = document.getElementById("Personaggi");
        anteprimaAvatar.src=(avatarSelect.value)?avatarSelect.value:"\/Calvani_672819\/IMG\/PG\/Frisk.png";
        anteprimaAvatar.alt="Frisk";
        PreviewPg.appendChild(anteprimaAvatar);
        //anteprima anima
        const anteprimaAnima=CreaElemento("img","AnimaPg");
        const animaSelect = document.getElementById("Anime");
        anteprimaAnima.src=(animaSelect.value)?animaSelect.value:"\/Calvani_672819\/IMG\/ANIMA\/cyan.svg";
        anteprimaAnima.alt="cyan";
        PreviewPg.appendChild(anteprimaAnima);
        //anteprima nome e vita
        const NomeVitaDiv=CreaElemento("div","NomeVitaDiv");
        const anteprimaNome=CreaElemento("p","NomePg");
        anteprimaNome.textContent=(Nome.Input.value)?Nome.Input.value:"Inserisci Nome";
        NomeVitaDiv.appendChild(anteprimaNome);
        const soloVitaDiv=CreaElemento("div","SoloVita");
        const anteprimaVita=CreaElemento("p","VitaPg");
        anteprimaVita.textContent=Vita.Input.value+"/"+Vita.Input.value;
        soloVitaDiv.appendChild(anteprimaVita);
        
        const BarraVita=CreaElemento("div","BarraVita");
        BarraVita.style.width = '6rem';
        BarraVita.style.height = '10px';
        BarraVita.style.backgroundColor = 'var(--secondario)';
        BarraVita.style.display = 'inline-block';
        soloVitaDiv.appendChild(BarraVita);
        NomeVitaDiv.appendChild(soloVitaDiv);
        PreviewPg.appendChild(NomeVitaDiv);
        //anteprima vantaggio anima
        const VantaggioAnima= CreaElemento("p","VantaggioAnima");
        VantaggioAnima.textContent="cyan: La Forza, aumenta la forza di 2";
        PreviewPg.appendChild(VantaggioAnima);
        //anteprima abilità
        const abInfo1=CreaElemento('p',"abInfo1");
        abInfo1.textContent="abilità1: "+"--Seleziona un'abilità--";
        PreviewPg.appendChild(abInfo1);
        const abInfo2=CreaElemento('p',"abInfo2");
        abInfo2.textContent="abilità2: "+"--Seleziona un'abilità--";
        PreviewPg.appendChild(abInfo2);
        const abInfo3=CreaElemento('p',"abInfo3");
        abInfo3.textContent="abilità3: "+"--Seleziona un'abilità--";
        PreviewPg.appendChild(abInfo3);
        LForm.appendChild(PreviewPg);
        //Aggiornamento in tempo reale dell'anteprima
        //nome
        Nome.Input.addEventListener("input",function(){
            const NomePg=document.getElementById("NomePg");
            NomePg.textContent=Nome.Input.value; 
            //controllo unicità del nome del nuovo personaggio rispetto ai soli personaggi creati dal player loggato al momento
            const Proprietario=document.getElementById("acc_name").textContent;
            validaPg(nomeUnico);
            fetch("/Calvani_672819/PHP/JSON/NpcList.json")
            .then(response => response.json())
            .then(data => { 
                let i = 0;
                let duplicato = false;
                //confonto tutti gli elementi del data finchè non trovo un duplicato o arrivo alla fine
                while (i < data.length && !duplicato) {
                    const elem = data[i];
                    if (elem.Creatore === Proprietario && elem.nome === Nome.Input.value) {
                        duplicato = true;
                        }
                    i++;
                }
                if (duplicato) {
                    Nome.Input.style.borderColor = "var(--secondario)";
                    Nome.Input.setCustomValidity("Nome già in uso.");
                    //alert("Hai già creato un NPC con questo nome.");
                    nomeUnico = false;
                } else {
                    nomeUnico = true;
                    Nome.Input.setCustomValidity("");
                    Nome.Input.style.borderColor = "white";
                }
                validaPg(nomeUnico);
            });
        });
        Anima.Select.addEventListener("change",function(){
            const ImgAnima=document.getElementById("AnimaPg");
            ImgAnima.src=Anima.Select.value;
            ImgAnima.alt=Anima.Select.selectedOptions[0].textContent;
            VantaggioAnima.textContent=ImgAnima.alt+": "+Anima.Select.selectedOptions[0].getAttribute("data-desc");
            switch (Anima.Select.selectedOptions[0].textContent) {
                case "cyan":
                    Forza.Input.value = "7";
                    Vita.Input.value = "20";
                    const anteprimaVitaCyan=document.getElementById("VitaPg");
                    anteprimaVitaCyan.textContent=Vita.Input.value+"/"+Vita.Input.value;
                    break;
                case "red":
                    Forza.Input.value = "5";
                    Vita.Input.value = "22";
                    const anteprimaVitaRed=document.getElementById("VitaPg");
                    anteprimaVitaRed.textContent=Vita.Input.value+"/"+Vita.Input.value;
                    break;
                case "yellow":
                    Forza.Input.value = "5";
                    Vita.Input.value = "20";
                    const anteprimaVitaYellow=document.getElementById("VitaPg");
                    anteprimaVitaYellow.textContent=Vita.Input.value+"/"+Vita.Input.value;
                    break;
                default:
                    break;
            }
        });
        Avatar.Select.addEventListener("change",function(){
            const ImgPg=document.getElementById("ImgPg");
            ImgPg.src=Avatar.Select.value;
            ImgPg.alt=Avatar.Select.selectedOptions[0].textContent;
        });
        Ability1.Select.addEventListener("change",function(){
            const abInfo1=document.getElementById("abInfo1");
            abInfo1.textContent="abilità1: "+Ability1.Select.selectedOptions[0].getAttribute("data-desc");
            validaPg(nomeUnico);
        });
        Ability2.Select.addEventListener("change",function(){
            const abInfo2=document.getElementById("abInfo2");
            abInfo2.textContent="abilità2: "+Ability2.Select.selectedOptions[0].getAttribute("data-desc");
            validaPg(nomeUnico);
        }); 
        Ability3.Select.addEventListener("change",function(){
            const abInfo3=document.getElementById("abInfo3");
            abInfo3.textContent="abilità3: "+Ability3.Select.selectedOptions[0].getAttribute("data-desc");
            validaPg(nomeUnico);
        });
        Form.addEventListener("submit", function(e){
            if (!nomeUnico) e.preventDefault();

        });
    }else{
        const Sfondo = document.getElementById("Sfondo");
        Sfondo.style.display = "flex";    
    }
}});