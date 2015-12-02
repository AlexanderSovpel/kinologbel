/**
 * Created by Alexander on 29.11.15.
 */

//��������� ������ ������/�����, ���� ���������� �� �����
window.addEventListener('scroll', function() {
    var inProcess = false;
    var scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    ); //������ �������� � ������ ���������

    var currentPosition = document.documentElement.scrollTop + document.documentElement.clientHeight;
    //���� �������� ���������� �� �����

    if(currentPosition == scrollHeight) { //TODO: �������� ��������, �� ����������� �� ������ ������

        //TODO: �������� �� ��� ajax-�������
        var sampleArticle = (document.querySelector('article')).cloneNode(true);
        var content = document.querySelector('.content');

        setTimeout(function() {
            content.appendChild(sampleArticle);
        }, 1000);
    }
});
