/**
 * Created by Alexander on 29.11.15.
 */
var articles;
var breadcrumb = document.querySelector('.breadcrumb');
var dropDownMobile = document.querySelector('.dropdown-mobile');
var dropDownMenu = document.querySelector('.dropdown-menu');
var articlesCounter = 0;
var content = document.querySelector('.content');
var upScroll = document.querySelector('.up');
var currentScrollPosition;
var dropdownMobileToggle = document.querySelector('.dropdown-mobile-toggle');
var dropdownMobile = document.querySelector('.dropdown-mobile');

window.addEventListener('scroll', function() {
    upScroll.style.display = "block";
});

function isScrolledToBottom() {
    var scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    var currentPosition = document.documentElement.scrollTop + document.documentElement.clientHeight;
    if (Math.abs(currentPosition - scrollHeight) <= 1)
        return true;
}

function loadContent(contentType) {
    $.get("php/main.php?action=" + contentType + "&from=" + articlesCounter,
        function (data) {
            articlesCounter += 3;
            content.innerHTML += data;
        });
}

function searchByTag(tag) {
    var xmlHttp = getHttpRequest();
    var params = "action=load_";

    for (var i = 0; i < dropDownMenu.children.length; ++i) {
        dropDownMenu.children[i].firstElementChild.className = "";
        dropDownMobile.children[i].firstElementChild.className = "";
    }

    switch (tag) {
        case 'о здоровье':
            params += "health";
            dropDownMenu.children[1].firstElementChild.className = "submenu_active";
            dropDownMobile.children[1].firstElementChild.className = "submenu_active";
            break;
        case 'о развитии':
            params += "grow";
            dropDownMenu.children[2].firstElementChild.className = "submenu_active";
            dropDownMobile.children[2].firstElementChild.className = "submenu_active";
            break;
        case 'о воспитании':
            params += "breed";
            dropDownMenu.children[3].firstElementChild.className = "submenu_active";
            dropDownMobile.children[3].firstElementChild.className = "submenu_active";
            break;
    }

    $.get("php/main.php?" + params, function(data) {
            breadcrumb.lastElementChild.className = "";

            var currentLocation = document.createElement('li');
            currentLocation.className = "active";
            currentLocation.innerHTML = tag;

            if (breadcrumb.lastElementChild.innerHTML == "Статьи") {
                var link = document.createElement('a');
                link.href = location;
                link.innerHTML = breadcrumb.lastElementChild.innerHTML;
                breadcrumb.lastElementChild.innerHTML = "";
                breadcrumb.lastElementChild.appendChild(link);
                breadcrumb.appendChild(currentLocation);
            }
            else {
                breadcrumb.replaceChild(currentLocation, breadcrumb.lastElementChild);
            }

            locationSearch = "?" + params;

            if (data == "")
                content.innerHTML = "<article>Ничего не найдено</article>";
            else
                content.innerHTML = data;
            var state = {
                articles: content.innerHTML,
                breadcrumb: breadcrumb.innerHTML
            };
            articles = data;
            history.pushState(state, "", location.origin + location.pathname + locationSearch);
    });
}

window.addEventListener('popstate', function () {
    content.innerHTML = history.state.articles;
    breadcrumb.innerHTML = history.state.breadcrumb;
});

$(upScroll).click(function () {
    if (window.scrollY > 0) {
        currentScrollPosition = window.scrollY;
        window.scrollTo(0, 0);
        this.className = "down";
    }
    else {
        window.scrollTo(0, currentScrollPosition);
        this.className = "up";
    }
});

dropdownMobile.style.display = "none";
$(dropdownMobileToggle).click(function () {
    if (dropdownMobile.style.display == "none")
        dropdownMobile.style.display = "block";
    else
        dropdownMobile.style.display = "none";
});

function getHttpRequest() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

function sendHttpRequest(xmlhttp, params) {
    xmlhttp.open("POST", "php/main.php", true);

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (params != null)
        xmlhttp.setRequestHeader("Content-length", params.length);
    xmlhttp.setRequestHeader("Connection", "close");

    xmlhttp.send(params);
}

$('#search-btn').click(function () {
    if ($('#search').val()) {
        $.get("php/main.php?action=search&" +
            "search_for=" + $('#search').val(), function (data) {
            content.innerHTML = data;
            $('#search').val("");
            window.removeEventListener('scroll', loadMore);
        });
    }
});

function loadMore(contentType) {
    if (isScrolledToBottom()){
        loadContent(contentType);
    }
}
