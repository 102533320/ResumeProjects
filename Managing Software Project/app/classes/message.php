<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 22/09/2021
Description : Message class file for PHP-SReP.
            : Handles all logs, error message, etc. 
contributor : Justin Santoso
**********************************************/
class Message{
    const SUCCESS = "success";
    const WARNING = "warning";
    const DANGER = "danger";
    const INFO = "info";

    private static $msgArray = array();

    static function insert($STATUS, $heading, $message){
        array_push(self::$msgArray, $STATUS);
        array_push(self::$msgArray, $heading);
        array_push(self::$msgArray, $message);
    }

    static function display(){
        echo"
        <div aria-live=\"polite\" aria-atomic=\"true\" style=\"position: relative; min-height: 200px; z-index: 2;\">
            <div style=\"position: fixed; top: 0; right: 0;\">
                <div class=\"toast-container\" style=\"margin:75px 25px 0px 0px;\">

        ";
        for($i = 0; $i < sizeof(self::$msgArray); $i+=3){
            echo "
                <!-- start Toast -->
                <div class=\"toast\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">
                    <div class=\"toast-header\">
                        <strong class=\"me-auto\">".self::$msgArray[$i+1]."</strong>
                        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>
                    </div>
                    <div class=\"toast-body alert alert-".self::$msgArray[$i]."\">
                        ".self::$msgArray[$i+2]."
                    </div>
                </div>
                <!-- end Toast -->
            ";
        }
        echo "
                </div>
            </div>
        </div>
        ";
    }
}
?>