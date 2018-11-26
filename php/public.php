<?php
	header("content-type:text/html;charset=utf-8");
	
	function getConnect(){
		$db = mysqli_connect("localhost","root","");
	
		mysqli_select_db($db,"lecake");
		
		mysqli_query($db,"set names utf-8");
		
		return $db;
	}
?>