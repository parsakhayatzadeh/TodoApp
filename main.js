const themeSwitcherBtn = document.getElementById("theme-switcher");
const bodyTage = document.querySelector("body");
const addBtn = document.getElementById("add-btn");
const addinput = document.getElementById("addt");
const ul = document.querySelector("ul")






function main() {

    //themeSwitcher

    themeSwitcherBtn.addEventListener("click", () => {
        bodyTage.classList.toggle("light");

        var themImg = themeSwitcherBtn.children[0];
        themImg.setAttribute("src",
            themImg.getAttribute("src") === "./assets/images/icon-sun.svg" ?
            "./assets/images/icon-moon.svg" :
            "./assets/images/icon-sun.svg"
        )
    })

    setElemet(JSON.parse(localStorage.getItem("todos")));

    ul.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("card") &&
            !e.target.classList.contains("dragging")) {

            const draggingCard = document.querySelector(".dragging");
            const dragOverCard = [...ul.querySelectorAll(".card")];
            const currentPos = dragOverCard.indexOf(draggingCard);
            const newPos = dragOverCard.indexOf(e.target);

            if (currentPos > newPos) {

                ul.insertBefore(draggingCard, e.target)

            } else {
                ul.insertBefore(draggingCard, e.target.nextSibling)
            }
            const todos = JSON.parse(localStorage.getItem("todos"));
            const removeITM = todos.splice(currentPos, 1)
            todos.splice(newPos, 0, removeITM[0])
            localStorage.setItem("todos", JSON.stringify(todos))
        }
        


    })
    //set localStorage 
    addBtn.addEventListener('click', () => {

        const work = addinput.value.trim();

        if (work) {
            addinput.value = '';

            const todos = !localStorage.getItem("todos") ? [] :
                JSON.parse(localStorage.getItem("todos"));

            const localItem = {
                item: work,
                isCompleted: false,
            }

            todos.push(localItem);


            localStorage.setItem("todos", JSON.stringify(todos))
            console.log(todos);
        }


    })

    //set HTML element 
    function setElemet(todoArray) {
        if (!todoArray) {
            return null

        }


        todoArray.forEach((todoOBJ) => {
            //set element 
            const li = document.createElement("li");
            const div = document.createElement("div");
            const input = document.createElement("input");
            const span = document.createElement("span");
            const p = document.createElement("p");
            const button = document.createElement("button");
            const img = document.createElement("img");

            //add classes 
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
            p.textContent = todoOBJ.item;


            //set element with parent child
            li.append(div);
            li.append(p);
            li.append(button);
            div.append(input);
            div.append(span);
            button.append(img);

            ul.append(li);

            // AddEvenetListener

            li.addEventListener("dragstart", () => {
                li.classList.add("dragging")
            })

            li.addEventListener("dragend", () => {
                li.classList.remove("dragging")
            })


        })

    }

}
main();