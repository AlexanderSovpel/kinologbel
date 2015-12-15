/**
 * Created by Alexander on 29.11.15.
 */

//В«Р°РіСЂСѓР·РёС‚СЊ Р±РѕР»СЊС€Рµ СЃС‚Р°С‚РµР№/С„РѕС‚РѕРє, РµСЃР»Рё РїСЂРѕРєСЂСѓС‚РёР»Рё РґРѕ РєРѕРЅС†Р°
function isScrolledToBottom() {
    if (!document.documentElement.scrollTop)
    {
        //upScroll.style.display = "none";
    }
    else
        upScroll.style.display = "block";
    var inProcess = false;
    var scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    ); //В¬С‹СЃРѕС‚Р° СЃС‚СЂР°РЅРёС†С‹ СЃ СѓС‡Р„С‚РѕРј РїСЂРѕРєСЂСѓС‚РєРё

    var currentPosition = document.documentElement.scrollTop + document.documentElement.clientHeight;
    //в‰€СЃР»Рё СЃС‚СЂР°РЅРёС†Р° РїСЂРѕРєСЂСѓС‡РµРЅР° РґРѕ РєРѕРЅС†Р°

    if(currentPosition == scrollHeight)
        return true;
}

//пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅ
var articlesCounter = 0;
var content = document.querySelector('.content');

function loadContent(contentType) {
    var xmlHttp = getHttpRequest();
    var params = "action=" + contentType + "&" +
        "from=" + articlesCounter + "&";
    articlesCounter += 3;
    params += "to=" + articlesCounter;

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            content.innerHTML += xmlHttp.responseText;
            console.info(contentType);
        }
    };

    sendHttpRequest(xmlHttp, params);
}

var articles;
var breadcrumb = document.querySelector('.breadcrumb');
var dropDownMobile = document.querySelector('.dropdown-mobile');
var dropDownMenu = document.querySelector('.dropdown-menu');
//var submenuActive = document.querySelector('.submenu_active');

function searchByTag(tag) {
    var xmlHttp = getHttpRequest();
    var params = "action=load_";

    for (var i = 0; i < dropDownMenu.children.length; ++i) {
        dropDownMenu.children[i].firstElementChild.className = "";
        dropDownMobile.children[i].firstElementChild.className = "";
    }
    //submenuActive.className = "";

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

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
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

            if (xmlHttp.responseText == "")
                content.innerHTML = "<article>Ничего не найдено</article>";
            else
                content.innerHTML = xmlHttp.responseText;
            var state = {
                articles: content.innerHTML,
                breadcrumb: breadcrumb.innerHTML
            };
            articles = xmlHttp.responseText;
            history.pushState(state, "", location.origin + location.pathname + locationSearch);
        }
    };
    sendHttpRequest(xmlHttp, params);
}

window.addEventListener('popstate', function() {
    content.innerHTML = history.state.articles;
    breadcrumb.innerHTML = history.state.breadcrumb;
});

//пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
var upScroll = document.querySelector('.up');
var currentScrollPosition;
upScroll.addEventListener('click', function() {
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

var dropdownMobileToggle = document.querySelector('.dropdown-mobile-toggle');
var dropdownMobile = document.querySelector('.dropdown-mobile');
dropdownMobile.style.display = "none";
dropdownMobileToggle.addEventListener('click', function() {
    if (dropdownMobile.style.display == "none")
        dropdownMobile.style.display = "block";
    else
        dropdownMobile.style.display = "none";
});

function getHttpRequest() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

function sendHttpRequest(xmlhttp, params) {
    xmlhttp.open("POST", "main.php", true);

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (params != null)
        xmlhttp.setRequestHeader("Content-length", params.length);
    xmlhttp.setRequestHeader("Connection", "close");

    xmlhttp.send(params);
}

var searchBtn = document.querySelector('#search-btn');
searchBtn.addEventListener('click', function() {
    var xmlHttp = getHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            alert("You searched for " + xmlHttp.responseText);
        }
    }
    sendHttpRequest(xmlHttp, null);
});

