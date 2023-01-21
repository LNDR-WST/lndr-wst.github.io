window.addEventListener('load', function() {
    /* Check for URL Parameters */
    checkURLParameters();
    /* Smooth Scrolling to Anchor */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
})

/* Check for URL Parameters */
function checkURLParameters() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('project')) {
        const project = urlParams.get('project');
        showContent(project);
    }
}

/* Add URL Parameters */
function addURLParameters(id) {
    const url = new URL(window.location.href);
    url.searchParams.set('project', id);
    window.history.pushState({}, '', url);
}

/* Remove URL Parameters */
function removeURLParameters() {
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.pushState({}, '', url);
}

/* Read URL Parameters */
function readURLParameters() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('project')) {
        const project = urlParams.get('project');
        return project;
    }
}

/* Close Content on Escape */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const id = readURLParameters();
        if (id != undefined) {
            hideContent(id);
        }
    }
});

/* Overlay Content-Toggle */

function showContent(id) {
    addURLParameters(id);
    document.getElementById('nav').style.visibility = "hidden";
    document.body.style.overflow = "hidden";
    document.getElementById(id).style.opacity = 100;
    document.getElementById(id).style.visibility = "visible"; 
}

function hideContent(id) {
    removeURLParameters()
    document.getElementById('nav').style.visibility = "visible";
    document.body.style.overflow = "visible";
    document.getElementById(id).style.opacity = 0;
    document.getElementById(id).style.visibility = "hidden";
}

/* Navigation Hide */

let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
let currentScrollPos = window.pageYOffset;
if (prevScrollpos > currentScrollPos) {
    document.getElementById("nav").style.top = "0";
} else if (prevScrollpos < currentScrollPos && prevScrollpos >= 0) {
    document.getElementById("nav").style.top = "-57px";
}
prevScrollpos = currentScrollPos;
} 

/* (De)Activate iFrame on checkbox change */

function loadIFrame(id) {
    let source;
    switch(id) {
        case 'fah':
            source = "https://www.youtube.com/embed/OtM3HaeACZM?ecver=1&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;yt:stretch=16:9&amp;autohide=1&amp;color=white&amp;width=500&amp;width=500";
            break;
        case 'wotk':
            source = "https://itch.io/embed-upload/4058575?color=333333";
            break;
    }                
    document.getElementById('consent-' + id).style = "display: none;";
    document.getElementById('iframe-' + id).src = source;
}

function checkInput(id) {
    const checkbox = document.getElementById(id);
    if (checkbox.checked) {
        loadIFrame(id.split('-')[2]);
    }
}

/* Check if consent checkboxes are checked and hide consent-area */

const checkboxes = document.getElementsByClassName('consent-chk');
for (let i = 0; i < checkboxes.length; i++) {
    const consentDiv = checkboxes[i].parentElement.parentElement;
    if (checkboxes[i].checked) {
        consentDiv.style = "display: none;"
    } else {
        consentDiv.style = "display: flex;"
    }
}



/* Card filter functions*/

let filterList = [];
const btnAll = document.getElementById('filter-btn-all');
const btnList = document.getElementById('filter-btn-wrapper').children;
function filterClick(id) {
    const btn = document.getElementById(id)
    const tagName = id.split('-')[2];
    if (btn.id !== 'filter-btn-all') {
        btn.classList.toggle('active');
        if (btn.classList.contains('active')) {
            addFilter(tagName);
        } else {
            removeFilter(tagName);
        }
    } else if (btn.id === 'filter-btn-all' && !btn.classList.contains('active')) {
        resetFilter();
    }
    filterCards();
}
function addFilter(tag){
    filterList.push(tag);
    if (btnAll.classList.contains('active')) {
        btnAll.classList.remove('active');
    }
    if (filterList.length >= 6) {
        resetFilter();
    }
}
function removeFilter(tag) {
    filterList = filterList.filter(element => element != tag);
    if (filterList.length == 0) {
        btnAll.classList.add('active');
    }
}
function resetFilter() {
    for (i = 0; i < btnList.length; i++) {
            btnList[i].classList.remove('active');
    }
    btnAll.classList.add('active');
    filterList = [];
}

function filterCards() {
    const cards = document.getElementById('cardwrapper').children;
    if (filterList.length == 0) {
        for (i = 0; i < cards.length; i++) {
            if (cards[i].classList.contains('hidden')) {
                cards[i].classList.remove('hidden');
            }
        }
    } else {
        for (i = 0; i < cards.length; i++) {
            cards[i].classList.add('hidden');
        }
        for (i = 0; i < cards.length; i++) {
            let classNames = cards[i].className.split(' ');
            for (const name of classNames) {
                if (filterList.includes(name)) {
                    cards[i].classList.remove('hidden');
                    break;
                }
            }
        }
    }
}
