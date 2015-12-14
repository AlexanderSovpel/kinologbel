<?php

//echo "hello world";
$dbConnection;
$connect_error_message = 'РќРµ СѓРґР°Р»РѕСЃСЊ СЃРѕРµРґРёРЅРёС‚СЊСЃСЏ: ';
$error = "";

$dbConnection = new mysqli('localhost', 'root', 'alexico1407', 'kinolog_test');
if ($dbConnection->connect_error) {
   die($connect_error_message . $dbConnection->connect_error);
   }
//else echo "db РїРѕРґРєР»СЋС‡РµРЅР°\n";

//echo $_REQUEST['action']."\n";
switch($_REQUEST['action']) {
    case 'load_articles':
        $query = "SELECT * FROM posts LIMIT " . $_REQUEST['from'].",".$_REQUEST['to'];
        loadSpecificArticles($dbConnection, $query);
        break;

    case 'load_health':
        $query = "SELECT * FROM posts WHERE tags LIKE '%здоровье%' ORDER BY date DESC";
        loadSpecificArticles($dbConnection, $query);
        break;

    case 'load_grow':
        $query = "SELECT * FROM posts WHERE tags LIKE '%развитии%' ORDER BY date DESC";
        loadSpecificArticles($dbConnection, $query);
        break;

    case 'load_breed':
        $query = "SELECT * FROM posts WHERE tags LIKE '%воспитании%' ORDER BY date DESC";
        loadSpecificArticles($dbConnection, $query);
        break;

//    default: echo "oh no!\n";
}

function loadSpecificArticles($dbConnection, $query) {
    $result = $dbConnection->query($query);
    $articles = "";

    while ($article = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
//        echo "что-то\n";
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
