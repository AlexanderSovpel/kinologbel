/**
 * Created by Alexander on 02.12.15.
 */
var mediaOpened = document.querySelector('.media_opened');
var blackScreen = document.querySelector('.black_screen');
var innerMedia;
var counter = document.querySelector('.counter');
var currentImage;
var close = document.querySelector('.close');
var carouselLeft = document.querySelector('.carousel-control.left');
var carouselRight = document.querySelector('.carousel-control.right');

if (screen.width / screen.height > 1.2268)
    blackScreen.style.alignItems = "flex-start";
else
    blackScreen.style.alignItems = "center";

document.body.onload = function() {
    loadContent("load_gallery");
};

function openMedia(event, media) {
        event.preventDefault();
        InnerMedia(media);
        blackScreen.style.display = "flex";
        currentImage = media;
        getCurrentImageNumber();
        document.body.style.overflow = "hidden";
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

$(window).scroll(function() {
        loadMore("load_gallery");
});

blackScreen.addEventListener('click', function(event) {
    var target = event.target;
    if (target.className == "black_screen") {
        closeMedia();
    }
});


close.addEventListener('click', closeMedia);

function closeMedia() {
    blackScreen.style.display = "none";
    document.body.style.overflow = "auto";
    mediaOpened.removeChild(mediaOpened.lastElementChild);
}

function nextMedia() {
    mediaOpened.removeChild(mediaOpened.lastElementChild);
    currentImage = currentImage.nextElementSibling || currentImage.parentNode.firstElementChild;
    getCurrentImageNumber();
    InnerMedia(currentImage);
}

carouselLeft.addEventListener('click', previousMedia);

function previousMedia() {
    mediaOpened.removeChild(mediaOpened.lastElementChild);
    currentImage = currentImage.previousElementSibling || currentImage.parentNode.lastElementChild;
    getCurrentImageNumber();
    InnerMedia(currentImage);
}

carouselRight.addEventListener('click', nextMedia);

function getCurrentImageNumber() {
    var index = $(currentImage).index() + 1;
    counter.innerHTML = index + " из " + currentImage.parentNode.children.length;
}

