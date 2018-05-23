$('form').submit(function(event){
    event.preventDefault();

    $('p').hide()
    
    var $input= $(this).find('input[type=text]')

    var newTaskDesc= $input.val();
    
    try{
    var idAddedTask= logic.addTask(newTaskDesc);

    $('.toDo').find('ul').append(
        '<li class="row"><span class="col">'+newTaskDesc+'</span><button class="done btn btn-outline-success col-sm-1 mt-1 mr-1" data-id='+idAddedTask+'>👌🏻</button></li>'
        
    )
    }catch(err){
        $('h1').after('<p>'+err.message+'</p>')
    }

    $input.val('') //resetea el input
    
})

$('.toDo').on('click','.done' ,function(event){
    var idTaskToDelete= $(this).data('id');
    var taskToDeleteDesc= $(this).prev('span').text();
    
    logic.markTaskDone(idTaskToDelete);

    $('.doneTasks').find('ul').append(
        '<li class="row"><span class="col">'+taskToDeleteDesc+'</span><button class="toDelete btn btn-outline-danger col-sm-1 mt-1 mr-1" data-id='+idTaskToDelete+'>🚫</button></li>'
    )


    $(this).closest('li').remove();


    logic.removeTask(idTaskToDelete);

})

$('.doneTasks').on('click', '.toDelete', function(event){
  
    $(this).closest('li').remove();

})