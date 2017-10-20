<?php

/**
 * Created by PhpStorm.
 * User: Alexander
 * Date: 18.12.15
 * Time: 02:25
 */
class GalleryPost
{
    private $id;
    private $title;
    private $files;
    private $date;

    /**
     * GalleryPost constructor.
     * @param $id
     * @param $title
     * @param $files
     * @param $date
     */
    public function __construct($id, $title, $files, $date)
    {
        $this->id = $id;
        $this->title = $title;
        $this->files = $files;
        $this->date = $date;
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
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getFiles()
    {
        return $this->files;
    }

    /**
     * @param mixed $files
     */
    public function setFiles($files)
    {
        $this->files = $files;
    }

    /**
     * @return mixed
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @param mixed $date
     */
    public function setDate($date)
    {
        $this->date = $date;
    }

    function __toString()
    {
        return "ID: ".$this->getId() . "\n" .
        "Title: ".$this->getTitle() . "\n" .
        "Files: ".$this->getFiles() . "\n" .
        "Date: ".$this->getDate() . "\n";
    }


}