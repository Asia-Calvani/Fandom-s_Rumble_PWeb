<?php
require_once '../SUPPORT/GetOptions.php';
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if(!isset($_SESSION['Username'])){
    pageError(403);  // Forza ritorno al login
}
$acc_name = ($_SESSION['Logged'] ?? false) ? htmlspecialchars($_SESSION['Username'] ?? 'Utente') : 'Sign or Login';

NpcJson();
NemiciJson();
$NumSaves = isset($_SESSION['NumSaves']) ? $_SESSION['NumSaves'] : 5;

?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fandom's Rumble</title>
    <link rel="stylesheet" href="/Calvani_672819/CSS/Default.css">
    <link rel="stylesheet" href="/Calvani_672819/CSS/SceltaNemico.css">
    <script type="module" src="/Calvani_672819/JAVASCRIPT/SUPPORT/FunzioniDiSupporto.js" ></script>
    <script type="module" src="/Calvani_672819/JAVASCRIPT/SUPPORT/VarDiSupporto.js" ></script>
    <script type="module" src="/Calvani_672819/JAVASCRIPT/PAGES/ScegliNemico.js" ></script>
    <script type="module">
        import {SettaSfondo} from '/Calvani_672819/JAVASCRIPT/SUPPORT/FunzioniDiSupporto.js';
        document.addEventListener('DOMContentLoaded', function(){
                // Sistemo il background
                SettaSfondo("<?php echo $_SESSION['Sfondo'] ?? ''; ?>");
                });
    </script>
</head>
<body> 
    <div id="bg_overlay"></div>
    <div id="game_zone">
        <div id=statusConnection class="<?php echo isset($_SESSION['ERR']) ? ($_SESSION['ERR'] ? 'error' : 'correct') : 'not_set'; ?>">
            <p ><?php echo htmlspecialchars($_SESSION['alertMessage'] ?? ''); ?></p>
        </div>
        <?php
            unset($_SESSION['alertMessage'], $_SESSION['ERR']);
        ?>
        <div id="account" class="<?php echo (($_SESSION['Logged']) ?? false) ? 'logged' : 'not_log'; ?>">
            <div id="infoPg">
            <p id="pg_scelto"><?php echo (($_SESSION['Logged']) ?? false) ? htmlspecialchars($_SESSION['Slot'.$_SESSION['slot_selezionato']]) : 'not_log'; ?></p>
            <img class="info" src="/Calvani_672819/IMG/attack.svg"  alt="vittorie per uccisione"/>
            <p>:<?php echo (($_SESSION['Logged']) ?? false) ? htmlspecialchars($_SESSION['Kills'.$_SESSION['slot_selezionato']]) : 'not_log'; ?> </p>
            <img class="info" src="/Calvani_672819/IMG/Action.svg"  alt="vittorie per azioni"/>
            <p>:<?php echo (($_SESSION['Logged']) ?? false) ? htmlspecialchars($_SESSION['Pacific'.$_SESSION['slot_selezionato']]) : 'not_log'; ?> </p>
            </div>
            <p id="acc_name"><?php echo $acc_name; ?></p>
        </div>
        <h1 id="Title">Select your Enemy</h1>
        <div id="ContentoreNemici">
            <div id=categorie>
            <img id=Cat_back src="/Calvani_672819/IMG/PULSANTI/Left_cat_not_select.svg" alt="freccia indietro"/>
            <h2 id="Fandom">Categ</h2>
            <img id=Cat_next src="/Calvani_672819/IMG/PULSANTI/Right_cat_not_select.svg" alt="freccia avanti"/>
            </div>
            <div id="pagine">
            <img id="page_back" src="/Calvani_672819/IMG/PULSANTI/Left_page_not_select.svg" alt="pagina indietro"/>
            <div id="GrigliaNemici"></div>
            <img id="page_next" src="/Calvani_672819/IMG/PULSANTI/Right_page_not_select.svg" alt="pagina avanti"/>
            </div>
        </div>
        <form id="FormInizioGioco" action="/Calvani_672819/PHP/SUPPORT/RecuperoInfoPartita.php" method="post">
            <input type="hidden" name="NemicoSelezionato" id="NemicoSelezionato" value="">
        <button id="InizioGioco">Start Game</button>
        </form>
        <img  id="CtrMus" src="/Calvani_672819/IMG/musN.svg" alt="musica"/>
        <audio src="/Calvani_672819/AUD/Spin_The_Roulette-Miitopia_OST.mp3" id="Audio"></audio>
    </div>
</body>
</html>