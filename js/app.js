/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

let section = document.querySelectorAll("section");
const navbar = document.querySelector("#navbar__list");
const numSections = 10;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */






function isNearViewPortHelper(elem) {
    const secRec = elem.getBoundingClientRect();
    const winHight = (window.innerHeight || document.documentElement.clientHeight);
    return (
        secRec.bottom >= 0 &&
        secRec.top <= winHight

    );
}

function onClickScroll(evt) {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop);
    if (pos > 0) {
        (document.documentElement).scrollTo(0, 0); // or body?
    }

}

function removeClass(elem) {

    elem.className = "";

}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */


function createButtons() {
    /**
     * a function that creates div for up buttons in all sections
     * creates menu and populate it with the section headers
     * adds click events to the bar content (menu buttons)
     */
    createSections();
    let sections = document.querySelectorAll("section");
    for (let i = 0; i < numSections; i++) {
        // console.log(sections[i], 'sections', i)
        // create container for the up buttons
        let divButton = document.createElement("div");
        // add class to the container
        divButton.className = "button-container"
        // intilaize the button element
        const newButton = document.createElement("button");
        // set the new button text content
        newButton.textContent = "Up";
        // set their display to none so that it can set back to visiable when user scroll
        // newButton.style.display = "none";
        // get sections id
        let sectionId = document.querySelector(sections[i].id)
        // add event listener to button
        newButton.addEventListener("click", onClickScroll)
        ///define the barcontent (menu)
        let barContent = document.createElement("li")
        // insert the content to have the section inner text ex: section1, section2, section3...etc
        barContent.textContent = sections[i].querySelector("h2").innerText;
        // add listener when clicked it scrolls to the wanted section
        barContent.addEventListener("click", moveToSection)
        ///append to navbar
        navbar.appendChild(barContent)
        //get each section and appended div to it
        sections[i].querySelector("h2").appendChild(divButton);
        //get the div appended and append the new button
        sections[i].querySelector(".button-container").appendChild(newButton);


    }
}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
    /**
     * set element to active in which scrolled into
     * @type {NodeListOf<HTMLElementTagNameMap[string]>}
     */
    let sections = document.querySelectorAll("section");
    let navItems = document.querySelectorAll("li");

    for(const item of navItems) {
        item.addEventListener("mouseover", function (event) {
            // highlight the mouseover target
             item.className = "your-active-class";
            event.target.style.color = "blue";

            // reset the color after a short delay
            setTimeout(function () {
                event.target.style.color = "";
                 item.className = "";
            }, 500);
        }, false);
    }

    sections.forEach(sec => window.addEventListener("scroll", function (e) {
            // whenscrolling...?

            if (isNearViewPortHelper(sec)) { // am i near the viewport | the section is within the viewport?
                sec.className = "your-active-class"; // then set the active class
            } else { // otherwise just remove it
                sec.className = "";
            }

        })
    );

}

// Scroll to anchor ID using scrollTO event
function moveToSection(evt) {
    /**
     * function to move to the clicked section in the navbar(menu)
     * @type {NodeListOf<HTMLElementTagNameMap[string]>}
     */
    let sections = this.querySelectorAll("section"); /// get me all the sections
    for (const section of sections) { // loop through all sections
        ///make sure all classes are removed if they are not actually actyive
        section.classList.remove("your-active-class");
    }
    let sectionId = evt.target.innerText.replace(/\D/g, ""); // get me only the digits from the inner text
    let elem = document.getElementById(`section${sectionId}`); // get the elementid using the found section id from event target
    elem.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
    }); /// scroll into the element found with smooth transition behavior
    elem.className = "your-active-class"; // of course set the class to active

}

function createSections() {
    /**
     * function to create sections based on a gaven numSections(Global Variable)
     * whatever number is passed, the sections will be created and all DOM
     * manipulations will impact the new sections (the sections that comes after section3)
     */
    for (let i = section.length + 1; i <= numSections; i++) {// loop through sections starting from the current section length
        if (section[i] == null) {//if there is no more sections
            let newSection = document.querySelector("section").cloneNode(1); // clone first section
            newSection.id = `section${i}`;// update the id to current index to be thhe new id ex: section10
            newSection.setAttribute("data-nav", `Section ${i}`)///update data attribute (data-nav)
            let sectionTitle = newSection.querySelector("h2")// select the h2 inside the new section
            sectionTitle.innerText = `Section ${i}`;// add the new title for the new section
            mainTag = document.querySelector("main"); //select the main tags
            mainTag.appendChild(newSection); /// append section as a child
        }
    }
}


/**
 * End Main Functions
 * Begin Events
 *
 */
window.onload = function () {
    createButtons();
    setActiveSection()
}


// Build menu
// Scroll to section on link click

// Set sections as active


