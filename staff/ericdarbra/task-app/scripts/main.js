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


/* $('#login_form').on('submit', function(e) { //use on if jQuery 1.7+
    e.preventDefault();  //prevent form from submitting
    var data = $("#login_form :input").serializeArray();
    console.log(data); //use the console for debugging, F12 in Chrome, not alerts
}); */

/* // TODO implement the presentation logic

$('#form-id').submit(function (e) {
    e.preventDefault();

    var $input = $(this).find('input[type=text]');
    var data = $($input).val();

    logic.addTask(data);

    $($input).val(''); // vaciar el input
     refresh();

    // PINTAR LISTADO

    $('#todo-list').append('<li>' + data + ' <button class="done" data-id="' + id + '"> &check;</button>' + '</li>');

});

$('#todo-list').on('click', '.done', function (e) {
    var id = $(this).data("id");
    logic.markTaskDone(Number(id))

    var item = $(this).closest("li");
    $(this).closest("li").remove();

})
 */