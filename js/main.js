var input = document.getElementById("input");
var button = document.getElementById("button");
var todo = document.getElementById("todo");
var completed = document.getElementById("completed");

input.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) button.click();
});

button.addEventListener("click", function () {
    var spacesCount = 0;
    for (var i = 0; i < input.value.length; i++) {
        if (input.value[i] === " ") {
            spacesCount++;
        };
    }
    if (input.value && spacesCount !== input.value.length) {
        var inputValueWrapper = document.createElement("span");
        var inputValue = document.createTextNode(input.value);
        var todoItem = document.createElement("li");
        var todoButtons = document.createElement("div");
        var editButton = document.createElement("button");
        var pencilIcon = document.createElement("i");
        var deleteButton = document.createElement("button");
        var trashIcon = document.createElement("i");
        var doneButton = document.createElement("button");
        var checkIcon = document.createElement("i");

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
            var item = this.parentNode.parentNode;
            var todoEditWrapper = document.createElement("div");
            var todoEdit = document.createElement("input");
            var todoEditUpdateButton = document.createElement("button");
            var todoEditPlusIcon = document.createElement("i");
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

            function todoEditDone() {
                inputValueWrapper.textContent = todoEdit.value;
                inputValueWrapper.removeAttribute("style");
                item.removeChild(todoEditWrapper);
                todoButtons.prepend(editButton);
                item.style.paddingRight = "135px";
            }
            todoEditUpdateButton.addEventListener("click", todoEditDone);
            todoEdit.addEventListener("keyup", function (e) {
                if (e.keyCode === 13) {
                    todoEditDone();
                }
            });
        });

        deleteButton.addEventListener("click", function () {
            var item = this.parentNode.parentNode;
            var parent = item.parentNode;
            parent.removeChild(item);
        });

        doneButton.addEventListener("click", function () {
            var parentId = this.parentNode.parentNode.parentNode.id;
            parentId === "todo" ? completed.prepend(todoItem) : todo.appendChild(todoItem);
        });
    }
});