<?php
session_start();
$acc_name = ($_SESSION['Logged'] ?? false) ? htmlspecialchars($_SESSION['Username'] ?? 'Utente') : 'Sign or Login';
$NumSaves = isset($_SESSION['NumSaves']) ? $_SESSION['NumSaves'] : 5;
$vitaRimasta = $_SESSION['VitaPg'];

?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fandom's Rumble</title>
    <link rel="stylesheet" href="/Calvani_672819/CSS/Default.css">
    <link rel="stylesheet" href="/Calvani_672819/CSS/Gioco.css">
    <script type="module" src="/Calvani_672819/JAVASCRIPT/SUPPORT/FunzioniDiSupporto.js" ></script>
    <script type="module" src="/Calvani_672819/JAVASCRIPT/SUPPORT/VarDiSupporto.js" ></script>
    <script type="module" src="/Calvani_672819/JAVASCRIPT/SUPPORT/Abilita.js" ></script>
    <script type="module" src="/Calvani_672819/JAVASCRIPT/SUPPORT/GestoreTurni.js" ></script>
    <script type="module" src="/Calvani_672819/JAVASCRIPT/SUPPORT/GestoreRefresh.js" ></script>
    <script type="module" src="/Calvani_672819/JAVASCRIPT/SUPPORT/GestorePlayer.js" ></script>
    <script type="module">
        import {caricaAbilità, DatiPg, DatiNemico} from '/Calvani_672819/JAVASCRIPT/SUPPORT/GestoreTurni.js';
        import{AvviaGioco, setNemicoImage} from '/Calvani_672819/JAVASCRIPT/SUPPORT/GestoreRefresh.js';
        import{ImpostaTasti} from '/Calvani_672819/JAVASCRIPT/PAGES/Setting.js';
        import{SettaSfondo} from '/Calvani_672819/JAVASCRIPT/SUPPORT/FunzioniDiSupporto.js';
        caricaAbilità(
            <?php echo json_encode($_SESSION['Ab1'] ?? ''); ?>,
            <?php echo json_encode($_SESSION['Ab2'] ?? ''); ?>,
            <?php echo json_encode($_SESSION['Ab3'] ?? ''); ?>
        );
        DatiPg(
            <?php echo json_encode($_SESSION['ForzaPg'] ?? 0); ?>,
            <?php echo json_encode($_SESSION['VitaPg'] ?? 0); ?>,
            <?php echo json_encode($_SESSION['Anima'] ?? 0); ?>
        );
        DatiNemico(
            <?php echo json_encode($_SESSION['ForzaNemico'] ?? 0); ?>,
            <?php echo json_encode($_SESSION['VitaNemico'] ?? 0); ?>,
            <?php echo json_encode($_SESSION['ImmagineNemico'] ?? ''); ?>
        );
        // avvia il caricamento immagine subito dopo aver impostato i dati del nemico
        setNemicoImage(<?php echo json_encode($_SESSION['ImmagineNemico'] ?? ''); ?>);
        ImpostaTasti("<?php echo $_SESSION['Su']?? "w"; ?>", "<?php echo $_SESSION['Giu'] ?? "s"; ?>", "<?php echo $_SESSION['Sx'] ?? 'a'; ?>", "<?php echo $_SESSION['Dx'] ?? 'd'; ?>");
        SettaSfondo("<?php echo $_SESSION['Sfondo'] ?? ''; ?>");
        AvviaGioco();
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
        <div id="RecapDatiAvv">
            <p id="NomeAvv"><?php echo htmlspecialchars($_SESSION['NomeNemico']); ?> </p>
            <p id="AutoreAvv"><?php echo htmlspecialchars($_SESSION['Autore']? " By ".$_SESSION['Autore']  : ''); ?></p>
        </div>
        <div id="account" class="<?php echo (($_SESSION['Logged']) ?? false) ? 'logged' : 'not_log'; ?>">
            <p id="acc_name"><?php echo $acc_name; ?></p>
        </div>
        <canvas id="game" height="550" width="550" ></canvas>
        <div id="infoPg">
            <p id="NomePg"><?php echo htmlspecialchars($_SESSION['NomePg']); ?></p>
            <p id="vitaPg"> <?php echo htmlspecialchars($vitaRimasta); ?>/<?php echo htmlspecialchars($_SESSION['VitaPg']); ?></p>
            <div id="barraVitaPg">
                <div id="riempimentoBarraPg"></div>
            </div>
        </div>
        <div id="bottoniBattaglia">
            <button class="bottoneBattaglia" id="Attacco">Att</button>
            <button class="bottoneBattaglia" id="Azione">Act</button>
            <button class="bottoneBattaglia" id="Cura">Cura</button>
            <button class="bottoneBattaglia" id="Fuggi">Fuggi</button>
        </div>
        <img alt="musica" id="CtrMus" src="/Calvani_672819/IMG/musN.svg"/>
        <audio src="/Calvani_672819/AUD/mus_mettaton_ex.mp3" id="Audio"></audio>
    </div>
</body>
</html>