/**
 * Created by Alexander on 02.12.15.
 */

var blackScreen = document.querySelector('.black_screen');
var innerMedia = document.querySelector('.inner_media');
var counter = document.querySelector('.counter');
var currentImage;

//������� �����������/�����
var media = document.querySelectorAll('.media');
for (var i = 0; i < media.length; ++i) {
    media[i].addEventListener('click', function() {
        blackScreen.style.display = "block";
        innerMedia.src = this.src;
        currentImage = this;
        getCurrentImageNumber();
        document.body.style.overflow = "hidden";
    });
}

//������� �����������/�����
var close = document.querySelector('.close');
close.addEventListener('click', function() {
    blackScreen.style.display = "none";
    document.body.style.overflow = "auto";

});

//��������� �����������/�����
var carouselLeft = document.querySelector('.carousel-control.left');
carouselLeft.addEventListener('click', function() {
    currentImage = currentImage.previousElementSibling || currentImage;
    getCurrentImageNumber();
    innerMedia.src = currentImage.src;
});

//���������� �����������/�����
var carouselRight = document.querySelector('.carousel-control.right');
carouselRight.addEventListener('click', function() {
    currentImage = currentImage.nextElementSibling || currentImage;
    getCurrentImageNumber();
    innerMedia.src = currentImage.src;
});

//�������� ����� �����������/����� � �����
function getCurrentImageNumber() {
    var index = $(currentImage).index() + 1;
    counter.innerHTML = index + " �� " + currentImage.parentNode.children.length;
    //console.log(index + " �� " + currentImage.parentNode.children.length);
}

function getCurrentImageDescription() {
    //TODO: �������� ajax-������ ��� ��������� �������� �� ����
}

function getMoreImages() {
    //TODO: ajax-������ ��������� ��������� 2/3-� ������ ����������
}