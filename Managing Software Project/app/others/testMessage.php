<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 22/09/2021
Description : Message class file for PHP-SReP.
            : Handles all logs, error message, etc. 
contributor : Justin Santoso
**********************************************/
include("includes/header.php");
include("includes/navbar.php");
include("classes/Message.php");
Message::insert(Message::DANGER, "JACK ESCAPE?!" ,"JACK IN THE BOX. RUN!");
Message::insert(Message::SUCCESS, "JACK ESCAPE?!" ,"JACK NOT IN THE BOX. STAY!");
Message::insert(Message::WARNING, "JACK ESCAPE?!" ,"JACK MAYBE IN THE BOX. RUN?");
Message::insert(Message::INFO, "JACK ESCAPE?!" ,"JACK IS IN THE BOX!");
Message::display();
include("includes/footer.php");
?>
