
// Runtime

function frontend_addGoalRoot(id, title, order) {
    var goalKeeper = $('#goalKeeper');
    var goalTargetRoot = goalKeeper.find('.parent[data-id="' + id + '"]');

    if (goalTargetRoot.length <= 0) {

        var newGoalRoot = $('<div>');
        newGoalRoot.attr('class', 'parent cardRoot');
        newGoalRoot.attr('data-id', id);
        newGoalRoot.attr('data-order', order);

        var newGoalRootContentTitle = $('<span class="title root" style="display: inline-block; font-size: 20px; font-weight: 700; margin: 10px 0 25px 0;" onclick="frontend_onEditGoalRootTitle(this);">' + title + '</span>');
        var newGoalRootContentInput = $('<input class="title edit root" type="text" value="' + title + '" style="display: none; font-size: 20px; font-weight: 700; margin: 10px 0 25px 0;">');

        newGoalRoot.html(newGoalRootContentTitle);
        newGoalRoot.append(newGoalRootContentInput);

        goalKeeper.append(newGoalRoot);

        return true;

        //Hook Events
        frontend_hookEvents();
    }
    return false;
}

function frontend_loadGoalRoots(curGoalRoots) {
    curGoalRoots = curGoalRoots.sort(dynamicSort('order'));

    for (let i = 0; i < curGoalRoots.length; i++) {
        frontend_addGoalRoot(curGoalRoots[i]['id'], curGoalRoots[i]['title'], curGoalRoots[i]['order']);
    }
}


function frontend_addGoal(id, parent, title, order) {
    var goalKeeper = $('#goalKeeper');
    var goalTargetParent = goalKeeper.find('.parent[data-id="' + parent + '"]');

    var newGoal = $('<div>');
    newGoal.attr('class', 'goal card');
    newGoal.attr('data-id', id);
    newGoal.attr('data-parent', parent);
    newGoal.attr('data-order', order);

    var newGoalContentTitle = $('<span class="title" onclick="frontend_onEditGoalTitle(this);">' + title + '</span>');
    var newGoalContentInput = $('<input class="title edit" type="text" value="' + title + '" style="display: none;">');

    newGoal.html(newGoalContentTitle);
    newGoal.append(newGoalContentInput);

    goalTargetParent.append(newGoal);

    //Hook Events
    frontend_hookEvents();
}

function frontend_loadGoals(curGoals) {
    curGoals = curGoals.sort(dynamicSort('order'));

    for (let i = 0; i < curGoals.length; i++) {
        frontend_addGoal(curGoals[i]['id'], curGoals[i]['parent'], curGoals[i]['title'], curGoals[i]['order']);
    }
}

function frontend_loadMisc() {
    var goalKeeper = $('#goalKeeper');
    var goalKeeperParents = $('#goalKeeper .parent');

    // Add new Goal
    for (let i = 0; i < goalKeeperParents.length; i++) {
        let addNewButton = $('<button>');
        addNewButton.attr('id', 'addGoal');
        addNewButton.attr('class', 'add');
        addNewButton.attr('data-parent', goalKeeperParents.eq(i).attr('data-id'));
        addNewButton.attr('onclick', 'frontend_onAddNewGoal(this);');
        addNewButton.html('<span class="material-icons md-light white m_center">add</span>');

        goalKeeperParents.eq(i).append(addNewButton);
    }

    // Add new GoalRoot
    let addNewButton = $('<div>');
    addNewButton.attr('id', 'addGoalRoot');
    addNewButton.attr('class', 'add');
    addNewButton.html('<button onclick="frontend_onAddNewGoalRoot(this);"><span class="material-icons md-light white m_center">add</span></button>');

    goalKeeper.append(addNewButton);
}

/* Events */

function frontend_hookEvents() {
    $('.goal input.title.edit').on('blur', function(e) {
        frontend_onEditEndGoalTitle(this);
    });
    $('.goal input.title.edit').on('keydown', function(e) {
        //Enter
        if(e.keyCode == 13) {
            if($('.goal input.title.edit').is(':focus')) {
                frontend_onEditEndGoalTitle(this);
            }
        }
    });

    $('.parent input.title.edit.root').on('blur', function(e) {
        //frontend_onEditEndGoalTitle(this);
        frontend_onEditEndGoalRootTitle(this);
    });
    $('.parent input.title.edit.root').on('keydown', function(e) {
        //Enter
        if(e.keyCode == 13) {
            if($('.parent input.title.edit.root').is(':focus')) {
                frontend_onEditEndGoalRootTitle(this);
            }
        }
    });
}

/* Edit: GoalRoot */

function frontend_onEditGoalRootTitle(el) {
    var targetID = $(el).attr('data-id');
    var goalKeeperParent = $(el).parent('.parent');

    var titleInput = goalKeeperParent.find('input.title.edit').first();

    $(el).hide();

    titleInput.show();
    titleInput.select();
    titleInput.focus();
}

function frontend_onEditEndGoalRootTitle(el) {
    var goalKeeperParent = $(el).parent('.parent');

    var targetID = goalKeeperParent.attr('data-id');

    var title = goalKeeperParent.find('.title.root:not(.edit)');
    var titleInput = goalKeeperParent.find('input.title.edit.root').first();

    title.show();
    titleInput.hide();

    var newTitle = titleInput.val();

    if (newTitle.trim() !== "") {
        addGoalRoot(targetID, newTitle, goalKeeperParent.attr('data-order'));
    }else{
        removeGoalRoot(targetID);
    }

    frontend_update();
}

/* Edit: Goal */

function frontend_onEditGoalTitle(el) {
    var targetParentID = $(el).attr('data-parent');
    var goalKeeperParent = $(el).parent('.parent');

    var targetGoal = $(el).parent('.goal');
    var goalID = targetGoal.attr('data-id');

    var titleInput = targetGoal.find('input.title.edit');

    $(el).hide();

    titleInput.show();
    titleInput.select();
    titleInput.focus();
}

function frontend_onEditEndGoalTitle(el) {
    var goalKeeperParent = $(el).parent('.parent');

    var targetGoal = $(el).parent('.goal');
    var goalID = targetGoal.attr('data-id');
    var targetParentID = targetGoal.attr('data-parent');

    var title = targetGoal.find('.title:not(.edit)');
    var titleInput = targetGoal.find('.title.edit');

    title.show();
    titleInput.hide();

    var newTitle = titleInput.val();

    if (newTitle.trim() !== "") {
        addGoal(goalID, targetParentID, newTitle, targetGoal.attr('data-order'));
    }else{
        removeGoal(goalID);
    }

    frontend_update();
}

function frontend_onAddNewGoal(el) {
    var targetParentID = $(el).attr('data-parent');
    var goalKeeperParent = $(el).parent('.parent');

    var lastGoalOrder = 0;
    if (goalKeeperParent.length > 0) {
        lastGoalOrder = goalKeeperParent.find('card').last().attr('data-order');
    }

    var newGoalID = getRandomID(24);

    addGoal(newGoalID, targetParentID, 'Neues Ziel', (lastGoalOrder + 1));

    frontend_update();
}

function frontend_onAddNewGoalRoot(el) {
    var newGoalRootID = getRandomID(24);
    var goalKeeperParent = $(el).parent('.parent');

    var lastGoalRootOrder = 0;
    if (goalKeeperParent.length > 0) {
        lastGoalRootOrder = goalKeeperParent.last().attr('data-order');
    }

    addGoalRoot(newGoalRootID, 'Neue Kategorie', (lastGoalRootOrder + 1));

    frontend_update();
}

function frontend_clear() {
    $('#goalKeeper').html('');
}

function frontend_updateWrapper() {
    var wrapper = $('.wrapper');
    var children = $('#goalKeeper').children();
    var neededWidth = 0;

    for (let i = 0; i < children.length; i++) {
        neededWidth += children.width();
        neededWidth += parseFloat(children.css('margin-left'));
        neededWidth += parseFloat(children.css('margin-right'));
    }

    wrapper.css({'width': neededWidth + 'px'});
}

function frontend_update() {
    frontend_clear();

    var curGoalRoots = loadGoalRoots();
    frontend_loadGoalRoots(curGoalRoots);

    var curGoals = loadGoals();
    frontend_loadGoals(curGoals);

    frontend_loadMisc();

    frontend_updateWrapper();
}
