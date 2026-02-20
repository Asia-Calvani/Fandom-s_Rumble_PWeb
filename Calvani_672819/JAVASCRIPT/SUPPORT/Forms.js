//Ogni volta che compare un form la struttura generica è sempre la stessa;
//qui vengono definite quelle funzioni che lo compongono:

import { CreaElemento } from "./FunzioniDiSupporto.js";

//sfondo opacizzato che viene inserito dietro ad ogni form.
export function SfondoForm(){
    const Sfondo=document.createElement("div");
    Sfondo.style.position="absolute";
    Sfondo.style.top="0rem";
    Sfondo.style.left="0rem";
    Sfondo.style.zIndex="10";
    Sfondo.style.width="100vw";
    Sfondo.style.height="100vh";
    Sfondo.style.justifyContent="center";
    Sfondo.style.alignItems="center";
    Sfondo.style.display="none";
    Sfondo.setAttribute("id","Sfondo");
    Sfondo.style.backgroundColor="rgba(0,0,0,0.7)";
    //Il form può essere chiuso anche cliccando sullo sfondo della pagina di login
    Sfondo.addEventListener("click", chiudi );
    return Sfondo;
}
export function chiudi(e){
    if(e.target===document.getElementById("Sfondo"))
        document.getElementById("Sfondo").style.display="none";
    }



export function ContenitoreForm(a="26%", b="70%"){
    const FormC=document.createElement("div");
    FormC.style.position="relative";
    FormC.style.border="solid var(--secondario) 1px";
    FormC.style.borderRadius="5px";
    FormC.style.width=a; 
    FormC.style.height=b;
    FormC.style.display="flex"; 
    FormC.style.backgroundColor="rgba(22, 28, 29, 1)";
    FormC.id="ContenitoreForm";
    return FormC;
}

export function ElementoDelForm(Elem){
    const Elemento=CreaElemento("div",Elem+"Div","DivDelForm");
    const Label=CreaElemento("label",Elem+"Lb");
    Label.setAttribute("for",Elem+"Input");
    const Input=CreaElemento("input",Elem+"Input");
    Input.name=Elem+"Input";
    Elemento.appendChild(Label);
    Elemento.appendChild(Input);
    Elemento.Label=Label;
    Elemento.Input=Input;
    return Elemento;
}

export function CreaBottone(Contenuto, Tipo){
    const Bottone=CreaElemento("button",Tipo+"Btn");
    Bottone.type=Tipo;
    Bottone.textContent=Contenuto;
    return Bottone;
}

export function CreaSelect(cosa,id=cosa){
    const div=CreaElemento("div",id+"Div","DivDelForm");
    div.id=id+"Div";
    const Label=CreaElemento("label",id+"Lb");
    const Select=CreaElemento("select",id);
    Select.name=id;
    fetch("/Calvani_672819/PHP/JSON/"+cosa+"List.json")
    .then(response => response.json())
    .then(data => {
        data.forEach((elem, index) => {
            const Option=document.createElement("option");
            if(elem.value) Option.textContent=elem.value;
            if(elem.img) {Option.value=elem.img;}
            else Option.value=elem.value;
            if(elem.desc) Option.setAttribute("data-desc", elem.desc);
            if (index === 0) Option.selected = true;
            Select.appendChild(Option);        });
     }
    )
    div.appendChild(Label);
    div.appendChild(Select);
    div.Label=Label;
    div.Select=Select;
    return div;
}

