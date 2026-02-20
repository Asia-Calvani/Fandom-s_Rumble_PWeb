<?php
require_once 'DbConnectAndAllDef.php';
require_once 'FunUtility.php';

session_start();
if(!isset($_SESSION['Username'])){
    pageError(403);  // Forza ritorno al login
}
$sel=$_POST['slot_selezionato'] ?? null;
$ID=$_SESSION['ID'] ?? null;
$sql = "SELECT Slot, Nome, ImmagineProfilo, Anima, Kills, Pacific
                FROM Personaggi
                WHERE Proprietario = ? ";
        $stmtSearch = $conn->prepare($sql);
        $stmtSearch->bind_param("i", $ID);
        $stmtSearch->execute();
        $result = $stmtSearch->get_result();
        foreach($result as $row){
            $_SESSION['Slot'.$row['Slot']] = $row['Nome'];
            $_SESSION['Kills'.$row['Slot']] = $row['Kills'];
            $_SESSION['Pacific'.$row['Slot']] = $row['Pacific'];
        }
$_SESSION['slot_selezionato']=$sel;
header('Location: ../PAGES/ScegliNemico.php');
exit();
?>