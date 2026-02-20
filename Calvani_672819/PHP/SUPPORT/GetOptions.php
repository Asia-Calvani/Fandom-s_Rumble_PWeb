
<?php
/*
In questo file creo, a partire dal mio database, un file json per ogni select che uso per creare i personaggi 
ed un ulteriore file json per recuperare la lista e le relative informazioni
della rabella NPC.

Le funzioni per creare i file json ( json_encode()) e per salvarli nella cartella  (file_put_contents())
sono state prese dai seguenti siti: 
https://stackoverflow.com/questions/2467945/how-to-generate-json-data-with-php
https://www.geeksforgeeks.org/php/how-to-generate-json-file-in-php/.
*/

require_once __DIR__."/DbConnectAndAllDef.php";

session_start();

// directory dove vengono salvati i JSON (cartella relativa al progetto)
define('JSON_DIR', __DIR__ . '/../JSON/');

// funzione sicura per leggere tutte le righe
function fetchAllSafe($conn, $table) {
        $stmt = $conn->prepare("SELECT * FROM {$table}");
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

function AnimaJson(){
    global $conn;

    $animeRows = fetchAllSafe($conn, 'Anime');
    $anime = [];
    foreach ($animeRows as $r) {
        $anime[] = [
            'value'    => $r['Nome'],
            'img'      => $r['Percorso'],
            'desc'     => $r['DescrizioneBreve']
        ];
    }
    $Anima= json_encode($anime, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG);
    file_put_contents(JSON_DIR . 'AnimeList.json', $Anima);
}

function PgJson(){
    global $conn;
    $pgRows = fetchAllSafe($conn, 'ImgPG');
    $pg = [];
    foreach ($pgRows as $r) {
        $pg[] = [
            'value'    => $r['Nome'],
            'img'      => $r['Percorso']
        ];
    }
    $Personaggi= json_encode($pg, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG);
    file_put_contents(JSON_DIR . 'PersonaggiList.json', $Personaggi);
}

function AbilitaJson(){
    global $conn;
    $abilitaRows = fetchAllSafe($conn, 'Abilita');
    $abilita = [];
    foreach ($abilitaRows as $r) {
        $abilita[] = [
            'value' => $r['Nome'],
            'desc'  => $r['DescrizioneBreve']
        ];
    }
    $Abilita= json_encode($abilita, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG);
    file_put_contents(JSON_DIR . 'AbilitaList.json', $Abilita);
}

function NpcJson(){
    global $conn;
    $npcRows = fetchAllSafe($conn, 'NPC JOIN Player ON NPC.Proprietario=Player.ID');
    $npcs = [];
    foreach ($npcRows as $r) {
        $npcs[] = [
            'nome'        => $r['Nome'],
            'Creatore' => $r['Username'],
            'img'         => $r['ImmagineProfilo'],
            'PuntiVita' => $r['PuntiVita'],
            'Abilita1' => $r['Abilita1'],
            'Abilita2' => $r['Abilita2'],
            'Abilita3' => $r['Abilita3'],
            'Danno' => $r['Danno']
        ];
    }
    $json2= json_encode($npcs, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG);
    file_put_contents(JSON_DIR . 'NpcList.json', $json2);
}

function NemiciJson(){
    global $conn;
    $nemiciRows = fetchAllSafe($conn, 'NemiciDiDefault');
    $nems = [];
    foreach ($nemiciRows as $r) {
        $nems[] = [
            'nome'        => $r['Nome'],
            'Fandom' => $r['Fandom'],
            'img'         => $r['ImmagineProfilo'],
            'PuntiVita' => $r['PuntiVita'],
            'Abilita1' => $r['Abilita1'],
            'Abilita2' => $r['Abilita2'],
            'Abilita3' => $r['Abilita3'],
            'Danno' => $r['Danno']
        ];
    }
    $json3= json_encode($nems, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG);
    file_put_contents(JSON_DIR . 'NemiciList.json', $json3);
}


?>