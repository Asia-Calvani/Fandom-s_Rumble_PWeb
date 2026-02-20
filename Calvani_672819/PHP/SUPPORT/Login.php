<!--Comportamento da tenere in caso di login e registrazione-->
<?php


require_once 'DbConnectAndAllDef.php';
require_once 'FunUtility.php';

session_start();
session_unset();

$User = $_POST['UsernameInput'] ?? null;
$Password = $_POST['PasswordInput'] ?? null;
$confermaPassword = $_POST['ConfermaPasswordInput'] ?? null;


$stmtSearch = null;
$stmtInsert = null;
$conn = null;

try {
// CONNESSIONE AL DATABASE
    $conn = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
    if ($conn->connect_error) {
        throw new Exception("connection_failed", 500);
    }

// VALIDAZIONE INPUT
    $errorType = validateInputs($User, $Password, $confermaPassword);
    if (!empty($errorType)) {
        throw new Exception($errorType, 400);
    }
// Ricerca dell'username inserito nella tabella Player del database per controllare se è presente
    $sql = "SELECT Username
                FROM Player
                WHERE Username = ? ";
    $stmtSearch = $conn->prepare($sql);
    $stmtSearch->bind_param("s", $User);
    $stmtSearch->execute();
    $result = $stmtSearch->get_result();
    

    if ($confermaPassword == null) {
        //sto facendo login

        //controllo se è presente nel database
        if ($result->num_rows === 0) {
            throw new Exception("username_not_found", 404);
        }
        //recupero dell'hash della password presente nel database per l'utente inserito
        $sql = "SELECT *
                FROM Player
                WHERE Username = ? ";
        $stmtSearch = $conn->prepare($sql);
        $stmtSearch->bind_param("s", $User);
        $stmtSearch->execute();
        $result = $stmtSearch->get_result();
        $data = $result->fetch_assoc();
        $hashedPassword = $data['Password'];
        $sessionId = $data['ID'];
        $numSaves = $data['Salvataggi'];
        

        // Verifica password con bcrypt
        if (!password_verify($Password, $hashedPassword)) {
            throw new Exception("wrong_password", 401);
        }
        $alertMessage = "Accesso effettuato con successo.";
        // Imposto variabili di sessione
        $_SESSION['ID']= $sessionId;
        $_SESSION['Logged']= true;
        $_SESSION['alertMessage'] = $alertMessage;
        $_SESSION['ERR']=false;
        $_SESSION['NumSaves']= $numSaves;
        $_SESSION['Username'] = $User;

        // recupero i salvataggi dell'utente
        $stmtRetriver = $conn->prepare("SELECT Nome, Slot FROM Personaggi WHERE Proprietario = ?");
        $stmtRetriver->bind_param("i", $sessionId);
        $stmtRetriver->execute();
        $resultRetriver = $stmtRetriver->get_result();
        while ($row = $resultRetriver->fetch_assoc()) {
            $_SESSION['Slot' . $row['Slot']] = $row['Nome'];
        }
        

        http_response_code($login['errorcode']);
        header("Location: /Calvani_672819/index.php");
        exit;

    } else {
        //sto facendo la registrazione

        //controllo se è presente nel database
        if ($result->num_rows !== 0) {
            throw new Exception("username_taken", 409);

        }
        //controllo se $Password e $ConfermaPassword coincidono
        if(!empty($confermaPassword) && $confermaPassword!==$Password){
            throw new Exception("password_mismatch", 400);
        }
        //creo hash della $Password inserita
        $hashedPassword=password_hash($Password,PASSWORD_BCRYPT );

        //Inserimento nel database
        $sqlInsert = "INSERT INTO Player (Username, Password) VALUES (?, ?)";

        $stmtInsert = $conn->prepare($sqlInsert);

        $stmtInsert->bind_param("ss", $User, $hashedPassword);
        

        if(!$stmtInsert->execute()){
            throw new Exception("registration_failed", 500);
        }
        $alertMessage = "Registrazione effettuata con successo.";
        // Imposto variabili di sessione
        $_SESSION['ID']= $conn->insert_id;
        $_SESSION['Logged']= true;
        $_SESSION['alertMessage'] = $alertMessage;
        $_SESSION['ERR']=false;
        $_SESSION['Username'] = $User;
        $_SESSION['NumSaves']= 0;

        session_regenerate_id(true);
        header("Location: /Calvani_672819/index.php");
        exit;
        
    }
}
catch(Exception $e){
        $errorType = $e->getMessage();
        $login = [
            'message' => ERROR_TYPES[$errorType] ?? ERROR_TYPES['default'],
            'errorcode' => $e->getCode(),

        ];

        $alertMessage = $login['message'];
        $_SESSION['alertMessage'] = $alertMessage;
        $_SESSION['ERR']=true;

        error_log("Errore login [" . $login['errorcode'] . "]: " . $login['message']);
        if ($login['message'] === ERROR_TYPES['default']) {
            error_log("Messaggio originale: " . $errorType);
        }
        
        http_response_code($login['errorcode']);
        header("Location: /Calvani_672819/index.php");
        exit;
    }
finally{
        if ($stmtSearch) {
            $stmtSearch->close();
        }
        if ($stmtInsert) {
            $stmtInsert->close();
        }
        if ($stmtRetriver) {
            $stmtRetriver->close();
        }
        $conn->close();
    }

?>