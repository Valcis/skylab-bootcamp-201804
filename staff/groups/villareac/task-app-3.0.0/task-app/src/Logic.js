const Logic =function () {
    const tasks=[]
    class Task{
        constructor(text){
            this.text=text,
            this.id=Date.now(),
            this.done=false
    
        }
    
        addTask(text){
            let task=new Task(text)
            tasks.push(task)
        }
        listToDos(){
            return tasks.filter(function(task){
                return !task.done
            })
        }
        listDones(){
            return tasks.filter(function(task){
                return task.done
            })
        }

        markTaskDone(id){
            let task= tasks.find(function(){
                if (task.id === id) {
                    return task                    
                }
            })
            task.done=true
        }

        removeTask(id){
            let taskIndex
            let task=tasks.find(function(task, index){
                if (task.id=== id) {
                    taskIndex=index

                    return task
                }
            })
            tasks.splice(taskIndex, 1) 
        }

        
    }
    
}


export default Logic