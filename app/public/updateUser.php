<?php

session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mariaDB";
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_GET["ID"]) && isset($_GET["name"]) && isset($_GET["surname"]) && isset($_GET["email"]) && isset($_GET["role"]) && isset($_GET["confirm"])) {
    $id      = $_GET["ID"];
    $name    = $_GET['name'];
    $surname = $_GET['surname'];
    $email   = $_GET['email'];
    $role    = $_GET['role'];
    $confirm = $_GET['confirm'];

    $query = "UPDATE Users SET NAME='".$name."',SURNAME='".$surname."',EMAIL='".$email."',ROLE='".$role."', CONFIRMED='".$confirm."' WHERE id='".$id."'";

    if ($conn->query($query) === TRUE) {
        echo "Record updated successfully";
       header("Location: ./administration.php");
    } else {
        echo "Error updating record: " . $conn->error;
    }
}

?>
