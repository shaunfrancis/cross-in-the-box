<?php
namespace UK\Maps;

class General2010 extends \Shared\Map{
    static function render(): void { 
        echo file_get_contents('public/maps/UK-2010.svg');
    }
}