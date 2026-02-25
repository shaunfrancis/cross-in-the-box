<?php
namespace USA\Maps;

class Presidential2024 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/USA-presidential-2024.svg',
        'geographic' => 'public/maps/USA-presidential-2024-geographic.svg',
    );
}
class Presidential2012 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/USA-presidential-2012.svg',
        'geographic' => 'public/maps/USA-presidential-2012-geographic.svg',
    );
}

class Senate1960 extends \Shared\Map{
    static $classNo = NULL;
    static function render($type = "cartographic"): void { ?>
        <div class="ElectionResultContainer__map-container">
            <?php foreach(static::$types as $key => $path) : ?>
                <?php if($key === $type) : ?>
                    <div data-map-type="<?= $type; ?>" data-src="<?= $path; ?>" data-class-no="<?= static::$classNo; ?>">
                        <?= !empty(static::$types[$type]) ? file_get_contents(static::$types[$type]) : ''; ?>
                    </div>
                <?php else : ?>
                    <div class="hidden" data-map-type="<?= $key; ?>" data-src="<?= $path; ?>" data-class-no="<?= static::$classNo; ?>"></div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    <?php }
}

class Senate1960C1 extends Senate1960{
    static $classNo = 1;
    static $types = array(
        'cartographic' => 'public/maps/USA-senate-1960-C1.svg',
        'geographic' => 'public/maps/USA-senate-1960-geographic.svg',
    );
}
class Senate1960C2 extends Senate1960{
    static $classNo = 2;
    static $types = array(
        'cartographic' => 'public/maps/USA-senate-1960-C2.svg',
        'geographic' => 'public/maps/USA-senate-1960-geographic.svg',
    );
}
class Senate1960C3 extends Senate1960{
    static $classNo = 3;
    static $types = array(
        'cartographic' => 'public/maps/USA-senate-1960-C3.svg',
        'geographic' => 'public/maps/USA-senate-1960-geographic.svg',
    );
}

class House2024 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/USA-house-2022.svg',
        'geographic' => 'public/maps/USA-house-2024-geographic.svg',
    );
}
class House2022 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/USA-house-2022.svg',
        'geographic' => 'public/maps/USA-house-2022-geographic.svg',
    );
}
class House2020 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/USA-house-2012.svg',
        'geographic' => 'public/maps/USA-house-2020-geographic.svg',
    );
}
class House2018 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/USA-house-2012.svg',
        'geographic' => 'public/maps/USA-house-2018-geographic.svg',
    );
}
class House2016 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/USA-house-2012.svg',
        'geographic' => 'public/maps/USA-house-2016-geographic.svg',
    );
}
class House2014 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/USA-house-2012.svg',
        'geographic' => 'public/maps/USA-house-2012-geographic.svg',
    );
}

class Gubernatorial1960 extends \Shared\Map{
    static $types = array(
        'cartographic' => 'public/maps/USA-gubernatorial-1960.svg',
        'geographic' => 'public/maps/USA-gubernatorial-1960-geographic.svg',
    );
}