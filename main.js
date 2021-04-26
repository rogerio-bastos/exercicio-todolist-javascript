"use strict"


let taskData = [];

const getData = () => JSON.parse(localStorage.getItem("taskList")) ?? [];
const setData = (data) => localStorage.setItem("taskList", JSON.stringify(data)); 

const taskCreate = (task, checked, index) => {
    const div = document.createElement("div");
    div.setAttribute("id", "task");
    div.innerHTML = ` 
        <input type= "checkbox" ${checked} data-index=${index}>
        <p>${task}</p>
        <input type="button" value="" data-index="${index}"> 
    `;
    document.querySelector("main").appendChild(div);
}

const cleanTask = () =>{
    const main = document.querySelector("main");
    while (main.firstChild){
        main.removeChild(main.lastChild);
    }
}

const loadTasks = () =>{
    cleanTask();
    const taskData = getData();
    taskData.forEach((item, index) => taskCreate(item.task, item.checked, index));
}

const insertTask = (event) =>{
   const key = event.key;
   const typedTask = event.target.value;
  
   if(key === "Enter"){
        if(typedTask != ""){
            const taskData = getData();
            taskData.push({"task": typedTask, "checked": ""});
            setData(taskData);
            loadTasks();
            event.target.value = "";
        }else{
            alert ("Any Task Typed, Please Type A New Task");
       }
   }
    
}
const removeTask = (index) => {
    const taskData = getData();
    taskData.splice (index, 1);
    setData(taskData);
    loadTasks();
}

const updateTask = (index) => {
    const taskData = getData();
    taskData[index].checked = taskData[index].checked == "checked" ? "" : "checked";
    setData(taskData);
    loadTasks();
}

const clickTask = (event) => {
    const element = event.target;   
    if(element.type === "button"){
        const index = element.dataset.index;
        removeTask(index);
    }else if(element.type === "checkbox"){
        const index = element.dataset.index;
        updateTask(index);
    }
}

document.querySelector("input").addEventListener("keypress", insertTask);
document.querySelector("main").addEventListener("click", clickTask);

loadTasks();














