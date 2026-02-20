<?php
require_once 'DbConnectAndAllDef.php';
function validateInputs($username, $password, $confirmPassword){
if(is_null($username) || !preg_match(USERNAME_PATTERN, $username))
return "invalid_username";

if(is_null($password) || !preg_match(PASSWORD_PATTERN, $password))
return "invalid_password";

if(!empty($confirmPassword) && $confirmPassword !== $password)
return "password_mismatch";

return '';
}
function validatePgs($name, $abil1, $abil2, $abil3){
if(is_null($name) || !preg_match(PG_PATTERN, $name))
return "invalid_name";

if(is_null($abil1) || $abil1==$abil2 || $abil1==$abil3 || $abil2==$abil3)
return "invalid_abilities";

if(is_null($abil2) || $abil1==$abil2 || $abil1==$abil3 || $abil2==$abil3)
return "invalid_abilities";

if(is_null($abil3) || $abil1==$abil2 || $abil1==$abil3 || $abil2==$abil3)
return "invalid_abilities";

return '';
}
?>