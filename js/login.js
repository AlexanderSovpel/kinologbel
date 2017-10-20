/**
 * Created by Alexander on 17.04.15.
 */
var error_p = document.querySelector('#restore_error');
var loginName = document.querySelector('#loginName');
var password = document.querySelector('#password');

function login() {
    var xmlhttp = getHttpRequest();
    var params = "action=login&" +
        "name=" + loginName.value + "&" +
        "password=" + password.value;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "error") { //TODO: !!!
                error_p.innerHTML = "Неправильный логин или пароль";
            }
            else {
                location.href = xmlhttp.responseURL;
            }
        }
    }

    xmlhttp.open("GET", "php/main.php?" + params, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (params != null)
        xmlhttp.setRequestHeader("Content-length", params.length);
    xmlhttp.setRequestHeader("Connection", "close");
    xmlhttp.send();
}
