<?php
session_start();
$acc_name = ($_SESSION['Logged'] ?? false) ? htmlspecialchars($_SESSION['Username'] ?? 'Utente') : 'Sign or Login';
$NumSaves = isset($_SESSION['NumSaves']) ? $_SESSION['NumSaves'] : 5;
if(isset($_SESSION['Logged'])){
require_once __DIR__."/PHP/SUPPORT/Impostazioni.php";
recuperaImpostazioni();}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fandom's Rumble</title>
    <link rel="stylesheet" href="/Calvani_672819/CSS/Default.css">
    <link rel="stylesheet" href="/Calvani_672819/CSS/index.css">
    <script type="module" src="/Calvani_672819/JAVASCRIPT/SUPPORT/VarDiSupporto.js" ></script>
    <script type="module" src="/Calvani_672819/JAVASCRIPT/SUPPORT/Forms.js" ></script>
    <script type="module" src="/Calvani_672819/JAVASCRIPT/PAGES/Login.js" ></script>
    <script type="module">
        import {PresenzaSalvataggi, SettaSfondo} from '/Calvani_672819/JAVASCRIPT/SUPPORT/FunzioniDiSupporto.js';
        import {ImpostaTasti} from '/Calvani_672819/JAVASCRIPT/PAGES/Setting.js';
        // espone lo sfondo corrente alla pagina in modo sicuro
        window.CurrentSfondo = <?php echo json_encode($_SESSION['Sfondo'] ?? 'carosello'); ?>;
        document.addEventListener('DOMContentLoaded', function(){
            PresenzaSalvataggi(<?php echo $NumSaves?>);
            // Sistemo il background
            SettaSfondo(window.CurrentSfondo);
            ImpostaTasti("<?php echo $_SESSION['Su']?? "w"; ?>", "<?php echo $_SESSION['Giu'] ?? "s"; ?>", "<?php echo $_SESSION['Sx'] ?? 'a'; ?>", "<?php echo $_SESSION['Dx'] ?? 'd'; ?>");
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
        <h1 id="Title">Fandom's Rumble</h1>
        <button id="New_game">New game</button>
        <button id="Continue">Continue</button>
        <button id="Settings">Settings</button>
        <button id="Guide">Guide</button>
        <img alt="musica" id="CtrMus" src="/Calvani_672819/IMG/musN.svg"/>
        <audio src="/Calvani_672819/AUD/Spin_The_Roulette-Miitopia_OST.mp3" id="Audio"></audio>
    </div>
</body>
</html>