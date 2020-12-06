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

if (isset($_GET["ID"])) {
    $id  = $_GET['ID'];


    $query = "DELETE FROM Movies WHERE ID='".$id."'";

    if ($conn->query($query) === TRUE) {
        echo "Record updated successfully";
       header("Location: ./owner.php");
    } else {
        echo "Error updating record: " . $conn->error;
    }
}

?>
