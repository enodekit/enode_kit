// Make sure to include the `ui.router` module as a dependency
angular.module('uiRouterBox', [
    'ui.router',
    'boxControllers',
    'ngTouch',
    'ngAnimate'
])

.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
)

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      $urlRouterProvider

        .when('/user/:id', '/contacts/:id')

        .otherwise('/home');


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("home", {
          url: "/home",
              views: {
                  // 无名 view
                  '': {
                      templateUrl: 'template/boxInfo1.html',
                      controller: "HomeCtrl"
                  }
              }

        })
          .state("message", {

              url: "/message",
              templateUrl: 'template/message.html',
              controller: "MesCtrl"
          })
          .state("alert", {
              url: "/alert",
              views: {
                  // 无名 view
                  '': {
                      templateUrl: 'template/boxsetting.html',
                      controller: "AlertCtrl"
                  }

              }

          })
          .state("alert.yy", {

              url: "/alert/yy",
              views:{
                  '':{
                      templateUrl: 'template/YYsetting.html'
                  }
              }

          })
          .state("alert.sh", {

              url: "/alert/sh",
              templateUrl: 'template/SHsetting.html'

          })
          .state("alertedit",{
              url: "/alertedit",
              views:{
                  '':{
                      templateUrl: 'template/boxsetting3.html',
                      controller:"AlertAddYYCtrl"
                  },
                  'menu@':{
                      template:' '
                  },
                  'header@':{
                      templateUrl: 'template/addHeader2.html'
                  }
              }

          })
          .state("setting", {
              url: "/setting",


              views: {
                  // 无名 view
                  '': {
                      templateUrl: 'template/setting.html',
                      controller:"SetCtrl"
                  },
                  'header@':{
                      templateUrl: 'template/addHeader3.html'
                  }
              }
          })

          .state('addbox', {

              url: '/addbox',

              views: {
                  // 无名 view
                  '': {
                       templateUrl: 'template/boxes-0.html',
                      controller: ['$scope', '$stateParams',
                          function ($scope, $stateParams) {

                          }
                      ]
                  }
              }
          })
          .state('wifi1', {
              url: '/wifi1',
              views: {
                  // 无名 view
                  '': {
                      templateUrl: 'template/wifi1.html'

                  },
                  'menu@':{
                      template:' '
                  },
                  'header@':{
                      templateUrl: 'template/addHeader.html'
                  }
              }
          })
          .state('wifi2', {
              url: '/wifi2',
              views: {
                  // 无名 view
                  '': {
                      templateUrl: 'template/wifi2.html'
                  },
                  'menu@':{
                      template:' '
                  },
                  'header@':{
                      templateUrl: 'template/addHeader.html'
                  }
              }
          })
          .state('wifi3', {
              url: '/wifi3',
              views: {
                  // 无名 view
                  '': {
                      templateUrl: 'template/wifi3.html'
                  },
                  'menu@':{
                      template:' '
                  },
                  'header@':{
                      templateUrl: 'template/addHeader.html'
                  }
              }
          })
          .state('wifi4', {
              url: '/wifi4',
              views: {
                  '': {
                      templateUrl: 'template/wifi4.html'
                  },
                  'menu@':{
                      template:' '
                  },
                  'header@':{
                      templateUrl: 'template/addHeader.html'
                  }
              }
          })
          .state('wifi5', {
              url: '/wifi5',
              views: {
                  '': {
                      templateUrl: 'template/wifi5.html'
                  },
                  'menu@':{
                      template:' '
                  },
                  'header@':{
                      templateUrl: 'template/addHeader.html'
                  }
              }
          })
          .state('boxInfo', {   //盒子详情页
              url: '/boxInfo',
              views: {
                  '': {
                      templateUrl: 'template/boxInfo.html'
                  }
              }
          })
          .state('user', {   //盒子详情页
              url: '/user',
              views: {
                  '': {
                      templateUrl: 'template/user.html',
                      controller:'UserCtrl'
                  },
                  'header@':{
                      templateUrl: 'template/addHeader2.html'
                  }
              }
          })
    }
  ]
);
