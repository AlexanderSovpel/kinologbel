/**
 * Created by Alexander on 17.12.15.
 */
var registerButtonFst = document.querySelector('#register-fst');
registerButtonFst.addEventListener('click', scrollToRegistration);

var registerButtonSnd = document.querySelector('#register-snd');
registerButtonSnd.addEventListener('click', scrollToRegistration);

var successMessage = document.querySelector('#message');
var registrationForm = document.querySelector('.registration');
registrationForm.addEventListener('click', function(event) {
    var target = event.target;
    if (target.className == "form-control") {
        successMessage.innerHTML = "";
    }
});

var registerMain = document.getElementsByName('register')[0];
registerMain.addEventListener('click', function(event) {
    event.preventDefault();

    var name = document.querySelector('#name');
    var email = document.querySelector('#name');
    var tel = document.querySelector('#tel');
    var time = document.querySelector('#time');
    var dogDetail = document.querySelector('#dog-detail');

    if (name.value == "" || email.value == "" || tel.value == "" || dogDetail.value == "") {
        successMessage.className = "text-danger";
        successMessage.innerHTML = "Пожалуйста, заполните все поля";
        return;
    }

    var xmlHttp = getHttpRequest();
    var params = "action=register&" +
            "name=" + name.value + "&" +
            "email=" + email.value + "&" +
            "tel=" + tel.value + "&" +
            "time=" + time.value + "&" +
            "dog-detail=" + dogDetail.value;

    $.get("php/main.php?" + params, function(data) {
            if (data == "1") {
                successMessage.className = "text-success";
                successMessage.innerHTML = "Сообщение отправлено";
                name.value = "";
                email.value = "";
                tel.value = "";
                time.value = "";
                dogDetail.value = "";
            }
            else {
                successMessage.className = "text-danger";
                successMessage.innerHTML = "Возникла ошибка при отправке сообщения. Пожалуйста, повторите попытку позже";
            }
        });
});

google.maps.event.addDomListener(window, 'load', initialize);

function scrollToRegistration() {
    registrationForm.scrollIntoView(true);
}

function validateEmail(email) {
    var emailValidator = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (emailValidator.test(email))
        return true;
    else return false;
}

function initialize() {
    var myCenter = new google.maps.LatLng(53.884145, 27.495695);
    var mapProp = {
        center: myCenter,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var marker = new google.maps.Marker({
        position: myCenter
    });

    var infoWindow = new google.maps.InfoWindow({
        content:"53.884145, 27.495695\n" +
            "Площадка рядом с кожвендиспансером"
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map, marker);
    });

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    marker.setMap(map);
}
