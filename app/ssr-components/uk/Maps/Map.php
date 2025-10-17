<?php
namespace UK\Maps;

class General2024 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/UK-2024.svg',
        'geographic' => 'public/maps/UK-2024-geographic.svg',
    );
}

class General2010 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/UK-2010.svg',
        'geographic' => 'public/maps/UK-2010-geographic.svg',
    );
}


class Scotland2011 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/UK-S2011.svg',
    );
}


class Wales2007 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/UK-W2007.svg',
    );
}
