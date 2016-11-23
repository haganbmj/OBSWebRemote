interface UIControllerScope extends ng.IScope {
  data: {
    version: Object,
    streamStatus: Object,
    sceneList: Object,
    activeScene: {
      name: string,
      sources: Object
    },
    transitionList: Object,
    activeTransition: {
      name: string
    }
  };

  getCurrentScene(): void;
  isActiveScene(scene: any): void;
  changeScene(sceneName: string): void;

  getCurrentTransition(): void;
  isActiveTransition(transition: any): void;
  changeTransition(transitionName: string): void;
}

app.controller(
  'UIController',
  function($scope: UIControllerScope, $translate: any, OBS: any, $timeout: ng.ITimeoutService) {
    $scope.data = OBS.Data;

    $scope.getCurrentScene = function() {
      OBS.getCurrentScene();
    };

    $scope.isActiveScene = function(scene: any) {
      return ($scope.data.activeScene.name == scene.name);
    };

    $scope.changeScene = function(sceneName: string) {
      OBS.setCurrentScene(sceneName);
    };

    $scope.getCurrentTransition = function() {
      OBS.getCurrentTransition();
    };

    $scope.isActiveTransition = function(transition: any) {
      return ($scope.data.activeTransition.name == transition.name);
    };

    $scope.changeTransition = function(transitionName: string) {
      OBS.setCurrentTransition(transitionName);
    }
  });
