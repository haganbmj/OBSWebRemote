var app = angular.module('app', ['pascalprecht.translate', 'angular-themer']);

app.config(function(themerProvider: any) {
  var styles = [
    { key: 'LIGHT', label: 'Light Theme', href: ['./css/light-theme.css']},
    { key: 'DARK', label: 'Dark Theme', href: ['./css/dark-theme.css']},
    { key: 'NONE', label: 'None', href: ['./css/none-theme.css']}
  ];

  themerProvider.storeTheme(true);
  themerProvider.setStyles(styles);

  var selected = themerProvider.getStoredTheme() || styles[0].key;
  themerProvider.setSelected(selected);
});

// Shamelessly borrowed from: http://stackoverflow.com/a/30767487
app.filter('secondsToTime', function() {

    function padTime(t: number) {
        return t < 10 ? "0"+t : t;
    }

    return function(_seconds: number) {
        if (typeof _seconds !== "number" || _seconds < 0)
            return "00:00:00";

        var hours = Math.floor(_seconds / 3600),
            minutes = Math.floor((_seconds % 3600) / 60),
            seconds = Math.floor(_seconds % 60);

        return padTime(hours) + ":" + padTime(minutes) + ":" + padTime(seconds);
    };
});
