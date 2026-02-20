import { CreaElemento } from "./FunzioniDiSupporto.js";

export function avviso(disp="none"){
    const body=document.getElementsByTagName("body")[0];
//variabile per il banner di avviso
    const avviso=document.createElement("div");
    avviso.style.backgroundColor="white";
    avviso.style.position="absolute";
    avviso.style.top="0rem";
    avviso.style.left="0rem";
    avviso.style.width="100%";
    avviso.style.height="100%";
    avviso.style.zIndex="40";
    avviso.style.justifyContent="center";
    avviso.style.alignItems="center";
    avviso.style.display=disp;
//e scritta
    const msg=document.createElement("p");
    msg.textContent="Per poter giocare la finestra deve essere più grande!";
    msg.style.color="black";
    msg.style.fontSize="2rem";
    msg.style.fontFamily="'VT323'";
    avviso.appendChild(msg);
    body.appendChild(avviso);
    return avviso;
}

export let premuto; //mi serve per capire se la pagina dopo l'index è per una nuova partita o per sceglire un salvataggio già presente
export function setPremuto(val){
    premuto = val;
}

export function MenuLogout(){
    const Pulsante=document.getElementById("acc_name");
    const Menu=CreaElemento("div", "menu_logout");
    Menu.style.position="absolute";
    Menu.style.display="flex";
    const logout=CreaElemento("p", "logout");
    logout.textContent="Logout";
    const divisore=document.createElement("hr");
    const inizio=CreaElemento("p", "pagPrinc");
    inizio.textContent="Pagina Iniziale";
    Menu.appendChild(inizio);
    Menu.appendChild(divisore);
    Menu.appendChild(logout);
    Pulsante.appendChild(Menu);
    inizio.addEventListener("click", function(){
        window.location.href="/Calvani_672819/index.php";
        Menu.style.display="none";
    });
    logout.addEventListener("click", function(){
        window.location.href="/Calvani_672819/PHP/SUPPORT/Logout.php";
        Menu.style.display="none";
    });
}

