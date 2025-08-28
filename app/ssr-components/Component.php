<?php
namespace Base;

class Component{

    static function show(...$args){
        ob_start();
        static::render(...$args);
        return ob_get_clean();
    }

    static function open(...$args){
        ob_start();
        static::renderOpen(...$args);
    }
    static function close(...$args){
        static::renderClose(...$args);
        return ob_get_clean();
    }

}