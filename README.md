Create chat to Yii Framework
============================

Using
------

    apache  2.4.10
    php     5.6.19
    mysql   Ver 14.14 Distrib 5.5.47
    yii     v1.1.10
    git     (optional)

Instalation
-----------

    1 Create directory where based application. Check access rights

    2 Download application or create pull from repositary
    https://github.com/novalkr/testChat
        download ZIP or make pull

    3 Create Database  from console jr use phpMyAdmin or MySqlWorkBench
        make comand  CREATE DATABASE idntesttask;
    
    4 Export data expor from ide or in console
        mysql -p idntesttask < (basedir)/app/protected/data/schema.mysql.sql 
        where (basedir) - your base dir 

    5 Copy file (basedir)/app/protected/config/db_sample.php to (basedir)/app/protected/config/db.php
        in (basedir)/app/protected/config/db.php change 
       'username' => '(our user)',
       'password' => '(our Password)',

    6 Create dir  (basedir)/app/assets   Check access rights
       
    7 In apache settings add virlual serfer or set by default in (our).conf

        DocumentRoot (basedir)/app
        <Directory (basedir)/app>
              DirectoryIndex index.php
              Options FollowSymLinks Indexes
              AllowOverride All
              Order allow,deny
              Allow from all
              Require all granted
         </Directory>

    8  In Browser input (your server)
    
Use
---

    Chat releaset haw modele, based (basedir)/app/protected/modules/chat

    put in page where wish get add chat

    <?php 
        $this->widget('application.modules.chat.components.ChatWidget');
    ?>




