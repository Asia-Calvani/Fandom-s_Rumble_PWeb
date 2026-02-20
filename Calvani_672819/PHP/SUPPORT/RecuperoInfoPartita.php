<?php

    require_once 'DbConnectAndAllDef.php';
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    $datiNemico =$_POST['NemicoSelezionato'];
    $ArrayDatiNemico = explode("-",$datiNemico);
    $nome=$ArrayDatiNemico[0];
    $tabella_rif=$ArrayDatiNemico[1];
    if($tabella_rif==="Nemici"){
        $tabella_rif="NemiciDiDefault";
        $fandom=$ArrayDatiNemico[2];
    }else {
        $autore=$ArrayDatiNemico[2];
    }
    
    $allowedTables = ['NemiciDiDefault', 'NPC']; // whitelist

    if (!in_array($tabella_rif, $allowedTables)) {
    throw new Exception('Tabella non valida');
    }
    //recupero le info del nemico selezionato
    $sqlAvv = "SELECT * FROM " . $tabella_rif . " WHERE Nome = ?";
    $stmtAvv = $conn->prepare($sqlAvv); 
    if (!$stmtAvv) {
        throw new Exception('registration_failed', 500);
    }
    $stmtAvv->bind_param('s', $nome);
    if (!$stmtAvv->execute()) {
        throw new Exception('registration_failed', 500);
    }
    $resultAvv = $stmtAvv->get_result();
    foreach($resultAvv as $row){
        $_SESSION['NomeNemico']=$row['Nome'];
        $_SESSION['ImmagineNemico']=$row['ImmagineProfilo'];
        $_SESSION['VitaNemico']=$row['PuntiVita']* ($tabella_rif==="NPC" ? 2 : 1);
        $_SESSION['ForzaNemico']=$row['Danno'];
        $_SESSION['Ab1']=$row['Abilita1'];
        $_SESSION['Ab2']=$row['Abilita2'];
        $_SESSION['Ab3']=$row['Abilita3'];
        $_SESSION['Fandom']=$fandom ?? null;
        $_SESSION['Autore']=$autore ?? null;
    }
    //recupero le info del pg selezionato
    $sqlPg = "SELECT * FROM Personaggi WHERE Nome = ?";
    $stmtPg = $conn->prepare($sqlPg); 
    if (!$stmtPg) {
        throw new Exception('registration_failed', 500);
    }
    $stmtPg->bind_param('s', $_SESSION['Slot'.$_SESSION['slot_selezionato']]);
    if (!$stmtPg->execute()) {
        throw new Exception('registration_failed', 500);
    }
    $resultPg = $stmtPg->get_result();
    foreach($resultPg as $row){
        $_SESSION['NomePg']=$row['Nome'];
        $_SESSION['ImmaginePg']=$row['ImmagineProfilo'];
        $_SESSION['VitaPg']=$row['PuntiVita'];
        $_SESSION['ForzaPg']=$row['Danno'];
        $_SESSION['Anima']=$row['Anima'];
    }

    //chiusura richieste
    $stmtAvv->close();
    $stmtPg->close();
    header('Location: ../PAGES/Gioco.php');
    exit();
?>