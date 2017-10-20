<?php
session_start();

include("AppController.php");
$appController = new AppController();

switch($_REQUEST['action']) {
    case 'search':
        $appController->search($_REQUEST['search_for']);
        break;

    case 'login':
        $appController->login($_REQUEST['name'], $_REQUEST['password']);
        break;

    case 'load_all_articles':
        $appController->loadAllArticles();
        break;

    case 'load_all_gallery':
        $appController->loadAllGallery();
        break;

    case 'load_articles':
        $query = "SELECT * FROM `posts` ORDER BY date DESC LIMIT {$_REQUEST['from']}, 3";
        $appController->loadSpecificArticles($query);
        break;

    case 'load_health':
        $query = "SELECT * FROM posts WHERE tags LIKE '%здоровье%' ORDER BY date DESC";
        $appController->loadSpecificArticles($query);
        break;

    case 'load_grow':
        $query = "SELECT * FROM posts WHERE tags LIKE '%развитии%' ORDER BY date DESC";
        $appController->loadSpecificArticles($query);
        break;

    case 'load_breed':
        $query = "SELECT * FROM posts WHERE tags LIKE '%воспитании%' ORDER BY date DESC";
        $appController->loadSpecificArticles($query);
        break;

    case 'load_gallery':
        $query = "SELECT * FROM `gallery` ORDER BY date DESC LIMIT {$_REQUEST['from']}, 3";
        $appController->loadSpecificGallery($query);
        break;

    case 'register':
        $appController->register($_REQUEST['email'], $_REQUEST['name'], $_REQUEST['tel'], $_REQUEST['time'], $_REQUEST['dog-detail']);
        break;

    case 'save_article':
        $appController->saveNote($_REQUEST['current_id'], $_REQUEST['current_title'], $_REQUEST['current_text'], $_REQUEST['current_tags']);
        break;

    case 'save_gallery':
        $appController->saveGallery($_REQUEST['current_id'], $_REQUEST['current_title'], $_FILES['gallery_files']);
        break;

    case 'delete_article':
        $appController->deleteNote($_REQUEST['current_id']);
        break;

    case 'logout':
        $appController->logout();
        break;
}

function validatePassword($password)
{
    if ($password != "" && strlen($password) >= 6)
        return TRUE;
    else return FALSE;
}