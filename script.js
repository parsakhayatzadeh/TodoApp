const themeSwitcher = document.getElementById("theme-switcher");
const bodyTag = document.querySelector("body");
const addBtn = document.getElementById("add-btn");
const addInput = document.getElementById("addt");
const ul = document.querySelector(".todos")




function main() {

    //theme-switcher
    themeSwitcher.addEventListener("click", () => {
        bodyTag.classList.toggle("light");
        const themIcon = themeSwitcher.children[0];

        themIcon.setAttribute("src",

            themIcon.getAttribute("src") === "./assets/images/icon-sun.svg" ?
            "./assets/images/icon-moon.svg" :
            "./assets/images/icon-sun.svg"


        )
    })


    //dragOver card
    ul.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("card") && !e.target.classList.contains("dragging")) {

            const draggingCard = document.querySelector(".dragging");
            const cards = [...ul.querySelectorAll(".card")];
            const currentDragCard = cards.indexOf(draggingCard);
            const dragOverCard = cards.indexOf(e.target);
            console.log(currentDragCard, dragOverCard);

            if (currentDragCard > dragOverCard) {
                ul.insertBefore(draggingCard, e.target)
            } else {
                ul.insertBefore(draggingCard, e.target.nextSibling)
            }

            const todos = JSON.parse(localStorage.getItem("todos"));
            const remove = todos.splice(currentDragCard, 1);
            todos.splice(dragOverCard, 0, remove[0]);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    })


    //set localStorage
    addBtn.addEventListener("click", () => {

        const item = addInput.value.trim();
        if (item) {
            addInput.value = "";

            const todos = !localStorage.getItem("todos") ? [] :
                JSON.parse(localStorage.getItem("todos"));


            const localItem = {
                item: item,
                isCompleted: false
            }

            todos.push(localItem);

            localStorage.setItem("todos", JSON.stringify(todos));
            setElement([localItem])


        }
    })

    addInput.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            addBtn.click()

        }
    });

    function removeTodo(index) {

        const todos = JSON.parse(localStorage.getItem("todos"));
        todos.splice(index, 1)
        localStorage.setItem("todos", JSON.stringify(todos))


    }

    function stateTodo(index, isComplete) {

        const todos = JSON.parse(localStorage.getItem("todos"));
        todos[index].isCompleted = isComplete;
        localStorage.setItem("todos", JSON.stringify(todos))

    }

    //set  Element 
    if (localStorage.getItem("todos")) {
        setElement(JSON.parse(localStorage.getItem("todos")))

    }


    function setElement(TodoItem) {

        if (!TodoItem) {
            return null;
        }
        TodoItem.forEach(TodoObject => {

            //set HTML Element 
            const li = document.createElement("li");
            const div = document.createElement("div");
            const input = document.createElement("input");
            const span = document.createElement("span");
            const p = document.createElement("p");
            const button = document.createElement('button');
            const img = document.createElement("img");

            // add classes
            li.classList.add("card");
            div.classList.add("cb-container");
            input.classList.add("cb-input");
            span.classList.add("check");
            p.classList.add("item");
            button.classList.add("clear");


            // add Attribute
            li.setAttribute("draggable", true);
            input.setAttribute("type", "checkbox");
            img.setAttribute("src", "./assets/images/icon-cross.svg");
            img.setAttribute("alt", "Clear it");
            p.textContent = TodoObject.item;

            if(TodoObject.isCompleted){
                li.classList.add("checked");
                input.setAttribute("checked" , "checked")

            }


            //set element with parent child
            li.append(div);
            li.append(p);
            li.append(button);
            div.append(input);
            div.append(span);
            button.append(img);

            ul.append(li);

            //add Event

            li.addEventListener("dragstart", () => {
                li.classList.add("dragging")
            });
            li.addEventListener("dragend", () => {
                li.classList.remove("dragging")
            });

            button.addEventListener("click", (e) => {
                const removeCard = button.parentElement;
                removeCard.classList.add("fall");
                const indexOfRemoveCard = [...document.querySelectorAll(".todos .card")].indexOf(removeCard);
                console.log(indexOfRemoveCard);
                removeTodo(indexOfRemoveCard);
                li.addEventListener("animationend" , () => { 
                    
                    setTimeout(() => {

                        removeCard.remove()
                        
                    }, 100);
                })
            });

            input.addEventListener("click", (e) => {

                const checkItem = input.parentElement.parentElement;
                const indexOfCheckItem = [...document.querySelectorAll(".todos .card")].indexOf(checkItem);
                const checked = input.checked;
                stateTodo(indexOfCheckItem , checked);

                checked ? checkItem.classList.add("checked") : checkItem.classList.remove("checked")
               

            })
        });
    }


}

main()