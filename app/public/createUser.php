<?php

error_reporting(0);
session_start();
$_SESSION['role'] == '';


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mariaDB";
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}

$logn = trim($_POST['username-field']);
$pswd= trim($_POST['password-field']);

$nm = trim($_POST['name-field']);
$srnm = trim($_POST['surname-field']);
$mail = trim($_POST['email-field']);

if($logn!='' && $pswd!='' && $nm!='' && $srnm!='' && $mail!='') //could use sqlInjection prevent tacts here
{
 $query= "INSERT INTO `Users`(`NAME`, `SURNAME`, `USERNAME`, `PASSWORD`, `EMAIL`, `ROLE`) VALUES ('".$nm."','".$srnm."','".$logn."','".$pswd."','".$mail."','USER')";

 $result=mysqli_query($conn,$query); 

 if(!$result){
    die("Query Failed: " .  mysqli_error($conn));
    }else{
     ?>
     <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Sign-Up Page</title>
            <link rel="stylesheet" href="./style.css" />
            <link href="favicon.png" rel="shortcut icon" type="image/x-icon" />
        </head>
        <body>
            <h1 style="text-align: center; color: #149414;">You are gonna be redirrected!</h1>
            <h2 style="text-align: center; color: #149414;">Please wait for the administator approval</h2>
            <script>setTimeout("location.href = './index.php';",3000);</script>
        </body>
    </html>

     <?php
    }
}

?>
