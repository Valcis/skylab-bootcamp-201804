var $toDo = $('.toDo');

$('form').submit(function(event) {
    event.preventDefault();
    var $input = $('#desc'); //o var = $(this).find("input[type=text]")

    logic.addTask($input.val());

    $input.val("");

    toDo();

});

var $toDo_list, $done_list;

function toDo(){
    
    var arr_todo = logic.listTodos();

    if (arr_todo.length){
        $toDo.show();
        if (!$toDo_list) {
            $toDo_list = $('<ul class="list-group"></ul>');
            $toDo.append($toDo_list);
            $toDo_list.before("<h4>TO DO</h4>");
        }
    
        
        $toDo_list.empty();
    
        arr_todo.forEach(function(task) {
            var $taskItem = $('<li class="list-group-item d-flex justify-content-between align-items-center"></li>');
            var $button_check = $('<button class="btn-outline-success badge">✔</button>');
    
            $toDo_list.append($taskItem);
            $taskItem.append("<span>" + task.text + "</span>", $button_check);
    
            $button_check.click(function() {
                logic.markTaskDone(task.id);
    
                toDo();
                done();
                if (arr_todo.lenght === 0) $toDo.empty();
            });
    
        });

    } else {
        $toDo.hide();
    }
}   

var $done = $('.done');

function done(){
    var arr_done = logic.listDones();


    if(arr_done.length){
        $done.show();

        if (!$done_list) {
            $done_list = $('<ul class="list-group"></ul>');
            $done.append($done_list);
            $done_list.before("<h4>DONE</h4>");
        }
        
        $done_list.empty();
        
        arr_done.forEach(function(task) {
            var $taskItem = $('<li class="list-group-item d-flex justify-content-between align-items-center"></li>');
            var $button_remove = $('<button class="btn-outline-danger badge">✖</button>');
            
            $done_list.append($taskItem);
            $taskItem.append("<span>" + task.text + "</span>", $button_remove);
            
            $button_remove.click(function() {
                logic.removeTask(task.id);
                
                done();
                
            });
            
        });
    } else {
        $done.hide();
    }
        
}   

