
var scoreOk = 0
var scoreNo = 0
var imported = document.createElement('script');
//imported.src = '/js/sweetalert.min.js';
imported.src = '/js/sweetalert.min.js';
document.head.appendChild(imported);
var imported = document.createElement('script');
imported.src = '/js/voicerss-tts.min.js';
document.head.appendChild(imported);
//var imported = document.createElement('script');
//imported.src = '/js/speakClient.js';
//document.head.appendChild(imported);

var speechtrgt = function (trgt) {
        VoiceRSS.speech({
        key: '48118d3dbd84495482314170e8361839',
        src: trgt,
        hl: 'en-us',
        r: 0, 
        c: 'ogg',
        f: '8khz_8bit_mono',
        ssml: false
    });
}

var play_stts = 0;
var myTimer;

function percentage(num, per) {
  return (num*100)/per;
}


var Topic = (function() {
    
    var render_page = function (data) {
        
        var subjectElement = document.querySelector("#name").children[0]
        subjectElement.innerHTML = data.name
        var subjectElement = document.querySelector("#info_note").children[0]
        subjectElement.innerHTML = data.info
        var subjectElement = document.querySelector("#autr").children[0]
        subjectElement.innerHTML = data.autr
        var subjectElement = document.querySelector("#nwrd").children[0]
        if ( data.nwrd == 1) { w = data.nwrd + ' Word,' } else { w = data.nwrd + ' Words,' }
        subjectElement.innerHTML =  w
        var subjectElement = document.querySelector("#nsnt").children[0]
        if ( data.nsnt == 1) { s = data.nsnt + ' Sentence,' } else { s = data.nsnt + ' Sentences,' }
        subjectElement.innerHTML = s
        var subjectElement = document.querySelector("#nimg").children[0]
        if ( data.nimg == 1) { i = data.nimg + ' Image.' } else { i = data.nimg + ' Images.' }
        subjectElement.innerHTML = i
        var subjectElement = document.querySelector("#naud").children[0]
        if ( data.naud == 1) { a = data.naud + ' Audio file and' } else { a = data.naud + ' Audio files and' }
        subjectElement.innerHTML = a
        var subjectElement = document.querySelector("#dteu").children[0]
        subjectElement.innerHTML = data.dteu
        var subjectElement = document.querySelector("#slng").children[0]
        subjectElement.innerHTML = data.slng
        var subjectElement = document.querySelector("#levl").children[0]
        var plevl
        if (data.levl == 0) {
          plevl = 'beginner'
        } else if (data.levl == 1) {
          plevl = 'intermediate'
        } else if (data.levl == 2) {
          plevl = 'advance'
        }
        subjectElement.innerHTML = plevl
        
        var first = Object.keys(data.items)[0]
        render_topic(first, data.items[first])
    }

    var render_topic = function (trgt, dat) {
        document.body.style.backgroundColor = "#F0ECEB";
        document.getElementById("headA").style = "DISPLAY: true;";
        document.getElementById("headB").style = "DISPLAY: none;";
        document.getElementById("headC").style = "DISPLAY: none;";
        document.getElementById("TopicLanding").style = "DISPLAY: true;";
        document.getElementById("fscreen").style = "DISPLAY: none;";
        document.getElementById("vscreen").style = "DISPLAY: none;";
        document.getElementById("QuizButtons").style = "DISPLAY: none;";
        document.getElementById("ViewerButtons").style = "DISPLAY: none;";
        document.getElementById("slidecontainer").style = "DISPLAY: none;";
        
    }

    var load_data = function(file) {
        var xmlhttp = new XMLHttpRequest()
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                data = JSON.parse(xmlhttp.responseText)
                Topic.renderPage(data)
            } else if (xmlhttp.readyState==4 && xmlhttp.status==404) {
                swal("This file is not yet on Server, try again later.", ' ', "error");
                document.write('<br><br><div align="center"><big>Exiting...</big></div>')
                goBack();
            }
        }

        xmlhttp.open("GET", file, true)
        xmlhttp.send()
    }
    return {
        renderTopic: render_topic,
        renderPage: render_page,
        loadData: load_data
    }
})()


var Viewer = (function() {
    
    document.getElementById("Next").onclick = function () { Viewer.nextCard(); };
    document.getElementById("Play").onclick = function () { Viewer.psplayer(data); };
    document.getElementById("Back").onclick = function () { Viewer.backCard(); };

    var viewer_render_page = function (data) {

        var first = Object.keys(data.items)[0]
        var items = Object.keys(data.items)
        var count = items.length
        var shaft = 0
        
        // images preload
        for(var item in data.items){
            var dataCopy = data.items[item]
            var imag = JSON.stringify(dataCopy['imag'])
            var type = JSON.stringify(dataCopy['type'])
            imag = JSON.parse(imag)
            type = JSON.parse(type)

            if ((type == '1') && (imag != '0')) {
                trgt_lowc = item.toLowerCase()
                img = new Image()
				img.src = '/share/images/'+trgt_lowc+'-'+imag+'.jpg'
            }
        }
        
        document.body.style.backgroundColor = "#B1E4EE";
        document.getElementById("headA").style = "DISPLAY: none;";
        document.getElementById("headB").style = "DISPLAY: none;";
        document.getElementById("headC").style = "DISPLAY: true;";
        document.getElementById("TopicLanding").style = "DISPLAY: none;";
        document.getElementById("fscreen").style = "DISPLAY: none;";
        document.getElementById("vscreen").style = "DISPLAY: true;";
        document.getElementById("slidecontainer").style = "DISPLAY: true;";
        document.getElementById("QuizButtons").style = "DISPLAY: none;";
        document.getElementById("ViewerButtons").style = "DISPLAY: true;";
        
        viewer_render_card(first, data.items[first], count, shaft)
    }
    
    var viewer_render_card = function (trgt, dat, count, shaft) {
        
        arr = []
        for(var event in dat){
            var dataCopy = dat[event]
            for(key in dataCopy){
                dataCopy[key] = new Date(dataCopy[key])
            }
            arr.push(dataCopy)
        }
        
        var srce = JSON.stringify(arr[0])
        srce = JSON.parse(srce)
        var exmp = JSON.stringify(arr[11])
        exmp = JSON.parse(exmp)
        var grmr = JSON.stringify(arr[15])
        grmr = JSON.parse(grmr)
        var imag = JSON.stringify(arr[19])
        imag = JSON.parse(imag)
        var type = JSON.stringify(arr[22])
        type = JSON.parse(type)
        var itle = trgt.toLowerCase();
        var exmp = exmp.replace(itle, "<b>"+itle+"</b>")
        exmp = exmp.replace(trgt, "<b>"+trgt+"</b>")
        
        var chars = trgt.length;
        if ((chars >= 1) && (chars < 20)) {
          var fs = 68; var vw = 4.30
        } else if ((chars >= 20) && (chars < 40)) {
          var fs = 50; var vw = 4.10
        } else if ((chars >= 40) && (chars < 80)) {
          var fs = 55; var vw = 3.80
        } else if ((chars >= 80) && (chars < 100)) {
          var fs = 45; var vw = 3.60
        } else {
          var fs = 35; var vw = 3.50
        }
        
        var chars = srce.length;
        if ((chars >= 1) && (chars < 20)) {
          var sfs = 21; var svw = 2.30
        } else if ((chars >= 20) && (chars < 40)) {
          var sfs = 19; var svw = 2.20
        } else if ((chars >= 40) && (chars < 80)) {
          var sfs = 18; var svw = 2.10
        } else if ((chars >= 80) && (chars < 100)) {
          var sfs = 17; var svw = 2.00
        } else {
          var sfs = 16; var svw = 2.00
        }
        
        var chars = exmp.length;
        if ((chars >= 1) && (chars < 20)) {
          var efs = 11; var evw = 1.70
        } else if ((chars >= 20) && (chars < 40)) {
          var efs = 10; var evw = 1.60
        } else if ((chars >= 40) && (chars < 80)) {
          var efs = 9; var evw = 1.40
        } else if ((chars >= 80) && (chars < 100)) {
          var efs = 9; var evw = 1.20
        } else {
          var efs = 8; var evw = 1.20
        }

        var mvw = 6; var msvw = 5; var mevw = 5
        var lcss = 'h1 { font-size:'+fs+';font-size:'+vw+'vw;} '+
        'h2 { font-size:'+sfs+';font-size:'+svw+'vw;}'+
        'p { font-size:'+efs+';font-size:'+evw+'vw;}'+
        '.pronounce {width:90%}'+
        '@media all and (max-device-width: 320px){'+
        'h1 { font-size:'+fs+';font-size:'+mvw+'vw;}'+
        'h2 { font-size:'+sfs+';font-size:'+msvw+'vw;}'+
        'p { font-size:'+efs+';font-size:'+mevw+'vw;}'+
        '.pronounce {width:95%}}',
        
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(lcss));
        head.appendChild(style);
        
        window.pronounce = function () {
            speechtrgt(trgt);
        }
        
        var trgtElement = document.querySelector("#trgt").children[0]
        var grmrElement = document.querySelector("#grmr").children[0]
        var srceElement = document.querySelector("#v_srce").children[0]
        var imgsElement = document.querySelector("#v_imgs").children[0]
        var exmpElement = document.querySelector("#v_exmp").children[0]
        var dotsElement = document.querySelector("#dots").children[0]
    
        srceElement.hidden = false
        dotsElement.hidden = true

        var count_items = document.getElementById("item_slider");
        count_items.value = 1;
        count_items.setAttribute("min", 1);
        count_items.setAttribute("max", count);

        trgtElement.innerHTML = trgt
        
        if ((type == '1') && (imag != '0')) {
            grmrElement.innerHTML = trgt
            trgtximg = trgt.toLowerCase()
            imgsElement.innerHTML = '<img class="WordImage" src="/share/images/'+trgtximg+'-'+imag+'.jpg" onerror="imgError(this);"</img>'
        } 
        else if (type == '1') {
            grmrElement.innerHTML = trgt
        } 
        else {
            grmr = grmr.replace(/<span/g, "<font")
            grmr = grmr.replace(/<\/span>/g, "</font>")
            grmrElement.innerHTML = grmr
            imgsElement.innerHTML = '<font "size=0"></font>'
        }
        
        var _item = document.querySelector("#item").children[0]
        _item.innerHTML = shaft+1
        
        var _total = document.querySelector("#total").children[0]
        _total.innerHTML = count
        
        srceElement.innerHTML = srce
        exmpElement.innerHTML = exmp
    }

    var viewer_player = function (data) {
        if (play_stts == 0 ) {
            play_stts = 1
            document.getElementById("Play").src="/images/stop.png"

            trgt = document.querySelector("#trgt").children[0].innerHTML
            items = Object.keys(data.items)
            count = items.length
            shaft = items.indexOf(trgt)
            shaft = shaft+1

            var stop = function (cnt) {
                
                if (cnt >= count) {
                    clearInterval(myTimer)
                    document.getElementById("Play").src="/images/play.png"
                    var count_items = document.getElementById("item_slider");
                    count_items.value = 1;
                }
            }
            
            myTimer = setInterval(function() {
                stop(shaft);
                ele = document.getElementById("item_slider");
                if (ele.offsetParent !== null) {
                    Viewer.nextCard();
                    ele.value = parseInt(shaft);
                } else {
                    clearInterval(myTimer)
                    document.getElementById("Play").src="/images/play.png"
                    var count_items = document.getElementById("item_slider");
                    count_items.value = 1;
                }

                shaft++;
            }, 1 * 3500);
            
        } else { 
            play_stts = 0
            clearInterval(myTimer)
            document.getElementById("Play").src="/images/play.png"
        }
    }
    
    var viewer_next_card = function () {
        var trgt = document.querySelector("#trgt").children[0].innerHTML
        var items = Object.keys(data.items)
        var count = items.length
        var shaft = items.indexOf(trgt)
        shaft = shaft+1
        if (shaft == count) {
            var por = percentage(shaft, count);
            var por = por.toFixed();
            var shaft = 0;
        }

        var next = items[shaft]
        viewer_render_card(next, data.items[next], count, shaft)
        
        x = document.getElementById("item_slider");
        x.value = parseInt(shaft);
        
        var imge = document.querySelector("#imgs").children[0].innerHTML
        imge.error = function () { 
            document.getElementById("imgs").style.display = "none";
        }
    }
    
    var viewer_back_card = function () {
        var trgt = document.querySelector("#trgt").children[0].innerHTML
        var items = Object.keys(data.items)
        var count = items.length
        var shaft = items.indexOf(trgt)
        shaft = shaft-1

        if (shaft == count) {
            Topic.loadData(myData);
            var por = percentage(shaft, count);
            var por = por.toFixed();
            var shaft = 0;
        }

        var next = items[shaft]
        viewer_render_card(next, data.items[next], count, shaft)
        
        x = document.getElementById("item_slider");
        x.value = parseInt(shaft);
    }
    
    var slider = document.getElementById("item_slider");
   
    slider.oninput = function() {
        var shaft = document.getElementById("item");
        var new_shaft = document.getElementById("item_slider").value;
        
        viewer_next_card(); // TODO
    }
    
    var load_data = function(file) {
        var xmlhttp = new XMLHttpRequest()

        xmlhttp.onreadystatechange = function () {
           data = JSON.parse(xmlhttp.responseText)
           Viewer.renderPage(data)
        }

        xmlhttp.open("GET", file, true)
        xmlhttp.send()
    }
    
    return {
        renderCard: viewer_render_card,
        renderPage: viewer_render_page,
        nextCard: viewer_next_card,
        backCard: viewer_back_card,
        psplayer: viewer_player,
        loadData: load_data
    }
})()


var Quiz = (function() {
    
    document.getElementById("Right").onclick = function () { Quiz.nextCardOk(); };
    document.getElementById("Wrong").onclick = function () { Quiz.nextCardNo(); };
    
    var Quiz_render_page = function (data) {

        // images preload
        for(var item in data.items){
            var dataCopy = data.items[item]
            var imag = JSON.stringify(dataCopy['imag'])
            var type = JSON.stringify(dataCopy['type'])
            imag = JSON.parse(imag)
            type = JSON.parse(type)
            if ((type == '1') && (imag != '0')) {
                trgt_lowc = item.toLowerCase()
                "/share/images/'+trgtximg+'-'+imag+'.jpg"
                img = new Image()
				img.src = '/share/images/'+trgt_lowc+'-'+imag+'.jpg'
            }
        }
        
        document.body.style.backgroundColor = "#cdeeb1";
        document.getElementById("headA").style = "DISPLAY: none;";
        document.getElementById("headC").style = "DISPLAY: none;";
        document.getElementById("headB").style = "DISPLAY: true;";
        document.getElementById("TopicLanding").style = "DISPLAY: none;";
        document.getElementById("fscreen").style = "DISPLAY: true;";
        document.getElementById("vscreen").style = "DISPLAY: none;";
        document.getElementById("slidecontainer").style = "DISPLAY: none;";
        document.getElementById("QuizButtons").style = "DISPLAY: true;";
        document.getElementById("ViewerButtons").style = "DISPLAY: none;";
        
        document.getElementById("Right").setAttribute("value", "0");
        document.getElementById("Wrong").setAttribute("value", "0");
        
        var first = Object.keys(data.items)[0]
        Quiz_render_card(first, data.items[first], scoreOk, scoreNo)
    }
    
    var Quiz_render_card = function (trgt, dat, scoreOk, scoreNo) {
        
        arr = []
        for(var event in dat){
            var dataCopy = dat[event]
            for(key in dataCopy){
                dataCopy[key] = new Date(dataCopy[key])
            }
            arr.push(dataCopy)
        }
        var srce = JSON.stringify(arr[0])
        srce = JSON.parse(srce)
        var exmp = JSON.stringify(arr[11])
        exmp = JSON.parse(exmp)
        var grmr = JSON.stringify(arr[15])
        grmr = JSON.parse(grmr)
        var imag = JSON.stringify(arr[19])
        imag = JSON.parse(imag)
        var type = JSON.stringify(arr[22])
        type = JSON.parse(type)
        var itle = trgt.toLowerCase();
        var exmp = exmp.replace(itle, "<b>"+itle+"</b>")
        exmp = exmp.replace(trgt, "<b>"+trgt+"</b>")
        
        var chars = trgt.length;
        if ((chars >= 1) && (chars < 20)) {
          var fs = 68; var vw = 4.30
        } else if ((chars >= 20) && (chars < 40)) {
          var fs = 50; var vw = 4.10
        } else if ((chars >= 40) && (chars < 80)) {
          var fs = 55; var vw = 3.80
        } else if ((chars >= 80) && (chars < 100)) {
          var fs = 45; var vw = 3.60
        } else {
          var fs = 35; var vw = 3.50
        }
        
        var chars = srce.length;
        if ((chars >= 1) && (chars < 20)) {
          var sfs = 21; var svw = 2.30
        } else if ((chars >= 20) && (chars < 40)) {
          var sfs = 19; var svw = 2.20
        } else if ((chars >= 40) && (chars < 80)) {
          var sfs = 18; var svw = 2.10
        } else if ((chars >= 80) && (chars < 100)) {
          var sfs = 17; var svw = 2.00
        } else {
          var sfs = 16; var svw = 2.00
        }
        
        var chars = exmp.length;
        if ((chars >= 1) && (chars < 20)) {
          var efs = 11; var evw = 1.70
        } else if ((chars >= 20) && (chars < 40)) {
          var efs = 10; var evw = 1.60
        } else if ((chars >= 40) && (chars < 80)) {
          var efs = 9; var evw = 1.40
        } else if ((chars >= 80) && (chars < 100)) {
          var efs = 9; var evw = 1.20
        } else {
          var efs = 8; var evw = 1.20
        }

        var mvw = 6; var msvw = 5; var mevw = 5
        var lcss = 'h1 { font-size:'+fs+';font-size:'+vw+'vw;} '+
        'h2 { font-size:'+sfs+';font-size:'+svw+'vw;}'+
        'p { font-size:'+efs+';font-size:'+evw+'vw;}'+
        '.pronounce {width:90%}'+
        '@media all and (max-device-width: 320px){'+
        'h1 { font-size:'+fs+';font-size:'+mvw+'vw;}'+
        'h2 { font-size:'+sfs+';font-size:'+msvw+'vw;}'+
        'p { font-size:'+efs+';font-size:'+mevw+'vw;}'+
        '.pronounce {width:95%}}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(lcss));
        head.appendChild(style);
        
        window.pronounce = function () {
            speechtrgt(trgt);
        }
        
        var trgtElement = document.querySelector("#trgt").children[0]
        var srceElement = document.querySelector("#srce").children[0]
        var dotsElement = document.querySelector("#dots").children[0]
        var imgsElement = document.querySelector("#imgs").children[0]
        var exmpElement = document.querySelector("#exmp").children[0]
        var scoreOkElement = document.querySelector("#score_ok").children[0]
        var scoreNoElement = document.querySelector("#score_no").children[0]
        document.getElementById("Show").style = "DISPLAY: true;";
        document.getElementById('Right').style.right = "5%";
        document.getElementById('Wrong').style.left = "5%";
        
        srceElement.hidden = true
        dotsElement.hidden = false
        
        trgtElement.innerHTML = trgt
        if ((type == '1') && (imag != '0')) {
            trgtximg = trgt.toLowerCase()
            imgsElement.innerHTML = '<img class="WordImage" src="/share/images/'+trgtximg+'-'+imag+'.jpg" onerror="imgError(this);"</img>'
        } else {
            imgsElement.innerHTML = '<font "size=0"></font>'
        }
        srceElement.innerHTML = srce
        dotsElement.innerHTML = '<img src="/images/eyelashes.svg"</img>'
        exmpElement.innerHTML = exmp
        scoreNoElement.innerHTML = scoreNo
        scoreOkElement.innerHTML = scoreOk
    }
    
    var Quiz_next_card_ok = function () {
        var trgt = document.querySelector("#trgt").children[0].innerHTML
        var scoreOk = document.querySelector("#score_ok").children[0].innerHTML
        var scoreOk = Number(scoreOk)
        var scoreNo = document.querySelector("#score_no").children[0].innerHTML
        var scoreNo = Number(scoreNo)
        var keys = Object.keys(data.items)
        var current = keys.indexOf(trgt)
        var nextIndex = current+1
        var scoreOk = scoreOk+1
        document.getElementById("Right").setAttribute("value", scoreOk);
       
        if (nextIndex == keys.length) {
            var por = percentage(scoreOk, keys.length);
            var por = por.toFixed();
            
            if (scoreOk == keys.length) {
              swal("Congratulations, you made a passing score!", 'Your score is: '+por+'%', "success");
            } else if (scoreOk > scoreNo) {
              swal("Good job!", 'Your score is: '+por+'%', "success");
            } else if (scoreOk < scoreNo) {
              swal("You've not passed", 'Your score is: '+por+'%', "error");
            } else if (scoreOk == scoreNo) {
              swal("Good job!", 'Your score is: '+por+'%', "warning");
            }
            
            var scoreOk = 0; var scoreNo = 0; var nextIndex = 0;
            document.getElementById("Right").setAttribute("value", "0");
            document.getElementById("Wrong").setAttribute("value", "0");
        }

        var next = keys[nextIndex]
        Quiz_render_card(next, data.items[next], scoreOk, scoreNo)
        
        var imge = document.querySelector("#imgs").children[0].innerHTML
        imge.error = function () { 
            document.getElementById("imgs").style.display = "none";
        }
    }
    
    var Quiz_next_card_no = function () {
        var trgt = document.querySelector("#trgt").children[0].innerHTML
        var trgt = document.querySelector("#trgt").children[0].innerHTML
        var scoreOk = document.querySelector("#score_ok").children[0].innerHTML
        var scoreOk = Number(scoreOk)
        var scoreNo = document.querySelector("#score_no").children[0].innerHTML
        var scoreNo = Number(scoreNo)
        var keys = Object.keys(data.items)
        var current = keys.indexOf(trgt)
        var nextIndex = current+1
        var scoreNo = scoreNo+1
        document.getElementById("Wrong").setAttribute("value", scoreNo);
        
        if (nextIndex == keys.length) {
            Topic.loadData(myData);
            var por = percentage(scoreOk, keys.length);
            var por = por.toFixed();
            
            if (scoreOk == keys.length) {
              swal("Congratulations, you made a passing score!", 'Your score is: '+por+'%', "success");
            } else if (scoreOk > scoreNo) {
              swal("Good job!", 'Your score is: '+por+'%', "success");
            } else if (scoreOk < scoreNo) {
              swal("You've not passed", 'Your score is: '+por+'%', "error");
            } else if (scoreOk == scoreNo) {
              swal("Good job!", 'Your score is: '+por+'%', "warning");
            }
            
            var scoreOk = 0; var scoreNo = 0; var nextIndex = 0;
            document.getElementById("Right").setAttribute("value", "0");
            document.getElementById("Wrong").setAttribute("value", "0");
        }

        var next = keys[nextIndex]
        Quiz_render_card(next, data.items[next], scoreOk, scoreNo)
    }
    
    var load_data = function(file) {
        var xmlhttp = new XMLHttpRequest()

        xmlhttp.onreadystatechange = function () {
           data = JSON.parse(xmlhttp.responseText)
           Quiz.renderPage(data)
        }

        xmlhttp.open("GET", file, true)
        xmlhttp.send()
    }

    return {
        renderCard: Quiz_render_card,
        renderPage: Quiz_render_page,
        nextCardOk: Quiz_next_card_ok,
        nextCardNo: Quiz_next_card_no,
        loadData: load_data
    }
})()

window.addEventListener('load', function () {
    
    document.getElementById("tts").onclick = function () { window.pronounce(); };
    document.getElementById("vtts").onclick = function () { window.pronounce(); };
    
    var div = document.getElementById("dom-target");
    var myData = div.textContent;
    document.getElementById("ToHomeB").onclick = function () { Topic.loadData(myData); };
    document.getElementById("ToHomeC").onclick = function () { Topic.loadData(myData); };
    document.getElementById("flashimg").onclick = function () { Viewer.loadData(myData); };
    document.getElementById("flashdef").onclick = function () { Quiz.loadData(myData); };

    document.getElementById("Show").onclick = function () {  
        var srceElement = document.querySelector("#srce").children[0]
        var dotsElement = document.querySelector("#dots").children[0]
        srceElement.hidden = false
        dotsElement.hidden = true
        document.getElementById("Show").style = "DISPLAY: none;";
        document.getElementById('Right').style.right = "25%";
        document.getElementById('Wrong').style.left = "25%";
        //document.getElementById('Play').style.right = "5%";
        //document.getElementById('Back').style.left = "21%";
    }
})
