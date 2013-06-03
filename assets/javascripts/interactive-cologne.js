/*global google, InfoBox */
var _gaq = _gaq || [];
( function( $ ) {
	"use strict";

	// Enable tooltips, for non-touch devices:
	if (!('ontouchstart' in document.documentElement)) {
		$('a[data-toggle=tooltip]').tooltip();
	}

	var map, eventBox;

	map = {
		/**
		 * Default options.
		 */
		options : {
			canvas: null,
			markers: null,
			map : {
				zoom: 14,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				backgroundColor: '#fff',
				center: new google.maps.LatLng(50.9372,6.9469)
			},
			marker : {
			},
			infobox : {
				pixelOffset: new google.maps.Size( -145, 0 ),
				boxStyle: {
					width: '400px'
				},
				boxClass: 'infobox',
				closeBoxMargin: '5px',
				closeBoxURL: '/assets/images/close.png'
			}
		},

		/**
		 * Returns an instance of google.maps.Map.
		 */
		initMapInstance: function() {
			if ( ! this.mapInstance )
				this.mapInstance = new google.maps.Map( this.options.canvas[0], this.options.map );

			return this.mapInstance;
		},

		/**
		 * Init the map markers. Goes through each object.
		 * A marker object must have an data-loc attribute, which will
		 * be used for the position of the marker. Optional: Set data-title
		 * for a marker title, which will be displayed on mouseover
		 */
		initMapMarkers: function() {
			var markers = this.options.markers, self = this;

			markers.each( function() {
				var el = $( this ), loc = el.data( 'loc' ).split( ',' );
				if ( ! loc )
					return;

				// Parse the position of the string
				var position = new google.maps.LatLng(
					parseFloat( loc[0] ),
					parseFloat( loc[1] )
				);

				if ( ! self.mapInstance.getCenter() )
					self.mapInstance.setCenter( position );

				// Check if a title exists
				var title = el.data( 'title' ) || '';

				// Add marker to map
				var marker = self.addMarkerToMap( position, title );

				// Check if content exists
				var content = el.html();
				if ( ! content )
					return;

				// Add content as a infobox to marker
				self.addInfoBoxToMarker( content, marker );
			} );
		},

		/**
		 * Adds a marker to the map.
		 *
		 * @param {object} position The location of the marker, should be a
		 *                          google.maps.LatLng object
		 * @param {string} title    Optional. A title which will be displayed
		 *                          on marker mouseover.
		 */
		addMarkerToMap: function( position, title ) {
			var options = $.extend( {}, {
				position: position,
				title: title || '',
				map: this.mapInstance
			}, this.options.marker );

			return new google.maps.Marker( options );
		},

		/**
		 * Adds an infobox to a marker.
		 *
		 * @param {HTML DOM Object} content The content of the infobox
		 * @param {object} marker           The marker on which the infobox
		 *                                  should be attached
		 */
		addInfoBoxToMarker: function( content, marker ) {
			if ( ! content || ! marker )
				return;

			// Set one InfoBox instance
			if ( ! this.infobox )
				this.infobox = new InfoBox();

			var options = $.extend( {}, {
				content: content
			}, this.options.infobox );

			// Add the infbox to the marker
			var self = this;
			google.maps.event.addListener( marker, 'click', function() {
				self.infobox.close(); // Only display one infobox at a time
				self.infobox.setOptions( options );
				self.infobox.open( self.mapInstance, marker );
			} );
		},

		/**
		 * Init the map.
		 *
		 * @param  {object} options Custom options
		 */
		init: function( options ) {
			$.extend( true, this.options, options );

			// Map needs the canvas
			if ( ! this.options.canvas )
				return false;

			// Set a new google.maps.Map instance
			this.initMapInstance();

			// Init the map markers when markers exists
			if ( this.options.markers )
				this.initMapMarkers();
		}
	};

	$.fn.fancyScroll = function( speed ) {
		var _speed = speed || 300;

		this.each( function() {
			$( this ).click( function( e ) {
				if ( ! this.hash )
					return;

				$( 'body, html' ).animate( {
					scrollTop: $( this.hash ).offset().top
				}, _speed );

				// Prevent adding the hash to window.location
				e.preventDefault();
			} );
		} );
	};

	$( document ).ready( function() {
		// Custom map options
		var mapOptions = {
			canvas: $( '#map-canvas' ), // The place of the map
			markers: $( '#map-markers > div' ), // The markers
			map: {
				dragable: false,
				scrollwheel: false // Don't scroll the map when scrolling over with the wheel
			},
			marker : {
				animation: google.maps.Animation.DROP
			}
		};

		// Init the map
		// if ( window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' ) {
			map.init( mapOptions );
		// }

	} );

} ( jQuery ) );
