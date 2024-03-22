const cl=console.log;

const todoForm=document.getElementById("todoForm");
const todoControl=document.getElementById("todoItem");
const todoContainer=document.getElementById("todoContainer");
const updateBtn=document.getElementById("updateBtn");
const submitBtn=document.getElementById("submitBtn");
const skillList=document.getElementById("skillList");



let todoArr=[];

const onDelete=(d)=>{
	let getConfirm=confirm(`Are you sure,you want to remove this Todo Item?`);
	cl(getConfirm)
	if(getConfirm===true){
		let deleteId=d.closest("li").id;
		cl(deleteId);
		let getIndex=todoArr.findIndex((todo)=>
			todo.todoId===deleteId
		)
		todoArr.splice(getIndex,1);
		cl(todoArr)
		localStorage.setItem("todos",JSON.stringify(todoArr));
		//listTemplating(todoArr);
		d.closest("li").remove();
		Swal.fire({
			title:`Todo Item is Removed Successfully!!!`,
			icon:"success",
			timer:2500
		})
	}else{
		return
	}
}

const onEdit=(ele)=>{
	//cl(ele.closest("li").getAttribute("id"));
	let editId=(ele.closest("li").getAttribute("id"));
	localStorage.setItem("editId",editId);
	let editObj=todoArr.find(todo=>todo.todoId === editId);
	cl(editObj);
	todoControl.value=editObj.todoItem;
	updateBtn.classList.remove("d-none");
	submitBtn.classList.add("d-none");	
}

const listTemplating=(arr)=>{
	let result = `<ul class="list-group" id="skillList">`;
	arr.forEach(todoObj	=>{
		result+=` <li class="list-group-item font-weight-bold" id="${todoObj.todoId}">
		${todoObj.todoItem}
          <span class="float-right">
		     <button class="btn btn-sm btn-outline-primary" onclick="onEdit(this)">Edit</button>
		      <button class="btn btn-sm btn-outline-danger" onclick="onDelete(this)">delete</button>
		  </span>
		</li>`				   
	});
	result +=`</ul>`;
	
	todoContainer.innerHTML=result;
}


if(localStorage.getItem("todos")){
	todoArr=JSON.parse(localStorage.getItem("todos"));
	listTemplating(todoArr);
}


const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};


const onTodoAdd=(eve)=>{
	eve.preventDefault();
	let newTodo={
		todoItem:todoControl.value,
		todoId:generateUuid()
	};	
	 todoArr.unshift(newTodo);
	localStorage.setItem("todos",JSON.stringify(todoArr));
	//listTemplating(todoArr);
	let li = document.createElement("li");
	li.className= "list-group-item font-weight-bold";
	li.id = newTodo.todoId;
	li.innerHTML =`${newTodo.todoItem}  <span class="float-right">
		     <button class="btn btn-sm btn-outline-primary" onclick="onEdit(this)">Edit</button>
		      <button class="btn btn-sm btn-outline-danger" onclick="onDelete(this)">delete</button>
		  </span>`;
	cl(li);
	//cl(skillList);	
	todoContainer.prepend(li);
	Swal.fire({
		title:`New todo Item ${newTodo.todoItem} is Addeded Successfully`,
		icon:"success",
		timer:2500
	})
	eve.target.reset()
}

const onTodoUpdate=()=>{
	 let updatedvalue=todoControl.value;
	 cl(updatedvalue);
	 let updatedId=localStorage.getItem("editId");
	 cl(updatedId);
	 for(let i=0; i<todoArr.length; i++){
		 if(todoArr[i].todoId===updatedId){
			 todoArr[i].todoItem=updatedvalue;
              break;			 
		 }
	 }
	 localStorage.setItem("todos",JSON.stringify(todoArr));
	// listTemplating(todoArr); 
	let li= document.getElementById(updatedId);
	li.innerHTML=`
	              ${updatedvalue}  <span class="float-right">
		          <button class="btn btn-sm btn-outline-primary" onclick="onEdit(this)">Edit</button>
	     	      <button class="btn btn-sm btn-outline-danger" onclick="onDelete(this)">delete</button>
				  </span>
	             `;
	
	 Swal.fire({
		title:`Todo Item ${updatedvalue} is Updated Successfully`,
		icon:"success",
		timer:2500
	})
	 todoForm.reset();
	 updateBtn.classList.add("d-none");
	 submitBtn.classList.remove("d-none");
}

todoForm.addEventListener("submit",onTodoAdd);
updateBtn.addEventListener("click",onTodoUpdate);