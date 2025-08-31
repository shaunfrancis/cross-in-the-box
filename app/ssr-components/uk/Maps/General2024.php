<?php
namespace UK\Maps;

class General2024 extends \Shared\Map{
    static function render(): void { 
        echo file_get_contents('public/maps/UK-2024.svg');
    }
}