/**
 * Created by Alexander on 02.12.15.
 */
//var content = document.querySelector('.content');
document.body.onload = loadContent("load_articles");
window.addEventListener('scroll', function() {
    if (isScrolledToBottom()){
        loadContent("load_articles");
    }
});

//пїЅпїЅпїЅпїЅпїЅпїЅпїЅ-пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ "пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅ..."
function readMoreClick(event) {
    event.target.style.display = "none";
    event.target.previousElementSibling.style.height = "auto";
    event.target.parentNode.firstChild.value;
}