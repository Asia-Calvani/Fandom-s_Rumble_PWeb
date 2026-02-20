import { MenuLogout } from "../SUPPORT/VarDiSupporto.js";
import { SwitchSourceHover, CreaElemento } from "../SUPPORT/FunzioniDiSupporto.js";

const maxBoxPerPage = 15;
let pagina = 0;
let nuovaPagina = false;
let TipoNemico = "";
let scelto = 0;

// array di oggetti selezionati
let selezionati = [];

document.addEventListener("DOMContentLoaded", function () {

    const Logged = document.getElementById("account");
    Logged.addEventListener("click", function (e) {
        e.stopPropagation();
        const Menu = document.getElementById("menu_logout");
        if (!Menu) MenuLogout();
        else Menu.style.display = (Menu.style.display === "none") ? "flex" : "none";
    });

    let fandoms = [];
    fetch("/Calvani_672819/PHP/JSON/NemiciList.json")
        .then(response => response.json())
        .then(data => {
            data.forEach((elem, index) => {
                if (index === 0 || !fandoms.includes(elem.Fandom)) {
                    fandoms.push(elem.Fandom);
                }
            });

            TipoNemico = "Nemici";
            const FandomSelezionato = document.getElementById("Fandom");
            FandomSelezionato.textContent = fandoms[0];
            nuovaPagina = RecuperaGriglia(fandoms[0], TipoNemico, pagina);
        });

    const PrecedenteCateg = SwitchSourceHover("Cat_back", "/Calvani_672819/IMG/PULSANTI/Left_cat_select.svg");
    PrecedenteCateg.addEventListener("click", function () {
        const FandomSelezionato = document.getElementById("Fandom");
        let indiceCorrente = fandoms.indexOf(FandomSelezionato.textContent);

        pagina = 0;

        if (indiceCorrente > 0) {
            indiceCorrente--;
            TipoNemico = "Nemici";
            FandomSelezionato.textContent = fandoms[indiceCorrente];
            nuovaPagina = RecuperaGriglia(fandoms[indiceCorrente], TipoNemico, pagina);
        } else {
            if(indiceCorrente===0){
            TipoNemico = "NPC";
            FandomSelezionato.textContent = "Creazioni degli utenti";
            nuovaPagina = RecuperaGriglia("", TipoNemico, pagina);
        }else{
            indiceCorrente=fandoms.length-1;
            TipoNemico = "Nemici";
            FandomSelezionato.textContent = fandoms[indiceCorrente];
            nuovaPagina = RecuperaGriglia(fandoms[indiceCorrente], TipoNemico, pagina);
            }
        }
    });

    const SuccessivaCateg = SwitchSourceHover("Cat_next", "/Calvani_672819/IMG/PULSANTI/Right_cat_select.svg");
    SuccessivaCateg.addEventListener("click", function () {
        const FandomSelezionato = document.getElementById("Fandom");
        let indiceCorrente = fandoms.indexOf(FandomSelezionato.textContent);

        pagina = 0;

        if (indiceCorrente + 1 < fandoms.length) {
            indiceCorrente++;
            TipoNemico = "Nemici";
            FandomSelezionato.textContent = fandoms[indiceCorrente];
            nuovaPagina = RecuperaGriglia(fandoms[indiceCorrente], TipoNemico, pagina);
        } else {
            if(indiceCorrente + 1 === fandoms.length){
            TipoNemico = "NPC";
            FandomSelezionato.textContent = "Creazioni degli utenti";
            nuovaPagina = RecuperaGriglia("", TipoNemico, pagina);
        }else{
            indiceCorrente=0;
            TipoNemico = "Nemici";
            FandomSelezionato.textContent = fandoms[indiceCorrente];
            nuovaPagina = RecuperaGriglia(fandoms[indiceCorrente], TipoNemico, pagina);
            }
        }
    });

    const PrecedentePag = SwitchSourceHover("page_back", "/Calvani_672819/IMG/PULSANTI/Left_page_select.svg");
    PrecedentePag.addEventListener("click", function () {
        if (pagina > 0) {
            pagina--;
            const fandom = document.getElementById("Fandom").textContent;
            nuovaPagina = RecuperaGriglia(
                fandom === "Creazioni degli utenti" ? "" : fandom,
                TipoNemico,
                pagina
            );
        }
    });

    const SuccessivaPag = SwitchSourceHover("page_next", "/Calvani_672819/IMG/PULSANTI/Right_page_select.svg");
    SuccessivaPag.addEventListener("click", function () {
        if (nuovaPagina) {
            pagina++;
            const fandom = document.getElementById("Fandom").textContent;
            nuovaPagina = RecuperaGriglia(
                fandom === "Creazioni degli utenti" ? "" : fandom,
                TipoNemico,
                pagina
            );
        }
    });

    const Avvio = document.getElementById("InizioGioco");
    Avvio.classList.add("disabilitato");
});

function RecuperaGriglia(fandom, chi, pagina) {
    const PagPrimo_Elem = pagina * maxBoxPerPage;
    const GrigliaNemici = document.getElementById("GrigliaNemici");
    GrigliaNemici.innerHTML = "";

    fetch("/Calvani_672819/PHP/JSON/" + chi + "List.json")
        .then(response => response.json())
        .then(data => {
            const filtered = data.filter(elem => fandom ? elem.Fandom === fandom : true);
            const totalItems = filtered.length;
            const pageItems = filtered.slice(PagPrimo_Elem, PagPrimo_Elem + maxBoxPerPage);

            pageItems.forEach((elem) => {
                const CardNemico = CreaElemento("div", "", "CardNemico");

                // dataset con tutte le info utili
                CardNemico.dataset.nome = elem.nome;
                CardNemico.dataset.fandom = elem.Fandom || "";
                CardNemico.dataset.autore = elem.Creatore || "";
                CardNemico.dataset.tipo = chi;

                const NomeNemico = CreaElemento("p", "", "NomeNemico");
                NomeNemico.textContent = elem.nome;
                CardNemico.appendChild(NomeNemico);

                if (!fandom) {
                    const Autore = document.createElement("p");
                    Autore.textContent = "By " + (elem.Creatore || "");
                    CardNemico.appendChild(Autore);
                }

                // ripristino selezione
                const giaSelezionato = selezionati.some(s =>
                    s.nome === elem.nome &&
                    s.tipo === chi &&
                    (chi === "Nemici"
                        ? s.fandom === elem.Fandom
                        : s.autore === elem.Creatore)
                );

                if (giaSelezionato) {
                    CardNemico.classList.add("selezionato");
                }

                CardNemico.addEventListener("click", Selezionato);
                GrigliaNemici.appendChild(CardNemico);
            });

            nuovaPagina = (PagPrimo_Elem + maxBoxPerPage) < totalItems;

            document.getElementById("page_back")
                .classList.toggle("freccia-disabilitata", pagina === 0);

            document.getElementById("page_next")
                .classList.toggle("freccia-disabilitata", !nuovaPagina);
        });
}

function Selezionato(e) {
    const card = e.currentTarget;

    const nome = card.dataset.nome;
    const fandom = card.dataset.fandom;
    const autore = card.dataset.autore;
    const tipo = card.dataset.tipo;

    const index = selezionati.findIndex(s =>
        s.nome === nome &&
        s.tipo === tipo &&
        (tipo === "Nemici" ? s.fandom === fandom : s.autore === autore)
    );

    if (card.classList.contains("selezionato")) {
        card.classList.remove("selezionato");
        if (index !== -1) selezionati.splice(index, 1);
    } else {
        card.classList.add("selezionato");
        if (index === -1) {
            selezionati.push({
                nome,
                fandom: fandom || null,
                autore: autore || null,
                tipo //mi serve per capire da quale tabella del db prendere i dati
            });
        }
    }

    scelto = selezionati.length;

    const Avvio = document.getElementById("InizioGioco");
    const NemicoSelezionatoInput = document.getElementById("NemicoSelezionato");

    if (scelto === 1) {
        Avvio.classList.remove("disabilitato");
        NemicoSelezionatoInput.value = selezionati[0].nome + "-" + selezionati[0].tipo + "-" + (selezionati[0].fandom ? selezionati[0].fandom : selezionati[0].autore);
    } else {
        Avvio.classList.add("disabilitato");
        NemicoSelezionatoInput.value = "";
    }
   
}
