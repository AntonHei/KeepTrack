
function addGoal(id, parent, title, order = 0) {
    var curKey = window.btoa(id);

    var curValue = {
        'p': parent,
        't': title,
        'o': order,
    };

    curValueJSONString = JSON.stringify(curValue);

    var encodedValue = window.btoa(curValueJSONString);

    localStorage.setItem('GOAL-' + curKey, encodedValue);

    return true;
}

function removeGoal(id) {
    var curKey = window.btoa(id);

    localStorage.removeItem('GOAL-' + curKey);
}

function removeGoalRoot(id) {
    var curKey = window.btoa(id);

    localStorage.removeItem('GOALR-' + curKey);
}

function loadGoals() {
    var keys = Object.keys(localStorage);

    var curGoals = [];

    for(var i = 0; i < keys.length; i++) {
        if(keys[i].startsWith('GOAL-')) {
            //Is GOAL
            var curGoalEntry = {};

            var curKey = keys[i].substr(5);
            var curValue = localStorage.getItem(keys[i]);

            var curID = window.atob(curKey);
            var curDetails = JSON.parse(window.atob(curValue));

            curGoalEntry = {
                'id': curID,
                'parent': curDetails['p'],
                'title': curDetails['t'],
                'order': curDetails['o'],
            };
            curGoals.push(curGoalEntry);
        }
    }

    return curGoals;
}

function addGoalRoot(id, title, order = 0) {
    var curKey = window.btoa(id);

    var curValue = {
        't': title,
        'o': order,
    };

    curValueJSONString = JSON.stringify(curValue);

    var encodedValue = window.btoa(curValueJSONString);

    localStorage.setItem('GOALR-' + curKey, encodedValue);

    return true;
}

function loadGoalRoots() {
    var keys = Object.keys(localStorage);

    var curGoalRoots = [];

    for(var i = 0; i < keys.length; i++) {
        if(keys[i].startsWith('GOALR-')) {
            //Is GOAL
            var curGoalRootEntry = {};

            var curKey = keys[i].substr(6);
            var curValue = localStorage.getItem(keys[i]);

            var curID = window.atob(curKey);
            var curDetails = JSON.parse(window.atob(curValue));

            curGoalRootEntry = {
                'id': curID,
                'title': curDetails['t'],
                'order': curDetails['o'],
            };
            curGoalRoots.push(curGoalRootEntry);
        }
    }

    return curGoalRoots;
}
