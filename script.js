//getting required elements 
const input=document.querySelector(".inputfield input")
const addBtn=document.querySelector(".inputfield button")
const todolist=document.querySelector(".wrapper ul")
const deleteall=document.querySelector(".footer button")


input.onkeyup=()=>{
    let userdata=input.value //getting user entered value
    if(userdata.trim()!=0){  //if user values aren't only spaces
        addBtn.classList.add("active") //active the add button
    }
    else{
        addBtn.classList.remove("active")  //disable the add button
    }
}

showtasks()



//if user click on the add button
addBtn.onclick=()=>{
    let userdata=input.value //getting user entered value
    let getlocalstorage=localStorage.getItem("New Todo")
    if(getlocalstorage == null){
        listarr=[] //creating empty array
    }
    else{
        listarr=JSON.parse(getlocalstorage) //transforming json string to js object 
    }
    listarr.push(userdata) //pushing or adding user data
    localStorage.setItem("New Todo",JSON.stringify(listarr)) // transorfming js object to json string
    showtasks()

}


//display all to do list 
function showtasks(){
    let getlocalstorage=localStorage.getItem("New Todo") //getting local storage
    if(getlocalstorage == null){   //if local storage is null
        listarr=[] //creating empty array
    }
    else{
        listarr=JSON.parse(getlocalstorage) //transforming json string to js object 
    }
    const pendingno=document.querySelector(".pendingno")
    pendingno.textContent=listarr.length
    if(listarr.length>0)
    {
        deleteall.classList.add("active2")
    }
    else{
        deleteall.classList.remove("active2")
    }

    let tag=``
    listarr.forEach((element,index) => {
        tag+=`<li> ${element} <span onclick="deletetask(${index})"><i class="fas fa-trash"></i></span></li>`
    });
    todolist.innerHTML=tag  //adding new li tag inside ul tag
    input.value=""
}

//delete a particular todo list item

function deletetask(index){
    let getlocalstorage=localStorage.getItem("New Todo")
    listarr=JSON.parse(getlocalstorage) 
    listarr.splice(index,1)
    localStorage.setItem("New Todo",JSON.stringify(listarr))
    showtasks()
}




//delete all to do list items
deleteall.onclick=()=>{
    listarr=[]
    localStorage.setItem("New Todo",JSON.stringify(listarr))
    showtasks()
}