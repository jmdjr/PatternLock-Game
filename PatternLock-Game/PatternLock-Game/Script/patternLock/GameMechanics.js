define([], function () {
    return {
        defaults: {
            rows: 3,
            columns: 3,
            minimumSolution: 4,
            maximumSolution: 9,
            maxTries: 20,
            SolutionLength: 4,
            showPatternRelativePosition: true,

            directions: [
                { x: 0, y: -1 },    //north
                { x: 0, y: 1 },     //south
                { x: 1, y: 0 },     //east
                { x: -1, y: 0 }     //west
            ],

            compass: {
                north: 0,
                south: 1,
                east: 2,
                west: 3
            },

            states: {
                correct: 'correct',
                before: 'before',
                after: 'after',
                close: 'close',
                wrong: 'wrong'
            }
        },

        activeList: [],         //The active list of nodes. these nodes are currently being 
        solutionList: [],
        userList: [],           // The list of nodes 
        nodeElementsList: [],   // The list of all buttons.

        _gatherNodeList: function () {
        },

        initialize: function () {
            this._gatherNodeList();
        },

        handleNodeClick: function () {
            // if node is the first in the 
        },
    }
});


/*
p.initialize = function (options) {
    this.gatherNodeList();


    var game = this;
    this._gameButtons().on('mousedown', function (e) {
        var node = $(this).data('node');
        if (!game._nodeIsInList(node, game.activeList) && game._testNodePossibility(node)) {
            game._clearNodeElementsState();
            game.activeList.push(node);
            game._gameUserLines().empty();
            game.drawPaths(game.activeList, game._gameUserLines());
        }
    });

    this._gameFrame().find('.submit-pattern').on('click', function () {
        if (game.activeList.length > 0) {
            game.userList = game.activeList;
            game.checkForWin(game.userList, game.solutionList);
            game.appendToHistory(game.userList);
            game._clearActiveList();
            game._updateScore();
            game._gameUserLines().empty();
        }
    });

    this._gameFrame().find('.reveal-pattern').on('click', function () {
        game.drawPaths(game.solutionList, game._gameSolutionLines());
    });

    this._gameFrame().find('.clear-pattern').on('click', function () {
        game._clearActiveList();
    });

    this._gameFrame().find('.restart-game').on('click', function () {
        game._startGameSequence();
    });

    this._startGameSequence();

}

p._clearNodeElementsState = function () {
    $.each(this.nodeElementsList, this._clearNodeElementState);
}

p._clearActiveList = function () {
    this.activeList = [];
    this._gameUserLines().empty();
    this._gameDebug().append('<br/>Pattern Cleared');
}

p._clearHistory = function () {

}

p._startGameSequence = function () {
    this.solutionList = this.generatePath(); // generates a path, which is stored in the activeList
    this.defaults.SolutionLength = this.solutionList.length;

    this._gameDebug().empty();
    this._gameDebug().append('New Game!');
    this._gameDebug().append("<br/>Number of Nodes in Solution: " + this.defaults.SolutionLength);
    this._clearNodeElementsState();
    this._clearActiveList();
    this._gameUserLines().empty();
    this._gameSolutionLines().empty();
    this._gameHistory().empty();
    this.historyList = [];
    this._updateScore();
}

p._clearNodeElementState = function (index, element) {
    $(element).removeClass();
    $(element).addClass('button');
};

p._updateScore = function () {
    var d = this.defaults;
    this._gameScore().text('Tries Remaining: ' + (d.maxTries - this.historyList.length));
}

p._gameBoard = function () { return $(this.context); }
p._gameHeader = function () { return this._gameBoard().find('.header-frame'); }
p._gameFrame = function () { return this._gameBoard().find('.game-frame'); }
p._gameHistory = function () { return this._gameBoard().find('.history-frame'); }
p._gameTitle = function () { return this._gameHeader().find('.title'); }
p._gameScore = function () { return this._gameHeader().find('.score'); }
p._gameSolutionLines = function () { return this._gameFrame().find('.solution-lines'); }
p._gameUserLines = function () { return this._gameFrame().find('.attempt-lines'); }
p._gameButtons = function () { return this._gameFrame().find('.button'); }

p._gameDebug = function () { return this._gameBoard().find('.debug-box'); }

p.gatherNodeList = function () {
    this.nodeElementsList = this._gameButtons();

    var index = 0;
    while (index < this.nodeElementsList.length) {
        var item = this.nodeElementsList[index];
        var x = index % this.defaults.columns;
        var y = Math.floor(index / this.defaults.rows);
        var node = new GameNode(x, y);
        $(item).data('node', node);
        //$(item).html('<div style="margin: 15px 0px 0px 1px;">x:' + node.x + '||y:' + node.y +  '</div>');// Debug

        ++index;
    }
}

p.generatePath = function () {
    var d = this.defaults;
    var max = d.cells > d.maximumSolution ? d.maximumSolution : d.cells;
    var snodes = (Math.floor(Math.random() * (max - d.minimumSolution + 1)) + d.minimumSolution);
    var startX = Math.floor(Math.random() * d.columns);
    var startY = Math.floor(Math.random() * d.rows);
    this.activeList = [];
    this.activeList.push(new GameNode(startX, startY));

    var i = 1;

    var firstNode = this.activeList[0];
    var lastNode = this._getRandomNextNode();

    while (i < snodes && firstNode != lastNode) {
        if (!this._nodeIsInList(lastNode, this.activeList)) {
            this.activeList.push(lastNode);
            ++i;
        }

        lastNode = this._getRandomNextNode();
    }

    if (firstNode == lastNode && i != snodes) {
        //this._gameDebug().append("<div>node count: " + snodes + ". ended on last node: " + this._nodeText(lastNode) + "</div>") //debug
    }

    return this.activeList;
};
p._getRandomNextNode = function () {
    var currentNode = this.activeList[this.activeList.length - 1];
    var possibleNodes = this._possibleNodes(currentNode);
    var nextNode = null;

    while (nextNode == null) {
        var pnodeIndex = Math.floor(Math.random() * possibleNodes.length);
        var pnode = possibleNodes[pnodeIndex];

        if (this._nodeIsInList(pnode, this.activeList)) {
            if (possibleNodes.length == 1) {
                nextNode = this.activeList[0];
            }
            else {
                possibleNodes.splice(pnodeIndex, 1);
            }
        }
        else {
            nextNode = pnode;
        }
    }

    return nextNode;
}

p._sameNode = function (nodeA, nodeB) {
    return nodeA.x == nodeB.x && nodeA.y == nodeB.y;
}

p._nodeIsInList = function (node, list) {
    var i, test = false;

    for (i = 0; i < list.length && !test; ++i) {
        if (this._sameNode(node, list[i])) {
            return true;
        }
    }

    return false;
}

p._nodeIsInBounds = function (node) {
    return !(node.x >= this.defaults.columns || node.x < 0
        || node.y >= this.defaults.rows || node.y < 0);
}

p._addNodes = function (nodeA, nodeB) {
    return new GameNode(nodeA.x + nodeB.x, nodeA.y + nodeB.y);
}

p._testNodePossibility = function (node) {
    var al = this.activeList;
    return this._nodeIsInBounds(node) && (al.length > 0 ? this._nodeIsInList(node, this._possibleNodes(al[al.length - 1])) : true);
}

p._possibleNodes = function (node) {
    var possibleNodes = [];
    //manually look in all directions.
    var d = this.defaults.directions, c = this.defaults.compass;

    var newNode = this._addNodes(node, d[c.north]);
    if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

    newNode = this._addNodes(node, d[c.south]);
    if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

    newNode = this._addNodes(node, d[c.east]);
    if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

    newNode = this._addNodes(node, d[c.west]);
    if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

    newNode = this._addNodes(this._addNodes(node, d[c.north]), d[c.east]);
    if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

    newNode = this._addNodes(this._addNodes(node, d[c.north]), d[c.west]);
    if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

    newNode = this._addNodes(this._addNodes(node, d[c.south]), d[c.east]);
    if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

    newNode = this._addNodes(this._addNodes(node, d[c.south]), d[c.west]);
    if (this._nodeIsInBounds(newNode)) possibleNodes.push(newNode);

    return possibleNodes;
}

p.drawPaths = function (list, container) {
    var i = 0;
    var item = null;

    container.empty();
    while (i < list.length - 1) {
        item = this._lineFromNodeToNode(list[i], list[i + 1]);
        container.append(item);
        ++i;
    }
}

p._lineFromNodeToNode = function (nodeA, nodeB) {
    var itemA = this._getNodeElement(nodeA);
    var itemB = this._getNodeElement(nodeB);
    var positionA = itemA.offset();
    var positionB = itemB.offset();

    var line = $('<div class="path-line"></div>');

    var AxEqBx = nodeA.x == nodeB.x;
    var AyEqBy = nodeA.y == nodeB.y;
    var AxGtBx = nodeA.x > nodeB.x;
    var AyGtBy = nodeA.y > nodeB.y;
    var AxLtBx = nodeA.x < nodeB.x;
    var AyLtBy = nodeA.y < nodeB.y;

    var rotate = 0;
    if (AxEqBx && AyGtBy) { rotate = -90; }
    else if (AxEqBx && AyLtBy) { rotate = 90; }
    else if (AxGtBx && AyEqBy) { rotate = 180; }
    else if (AxLtBx && AyEqBy) { rotate = 0; }
    else if (AxGtBx && AyGtBy) { rotate = -135; }
    else if (AxGtBx && AyLtBy) { rotate = 135; }
    else if (AxLtBx && AyGtBy) { rotate = -45; }
    else if (AxLtBx && AyLtBy) { rotate = 45; }

    var width = Math.sqrt(Math.pow(positionB.left - positionA.left, 2) + Math.pow(positionB.top - positionA.top, 2));

    positionA.top;

    var top = positionA.top - this._gameHeader().height() - 12; // 6 being the two borders width together
    var left = positionA.left + Math.floor(itemA.width() / 2) - 12; // 6 being the two borders width together
    line.css({
        top: top,
        left: left,
        width: width,
        transform: "rotate(" + rotate + "deg)"
    });

    return line;
}

p._getNodeElement = function (nodeA) {
    var i = 0, element = null, item = null;
    var list = this.nodeElementsList;
    var item;
    while (i < list.length && element == null) {
        item = list[i];

        if (this._sameNode(nodeA, $(item).data('node'))) {
            return $(item);
        }
        ++i;
    }
}

p.simulateUserAttempt = function () {
    this.userList = this.generatePath();
    this.drawPaths(this.userList, this._gameUserLines());
    this.checkForWin(this.userList, this.solutionList);
    this.appendToHistory(this.userList);

    this.activeList = [];
    this._updateScore();
}

p.checkForWin = function (attemptList, solutionList) {
    this._markNodes(attemptList, solutionList);
    this._clearNodeElementsState();

    var i = 0;
    var allGreen = true; // optimism
    while (i < attemptList.length) {
        var node = attemptList[i];
        var nodeElement = this._getNodeElement(node);

        if (node.state) {
            nodeElement.addClass(node.state);
            allGreen = allGreen && node.state == this.defaults.states.correct;
        }

        ++i;
    }

    if (allGreen) {
        this._gameDebug().append("<br/> You have won the game! press new game to play again!");
    }
}

p._markNodes = function (attemptList, solutionList) {
    var i = 0;

    while (i < attemptList.length) {
        this._markNode(attemptList[i], i, solutionList);
        ++i;
    }
}

p._markNode = function (node, position, solutionList) {
    node.state = this._relativeNodePositionState(node, position, solutionList);
}

p._relativeNodePositionState = function (attemptNode, position, solutionList) {

    var d = this.defaults;

    var previousList = solutionList.slice(0, position);
    if (this._nodeIsInList(attemptNode, previousList)) {
        if (!d.showPatternRelativePosition) {
            return d.states.close;
        }
        return d.states.before;
    }

    var afterList = solutionList.slice(position + 1);
    if (this._nodeIsInList(attemptNode, afterList)) {
        if (!d.showPatternRelativePosition) {
            return d.states.close;
        }
        return d.states.after;
    }

    var solutionNode = solutionList[position];
    if (position < this.solutionList.length && this._sameNode(attemptNode, solutionNode)) {
        return d.states.correct;
    }

    return d.states.wrong;
}

p.appendToHistory = function (list) {
    var tryNumber = $('<div onclick="histroyReplay(this)" class="try-replay"></div>');
    var attempts = this._gameHistory().find('.try-replay');

    tryNumber.text('try #' + (attempts.length + 1));
    tryNumber.data('historyIndex', attempts.length);
    this.historyList.push(list);

    this._gameHistory().append(tryNumber);
}

p.replayPath = function (historyIndex) {
    if (historyIndex < this.historyList.length) {
        this.drawPaths(this.historyList[historyIndex], this._gameUserLines());
        this.checkForWin(this.historyList[historyIndex], this.solutionList);
    }
}

*/