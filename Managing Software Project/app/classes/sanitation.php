<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 18/09/2021
Description : Sanitation class for PHP-SReP. 
contributor : Justin Santoso
**********************************************/
class Sanitise{
    function __construct($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
    }
}
?>