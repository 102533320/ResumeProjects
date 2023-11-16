<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 18/09/2021
Description : UserAuth Class file for PHP-SReP.
            : Handles authenticator request for login
contributor : Justin Santoso
**********************************************/
require_once("dbHandler.php");
require_once("message.php");

Class Authenticator{
    static function IsUserIDExist($db, $uid){
        if($db->isConnect()){
            $_query = "SELECT * FROM staffLogin WHERE staffID='$uid';";
            $result = $db->executeQuery($_query);

            if(!$result){
                return;
            }

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                if($row['staffID'] == $uid){
                    return true;
                }
            }
            return false;
        }
    }

    static function isUserAdmin($db, $uid){
        if($db->isConnect()){
            $_query = "SELECT * FROM staffLogin WHERE staffID='$uid';";
            $result = $db->executeQuery($_query);
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                if($row['staffRole'] == "ADMIN"){
                    return true;
                }
            }
            return false;
        }
    }

    static function isPasswordValid($db, $uid, $userPassword){
        if($db->isConnect()){
            $_query = "SELECT * FROM staffLogin WHERE staffID='$uid';";
            echo "QUERY: <pre>$_query</pre><br>";
            $result = $db->executeQuery($_query);
            var_dump($result);
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                if($row['staffPassword'] == $userPassword){
                    return true;
                }
            }
            return false;
        }
    }

    static function changePassword(){

    }

    static function logout(){
        if (session_status() == PHP_SESSION_NONE) session_start();
        session_unset();
        session_destroy();
        header("location: index.php");
        exit();
    }
}
?>