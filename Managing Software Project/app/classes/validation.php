<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 14/09/2021
Description : Validation Class for PHP-SReP. 
contributor : Justin Santoso
 **********************************************/
//!CHECK validateTest.php ON HOW TO USE THIS CLASS
class Validate{
    /* constant global variable that can only be used within the class. */
    const VALIDATE_USERID = "[s0-9]{6}";
    const VALIDATE_NAME = "[0-9a-zA-Z\s]{3,45}";
    const VALIDATE_PRICE = "[+]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?";
    const VALIDATE_IMAGE = "[^\\s]+(.*?).(jpg|jpeg|png|JPG|JPEG|PNG)";

    /* method to check whether the value is valid or not. */
    static function isValid($regex, $var){
        if($var == "" || !preg_match("/^$regex$/", $var)){
            return false;
        }
        return true;
    }
}
?>