/**
 * Created by Alexander on 02.12.15.
 */
//var media = document.querySelectorAll('.media');
document.body.onload = function() {
    loadContent("load_gallery");

    ////Открыть изображение/видео
    //for (var i = 0; i < media.length; ++i) {
    //    media[i].addEventListener('click', onMediaClick(i), false);
    //} //TODO: �� �������� ���������� ������� ._.

    var articleMedia = document.querySelector('.article_media');
    articleMedia.addEventListener('click', function (event) {
        alert("Hello!!!");
        var target = event.target;

        while (target != this) {
            if (target.className == "media") {
                openMedia(target);
                return;
            }
            target = target.parentNode;
        }
    }, false);
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

var mediaOpened = document.querySelector('.media_opened');
var blackScreen = document.querySelector('.black_screen');
var innerMedia;
var counter = document.querySelector('.counter');
var currentImage;

//Закрыть изображение/видео
var close = document.querySelector('.close');
close.addEventListener('click', function() {
    blackScreen.style.display = "none";
    document.body.style.overflow = "auto";
    mediaOpened.removeChild(mediaOpened.lastElementChild);
});

//Следующее изображение/видео
var carouselLeft = document.querySelector('.carousel-control.left');

function nextMedia() {
    mediaOpened.removeChild(mediaOpened.lastElementChild);
        currentImage = currentImage.previousElementSibling || currentImage.parentNode.lastElementChild;
    getCurrentImageNumber();
    InnerMedia(currentImage);
}

carouselLeft.addEventListener('click', nextMedia);

//Предыдущее изображение/видео
var carouselRight = document.querySelector('.carousel-control.right');

function previousMedia() {
    mediaOpened.removeChild(mediaOpened.lastElementChild);
        currentImage = currentImage.nextElementSibling || currentImage.parentNode.firstElementChild;
    getCurrentImageNumber();
    InnerMedia(currentImage);
}

carouselRight.addEventListener('click', previousMedia);

//Получить номер изображения/видео в блоке
function getCurrentImageNumber() {
    var index = $(currentImage).index() + 1;
    counter.innerHTML = index + " из " + currentImage.parentNode.children.length;
    //console.log(index + " из " + currentImage.parentNode.children.length);
}

function getCurrentImageDescription() {
    //TODO: написать ajax-запрос для подгрузки описания из базы
}