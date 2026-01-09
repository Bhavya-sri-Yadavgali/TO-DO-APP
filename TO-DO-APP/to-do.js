document.addEventListener('DOMContentLoaded',()=>{
    const todoinput = document.getElementById('todo-input') ;
const addbutton = document.getElementById('add-task-btn') ;
const todolist = document.getElementById('todo-list');

let tasks =  JSON.parse(localStorage.getItem('tasks')) || [] ;
tasks.forEach(task=>renderTasks(task))
addbutton.addEventListener('click',()=>{
    const task = todoinput.value.trim() ;
    if(task === ""){
        return ;
    }
    const newTask = {
        id:Date.now(),
        text:task,
        completed:false
    }
    if(tasks.some((e)=>e.text === newTask.text)){
        alert(`TASK WITH THE NAME ${newTask.text} ALREADY EXISTS`) ;
        todoinput.value = "" ;
        return ;
    }
    tasks.push(newTask) ;
    saveTasks() ;//updates the whole thing **gFK
    renderTasks(newTask) ;
    todoinput.value = "" ;
    console.log(tasks);
    
})
function renderTasks(task){
 const li = document.createElement('li') ;
 li.setAttribute('data-id',task.id);
 if(task.completed){
    li.classList.add('completed') ;
 }
 li.innerHTML = `<span>${task.text}</span>
 <button>delete</button>` ;
 li.addEventListener('click',(e)=>{
    if(e.target.tagName === 'BUTTON'){
        return ;
    }
    task.completed = !task.completed ;
    li.classList.toggle('completed') ;
    saveTasks() ;
 })

 li.querySelector('button').addEventListener('click',(e)=>{
    e.stopPropagation() ;//event bubblig up
    //prevent toggle from firing
    tasks = tasks.filter(t => t.id != task.id)
    li.remove();
    saveTasks() ;
 })
 todolist.appendChild(li) ;
}
function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks)) ;
}
})