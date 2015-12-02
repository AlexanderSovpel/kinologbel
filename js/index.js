/**
 * Created by Alexander on 02.12.15.
 */

//Показать остальную часть статьи
var readMore = document.querySelectorAll(".read_more");
for (var i = 0; i < readMore.length; ++i) {
    readMore[i].addEventListener('click', function() {
        this.style.display = "none";
        this.nextElementSibling.style.display = "block";
    });
}

function getMoreArticles() {
    //TODO: ajax-запрос подгрузка следующих 3-х статей
}