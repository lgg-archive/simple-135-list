//html ids of tasks elements
var tasksId = [
    'w1',
    'w31',
    'w32',
    'w33',
    'w51',
    'w52',
    'w53',
    'w54',
    'w55',
];

document.addEventListener('DOMContentLoaded', function () {
    //load saved tasks
    loadTasks();

    //bind events
    //checkboxes functionality
    runForElementsByClass("check", function (item) {
        item.addEventListener("click", function () {
            markThis(this.id.slice(0, -1));
        });
    });

    //input keyUp
    runForElementsByClass("task-input", function (item) {
        item.addEventListener("keyup", function () {
            saveThis(this);
        });
    });

    //show/hide faq
    getElById("btn-faq__show").addEventListener("click", showFaq);
    getElById("btn-faq__hide").addEventListener("click", hideFaq);

    //clear saved tasks
    getElById("btn-reset").addEventListener("click", clearSaved);
});

/**
 * Returns html element by id
 * @param {string} id
 * @returns {Element}
 */
function getElById(id) {
    //returns element by its id
    return document.getElementById(id);
}

/**
 * Executes function for each element selected by className
 * @param {string} className
 * @param {function} func
 */
function runForElementsByClass(className, func) {
    Array.prototype.forEach.call(document.getElementsByClassName(className), function (item, i) {
        func(item, i);
    });
}

/**
 * Executes function for each taskElement
 * @param {function} func
 */
function eachTaskElement(func) {
    for (var i = 0; i < tasksId.length; i++) {
        func(tasksId[i], i);
    }
}

/**
 * Load tasks from cookies and updates inputs and checkboxes
 */
function loadTasks() {
    //load saved tasks from cookies
    eachTaskElement(function (taskId) {
        getElById(taskId).value = getCookie(taskId);
    });

    //check if some tasks are done
    markCheckboxes();
}

/**
 * Returns cookie value by its name
 * @param {string} name - cookies name
 * @returns {string}
 */
function getCookie(name) {
    var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    if (results) {
        return (decodeURI(results[2]));
    } else {
        return '';
    }
}

/**
 * Updates cookies values by its name
 * @param {string} name
 * @param {*} val
 */
function updateCookie(name, val) {
    document.cookie = name + "=; path=/; expires=-1";
    var date = new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 3650);
    document.cookie = name + "=" + val + "; path=/; expires=" + date.toUTCString();
}

/**
 * Clears saved tasks
 */
function clearSaved(e) {
    e.preventDefault();

    if (confirm("Уверены?")) {
        document.cookie = "log=; path=/; expires=-1";

        eachTaskElement(function (taskId) {
            //clear cookies for input and checkboxes
            document.cookie = taskId + "=; path=/; expires=-1";
            document.cookie = taskId + 'c' + "=; path=/; expires=-1";

            //clear checkboxes and inputs
            getElById(taskId).value = getCookie(taskId);
            getElById(taskId + 'c').checked = false;
        });

        //update checkboxes
        markCheckboxes();

        hideFaq();
    }
}

/**
 * Update checkboxes
 */
function markCheckboxes() {
    eachTaskElement(function (taskId) {
        //check if we need to set checkbox to checked
        if (getCookie(taskId + 'c') == "true") {
            getElById(taskId + 'c').checked = true;

            //update view for checked task
            markThis(taskId);
        }
    });
}

/**
 * Check if we need to change checkbox view
 * @param {string} taskId
 */
function markThis(taskId) {
    var checkboxStatus = getElById(taskId + 'c').checked;
    var imgId = "rl" + taskId;
    var textWidth = getElById(taskId).value.length;
    var textY;

    //update cookies
    updateCookie(taskId + 'c', checkboxStatus);

    if (checkboxStatus) {
        //get TextWidth coefficients
        if (taskId == "w1") {
            textY = 18 + "px";
            textWidth = textWidth * 13.5 + "px";
        } else if (taskId == "w31" || taskId == "w32" || taskId == "w33") {
            textY = 15 + "px";
            textWidth = textWidth * 10 + "px";
        } else {
            textY = 12 + "px";
            textWidth = textWidth * 7 + "px";
        }

        getElById(taskId).setAttribute("unselectable", "on");
        getElById(taskId).setAttribute("readonly", "on");
        getElById(taskId).classList.add("no-select");

        getElById(imgId).style.top = textY;
        getElById(imgId).style.width = textWidth;
        getElById(imgId).style.display = "inline";
    } else {
        getElById(taskId).removeAttribute("unselectable");
        getElById(taskId).removeAttribute("readonly");
        getElById(taskId).classList.remove("no-select");

        getElById(imgId).style.display = "none";
    }
}

/**
 * Updates cookies by real-time typing
 * @param el
 */
function saveThis(el) {
    updateCookie(el.id, el.value);

    /*
     var kc = event.keyCode;
     if (kc == 67 || kc == 86 || kc == 65 || kc == 32 || kc == 9 || kc == 13 || kc == 16 || kc == 17 || kc == 18 || kc == 19 || kc == 20 || kc == 27 || kc == 33 || kc == 34 || kc == 35 || kc == 36 || kc == 37 || kc == 38 || kc == 39 || kc == 40 || kc == 45 || kc == 46) {

     } else {
     updateCookie(el.id, el.value);
     }
     */
}

/**
 * Shows FAQ modal
 */
function showFaq(e) {
    e.preventDefault();

    getElById("faq").classList.remove("display__none");
    getElById("faq").classList.add("display__block");

    getElById("menu").classList.remove("display__block");
    getElById("menu").classList.add("display__none");
}

/**
 * Hides FAQ modal
 */
function hideFaq(e) {
    if (e) {
        e.preventDefault();
    }

    getElById("faq").classList.remove("display__block");
    getElById("faq").classList.add("display__none");

    getElById("menu").classList.remove("display__none");
    getElById("menu").classList.add("display__block");
}