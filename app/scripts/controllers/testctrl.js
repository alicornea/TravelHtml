'use strict';

/**
 * @ngdoc function
 * @name travelHtmlApp.controller:AppScriptsControllersTestctrlJsCtrl
 * @description
 * # AppScriptsControllersTestctrlJsCtrl
 * Controller of the travelHtmlApp
 */
angular.module('travelHtmlApp')
  .controller('TestCtrl', function($scope) {
    
    $scope.gridsterOptions = {
      resize: {
        enabled: true,
        resize: function(e, ui, widget) {
          
          var parentDiv = ui.$player.parent().find(".col");
          if (ui.$player.parent().width() < 200 && !parentDiv.hasClass("col-half-width")) {
              parentDiv.addClass("col-half-width")
          }
          if (ui.$player.parent().width() > 200 && parentDiv.hasClass("col-half-width")) {
              parentDiv.removeClass("col-half-width")
          }

          if (ui.$player.parent().height() < 60 && !parentDiv.hasClass("col-half-height")) {
              parentDiv.addClass("col-half-height")
          }

          if (ui.$player.parent().width() > 60 && parentDiv.hasClass("col-half-height")) {
              parentDiv.removeClass("col-half-height")
          }

        }
      },
      widget_base_dimensions: [172.5, 54],
      autogrow_cols: true,
      widget_margins: [5.5, 5.5],
      max_cols: 4,
      min_cols: 1,
      max_size_y:2,
      max_size_x:4,
    };

    $scope.changed = function(serializeData){
      console.log(serializeData)
    }


    // Mock widgets
    $scope.values = [{
        num: 1,
        row: 1,
        col: 1,
        size_x: 2,
        size_y: 2,
        icon : "fa-globe",
        txt : "My Travels",
        link : "#/my-travels",
        color : "blue",
      }, {
        num: 2,
        row: 1,
        col: 3,
        size_x: 2,
        size_y: 2,
        icon : "fa-plus",
        txt : "Add Travel",
        link : "#/addtravel",
        color : "red",
      },

      {
        num: 3,
        row: 2,
        col: 1,
        size_x: 4,
        size_y: 2,
        img:'images//map.jpg',
        link : "#/my-map"
      },

      {
        num: 4,
        row: 3,
        col: 1,
        size_x: 2,
        size_y: 2,
        icon : "fa-camera",
        txt : "Attractions",
        link : "#/attractions",
        color : "green",
      }, {
        num: 5,
        row: 3,
        col: 3,
        size_x: 2,
        size_y: 1,
        icon : "fa-user-plus",
        txt : "Buddies",
        link : "#/buddies",
        color : "purple",
      }, {
        num: 6,
        row: 3,
        col: 3,
        size_x: 1,
        size_y: 1,
        icon : "fa-weixin",
        txt : "Chat",
        link : "#/chat",
        color : "blue",
      }, {
        num: 7,
        row: 3,
        col: 4,
        size_x: 1,
        size_y: 1,
        icon : "fa-thumbs-o-up",
        txt : "Popular",
        link : "#/popular",
        color : "blue",
      },

      {
        num: 8,
        row: 4,
        col: 1,
        size_x: 4,
        size_y: 2,
        img : "images/photos.png",
        link : "#/photos",
        
      },

      {
        num: 9,
        row: 5,
        col: 1,
        size_x: 2,
        size_y: 2,
        icon : "fa-child",
        txt : "Events",
        link : "#/events",
        color : "blue",
      }, {
        num: 10,
        row: 5,
        col: 2,
        size_x: 2,
        size_y: 2,
        
        icon : "fa-bed",
        txt : "Booking",
        link : "#/booking",
        color : "red",
      }
    ];

  });
