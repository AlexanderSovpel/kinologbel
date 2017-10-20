/**
 * Created by Alexander on 02.12.15.
 */
document.body.onload = loadContent("load_articles");
$(window).scroll(function() {
        loadMore("load_articles");
});

function readMoreClick(event) {
    event.target.style.display = "none";
    event.target.previousElementSibling.style.height = "auto";
    event.target.parentNode.firstChild.value;
}
