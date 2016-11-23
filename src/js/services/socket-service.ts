app.factory(
  'OBS',
  function($rootScope: ng.IRootScopeService, $filter: ng.IFilterFilter) {
    var socket = new OBSWebSocket();
    var Data = {
      obs: {
        connected: <boolean> false,
        authenticated: <boolean> false,
        message: <string> null
      },
      version: {},
      streamStatus: {},
      sceneList: {},
      activeScene: {
        name: <string> undefined,
        sources: <any> []
      },
      transitionList: {},
      activeTransition: {
        name: <string> undefined
      }
    };

    function assignActiveScene(sceneName: string) {
      $rootScope.$apply(function() {
        Data.activeScene = $filter('filter')(Data.sceneList, { name: sceneName }, true)[0];
      });
    }

    function assignActiveTransition(transitionName: string) {
      $rootScope.$apply(function() {
        Data.activeTransition = $filter('filter')(Data.transitionList, { name: transitionName }, true)[0];
      })
    }

    socket.onConnectionOpened = function() {
      // Init a bunch of stuff.
      $rootScope.$apply(function() {
        Data.obs.connected = true;
        Data.obs.message = null;
      });

      getSceneList();
      getTransitionList();
    };

    socket.onConnectionClosed = function() {
      $rootScope.$apply(function() {
        Data.obs.connected = false;
        Data.obs.message = 'CONN_CLOSED';
      });
    };

    socket.onConnectionFailed = function() {
      $rootScope.$apply(function() {
        Data.obs.connected = false;
        Data.obs.message = 'CONN_FAILED';
      });
    };

    socket.onExit = function() {
      $rootScope.$apply(function() {
        Data.obs.connected = false;
        Data.obs.message = 'OBS_CLOSED';
      });
    };

    socket.onAuthenticationSuccess = function() {
      $rootScope.$apply(function() {
        Data.obs.authenticated = true;
        Data.obs.message = null;
      })
    };

    socket.onAuthenticationFailure = function() {
      $rootScope.$apply(function() {
        Data.obs.authenticated = false;
        Data.obs.message = 'AUTH_FAILED';
      });
    };


    socket.onSceneSwitch = function(sceneName: string) {
      console.log('scene switch', sceneName);
      assignActiveScene(sceneName);
    };

    socket.onSceneListChanged = function(data: any) {
      $rootScope.$apply(function() {
        Data.sceneList = data;
      });
    };

    socket.onStreamStatus = function(data: any) {
      $rootScope.$apply(function() {
        Data.streamStatus = data;
      });
    };


    var connect = function(address: string, password: string) {
      socket.connect(address, password);
    };

    var getCurrentScene = function() {
      socket.getCurrentScene(function(err: any, data: any) {
        if (err) {
          console.log('GetCurrentScene Error', err);
          return;
        }

        assignActiveScene(data.name);
      });
    };

    var setCurrentScene = function(sceneName: string) {
      socket.setCurrentScene(sceneName);
    };

    var getSceneList = function() {
      socket.getSceneList(function(err: any, data: any) {
        if (err) {
          console.log('GetSceneList Error', err);
          return;
        }

        $rootScope.$apply(function() {
          Data.sceneList = data.scenes;
        });

        assignActiveScene(data.currentScene);
      });
    };

    var getCurrentTransition = function() {
      socket.getCurrentTransition(function(err: any, data: any) {
        if (err) {
          console.log('getCurrentTransition Error', err);
          return;
        }

        assignActiveTransition(data.name);
      });
    };

    var setCurrentTransition = function(transitionName: string) {
      socket.setCurrentTransition(transitionName);
    };

    var getTransitionList = function() {
      socket.getTransitionList(function(err: any, data: any) {
        if (err) {
          console.log('getTransitionList Error', err);
          return;
        }

        $rootScope.$apply(function() {
          Data.transitionList = data.transitions;
        });

        assignActiveTransition(data.currentTransition);
      })
    }


    return {
      socket: socket,
      Data: Data,
      connect: connect,
      getCurrentScene: getCurrentScene,
      setCurrentScene: setCurrentScene,
      getCurrentTransition: getCurrentTransition,
      setCurrentTransition: setCurrentTransition
    }
  });
