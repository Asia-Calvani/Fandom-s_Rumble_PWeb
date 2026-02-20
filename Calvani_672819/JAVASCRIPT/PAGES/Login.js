import { SfondoForm, ContenitoreForm, ElementoDelForm, CreaBottone} from "../SUPPORT/Forms.js";
import { setPremuto, MenuLogout } from "../SUPPORT/VarDiSupporto.js";

document.addEventListener("DOMContentLoaded", function (){

    const body=document.getElementsByTagName("body")[0];
    //creazione del form generico
    const Form=document.createElement("form");
    Form.id="FormLogEReg";
    Form.setAttribute("action","/Calvani_672819/PHP/SUPPORT/Login.php");
    Form.setAttribute("method","post");
    //Username
    const User=ElementoDelForm("Username");
    User.Input.setAttribute("type","text");
    User.Input.setAttribute("pattern","[A-Za-z0-9_]{3,16}$");
    User.Input.required=true;
    User.Label.textContent="Username:";
    //Password
    const Password=ElementoDelForm("Password");
    Password.Input.setAttribute("type","password");
    Password.Input.setAttribute("pattern","^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!£$%&?@#]).{8,16}$");
    Password.Input.required=true;
    Password.Label.textContent="Password:";
    const ConfermaPassword=ElementoDelForm("ConfermaPassword");
    ConfermaPassword.Input.setAttribute("type","password");
    ConfermaPassword.Input.setAttribute("pattern","^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!£$%&?@#]).{8,16}$");
    ConfermaPassword.Input.required=true;
    ConfermaPassword.Label.textContent="Ripeti Pw:";
    //Bottone di invio
    const BottoneInvio=CreaBottone("Login","submit");
    Form.appendChild(User);
    Form.appendChild(Password);
    Form.appendChild(BottoneInvio);
    //dato che all'apertura siamo sulla pagina di login non inserisco conferma password
    const Sfondo=SfondoForm();
    const Contenitore=ContenitoreForm();

    //aggiunte al form per renderlo dinamico per login e registrazione
    //login
        const Accedi=document.createElement("div");
        const txt=document.createElement("p");
        txt.textContent="Log in";
        Accedi.appendChild(txt);
        Accedi.id="Login";
    //registrazione
        const Registrati=document.createElement("div");
        Registrati.classList.add("disattivato");
        Registrati.id="Registrazione";
        const txt1=document.createElement("p");
        txt1.textContent="Sign in";
        Registrati.appendChild(txt1);

    //collegamento degli elementi html tra di loro
        Sfondo.appendChild(Contenitore);
        Contenitore.appendChild(Accedi);
        Contenitore.appendChild(Registrati);
        Contenitore.appendChild(Form);
        body.appendChild(Sfondo);

        //eventi della pagina
        const Guide=document.getElementById("Guide");
        Guide.addEventListener("click", function(e){
            e.stopPropagation();
            window.location.href="/Calvani_672819/Documentazione.html";
        });
        const Logged=document.getElementById("account");
        const NG=document.getElementById("New_game");
        const C=document.getElementById("Continue");
        const S=document.getElementById("Settings");
        if(Logged.classList[0]==='not_log'){
            NG.addEventListener('click', function(e){e.stopPropagation();Sfondo.style.display="flex";});
            C.addEventListener('click', function(e){e.stopPropagation();Sfondo.style.display="flex";});
            S.addEventListener('click', function(e){e.stopPropagation();Sfondo.style.display="flex";});
            Logged.addEventListener('click', function(e){e.stopPropagation();Sfondo.style.display="flex";});
            
        }
        //Ogni volta che passo da registrazione a login e viceversa il form cambia leggermente
        Registrati.addEventListener("click",function(e){
            e.stopPropagation();
            Form.removeChild(BottoneInvio);
            Registrati.classList.remove("disattivato");
            Accedi.classList.add("disattivato");
            BottoneInvio.textContent="Sign in";
            BottoneInvio.setAttribute("name", "Registrazione");
            Form.appendChild(ConfermaPassword);
            Form.appendChild(BottoneInvio);
          });
        
        Accedi.addEventListener("click",function(e){
            e.stopPropagation();
            if(document.getElementById("ConfermaPasswordDiv"))
                Form.removeChild(ConfermaPassword);
            Accedi.classList.remove("disattivato");
            Registrati.classList.add("disattivato");
            BottoneInvio.textContent = "Login";
            BottoneInvio.setAttribute('name', 'Accesso');
        });

    
        //funzioni applicabili da quando il login è avvenuto con successo
        if(Logged.classList[0]==='logged'){
            NG.addEventListener('click', function(e){
                e.stopPropagation();
                setPremuto("nuovo");
            sessionStorage.setItem("premuto", "nuovo");
            window.location.href="/Calvani_672819/PHP/PAGES/Salvataggi.php";
            });
            C.addEventListener('click', function(e){
                e.stopPropagation();
                setPremuto("continua");
                sessionStorage.setItem("premuto", "continua");
                window.location.href="/Calvani_672819/PHP/PAGES/Salvataggi.php";
            });
            //posso anche aprire le impostazioni, il suo funzionamento è definito in Setting.js
            Logged.addEventListener('click', function(e){
                e.stopPropagation();
                const Menu=document.getElementById("menu_logout");
                if(!Menu)
                    MenuLogout();
                else 
                    Menu.style.display=(Menu.style.display==="none")?"flex":"none";
            });
           
        }
    });
