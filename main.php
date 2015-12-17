<?php

const to = "kinologbel@gmail.com";
$dbConnection;
$connect_error_message = 'РќРµ СѓРґР°Р»РѕСЃСЊ СЃРѕРµРґРёРЅРёС‚СЊСЃСЏ: ';
$error = "";

$dbConnection = new mysqli('localhost', 'root', 'alexico1407', 'kinolog_test');
if ($dbConnection->connect_error) {
   die($connect_error_message . $dbConnection->connect_error);
   }

switch($_REQUEST['action']) {
    case 'load_articles':
        $query = "SELECT * FROM posts LIMIT " . $_REQUEST['from'].",".$_REQUEST['to'];
        loadSpecificArticles($dbConnection, $query);
        break;

    case 'load_health':
        $query = "SELECT * FROM posts WHERE tags LIKE '%здоровье%' ORDER BY date ASC";
        loadSpecificArticles($dbConnection, $query);
        break;

    case 'load_grow':
        $query = "SELECT * FROM posts WHERE tags LIKE '%развитии%' ORDER BY date ASC";
        loadSpecificArticles($dbConnection, $query);
        break;

    case 'load_breed':
        $query = "SELECT * FROM posts WHERE tags LIKE '%воспитании%' ORDER BY date ASC";
        loadSpecificArticles($dbConnection, $query);
        break;

    case 'load_gallery':
        $query = "SELECT * FROM gallery ORDER BY date ASC LIMIT " . $_REQUEST['from'].",".$_REQUEST['to'];
        loadSpecificGallery($dbConnection, $query);
        break;

    case 'register':
        $from = "From: " . $_REQUEST['email'];
        $subject = "Запись на занятие";
        $message = "Имя: " . $_REQUEST['name'] . "\n" .
            "Контактный телефон: " . $_REQUEST['tel'] . "\n" .
            "Время: " . $_REQUEST['time'] . "\n" .
            "Информация о собаке: " . $_REQUEST['dog-detail'];
        echo mail(to, $subject, $message, $from);
        break;
}

function loadSpecificArticles($dbConnection, $query) {
    $result = $dbConnection->query($query);
    $articles = "";

    while ($article = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $articles .= "<article>".
            "<input name='article_id' type='hidden' value=".$article['id'].">".
            "<h1>" . $article['title'] . "</h1>".
            "<time>" . $article['date'] . "</time>".
            "<div class='article_text'>" . $article['article'] . "</div>".
            "<a class='read_more' onclick='readMoreClick(event)'>Читать далее...</a>".
            "<div class='tags'>";

        $tags = explode(", ", $article['tags']);
        foreach ($tags as $tag) {
            $articles .= "<span onclick='searchByTag(\"$tag\")'>" . $tag . "</span>";
        }

        $articles .= "</div></article>";
    }

    echo $articles;
}


function loadSpecificGallery($dbConnection, $query) {
    $result = $dbConnection->query($query);
    $articles = "";

    while ($article = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $articles .= "<article>".
            "<input name='article_id' type='hidden' value=".$article['id'].">".
            "<h1>" . $article['title'] . "</h1>".
            "<time>" . $article['date'] . "</time>".
            "<div class='article_media'>";

        $query = "SELECT * FROM gallery_photos WHERE post_id=" . $article['id'];
        $result = $dbConnection->query($query);
        $photos = "";

        while ($photo = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            if ($photo['type'] == "video") {
                $photos .= "<video class='media' title='" . $photo['description'] . "' onclick='openMedia(event, this)' controls>" .
                    "<source src='" . $photo['path'] . "' type='video/mp4' >" .
                    "Извините, видео не поддерживается вашим браузером. <a href='" . $photo['path'] . "'>Ссылка для скачивания</a>" .
                    "</video>";
            }
            else {
                $photos .= "<img src='" . $photo['path'] . "'" .
                    "title='" . $photo['description'] . "'" .
                    "class='media' onclick='openMedia(event, this)'>";
            }
        }

        $articles .= $photos . "</div></article>";
    }

    echo $articles;

}

function loadSpecificPhotos($dbConnection, $query, $postId) {

}