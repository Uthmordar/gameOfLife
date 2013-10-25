<!DOCTYPE html>
<html lang='fr' xlmns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8">
	<title> mini-site Projet1 </title>
	<!--<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>-->
	<meta name="viewport" content="width=device-width">
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/index.css">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src='./js/pixi.js'></script>

	<!-- script pour les propriétés du menu header -->

	<script type='text/javascript' src='js/scriptMenuHeader.js'></script>

	
	<script type='text/javascript' src="<?php echo 'js/'.$JS; ?>"></script>

	<!-- on récupére les css spécifiques de l'index -->
	
	<link rel="stylesheet" href="<?php echo 'css/'.$CSS; ?>">
</head>
<body>
	<div id="wrapper">
		<?php include('inc/header.php'); ?>

		<div id="content">
			<?php include($section); ?>
			<?php if(isset($aside)){include($aside);} ?>			
		</div>

		<?php include('inc/footer.php'); ?>
	</div>
</body>
</html>