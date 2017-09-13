<?php
//###
	/*
		if($noact){
			if(isLoggedIn()){
				echo "<a href='' onclick='logOut();'>Сброс</a>";
			}else{
				echo "Вы не вошли";
			}
		}
		*/
function isLoggedIn(){
	$is = false;
	if(isset($_COOKIE["log"])){
		$is = true;
	}
return $is;
}
function logIn(){
	setcookie("log","test",time()+60*60*72);
return true;
}
function out(){
	setcookie("log","",time()-60);
return "Вышли";
}

$act = $_GET["a"];
$noact = false;
if($act == "out"){
	out();
	header("Location: index.php");
}elseif($act == "in"){
	logIn();
	header("Location: index.php");
}else{
	$noact = true;
}
?>


<?php
/*
	<div id="workline"><input type="checkbox"><span class="work" id="w1" OnKeyUp="savethis(this);" >1 Большое дело</span></div>
	</div>
	<div class="three">
		<div id="workline"><input type="checkbox"><span class="work" id="w31" OnKeyUp="savethis(this);" >1 среднее</span></div>
		<div id="workline"><input type="checkbox"><span class="work" id="w32" OnKeyUp="savethis(this);" >2 среднее</span></div>
		<div id="workline"><input type="checkbox"><span class="work" id="w33" OnKeyUp="savethis(this);" >3 среднее</span></div>
	</div>
	<div class="five">
		<div id="workline"><input type="checkbox"><span class="work" id="w51" OnKeyUp="savethis(this);" >1 маленькое</span></div>
		<div id="workline"><input type="checkbox"><span class="work" id="w52" OnKeyUp="savethis(this);" >2 маленькое</span></div>
		<div id="workline"><input type="checkbox"><span class="work" id="w53" OnKeyUp="savethis(this);" >3 маленькое</span></div>
		<div id="workline"><input type="checkbox"><span class="work" id="w54" OnKeyUp="savethis(this);" >4 маленькое</span></div>
		<div id="workline"><input type="checkbox"><span class="work" id="w55" OnKeyUp="savethis(this);" >5 маленькое</span></div>

		$("#" + wtid).css({"color": "red"});
		$("#" + wtid).css({"text-decoration-style": "double"});
		$("#" + wtid).css({"text-decoration-color": "red"});
		$("#" + wtid).css({"-moz-text-decoration-color": "red"});
		$("#" + wtid).css({"-moz-text-decoration-style": "double"});
*/
?>