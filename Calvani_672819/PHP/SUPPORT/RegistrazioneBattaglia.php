<?php
require_once 'DbConnectAndAllDef.php';
session_start();
if(!isset($_SESSION['Username'])){
    pageError(403);  // Forza ritorno al login
}

//registrazione dell'esito della battaglia
$esitoBattaglia = $_POST['esitoBattaglia'] ?? null;
if ($esitoBattaglia) {
    list($esito, $counterAction) = explode('-', $esitoBattaglia);
    $VittoriaAttuale=($counterAction>=10)?"Azione":"Attacco";
    $giaVintoAtt=false;
    $giaVintoAct=false;
} else {
    pageError(400); // Bad Request se manca l'esito della battaglia
}
if($esito=='vittoria'){
//controllo se la battaglia è stata vinta precedentemente e con quali condizioni
$autore = isset($_SESSION['Autore']) ? (int)$_SESSION['Autore'] : null;
if ($autore !== null) {
    $sqlCheck = "SELECT * FROM RegistroBattaglie WHERE Utente= ? AND Giocatore = ? AND Nemico = ? AND Autore = ? AND Vittoria=TRUE";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->bind_param('issi', $_SESSION['ID'], $_SESSION['NomePg'], $_SESSION['NomeNemico'], $autore);
} else {
    $sqlCheck = "SELECT * FROM RegistroBattaglie WHERE Utente= ? AND Giocatore = ? AND Nemico = ? AND Autore IS NULL AND Vittoria=TRUE";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->bind_param('iss', $_SESSION['ID'], $_SESSION['NomePg'], $_SESSION['NomeNemico']);
}
$stmtCheck->execute();
$resultCheck = $stmtCheck->get_result();
if($resultCheck->num_rows>0){
    //battaglia già vinta in precedenza
    //devo capire come
    while($rowCheck = $resultCheck->fetch_assoc()){
        $bestCounterAction = $rowCheck['TipoVittoria'];
        if($bestCounterAction === "Attacco"){
            $giaVintoAtt = true;
        }
        if($bestCounterAction === "Azione"){
            $giaVintoAct = true;
        }
    }
}
//se il tipo di vittoria attuale contro il nemico scelto non si è mai registrato aumento il caunter di quel tipo di vittoria per il giocatore
// Aggiorna DB e sessione in modo sicuro; inizializza contatori session se necessario
$slot = $_SESSION['slot_selezionato'] ?? null;
if (($VittoriaAttuale === "Attacco" && !$giaVintoAtt) ){
    $sqlUpdate = "UPDATE Personaggi SET Kills = Kills + 1 WHERE Nome = ? AND Proprietario = ?";
    $stmtUpdate = $conn->prepare($sqlUpdate);
    $stmtUpdate->bind_param('si', $_SESSION['NomePg'], $_SESSION['ID']);
    $stmtUpdate->execute();
    if ($slot !== null) {
        $kKey = 'Kills'.$slot;
        if (!isset($_SESSION[$kKey])) { $_SESSION[$kKey] = 0; }
        $_SESSION[$kKey] = $_SESSION[$kKey] + 1;
    }
}
if (($VittoriaAttuale === "Azione" && !$giaVintoAct) ){
    $sqlUpdate = "UPDATE Personaggi SET Pacific = Pacific + 1 WHERE Nome = ? AND Proprietario = ?";
    $stmtUpdate = $conn->prepare($sqlUpdate);
    $stmtUpdate->bind_param('si', $_SESSION['NomePg'], $_SESSION['ID']);
    $stmtUpdate->execute();
    if ($slot !== null) {
        $pKey = 'Pacific'.$slot;
        if (!isset($_SESSION[$pKey])) { $_SESSION[$pKey] = 0; }
        $_SESSION[$pKey] = $_SESSION[$pKey] + 1;
    }
}
//in ogni caso inserisco il nuovo record della battaglia, includendo Autore se presente
$autore = isset($_SESSION['Autore']) ? (int)$_SESSION['Autore'] : null;
if ($autore !== null) {
    $sqlInsert = "INSERT INTO RegistroBattaglie (Utente, Giocatore, Nemico, Autore, Vittoria, TipoVittoria) VALUES (?, ?, ?, ?, TRUE, ?)";
    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bind_param('issis', $_SESSION['ID'], $_SESSION['NomePg'], $_SESSION['NomeNemico'], $autore, $VittoriaAttuale);
} else {
    $sqlInsert = "INSERT INTO RegistroBattaglie (Utente, Giocatore, Nemico, Autore, Vittoria, TipoVittoria) VALUES (?, ?, ?, NULL, TRUE, ?)";
    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bind_param('isss', $_SESSION['ID'], $_SESSION['NomePg'], $_SESSION['NomeNemico'], $VittoriaAttuale);
}
$stmtInsert->execute();
}else{
//in caso di sconfitta inserisco il record della battaglia senza controllare altro (includo Autore se presente)
$autore = isset($_SESSION['Autore']) ? (int)$_SESSION['Autore'] : null;
if ($autore !== null) {
    $sqlInsert = "INSERT INTO RegistroBattaglie (Utente, Giocatore, Nemico, Autore, Vittoria, TipoVittoria) VALUES (?, ?, ?, ?, FALSE, 'nessuno')";
    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bind_param('issi', $_SESSION['ID'], $_SESSION['NomePg'], $_SESSION['NomeNemico'], $autore);
} else {
    $sqlInsert = "INSERT INTO RegistroBattaglie (Utente, Giocatore, Nemico, Autore, Vittoria, TipoVittoria) VALUES (?, ?, ?, NULL, FALSE, 'nessuno')";
    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bind_param('iss', $_SESSION['ID'], $_SESSION['NomePg'], $_SESSION['NomeNemico']);
}
$stmtInsert->execute();
}
//ritorno alla scelta del nuovo avversario
if (isset($stmtInsert) && $stmtInsert instanceof mysqli_stmt) {
    $stmtInsert->close();
}
header("Location: ../PAGES/ScegliNemico.php");
?>