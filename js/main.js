const input = document.getElementById("input");
const button = document.getElementById("button");
const todo = document.getElementById("todo");
const completed = document.getElementById("completed");

input.addEventListener("keyup", e => {
    if (e.keyCode === 13) button.click();
});

button.addEventListener("click", () => {
    if (input.value.trim()) {
        const inputValueWrapper = document.createElement("span");
        const inputValue = document.createTextNode(input.value.trim());
        const todoItem = document.createElement("li");
        const todoButtons = document.createElement("div");
        const editButton = document.createElement("button");
        const pencilIcon = document.createElement("i");
        const deleteButton = document.createElement("button");
        const trashIcon = document.createElement("i");
        const doneButton = document.createElement("button");
        const checkIcon = document.createElement("i");

        todoItem.classList.add("todo-item");
        todoButtons.classList.add("todo-buttons");
        editButton.classList.add("button", "button--edit");
        pencilIcon.classList.add("fa", "fa-pencil");
        deleteButton.classList.add("button", "button--delete");
        trashIcon.classList.add("fa", "fa-trash");
        doneButton.classList.add("button", "button--done");
        checkIcon.classList.add("fa", "fa-check");

        editButton.appendChild(pencilIcon);
        deleteButton.appendChild(trashIcon);
        doneButton.appendChild(checkIcon);
        todoButtons.appendChild(editButton);
        todoButtons.appendChild(deleteButton);
        todoButtons.appendChild(doneButton);
        inputValueWrapper.appendChild(inputValue);
        todoItem.appendChild(inputValueWrapper);
        todoItem.appendChild(todoButtons);
        todo.prepend(todoItem);

        input.value = "";

        editButton.addEventListener("click", function () {
            const item = this.parentNode.parentNode;
            const todoEditWrapper = document.createElement("div");
            const todoEdit = document.createElement("input");
            const todoEditUpdateButton = document.createElement("button");
            const todoEditPlusIcon = document.createElement("i");
            todoEditWrapper.classList.add("todo-editWrapper");
            todoEditUpdateButton.classList.add("button", "button--update");
            todoEditPlusIcon.classList.add("fa", "fa-plus");
            todoEdit.type = "text";
            todoEdit.classList.add("todo-edit");
            todoEdit.value = item.childNodes[0].textContent;
            todoEditUpdateButton.appendChild(todoEditPlusIcon);
            todoEditWrapper.appendChild(todoEdit);
            todoEditWrapper.appendChild(todoEditUpdateButton);
            inputValueWrapper.style.display = "none";
            item.prepend(todoEditWrapper);
            todoEdit.focus();
            todoButtons.removeChild(editButton);
            item.style.paddingRight = "95px";

            const todoEditDone = () => {
                if (todoEdit.value.trim()) {
                    inputValueWrapper.textContent = todoEdit.value.trim();
                    inputValueWrapper.removeAttribute("style");
                    item.removeChild(todoEditWrapper);
                    todoButtons.prepend(editButton);
                    item.style.paddingRight = "135px";
                }
            }
            todoEditUpdateButton.addEventListener("click", todoEditDone);
            todoEdit.addEventListener("keyup", (e) => {
                if (e.keyCode === 13)
                    todoEditDone();
            });
        });

        deleteButton.addEventListener("click", function () {
            const item = this.parentNode.parentNode;
            const parent = item.parentNode;
            parent.removeChild(item);
        });

        doneButton.addEventListener("click", function () {
            const parentId = this.parentNode.parentNode.parentNode.id;
            parentId === "todo" ? completed.prepend(todoItem) : todo.appendChild(todoItem);
        });
    }
});