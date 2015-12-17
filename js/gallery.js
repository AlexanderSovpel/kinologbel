/**
 * Created by Alexander on 02.12.15.
 */
//var media = document.querySelectorAll('.media');
var mediaOpened = document.querySelector('.media_opened');
var blackScreen = document.querySelector('.black_screen');
var innerMedia;
var counter = document.querySelector('.counter');
var currentImage;
var close = document.querySelector('.close');
var carouselLeft = document.querySelector('.carousel-control.left');
var carouselRight = document.querySelector('.carousel-control.right');

document.body.onload = function() {
    loadContent("load_gallery");

    ////РћС‚РєСЂС‹С‚СЊ РёР·РѕР±СЂР°Р¶РµРЅРёРµ/РІРёРґРµРѕ
    //for (var i = 0; i < media.length; ++i) {
    //    media[i].addEventListener('click', onMediaClick(i), false);
    //} //TODO: не работает обработчик нажатия ._.

    //var articleMedia = document.querySelector('.article_media');
    //articleMedia.addEventListener('click', function (event) {
    //    alert("Hello!!!");
    //    var target = event.target;
    //
    //    while (target != this) {
    //        if (target.className == "media") {
    //            openMedia(target);
    //            return;
    //        }
    //        target = target.parentNode;
    //    }
    //}, false);
};

function openMedia(event, media) {
    //if(screen.width > 360) {
        event.preventDefault();
        InnerMedia(media);
        blackScreen.style.display = "flex";
        currentImage = media;
        getCurrentImageNumber();
        document.body.style.overflow = "hidden";
    //}
}

function InnerMedia(media) {
    var div = document.createElement('div');
    innerMedia = media.cloneNode(true);

    if (innerMedia.tagName == "VIDEO")
        innerMedia.setAttribute("controls", "");

    innerMedia.className = "inner_media";
    innerMedia.onclick = null;
    div.appendChild(innerMedia);

    if (screen.width <= 360) {
        var controlsMobile = document.createElement('div');
        controlsMobile.className = "controls-mobile";

        var prev = document.createElement('a');
        prev.innerHTML = "< Назад";
        prev.onclick = previousMedia;

        var next = document.createElement('a');
        next.innerHTML = "Вперёд >";
        next.onclick = nextMedia;

        controlsMobile.appendChild(prev);
        controlsMobile.appendChild(next);

        div.appendChild(controlsMobile);
    }

    var description = document.createElement('p');
    description.innerHTML = innerMedia.title;
    description.className = "description";
    div.appendChild(description);

    mediaOpened.appendChild(div);
}

window.addEventListener('scroll', function() {
    if (isScrolledToBottom()){
        loadContent("load_gallery");
    }
});

blackScreen.addEventListener('click', function(event) {
    var target = event.target;
    if (target.className == "black_screen") {
        closeMedia();
    }
});


//Р—Р°РєСЂС‹С‚СЊ РёР·РѕР±СЂР°Р¶РµРЅРёРµ/РІРёРґРµРѕ
close.addEventListener('click', closeMedia);

function closeMedia() {
    blackScreen.style.display = "none";
    document.body.style.overflow = "auto";
    mediaOpened.removeChild(mediaOpened.lastElementChild);
}

//РЎР»РµРґСѓСЋС‰РµРµ РёР·РѕР±СЂР°Р¶РµРЅРёРµ/РІРёРґРµРѕ

function nextMedia() {
    mediaOpened.removeChild(mediaOpened.lastElementChild);
    currentImage = currentImage.nextElementSibling || currentImage.parentNode.firstElementChild;
    getCurrentImageNumber();
    InnerMedia(currentImage);
}

carouselLeft.addEventListener('click', previousMedia);

//РџСЂРµРґС‹РґСѓС‰РµРµ РёР·РѕР±СЂР°Р¶РµРЅРёРµ/РІРёРґРµРѕ

function previousMedia() {
    mediaOpened.removeChild(mediaOpened.lastElementChild);
    currentImage = currentImage.previousElementSibling || currentImage.parentNode.lastElementChild;
    getCurrentImageNumber();
    InnerMedia(currentImage);
}

carouselRight.addEventListener('click', nextMedia);

//РџРѕР»СѓС‡РёС‚СЊ РЅРѕРјРµСЂ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ/РІРёРґРµРѕ РІ Р±Р»РѕРєРµ
function getCurrentImageNumber() {
    var index = $(currentImage).index() + 1;
    counter.innerHTML = index + " из " + currentImage.parentNode.children.length;
    //console.log(index + " РёР· " + currentImage.parentNode.children.length);
}

//function getCurrentImageDescription() {
    //TODO: РЅР°РїРёСЃР°С‚СЊ ajax-Р·Р°РїСЂРѕСЃ РґР»СЏ РїРѕРґРіСЂСѓР·РєРё РѕРїРёСЃР°РЅРёСЏ РёР· Р±Р°Р·С‹
//}

mediaOpened.addEventListener('swipeleft', nextMedia);
mediaOpened.addEventListener('swiperight', previousMedia);
mediaOpened.addEventListener('swipedown', closeMedia);
mediaOpened.addEventListener('swipeup', closeMedia);
