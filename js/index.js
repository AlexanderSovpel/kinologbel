/**
 * Created by Alexander on 02.12.15.
 */

//�������� ��������� ����� ������
var readMore = document.querySelectorAll(".read_more");
for (var i = 0; i < readMore.length; ++i) {
    readMore[i].addEventListener('click', function() {
        this.style.display = "none";
        this.nextElementSibling.style.display = "block";
    });
}

var gallery = new document.documentURI("../gallery.html");

document.write();

function getMoreArticles() {
    //TODO: ajax-������ ��������� ��������� 3-� ������
}