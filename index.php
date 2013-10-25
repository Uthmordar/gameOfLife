<?php 
	if(isset($_GET['projet'])){
		$template=$_GET['projet'];
		$section="projet/".$template.".php";
		$CSS=$template.'.css';
		$JS=$template.'.js';
	}else if(isset($_GET['tuto'])){
		$template=$_GET['tuto'];
		$section='template/section/'.$template.'.php';
		$CSS=$template.'.css';
		$JS=$template.'.js';
	}else{
		$CSS='contentIndex.css';
		$section='template/section/sectionAccueil.php';
		$aside='template/aside/aside.php';
	}

	include('gabarit.php'); 
?>
