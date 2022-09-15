const themeSwitcherBtn = document.getElementById("theme-switcher");
const bodyTag = document.querySelector("body");
const addBTN = document.getElementById("add-btn");
const addiInput = document.getElementById("addt");
const ul = document.querySelector(".todos");
const filter = document.querySelector(".filter");
const clearCompletedBtn = document.getElementById("clear-completed")





function main() {

    //theme-switcher 
    themeSwitcherBtn.addEventListener("click", () => {
        bodyTag.classList.toggle("light");
        const themIcon = themeSwitcherBtn.children[0];
        themIcon.setAttribute("src",
            themIcon.getAttribute("src") === "./assets/images/icon-sun.svg" ?
            "./assets/images/icon-moon.svg" :
            "./assets/images/icon-sun.svg"

        )
    })

    if (localStorage.getItem("todos")) {
        setElement(JSON.parse(localStorage.getItem("todos")))

    }


    //dragging card 
    ul.addEventListener("dragover", (e) => {

        e.preventDefault();

        if (e.target.classList.contains("card") &&
            !e.target.classList.contains("dragging")) {
            const draggingCard = document.querySelector(".dragging");
            const cards = [...ul.querySelectorAll(".card")];
            const dragSelectCard = cards.indexOf(draggingCard);
            const dragOverCard = cards.indexOf(e.target);
            if (dragSelectCard > dragOverCard) {

                ul.insertBefore(draggingCard, e.target)

            } else {

                ul.insertBefore(draggingCard, e.target.nextSibling)
            }

            //set dragging mood for localstorage
            const todos = JSON.parse(localStorage.getItem("todos"));
            const remove = todos.splice(dragSelectCard, 1);
            todos.splice(dragOverCard, 0, remove[0]);
            localStorage.setItem("todos", JSON.stringify(todos))

        }

    })


    // click enter to add Item 
    addiInput.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {
            addBTN.click()

        }
    })


    // set localStorage
    addBTN.addEventListener("click", () => {

        const item = addiInput.value.trim();
        if (item) {

            addiInput.value = '';

            const todos = localStorage.getItem("todos") ?
                JSON.parse(localStorage.getItem("todos")) : []

            const localItem = {
                item: item,
                isCompleted: false
            };

            todos.push(localItem);
            localStorage.setItem("todos", JSON.stringify(todos));

            setElement([localItem])

        }


    })


    //active item 
    filter.addEventListener("click", (e) => {
        var id = e.target.id;
        document.querySelector(".on").classList.remove("on");
        document.getElementById(id).classList.add("on");
        document.querySelector(".todos").className = `todos ${id}`

    });

    //clear completed item 
    clearCompletedBtn.addEventListener("click", () => {

        var removeItem = [];
        document.querySelectorAll("card.checked").forEach((card) => { 
            removeItem.push(
                [...document.querySelectorAll(".todos .card") ].indexOf(card)
            )
        })
        console.log(removeItem);
    
    })




}

//Complete item 
function stateTodo(index, isComplete) {

    const todos = JSON.parse(localStorage.getItem("todos"));
    todos[index].isCompleted = isComplete;
    localStorage.setItem("todos", JSON.stringify(todos))

}

//set HTML Element 
function setElement(todoArray) {

    if (!todoArray) {
        return null
    };
    const itemLeft = document.getElementById("items-left")
    todoArray.forEach(todoObject => {

        //creat element 
        const card = document.createElement("li");
        const cbContainer = document.createElement("div");
        const cbInput = document.createElement("input");
        const checkSpan = document.createElement("span");
        const item = document.createElement("p");
        const clearBtn = document.createElement("button");
        const img = document.createElement("img");

        // add  classes 
        card.classList.add("card");
        cbContainer.classList.add("cb-container");
        cbInput.classList.add("cb-input");
        checkSpan.classList.add("check");
        item.classList.add("item");
        clearBtn.classList.add("clear");

        // add attribute
        card.setAttribute("draggable", "true");
        cbInput.setAttribute("type", "checkbox");
        img.setAttribute("src", "./assets/images/icon-cross.svg")
        img.setAttribute("alt", "Clear it");
        item.textContent = todoObject.item

        if (todoObject.isCompleted) {
            card.classList.add("checked");
            cbInput.setAttribute("checked", "checked")

        }

        //set element with parent child

        card.append(cbContainer);
        card.append(item);
        card.append(clearBtn);
        cbContainer.append(cbInput);
        cbContainer.append(checkSpan);
        clearBtn.append(img);

        //add EventListener
        card.addEventListener("dragstart", () => {
            card.classList.add("dragging")
        })

        card.addEventListener("dragend", () => {
            card.classList.remove("dragging")
        })

        clearBtn.addEventListener("click", (e) => {
            const removeItem = clearBtn.parentElement;
            const indexOfRemoveItem = [...ul.querySelectorAll(".todos .card")].indexOf(removeItem);
            removeTodo(indexOfRemoveItem);
            removeItem.classList.add("fall");

            removeItem.addEventListener("animationend", () => {
                setTimeout(() => {
                    removeItem.remove()
                    itemLeft.textContent =
                        document.querySelectorAll(".todos .card:not(.checked)").length


                }, 100);
            })

        })




        cbInput.addEventListener("click", (e) => {

            const checkSelectItem = cbInput.parentElement.parentElement;
            const checked = cbInput.checked;
            const indexOfCheckSelectItem = [...document.querySelectorAll(".todos .card")].indexOf(checkSelectItem)

            stateTodo(indexOfCheckSelectItem, checked);

            checked ? card.classList.add("checked") : card.classList.remove("checked");
            itemLeft.textContent = document.querySelectorAll(".todos .card:not(.checked)").length





        })



        document.querySelector('.todos').append(card)

    });

    itemLeft.textContent = document.querySelectorAll(".todos .card:not(.checked)").length



};

//clear item 
function removeTodo(index) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos))

};

function removeCompletedItem(indexes) {
    

};





main()