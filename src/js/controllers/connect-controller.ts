interface ConnectControllerScope extends ng.IScope {
  address: string;
  password: string;

  connect(address: string, password: string): void;
}

app.controller(
  'ConnectController',
  function($scope: ConnectControllerScope, OBS: any) {
    $scope.address = '';
    $scope.password = '';

    $scope.connect = function() {
      OBS.connect($scope.address, $scope.password);
    };
  });
