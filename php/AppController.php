<?php

/**
 * Created by PhpStorm.
 * User: Alexander
 * Date: 18.12.15
 * Time: 01:44
 */
include("User.php");

class AppController
{
    private $dbConnection;
    const connect_error_message = 'Не удалось соединиться: ';
    private $error = "";

    private $user;

    function __construct()
    {
        $this->dbConnection = new mysqli('localhost', 'root', 'alexico1407', 'kinolog_test');
        if ($this->dbConnection->connect_error) {
            die($this->connect_error_message . $this->dbConnection->connect_error);
        }
    }

    public function login($name, $password)
    {
        $name = $this->dbConnection->real_escape_string($name); /* SQL-injection  prevent */
        $password = $this->dbConnection->real_escape_string($password);
        $passwordHash = md5($password);

        $userId = $this->selectUserId($name, $passwordHash);
        if ($userId) {
            setcookie("name", $name);
            setcookie("password_hash", $passwordHash);
            header("Location: ../edit_articles.html");
        } else $this->error = "error";
        echo $this->error;
    }

    public function search($for)
    {
        $query = "SELECT * FROM `posts` WHERE MATCH (`title`, `article`) AGAINST ('%$for%')";
        $result = $this->dbConnection->query($query);
        echo "Поиск по: \"".$for."\", найдено $result->num_rows\n";

        while ($article = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $articles = "<article>" .
                "<input name='article_id' type='hidden' value=" . $article['id'] . ">" .
                "<h1>" . $article['title'] . "</h1>" .
                "<time>" . $article['date'] . "</time>" .
                "<div class='article_text'>" . $article['article'] . "</div>" .
                "<a class='read_more' onclick='readMoreClick(event)'>Читать далее...</a>" .
                "<div class='tags'>";

            $tags = explode(", ", $article['tags']);
            foreach ($tags as $tag) {
                $articles .= "<span onclick='searchByTag(\"$tag\")'>" . $tag . "</span>";
            }
            $articles .= "</div></article>";
            echo $articles;
        }
    }

    function loadAllArticles()
    {
        $query = "SELECT * FROM posts ORDER BY date DESC";
        $result = $this->dbConnection->query($query);

        while ($article = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $articles = "<article>" .
                "<input name='article_id' type='hidden' value=" . $article['id'] . ">" .
                "<h1>" . $article['title'] . "</h1>" .
                "<time>" . $article['date'] . "</time>" .
                "<div class='article_text'>" . $article['article'] . "</div>" .
                "<div class='tags'>";

            $tags = explode(", ", $article['tags']);
            foreach ($tags as $tag) {
                $articles .= "<span>" . $tag . "</span>";
            }
            $articles .= "</div></article>";
            echo $articles;
        }
    }

    function loadAllGallery()
    {
        $query = "SELECT * FROM gallery";
        $result = $this->dbConnection->query($query);
        while ($article = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $articles = "<article>" .
                "<input name='article_id' type='hidden' value=" . $article['id'] . ">" .
                "<h1>" . $article['title'] . "</h1>" .
                "<time>" . $article['date'] . "</time>" .
                "<div class='article_media'>";

            $query = "SELECT * FROM gallery_photos WHERE post_id=" . $article['id'];
            $result = $this->dbConnection->query($query);
            $photos = "</ul>";

            while ($photo = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                $photos .= "<li>" . $photo['path'] . "</li>";
            }

            $articles .= $photos . "</ul></div></article>";
            echo $articles;
        }
    }

    function loadSpecificArticles($query)
    {
        $result = $this->dbConnection->query($query);
        while ($article = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $articles = "<article>" .
                "<input name='article_id' type='hidden' value=" . $article['id'] . ">" .
                "<h1>" . $article['title'] . "</h1>" .
                "<time>" . $article['date'] . "</time>" .
                "<div class='article_text'>" . $article['article'] . "</div>" .
                "<a class='read_more' onclick='readMoreClick(event)'>Читать далее...</a>" .
                "<div class='tags'>";

            $tags = explode(", ", $article['tags']);
            foreach ($tags as $tag) {
                $articles .= "<span onclick='searchByTag(\"$tag\")'>" . $tag . "</span>";
            }
            $articles .= "</div></article>";
            echo $articles;
        }
    }

    function loadSpecificGallery($query)
    {
        $result = $this->dbConnection->query($query);
        while ($article = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $articles = "<article>" .
                "<input name='article_id' type='hidden' value=" . $article['id'] . ">" .
                "<h1>" . $article['title'] . "</h1>" .
                "<time>" . $article['date'] . "</time>" .
                "<div class='article_media'>";

            $query1 = "SELECT * FROM gallery_photos WHERE post_id=" . $article['id'];
            $result1 = $this->dbConnection->query($query1);
            $photos = "";

            while ($photo = mysqli_fetch_array($result1, MYSQLI_ASSOC)) {
                if ($photo['type'] == "video") {
                    $photos .= "<video class='media' title='" . $photo['description'] . "' onclick='openMedia(event, this)' controls>" .
                        "<source src='" . $photo['path'] . "' type='video/mp4' >" .
                        "Извините, видео не поддерживается вашим браузером. <a href='" . $photo['path'] . "'>Ссылка для скачивания</a>" .
                        "</video>";
                } else {
                    $photos .= "<img src='" . $photo['path'] . "'" .
                        "title='" . $photo['description'] . "'" .
                        "class='media' onclick='openMedia(event, this)'>";
                }
            }

            $articles .= $photos . "</div></article>";
            echo $articles;
        }
    }

    public function register($email, $name, $tel, $time, $detail)
    {
        $name = $this->dbConnection->real_escape_string($name);
        $email = $this->dbConnection->real_escape_string($email);
        $tel = $this->dbConnection->real_escape_string($tel);
        $time = $this->dbConnection->real_escape_string($time);
        $detail = $this->dbConnection->real_escape_string($detail);

        $from = "From: " . $email;
        $subject = "Запись на занятие";
        $message = "Имя: " . $name . "\n" .
            "Контактный телефон: " . $tel . "\n" .
            "Время: " . $time . "\n" .
            "Информация о собаке: " . $detail;
        echo mail("kinologbel@gmail.com", $subject, $message, $from);
    }


    public function logout()
    {
        setcookie("name", "");
        setcookie("password_hash", "");
    }

    public function saveNote($id, $title, $article, $tags)
    {
        $date = date("Y-m-d");
        if ($title != "") {
            if (!$this->isNoteExists($id)) {
                echo "New note\n";
                $query = "INSERT INTO posts (title, article, date, tags)
                    VALUES ('$title', '$article', '$date', '$tags')";
                $result = $this->dbConnection->query($query);
                if ($result) {
                    echo "New note added\n";
                }
            } else {
                echo "Existing note\n";
                $query = "UPDATE posts SET title='" . $title . "', article='" . $article . "', date='" . $date . "', tags='$tags'
                WHERE id='" . $id . "'";
                $result = $this->dbConnection->query($query);
                if ($result) {
                    echo "Note updatet\n";
                }
            }
        }
    }

    public function saveGallery($id, $title, $files) {
        $date = date("Y-m-d");
        if ($title != "") {
            if (!$this->isGalleryExists($id)) {
                echo "New gallery\n";
                $query = "INSERT INTO gallery (title, date)
                    VALUES ('$title', '$date')";
                $result = $this->dbConnection->query($query);
                if ($result) {
                    echo "New gallery added\n";
                }

                for ($i = 0; $i < $files->lenght; ++$i) {
                    $query = "INSERT INTO gallery_photos (post_id, type, path) VALUES ('$id', '".$files[$i]['type']."',
                    '".$files[$i]['name']."')";
                    $result = $this->dbConnection->query($query);
                    if ($result) {
                        echo "New file added\n";
                    }
                }

            } else {
                echo "Existing note\n";
                $query = "UPDATE posts SET title='" . $title . "', article='" . $article . "', date='" . $date . "', tags='$tags'
                WHERE id='" . $id . "'";
                $result = $this->dbConnection->query($query);
                if ($result) {
                    echo "Note updatet\n";
                }
            }
        }
    }

    public function deleteNote($id)
    {
        $query = "DELETE FROM posts WHERE id='" . $id . "'";
        $this->dbConnection->query($query);
    }

    public function deleteGallery($id) {
        $query = "DELETE FROM gallery WHERE id='" . $id . "'";
        $this->dbConnection->query($query);

        $query = "DELETE FROM gallery_photos WHERE post_id='" . $id . "'";
        $this->dbConnection->query($query);
    }

    public function getAccountInfo()
    {
        $this->user = unserialize($_SESSION['user']);
        $paramsStr = "email=" . $this->user->getEmail() . "&" .
            "name=" . $this->user->getName() . "&" .
            "notification_time=" . $this->user->getNotificationTime() . "&" .
            "notification_day=" . $this->user->getNotificationDay();
        return $paramsStr;
    }

    public function saveSettings($email, $name, $password, $passwordRepeat, $notificationTime, $notificationDay)
    {
        $this->user = unserialize($_SESSION['user']);
        $query = "UPDATE users SET ";
        $subqueryArr = [];
        $error = "";

        if ($email != $this->user->getEmail() && $email != "") {
            if ($this->validateEmail($email)) {
                if (!$this->isUserExists($email)) {
                    $subqueryArr[] = "email='" . $email . "'";
                    $this->user->setEmail($email);
                } else $error = "Пользователь с таким e-mail уже зарегистрирован в системе";
            } else $error = "Неверный формат e-mail адреса";
        }

        if ($name != $this->user->getName() && $name != "") {
            if ($this->validateName($name)) {
                $subqueryArr[] = "name='" . $name . "'";
                $_SESSION['name'] = $name;
                $this->user->setName($name);
            }
        }

        if ($notificationTime != $this->user->getNotificationTime()) {
            $subqueryArr[] = "notification_time='" . $notificationTime . "'";
            $this->user->setNotificationTime($notificationTime);
        }

        if ($notificationDay != $this->user->getNotificationDay()) {
            $subqueryArr[] = "notification_day='" . $notificationDay . "'";
        }

        if ($password != "") {
            if ($this->validatePassword($password)) {
                if ($passwordRepeat == $password) {
                    $passwordHash = md5($password);
                    $subqueryArr[] = "password_hash='" . $passwordHash . "'";
                    $this->user->setPasswordHash($passwordHash);
                } else $error = "Введённые пароли не совпадают";
            } else $error = "Пароль должен содержать не менее 6 символов";
        }

        $subqueryArr = implode(', ', $subqueryArr);

        $query .= $subqueryArr . " WHERE id='" . $this->user->getId() . "'";
        if ($error != "") {
            echo $error;
            exit();
        }

        $result = $this->dbConnection->query($query);
        if ($result) {
            $_SESSION['user'] = serialize($this->user);
            echo "OK";
        } else {
            echo $this->dbConnection->connect_error;
        }
    }

    private function isNoteExists($id)
    {
        if ($id != "") {
            $query = "SELECT title FROM posts WHERE id='" . $id . "'";
            $result = $this->dbConnection->query($query);
            if ($result != FALSE)
                return TRUE;
            else return FALSE;
        } else return FALSE;
    }

    private function isGalleryExists($id)
    {
        if ($id != "") {
            $query = "SELECT title FROM gallery WHERE id='" . $id . "'";
            $result = $this->dbConnection->query($query);
            if ($result != FALSE)
                return TRUE;
            else return FALSE;
        } else return FALSE;
    }

    public function validateName($name)
    {
        if ($name != "" && preg_match("`[A-Za-zА-Яа-я]`", $name))
            return TRUE;
        else return FALSE;
    }

    public function validateEmail($email)
    {
        if ($email != "" && filter_var($email, FILTER_VALIDATE_EMAIL))
            return TRUE;
        else return FALSE;
    }

    public function validatePassword($password)
    {
        if ($password != "" && strlen($password) >= 6)
            return TRUE;
        else return FALSE;
    }

    public function isUserExists($email)
    {
        $query = "SELECT id FROM users WHERE email = '" . $email . "'";
        $result = $this->dbConnection->query($query);
        $userExists = mysqli_fetch_array($result, MYSQLI_ASSOC);
        if ($userExists['id'] == "")
            return FALSE;
        else return TRUE;
    }

    public function selectUserInfo($userId)
    {
        $query = "SELECT name FROM users WHERE id = '" . $userId . "'";
        $result = $this->dbConnection->query($query);
        $userInfo = mysqli_fetch_array($result, MYSQLI_ASSOC);
        return $userInfo['name'];
    }

    private function selectUserId($name, $passwordHash)
    {
        $query = "SELECT id FROM users WHERE name = '" . $name . "' AND password_hash = '" . $passwordHash . "'";
        $result = $this->dbConnection->query($query);
        $userId = mysqli_fetch_array($result, MYSQLI_ASSOC);
        return $userId['id'];
    }

    private function setSessionInfo($userId, $name)
    {
        $_SESSION['user_id'] = $userId;
        $_SESSION['name'] = $name;
    }
}
