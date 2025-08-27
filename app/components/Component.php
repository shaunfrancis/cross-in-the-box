<?php
namespace Base;

class Component{

    static function show(...$args){
        ob_start();
        static::render(...$args);
        echo ob_get_clean();
    }

    static function open(...$args){
        ob_start();
        static::renderOpen(...$args);
    }
    static function close(...$args){
        echo static::renderClose(...$args);
        echo ob_get_clean();
    }

}