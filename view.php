<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Study</title>
        <meta name="description" content="Flashcards">
        <link rel="stylesheet" href="/css/view.css">
        <link rel="stylesheet" href="/css/fa/css/font-awesome.css">
        <link rel="image_src" href="http://idiomind.net/images/zwlogo.png" / ><!--formatted-->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script>
        function goBack() {
            window.history.back();
        }
        </script>
        <script>
        function toggleFullScreen() {
              if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
               (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                if (document.documentElement.requestFullScreen) {  
                  document.documentElement.requestFullScreen();  
                } else if (document.documentElement.mozRequestFullScreen) {  
                  document.documentElement.mozRequestFullScreen();  
                } else if (document.documentElement.webkitRequestFullScreen) {  
                  document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
                }  
              } else {  
                if (document.cancelFullScreen) {  
                  document.cancelFullScreen();  
                } else if (document.mozCancelFullScreen) {  
                  document.mozCancelFullScreen();  
                } else if (document.webkitCancelFullScreen) {  
                  document.webkitCancelFullScreen();  
                }  
              }  
            }
        </script>
        
    </head>
    <body>
        <?php
        include_once("analyticstracking.php");
        
        $lang = htmlspecialchars($_GET["l"]);
        $catg = htmlspecialchars($_GET["c"]);
        $set = htmlspecialchars($_GET["set"]);
        ?>
        <div id="dom-target" style="display: none;">
            <?php
            $set = "/".$lang."/".$catg."/".$set.".idmnd";
            print $set
            ?>
        </div>
<!--
        <input type="button" value="Toggle fullscreen" onclick="toggleFullScreen()">
-->     

	<table style="width:100%;margin:0;vertical-align:top;">
	<tr>
    <td>
		<table class="tainfo">
        <tr>
          <td class="tdinfo">
              <span id="nwrd"><font></font></span>
			  <span id="nsnt"><font></font></span>
			  <span id="naud"><font></font></span>
			  <span id="nimg"><font></font></span>
          </td>
        </tr>
        <tr>
          <td>
			  <div style="text-align:left;"id="autr"><font></font></div>
          </td>
        </tr>
      </table>
    <td class="floating-box-right"><div><a href="##" onClick="goBack(); return false; "><img src='/images/close.png'></a></div></td>
    </tr>
	</table>
<!--
-->
<!--
        <a href="##" onClick="toggleFullScreen(); return false; "><img src='/images/fulls.png'></a>
-->
        <br>
     
        <table style="width:80%;margin:20;vertical-align:top;align:center;padding:20">
			<tr>
				<div id="trgt">
					<h1 style="color:#4A4A4A"></h1>
				</div>
			</tr>
			<tr>
				<br />
				<div id="srce">
					<h2 style="color:#71806D;"></h2>
				</div>
				<div id="dots">
					<h2 style="color:#3F3C3C"></h2>
				</div>
			</tr>
			<tr>
				<div class="exmp" id="exmp">
					<font></font>
				</div>
			</tr>
        </table>

<!--
        <div class="iconss">
			<a onclick="page2(); return false" style="text-decoration:none;" class="cursor"><img src="/images/nextv.png"></a>
		</div>
-->
		
    </body>
    <script src="/js/flashcard.js"></script>
    <script>
        var div = document.getElementById("dom-target");
        var myData = div.textContent;
        Cards.loadData(myData)
    </script>

</html>
