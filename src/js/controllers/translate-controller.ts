interface TranslateControllerScope extends ng.IScope {
  language: {key: string, name: string};
  languages: Array<{key: string, name: string}>;

  changeLanguage(): void;
}

app.controller(
  'TranslateController',
  function($scope: TranslateControllerScope, $translate: any) {
    $scope.languages = [
      {key: 'en', name: 'English'},
      {key: 'es', name: 'Español'},
      {key: 'fr', name: 'Français'},
      {key: 'de', name: 'Deutsch'}
    ];

    $scope.language = $scope.languages[0];

    $scope.$watch('language', function() {
      $translate.use($scope.language.key);
    });
  });

app.config(function($translateProvider: any) {
  $translateProvider.useStaticFilesLoader({
    prefix: './locale/locale-',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy(null);
});
