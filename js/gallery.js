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

function openMedia(media) {
    blackScreen.style.display = "block";
    innerMedia.src = media.src;
    currentImage = media;
    getCurrentImageNumber();
    document.body.style.overflow = "hidden";

}

window.addEventListener('scroll', function() {
    if (isScrolledToBottom()){
        loadContent("load_gallery");
    }
});


var blackScreen = document.querySelector('.black_screen');
var innerMedia = document.querySelector('.inner_media');
var counter = document.querySelector('.counter');
var currentImage;




//Закрыть изображение/видео
var close = document.querySelector('.close');
close.addEventListener('click', function() {
    blackScreen.style.display = "none";
    document.body.style.overflow = "auto";

});

//Следующее изображение/видео
var carouselLeft = document.querySelector('.carousel-control.left');
carouselLeft.addEventListener('click', function() {
    currentImage = currentImage.previousElementSibling || currentImage.parentNode.lastElementChild;
    getCurrentImageNumber();
    innerMedia.src = currentImage.src;
});

//Предыдущее изображение/видео
var carouselRight = document.querySelector('.carousel-control.right');
carouselRight.addEventListener('click', function() {
    currentImage = currentImage.nextElementSibling || currentImage.parentNode.firstElementChild;
    getCurrentImageNumber();
    innerMedia.src = currentImage.src;
});

//Получить номер изображения/видео в блоке
function getCurrentImageNumber() {
    var index = $(currentImage).index() + 1;
    counter.innerHTML = index + " из " + currentImage.parentNode.children.length;
    //console.log(index + " из " + currentImage.parentNode.children.length);
}

function getCurrentImageDescription() {
    //TODO: написать ajax-запрос для подгрузки описания из базы
}