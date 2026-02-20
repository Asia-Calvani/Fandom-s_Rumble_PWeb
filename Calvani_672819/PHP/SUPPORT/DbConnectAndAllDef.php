<?php
// Qui si inizializza la connessione al database e vengono definite varie costanti usate nel codice
// (nota: evitare output HTML prima del tag <?php per non impedire l'invio di header)
//Collegamento database
/*$host = "localhost";
$database = "Calvani_672819";
$user = "root";
$pass = "";*/
if(!defined('DBHOST')){
define('DBHOST', 'localhost');
define('DBUSER', 'root');
define('DBPASS', '');
define('DBNAME', 'Calvani_672819');
}

//Connessione
$conn = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME);

//errori
if(mysqli_connect_errno()){
    die(mysqli_connect_error());
}

define('ERROR_TYPES', [
    'invalid_username'          => "Username non valido.  Deve iniziare con una lettera e avere tra 3 e 16 lettere o numeri.",
    'username_taken'            => "Username già in uso.",
    'username_not_found'        => "L'username non esiste.",
    'invalid_password'          => "Password non valida. Deve contenere almeno 8 caratteri e non più di 16 e devono essere presenti almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale.",
    'password_mismatch'         => "Le password non corrispondono.",
    'wrong_password'            => "Password errata.",
    'registration_failed'       => "Registrazione fallita.",
    'connection_failed'         => "Il server non è al momento disponibile.\nRiprovare più tardi.",
    'default'                   => "Errore generico, ci scusiamo per il disagio."
]);

define('USERNAME_PATTERN','/^[A-Za-z][A-Za-z0-9_]{2,15}$/');

//?  source:  https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
/**
 * Pattern per la password dell'account:  da 8 a 15 caratteri, 
 * almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale. 
 */
define('PASSWORD_PATTERN', "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*? &])[A-Za-z\\d@$!%*? &]{8,15}$/");
//? endsource
define('PG_PATTERN','/^[A-Za-z][A-Za-z0-9_]{2,10}$/');

?>