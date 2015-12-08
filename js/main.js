/**
 * Created by Alexander on 29.11.15.
 */

//«агрузить больше статей/фоток, если прокрутили до конца
window.addEventListener('scroll', function() {
    if (!document.documentElement.scrollTop)
        upScroll.style.display = "none";
    else
        upScroll.style.display = "block";
    var inProcess = false;
    var scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    ); //¬ысота страницы с учЄтом прокрутки

    var currentPosition = document.documentElement.scrollTop + document.documentElement.clientHeight;
    //≈сли страница прокручена до конца

    if(currentPosition == scrollHeight) { //TODO: добавить проверку, не выполн€етс€ ли сейчас запрос

        //TODO: заменить на код ajax-запроса
        var sampleArticle = (document.querySelector('article')).cloneNode(true);
        var content = document.querySelector('.content');

        setTimeout(function() {
            content.appendChild(sampleArticle);
        }, 1000);
    }
});


var upScroll = document.querySelector('.up');
upScroll.addEventListener('click', function() {
   window.scrollTo(0, 0);
});
//if (document.documentElement.clientWidth <= 480) {
//    upScroll.childNodes[1].remove();
//}
//else {
//    upScroll.appendChild(document.createElement('p').innerHTML)
//}

var dropdownMobileToggle = document.querySelector('.dropdown-mobile-toggle');
var dropdownMobile = document.querySelector('.dropdown-mobile');
dropdownMobile.style.display = "none";
dropdownMobileToggle.addEventListener('click', function() {
    if (dropdownMobile.style.display == "none")
        dropdownMobile.style.display = "block";
    else
        dropdownMobile.style.display = "none";
});

