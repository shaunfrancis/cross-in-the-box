<?php
namespace USA;

class StateLinks extends \Base\Component{

    static function render(?string $id = NULL): void { 
        if(empty($id)) return;

        //get two-letter state abbreviation from ID
        $baseId = substr(
            preg_replace('/[0-9]/', '', 
                preg_replace('/^(S|G|[0-9])/', '', $id)
            ), 0, 2
        );
        if($baseId === "DC") return;

        $links = \API\USA\StateLinksService::call(["usa", NULL, $baseId]);
        if(empty($links) || !empty($links['error'])) return;

        ?>

        <section class="StateLinks">
            <h2>President</h2>
            <div class="StateLinks__button-group">
                <?php 
                $presidentialLinks = array_filter($links, fn($link) => $link['type'] === "presidential");
                usort($presidentialLinks, function($a, $b){
                    if(str_contains($a['title'], "at-large")) return -1;
                    else if(str_contains($b['title'], "at-large")) return 1;
                    else return strnatcmp($a['title'],  $b['title']);
                });
                foreach($presidentialLinks as $link): ?>
                    <a class="StateLinks__button<?= $link['region_id'] == $id ? " current" : ""; ?>"
                        href="/usa/presidential-elections/state/<?= regionToSlug($link['title']); ?>"
                        <?php if($link['elected']) : ?>
                            style="background:<?= $link['color'] ?? "var(--default-color)"; ?>; color:<?= $link['textColor'] ?? "#fff"; ?>;"
                        <?php endif; ?>
                    >
                        <?= ucfirst($link['label'] ?? $link['title']); ?>
                    </a>
                <?php endforeach; ?>
            </div>

            <h2>Senate</h2>
            <div class="StateLinks__button-group">
                <?php foreach(
                    array_filter($links, fn($link) => $link['type'] === "senate") as $link
                ): ?>
                    <a class="StateLinks__button<?= $link['region_id'] == $id ? " current" : ""; ?>"
                        href="/usa/senate-elections/state/<?= regionToSlug($link['title']); ?>"
                        <?php if($link['elected']) : ?>
                            style="background:<?= $link['color'] ?? "var(--default-color)"; ?>; color:<?= $link['textColor'] ?? "#fff"; ?>;"
                        <?php endif; ?>
                    >
                        <?= ucfirst($link['label'] ?? $link['title']); ?>
                    </a>
                <?php endforeach; ?>
            </div>

            <h2>House</h2>
            <div class="StateLinks__button-group">
                <?php foreach(
                    array_filter($links, fn($link) => $link['type'] === "house") as $link
                ): ?>
                    <a class="StateLinks__button<?= $link['region_id'] == $id ? " current" : ""; ?>"
                        href="/usa/house-elections/district/<?= regionToSlug($link['title']); ?>"
                        <?php if($link['elected']) : ?>
                            style="background:<?= $link['color'] ?? "var(--default-color)"; ?>; color:<?= $link['textColor'] ?? "#fff"; ?>;"
                        <?php endif; ?>
                    >
                        <?= ucfirst($link['label'] ?? $link['title']); ?>
                    </a>
                <?php endforeach; ?>
            </div>

            <h2>Governor</h2>
            <div class="StateLinks__button-group">
                <?php foreach(
                    array_filter($links, fn($link) => $link['type'] === "gubernatorial") as $link
                ): ?>
                    <a class="StateLinks__button<?= $link['region_id'] == $id ? " current" : ""; ?>"
                        href="/usa/gubernatorial-elections/state/<?= regionToSlug($link['title']); ?>"
                        <?php if($link['elected']) : ?>
                            style="background:<?= $link['color'] ?? "var(--default-color)"; ?>; color:<?= $link['textColor'] ?? "#fff"; ?>;"
                        <?php endif; ?>
                    >
                        <?= ucfirst($link['label'] ?? $link['title']); ?>
                    </a>
                <?php endforeach; ?>
            </div>
        </section>
    <?php }

}