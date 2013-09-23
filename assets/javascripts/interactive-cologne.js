/*global google, InfoBox */
var _gaq = _gaq || [];
var pointAnimation;
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

  var interviews = [
    {time: 5.97, video_id: '74952385'},
    {time: 10.167, video_id: '75003394'}
  ]

  function trailerPlayerReady(player_id){
    var player = $f(player_id);

    $('.overlay').click(function(e){
      player.api('paused', function (value, player_id) {
        if(value){
          player.api('play');
        } else {
          player.api('pause');
        }
      });
    });

    player.addEvent('playProgress', function(data) {
      if( interviews.length > 0 && data.seconds >= interviews[0].time ){
        var interview = interviews.shift();
        // console.log("play interview: ", interview.video_id);
      }
    });
  }

  pointAnimation = function(startX, startY) {
    var point = $('<div class="point">');
    var _x = startX;
    for( var _y = startY; _y < $(window).height() - 200; _y += 20){
      var _p = point.clone();
      _p.appendTo('body');
      _p
      .animate({ left: _x, top: _y }, (_y-startY)*5)
      .animate({ opacity: 1 }, 500)
      .animate({ opacity: 1}, 500)
      .animate({ opacity: 0 });
    }
    for( var _x = startX; _x > 200; _x -= 20){
      var _p = point.clone();
      _p.appendTo('body');
      _p
      .animate({ left: _x, top: _y }, (_y-startY)*5 + (startX-_x)*5)
      .animate({ opacity: 1 }, 500)
      .animate({ opacity: 1}, 500)
      .animate({ opacity: 0 });
    }
  }
} ( jQuery ) );
