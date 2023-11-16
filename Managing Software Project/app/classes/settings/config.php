<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 13/09/2021
Description : Settings file for PHP-SReP. Mainly to connect to database 
contributor : Justin Santoso
**********************************************/
class DB_Config{
    /* initialised settings as array. */
    var $settings;

    /*
     * create a static function called getSettings and initialised
     * config file needed for database connection then return 
     * the $settings array.
     */
    static function getSettings(){
        $settings['host'] = "10.91.96.3";
        $settings['username'] = "root";
        $settings['password'] = "d4801mj7IiVI";
        $settings['database'] = "PHP_SReP";
        $settings['DNS'] = sprintf('mysql:dbname=%s;host=%s', $settings['database'], $settings['host']);

        return $settings;
    }
}
?>
