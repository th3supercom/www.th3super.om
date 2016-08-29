var windowReady = false;
var voiceReady = false;

var defaultparams = {
    rate: 1,
    pitch: 1,
    volume: 1,
    text: 'قاريء النصوص هو أداة متطورة لقراءة جميع النصوص وبمختلف اللغات وبأصوات أشخاص مختلفين. هذه نسخة تجريبية فقط مازالت في قيد التطوير. ملحوظة: يمكنك الكتابة مع التشكيل لجعل القراءة أكثر دقة.',
    voice: 'Arabic Female'
};

$(window).load( function() {


    $('#text').val(getUrlParameter('text') || defaultparams.text);
    
 
    
    windowReady = true;

    $('#voicetestdiv').hide();
    $('#waitingdiv').show();

    playbutton.onclick = function() {

        
        responsiveVoice.speak($('#text').val(),$('#voiceselection').val());

    };
    
 
    stopbutton.onclick = function() {

        responsiveVoice.cancel();

    }; 

    responsiveVoice.AddEventListener("OnLoad",function(){
        console.log("ResponsiveVoice Loaded Callback") ;
    });


    CheckLoading();


    
});

responsiveVoice.OnVoiceReady = function() {

    

    voiceReady = true;
    CheckLoading();
}


function CheckLoading() {
    
    if (voiceReady && windowReady) {

        $('#voicetestdiv').fadeIn(0.5);
        $('#waitingdiv').fadeOut(0.5);

        //Populate voice selection dropdown
        var voicelist = responsiveVoice.getVoices();

        var vselect = $("#voiceselection");
        vselect.html("");
        $.each(voicelist, function() {
                vselect.append($("<option />").val(this.name).text(this.name));
        });       
        
            $('#voiceselection').val(getUrlParameter('voice') || defaultparams.voice);
        
        getIframeWindow(document.getElementById('framelogo')).responsiveVoice = responsiveVoice;
        
    }
    
}

function getIframeWindow(iframe_object) {
  var doc;

  if (iframe_object.contentWindow) {
    return iframe_object.contentWindow;
  }

  if (iframe_object.window) {
    return iframe_object.window;
  } 

  if (!doc && iframe_object.contentDocument) {
    doc = iframe_object.contentDocument;
  } 

  if (!doc && iframe_object.document) {
    doc = iframe_object.document;
  }

  if (doc && doc.defaultView) {
   return doc.defaultView;
  }

  if (doc && doc.parentWindow) {
    return doc.parentWindow;
  }

  return undefined;
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
