/*global google, InfoBox */
var _gaq = _gaq || [];
( function( $ ) {
	"use strict";

  $(window).resize(function() {
    var video_top, video_left, video_width, video_height;
    if( $(window).width() > 767 ){
      if( $(window).width() / $(window).height() >= 1280/720){
        video_width = $(window).width();
        video_height = 720*$(window).width()/1280;
        video_top = ( $(window).height() - video_height) / 2;
        video_left = ( $(window).width() - video_width) / 2;
      } else {
        video_width = 1280*$(window).height()/720;
        video_height = $(window).height();
        video_top = ( $(window).height() - video_height) / 2;
        video_left = ( $(window).width() - video_width) / 2;
      }
    } else {
      video_width = $(window).width();
      video_height = 720*$(window).width()/1280;
      video_top = 0;
      video_left = 0;
    }
    
    $('#trailerPlayer').css('top', video_top+'px');
    $('#trailerPlayer').css('left', video_left+'px');
    $('#trailerPlayer').width(video_width);
    $('#trailerPlayer').height(video_height);
  });

  $(window).trigger('resize');

  $f('trailerPlayer').addEvent('ready', trailerPlayerReady);

  function trailerPlayerReady(player_id){
    var player = $f(player_id);

    $('.overlay').click(function(e){
      player.api('play');
    });

    player.addEvent('playProgress', function(data) {
      // console.log('playProgress event : ' + data.seconds + ' : ' + data.percent + ' : ' + data.duration);
    });
  }

} ( jQuery ) );
