<?php

/**
 * Created by PhpStorm.
 * User: Alexander
 * Date: 22.04.15
 * Time: 05:37
 */
include("Article.php");

class User
{
    private $id;
    private $name;
    private $password_hash;
    private $articles;
    private $gallery;

    function __construct($id, $name, $password_hash)
    {
        $this->id = $id;
        $this->name = $name;
        $this->articles = array();
        $this->gallery = array();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getPasswordHash()
    {
        return $this->password_hash;
    }

    /**
     * @param mixed $password_hash
     */
    public function setPasswordHash($password_hash)
    {
        $this->password_hash = $password_hash;
    }

    /**
     * @return mixed
     */
    public function getArticles()
    {
        return $this->articles;
    }

    /**
     * @param mixed $articles
     */
    public function setArticles($articles)
    {
        $this->articles = $articles;
    }

    public function addArticle($article)
    {
        $this->articles[] = $article;
    }

    public function deleteArticle($articleId)
    {
        for ($i = 0; $i < count($this->articles); ++$i) {
            if ($this->articles[$i]->getId() == $articleId) {
                unset($this->articles[$i]);
            }
        }
    }

    public function findArticleById($articleId) {
        for ($i = 0; $i < count($this->articles); ++$i) {
            if ($this->articles[$i]->getId() == $articleId)
                return $this->articles[$i];
        }
    }

    public function __toString() {
        return "ID: ".$this->getId() . "\n" .
            "Name: ".$this->getName() . "\n" .
            "Password hash: ".$this->getPasswordHash() . "\n";
    }

    /**
     * @return array
     */
    public function getGallery()
    {
        return $this->gallery;
    }

    /**
     * @param array $gallery
     */
    public function setGallery($gallery)
    {
        $this->gallery = $gallery;
    }

    public function addGallery($galleryPost)
    {
        $this->gallery[] = $galleryPost;
    }

    public function deleteGallery($galleryPostId)
    {
        for ($i = 0; $i < count($this->gallery); ++$i) {
            if ($this->gallery[$i]->getId() == $galleryPostId) {
                unset($this->gallery[$i]);
            }
        }
    }

    public function findGalleryById($galleryPostId) {
        for ($i = 0; $i < count($this->gallery); ++$i) {
            if ($this->gallery[$i]->getId() == $galleryPostId)
                return $this->gallery[$i];
        }
    }
}
