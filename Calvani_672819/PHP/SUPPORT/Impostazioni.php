<?php

// Connessione al DB
require_once __DIR__ . "/DbConnectAndAllDef.php";

// Avvia sessione se non attiva
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}


/*
|--------------------------------------------------------------------------
| Recupera impostazioni dal DB e le mette in sessione
|--------------------------------------------------------------------------
*/
function recuperaImpostazioni()
{
    global $conn;

    // Se non loggato → default
    if (!isset($_SESSION['ID'])) {

        $_SESSION['Su'] = $_SESSION['Su'] ?? 'w';
        $_SESSION['Giu'] = $_SESSION['Giu'] ?? 's';
        $_SESSION['Sx'] = $_SESSION['Sx'] ?? 'a';
        $_SESSION['Dx'] = $_SESSION['Dx'] ?? 'd';
        $_SESSION['Sfondo'] = $_SESSION['Sfondo'] ?? '';

        return false;
    }


    // Recupero da DB
    $stmt = $conn->prepare(
        "SELECT * 
         FROM Impostazioni 
         WHERE Giocatore = ?"
    );

    if (!$stmt) {
        return false;
    }

    $stmt->bind_param("i", $_SESSION['ID']);
    $stmt->execute();

    $result = $stmt->get_result();

    if (!$result || $result->num_rows === 0) {
        return false;
    }

    $row = $result->fetch_assoc();


    // Salvo in sessione
    $_SESSION['Su'] = $row['Su'] ?? 'w';
    $_SESSION['Giu'] = $row['Giu'] ?? 's';
    $_SESSION['Sx'] = $row['Sinistra'] ?? 'a';
    $_SESSION['Dx'] = $row['Destra'] ?? 'd';
    $_SESSION['Sfondo'] = $row['Sfondo'] ?? '';
}



/*
|--------------------------------------------------------------------------
| Salvataggio impostazioni (POST)
|--------------------------------------------------------------------------
*/
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['ID'])) {

    // Recupero dati dal form
    $su  = $_POST['UpInput'];
    $giu = $_POST['DownInput'];
    $sx  = $_POST['LeftInput'];
    $dx  = $_POST['RightInput'];

    $sfondo = $_POST['Sfondo'] ?? '';


    // Update DB
    $stmt = $conn->prepare(
        "UPDATE Impostazioni
         SET Su = ?, Giu = ?, Sinistra = ?, Destra = ?, Sfondo = ?
         WHERE Giocatore = ?"
    );

    if ($stmt) {

        $stmt->bind_param(
            "sssssi",
            $su,
            $giu,
            $sx,
            $dx,
            $sfondo,
            $_SESSION['ID']
        );

        $stmt->execute();
    }

    // Aggiorno sessione
    $_SESSION['Su'] = $su;
    $_SESSION['Giu'] = $giu;
    $_SESSION['Sx'] = $sx;
    $_SESSION['Dx'] = $dx;
    $_SESSION['Sfondo'] = $sfondo;

    // Torno alla home
    header("Location: /Calvani_672819/index.php");
    exit;
}

