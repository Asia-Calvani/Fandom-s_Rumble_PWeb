<?php
require_once 'DbConnectAndAllDef.php';
require_once 'FunUtility.php';

session_start();
if(!isset($_SESSION['Username'])){
    pageError(403);  // Forza ritorno al login
}
// inizializza gli statement per evitare avvisi di variabile non definita
$stmtInsert = null;
$stmtCheck = null;
$stmtDelete = null;
$stmtUpdate = null;
try {
// CONNESSIONE AL DATABASE
    $conn = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
    if ($conn->connect_error) {
        throw new Exception("connection_failed", 500);
    }


//Inserimento del personaggio nella tabella Personaggi
    $Nome = $_POST['NomePgInput'];
    $PuntiVita =$_POST['VitaPgInput'];
    $Danno = $_POST['ForzaPgInput'];
    $Anima = $_POST['Anime'];
    $ImmagineProfilo =$_POST['Personaggi'];
    $Ab1 = $_POST['Ability1'];
    $Ab2 = $_POST['Ability2'];
    $Ab3 = $_POST['Ability3'];
    $Slot =$_POST['SlotInput'];
    $Proprietario=$_SESSION['ID'];
    
    $_SESSION['slot_selezionato']=$Slot;
    $_SESSION['Kills'.$Slot]=0;
    $_SESSION['Pacific'.$Slot]=0;
// VALIDAZIONE INPUT
    $errorType = validatePgs($Nome, $Ab1, $Ab2, $Ab3);
    if (!empty($errorType)) {
        throw new Exception($errorType, 400);
    }
    $Proprietario = $_SESSION['ID'] ?? null;
    if (is_null($Proprietario)) {
        throw new Exception("connection_failed", 401);
    }
//controllo se il nome era già usato
$sqlCheckName = "SELECT 1 FROM Personaggi WHERE Proprietario = ? AND Nome = ? LIMIT 1";
$stmtCheckName = $conn->prepare($sqlCheckName);
if (!$stmtCheckName) {
    throw new Exception('registration_failed', 500);
}
$stmtCheckName->bind_param('is', $Proprietario, $Nome);
if (!$stmtCheckName->execute()) {
    throw new Exception('registration_failed', 500);
}
$resCheckName = $stmtCheckName->get_result();
if ($resCheckName && $resCheckName->num_rows > 0) {
    // nome già presente per questo player
    throw new Exception('name_already_exists', 409);
}
$_SESSION['Slot'.$Slot]=$Nome;
//controllo se il salvataggio era occupato
    $sqlCheck = "SELECT * FROM Personaggi WHERE Proprietario = ? AND Slot = ?";
    $stmtCheck = $conn->prepare($sqlCheck); 
    if (!$stmtCheck) {
        throw new Exception('registration_failed', 500);
    }
    $stmtCheck->bind_param('ii', $Proprietario, $Slot);
    if (!$stmtCheck->execute()) {
        throw new Exception('registration_failed', 500);
    }
    $resultCheck = $stmtCheck->get_result();
    if ($resultCheck->num_rows > 0) {
        $sqlDelete = "DELETE FROM Personaggi WHERE Proprietario = ? AND Slot = ?";
        $stmtDelete = $conn->prepare($sqlDelete);   
        if (!$stmtDelete) {
            throw new Exception('registration_failed', 500);
        }
        $stmtDelete->bind_param('ii', $Proprietario, $Slot);
        if (!$stmtDelete->execute()) {
            throw new Exception('registration_failed', 500);
        }
    }else{
        $_SESSION['NumSaves'] = $_SESSION['NumSaves'] + 1;
        $sqlUpdate="UPDATE Player SET Salvataggi = ? WHERE ID = ?";
        $stmtUpdate = $conn->prepare($sqlUpdate);
        if (!$stmtUpdate) {
            throw new Exception('registration_failed', 500);
        }   
        $stmtUpdate->bind_param('ii', $_SESSION['NumSaves'], $Proprietario);
        if (!$stmtUpdate->execute()) {
            throw new Exception('registration_failed', 500);
        }
    }
    $sqlInsert = "INSERT INTO Personaggi (Nome, Proprietario, ImmagineProfilo, PuntiVita, Abilita1, Abilita2, Abilita3, Danno, Anima, Slot,Kills, Pacific) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
    $stmtInsert = $conn->prepare($sqlInsert);
    if (!$stmtInsert) {
        throw new Exception('registration_failed', 500);
    }
    $types = 'sisisssisiii';
    $stmtInsert->bind_param($types, $Nome, $Proprietario, $ImmagineProfilo, $PuntiVita, $Ab1, $Ab2, $Ab3, $Danno, $Anima, $Slot, $_SESSION['Kills'.$Slot], $_SESSION['Pacific'.$Slot]);
    if (!$stmtInsert->execute()) {
        throw new Exception('registration_failed', 500);
    }
    session_regenerate_id(true);
        header("Location: /Calvani_672819/PHP/PAGES/ScegliNemico.php");
        exit;
    }catch (Exception $e){
    echo "<pre>";
    echo "Errore: " . $e->getMessage() . "\n";
    if (isset($conn) && $conn) {
        echo "Conn errno: " . $conn->errno . " - Conn error: " . $conn->error . "\n";
    }
    $stmts = ['stmtCheck','stmtDelete','stmtUpdate','stmtInsert'];
    foreach ($stmts as $s) {
        if (isset($$s) && $$s instanceof mysqli_stmt) {
            $err = $$s->error;
            if (!empty($err)) {
                echo $s . " error: " . $err . "\n";
            }
        }
    }
    echo "</pre>";
}
finally{
        if (isset($stmtInsert) && $stmtInsert instanceof mysqli_stmt) {
            $stmtInsert->close();
        }
        if (isset($stmtCheck) && $stmtCheck instanceof mysqli_stmt) {
            $stmtCheck->close();
        }
        if (isset($stmtDelete) && $stmtDelete instanceof mysqli_stmt) {
            $stmtDelete->close();
        }
        if (isset($stmtUpdate) && $stmtUpdate instanceof mysqli_stmt) {
            $stmtUpdate->close();
        }
        if(isset($stmtCheckName) && $stmtCheckName instanceof mysqli_stmt){
            $stmtCheckName->close();
        }
        if (isset($conn) && $conn) {
            $conn->close();
        }
    }

?>