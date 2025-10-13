<?php
namespace Shared;

class HeroNav extends \Base\Component{

    static function render(array $items = []): void { ?>
    
        <nav id="HeroNav">
            <ul>
                <?php foreach($items as $item) echo HeroNav::renderItem($item); ?>
            </ul>
        </nav>
       
    <?php }

    static function renderItem(array $item): string {
        ob_start(); ?>
        
        <li class="HeroNav__item" data-id="<?= $item['id'] ?? ''; ?>"<?= !empty($item['focus']) ? 'data-focus="' . $item['focus'] . '"' : ''; ?>> 
            <img src="/public/<?= $item['src']; ?>" />
            <span><?= $item['title']; ?></span>
        </li>
    
    <?php return ob_get_clean();
    }
}