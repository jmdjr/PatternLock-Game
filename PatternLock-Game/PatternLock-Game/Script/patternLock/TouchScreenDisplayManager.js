
define(['screen/Game', 'screen/Logo'], function (Game, Logo) {
    return {
        info: {
            top: 69,
            left: 27,
        },

        // more scenes here for title screen, pause etc...
        screenDisplays: [/*Logo,*/ Game],

        _displayIndex: 0,

        _dirtyDisplay: true,

        _CurrentDisplay: null,

        _display: null,

        preload: function (game) {
            var i = 0;
            while (i < this.screenDisplays.length) {
                this.screenDisplays[i].preload(game);
                ++i;
            }
        },

        create: function (game) {
            this._CurrentDisplay = this.screenDisplays[this._displayIndex];

            this._display = game.add.group();
            this._display.x = this.info.left;
            this._display.y = this.info.top;

            this.setupGraphics(game);
        },

        render: function (game) {
            if (this._CurrentDisplay && this._CurrentDisplay.render) {
                this._CurrentDisplay.render(game);
            }
        },

        setupGraphics: function (game) {
            this._display.removeAll();
            this._CurrentDisplay.create(game, this);
            this._display.add(this._CurrentDisplay.getDisplay(game));
            this._dirtyDisplay = false;
        },

        getDisplay: function () {
            return this._display;
        },

        shouldRefresh: function () {
            return this._dirtyDisplay;
        },

        setDisplay: function (index) {
            if (0 < index && index < this.screenDisplays.length) {
                this._CurrentDisplay = this.screenDisplays[index];
                this._displayIndex = index;
                this._dirtyDisplay = true;
            }
        },

        nextDisplay: function () {
            this.setDisplay(this._displayIndex + 1);
        },

        update: function (game) {
            if (this.shouldRefresh()) {
                this.setupGraphics(game);
            }
            if (this._CurrentDisplay.update) {
                this._CurrentDisplay.update(game);
            }
        }
    }
});