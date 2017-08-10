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
        var inputValue = document.createTextNode(input.value);
        var todoItem = document.createElement("li");
        var todoButtons = document.createElement("div");
        var deleteButton = document.createElement("button");
        var trashIcon = document.createElement("i");
        var doneButton = document.createElement("button");
        var checkIcon = document.createElement("i");

        todoItem.classList.add("todo-item");
        todoButtons.classList.add("todo-buttons");
        deleteButton.classList.add("button", "button--delete");
        deleteButton.id = "delete";
        trashIcon.classList.add("fa", "fa-trash");
        doneButton.classList.add("button", "button--done");
        doneButton.id = "done";
        checkIcon.classList.add("fa", "fa-check");

        deleteButton.appendChild(trashIcon);
        doneButton.appendChild(checkIcon);
        todoButtons.appendChild(deleteButton);
        todoButtons.appendChild(doneButton);
        todoItem.appendChild(inputValue);
        todoItem.appendChild(todoButtons);
        todo.prepend(todoItem);

        input.value = "";

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