'use strict';

// TODO implement the presentation logic

var $form = $('form');

$form.submit(function(e) {
    e.preventDefault();

    // var $input = $(this).find('input');
    var $input = $(this).find('input[type=text]');

    var text = $input.val();

    logic.addTask(text);

    $input.val('');

    refresh();
});

function refresh() {
    listTodos();

    listDones();
}

var $todosTitle, $todosList;

function listTodos() {
    if (!$todosTitle) {
        $todosTitle = $('<h2>todo\'s</h2>');

        $form.after($todosTitle);
    }

    if (!$todosList) {
        $todosList = $('<ul></ul>');

        $todosTitle.after($todosList);
    }

    $todosList.empty();

    var todos = logic.listTodos();

    if (todos.length) {
        $todosTitle.show();
        $todosList.show();

        todos.forEach(function(task) {
            var $taskItem = $('<li></li>');
    
            $taskItem.append(task.text);
    
            var $taskButton = $('<button>V</button>');
    
            $taskButton.click(function() {
                logic.markTaskDone(task.id);
    
                refresh();
            });
    
            $taskItem.append($taskButton);
    
            $todosList.append($taskItem);
        });
    } else {
        $todosTitle.hide();
        $todosList.hide();
    }
}

var $donesTitle, $donesList;

function listDones() {
    if (!$donesTitle) {
        $donesTitle = $('<h2>done\'s</h2>');

        $todosList.after($donesTitle);
    }

    if (!$donesList) {
        $donesList = $('<ul></ul>');

        $donesTitle.after($donesList);
    }

    $donesList.empty();

    var dones = logic.listDones();

    if (dones.length) {
        $donesTitle.show();
        $donesList.show();

        dones.forEach(function(task) {
            var $taskItem = $('<li></li>');
    
            $taskItem.append(task.text);
    
            var $taskButton = $('<button>X</button>');
    
            $taskButton.click(function() {
                logic.removeTask(task.id);
    
                listDones();
            });
    
            $taskItem.append($taskButton);
    
            $donesList.append($taskItem);
        });
    } else {
        $donesTitle.hide();
        $donesList.hide();
    }
}