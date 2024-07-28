
let alertError = document.querySelector("#liveToast2");
let alertSuccess = document.querySelector("#liveToast");
let ulDom = document.querySelector("#list");

let secildi=0;

document.addEventListener("DOMContentLoaded",loadTodos);  //sayfa yüklendiğinde todo lar gelecek

function loadTodos(){
    let todos=getFromLocalStorage();
    todos.forEach(function(todo){
        addItems(todo);
    })

}

function newElement(){
    let task = document.querySelector("#task");
    if( task.value && task.value.trim() !== ""){
        addItems(task.value);
        addTodoStorage(task.value);
        task.value = "";
        $(alertSuccess).toast('show');
        //showToast(alertSuccess);  //1. yol showToast fonksiyonu kullanılabilir class a show özniteliği eklenir ama close butonu çalışmaz
    }
    else{
        console.log("eleman eklenmedi");
        $(alertError).toast('show'); // 2. yol
    }
}



function addItems(task){
    let element = document.createElement("li");
    element.classList.add('list-group-item','d-flex', 'justify-content-between', 'align-items-center');
    element.innerHTML = ` <span id="text">${task}</span><button type="button" class ="sil px-2 ">x</button>`;

    let button = element.querySelector('.sil');
    button.addEventListener('click', function(event) {
        event.stopPropagation(); // Tıklama olayının liste öğesinin tıklama olayını tetiklemesini önle
        element.remove();
        removeTodoFromLocalStorage(task);
    });
    ulDom.appendChild(element);
    


    element.addEventListener('click', function(){
        
        let button = this.querySelector('.sil');
        let txt = this.querySelector("#text");
        if(!secildi){
            button.style.color = "white";
            element.style.backgroundColor="#246980";
            txt.style.color = "white";
            txt.style.textDecoration = "line-through";
            button.classList.remove("text-secondary");
            txt.classList.remove("text-secondary");
            secildi=1;
        }
        else{
            button.classList.add("text-secondary");
            element.style.background="none";
            txt.classList.add("text-secondary")
            txt.style.textDecoration = "none";
            secildi=0;
        }
       
        button.style.textDecoration = "none"; 
        
    });
  
}

function getFromLocalStorage() {       //todoları storage dan alma
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoStorage(task){
    let todos = getFromLocalStorage();
    todos.push(task);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function removeTodoFromLocalStorage(task) {
    let todos = getFromLocalStorage();
    todos = todos.filter(todo => todo !== task);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function showToast(element) {
    element.classList.remove("hide");
    element.classList.add("show");
  }

