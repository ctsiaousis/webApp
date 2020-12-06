<?php
// This sends a persistent cookie that lasts a day.
// session_start([
//     'cookie_lifetime' => 86400,
// ]);
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

if (isset($_GET["ID"]) && isset($_GET["title"]) && isset($_GET["start"]) && isset($_GET["end"]) && isset($_GET["cName"]) && isset($_GET["cat"])) {
    $id   = $_GET["ID"];
    $tit  = $_GET['title'];
    $stD  = $_GET['start'];
    $enD  = $_GET['end'];
    $cNm  = $_GET['cName'];
    $categ= $_GET['cat'];

    $query = "UPDATE Movies SET TITLE='".$tit."',STARTDATE='".$stD."',ENDDATE='".$enD."',CINEMANAME='".$cNm."', CATEGORY='".$categ."' WHERE id='".$id."'";

    if ($conn->query($query) === TRUE) {
        echo "Record updated successfully";
       header("Location: ./owner.php");
    } else {
        echo "Error updating record: " . $conn->error;
    }
}

?>
