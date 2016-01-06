requirejs.config({
    baseUrl: 'Script/',
    paths: {
        game: 'patternLock',
        screen: 'patternLock/ScreenDisplays',
        control: 'patternLock/Controls'
    }
});

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    //active: function () { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        families: ['Audiowide']
    }
};

requirejs(['PatternLockGame']);