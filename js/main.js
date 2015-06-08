timing= {};
word_index=0;
display_index=0;
$(document).keypress(function( event ) {
    jPlayer_c_time=Math.round($("#jquery_jplayer_1").data("jPlayer").status.currentTime);
    if ( event.which == 115 & !$('#jquery_jplayer_1').data().jPlayer.status.paused & word_index<lyrics_words.length) {
        timing[jPlayer_c_time]=lyrics_words[word_index];
        document.getElementById("line1").innerHTML = lyrics_words[word_index];
        document.getElementById("line2").innerHTML = lyrics_words[word_index+1];
        word_index+=1;
    }

});

function submitLyrics() {
    lyrics_words = $('#lyricsinput').val().split("\n"); //Splitting the words into lines
    lyrics_words = $.grep(lyrics_words,function(n){ return(n) }); //removing empty lines
    //for testing purpose    document.getElementById("lyrics").innerHTML = lyrics_words;
    //  document.getElementById('lyrics_display').innerHTML = lyrics_words[0];
    document.getElementById("line1").innerHTML = lyrics_words[0];
    document.getElementById("line2").innerHTML = lyrics_words[1];
    lyricsDisplay();
}

function reloadplayer() {
    youtubelink=document.getElementById("Youtube_link").value;
    $("#jquery_jplayer_1").jPlayer("destroy");
    $("#jquery_jplayer_1").jPlayer({
        ready: function (event) {
            $(this).jPlayer("setMedia", {
                title: "Your song is playing",
                mp3: "http://youtubeinmp3.com/fetch/?video="+youtubelink
            });
        },
        swfPath: "../../dist/jplayer",
        supplied: "mp3",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true
    });
}

function lyricsDisplay() {

    if (timing[Math.round($("#jquery_jplayer_1").data("jPlayer").status.currentTime)] !== undefined)
    {
        //nextline=findNextLine(timing, Math.round($("#jquery_jplayer_1").data("jPlayer").status.currentTime));
        document.getElementById('lyrics_display').innerHTML = timing[Math.round($("#jquery_jplayer_1").data("jPlayer").status.currentTime)];
        //document.getElementById('lyrics_display2').innerHTML = nextline;
    }
    var t = setTimeout(function(){lyricsDisplay()},1);

}
/* This is not working currently
 function findNextLine(array, position)
 {
 done=false;
 while (!done)
 {
 if (position<lyrics_words.length)
 {
 if (array[position+1]!== undefined)
 {
 return array[position+1];
 done=true;
 }
 else
 {
 position+=1;
 }
 }
 else
 {
 done=true;
 return '';
 }
 }
 }*/
