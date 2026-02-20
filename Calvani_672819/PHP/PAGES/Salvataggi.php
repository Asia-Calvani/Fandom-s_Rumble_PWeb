<?php
require_once '../SUPPORT/GetOptions.php';
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if(!isset($_SESSION['Username'])){
    pageError(403);  // Forza ritorno al login
}
$acc_name = ($_SESSION['Logged'] ?? false) ? htmlspecialchars($_SESSION['Username'] ?? 'Utente') : 'Sign or Login';

AnimaJson();
PgJson();
AbilitaJson();
NpcJson();
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fandom's Rumble</title>
    <link rel="stylesheet" href="/Calvani_672819/CSS/Salvataggi.css">

    <script type="module" src="/Calvani_672819/JAVASCRIPT/SUPPORT/FunzioniDiSupporto.js" ></script>
    <script type="module" src="/Calvani_672819/JAVASCRIPT/SUPPORT/VarDiSupporto.js" ></script>
    <script type="module" src="/Calvani_672819/JAVASCRIPT/PAGES/Salvataggi.js" ></script>
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
            <p id="acc_name"><?php echo $acc_name; ?></p>
        </div>
        <h1 id="Title">Select your Slot</h1>

        <form id="FormSalvataggi" method="post" action="/Calvani_672819/PHP/SUPPORT/RecuperoSlot.php">
        
        <button id="Slot_1">
            <?php if (!isset($_SESSION['Slot1'])){echo 'Empty';}
            else { 
                $NomePG1=$_SESSION['Slot1'];
                echo $NomePG1;
            } ?>
        </button>
        <button id="Slot_2"><?php if (!isset($_SESSION['Slot2'])){echo 'Empty';}
            else { 
                $NomePG2=$_SESSION['Slot2'];
                echo $NomePG2;
            } ?></button>
        <button id="Slot_3"><?php if (!isset($_SESSION['Slot3'])){echo 'Empty';}
            else { 
                $NomePG3=$_SESSION['Slot3'];
                echo $NomePG3;
            } ?></button>
        </form>
        <img alt="musica" id="CtrMus" src="/Calvani_672819/IMG/musN.svg"/>
        <audio src="/Calvani_672819/AUD/Spin_The_Roulette-Miitopia_OST.mp3" id="Audio"></audio>
    </div>
</body>
</html>