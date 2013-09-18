/*global google, InfoBox */
var _gaq = _gaq || [];
( function( $ ) {
	"use strict";

  $(window).resize(function() {
    var video_top, video_left, video_width, video_height;
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
    //alert(video_width+','+video_height);
    
    $('#video_player').css('top', video_top+'px');
    $('#video_player').css('left', video_left+'px');
    $('#video_player').width(video_width);
    $('#video_player').height(video_height);
  });

  $(window).trigger('resize');

} ( jQuery ) );
