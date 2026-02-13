<?php
namespace Hungary;

class RegionSearchSection extends \Shared\RegionSearchSection{
    static function render(?string $type = NULL, ?string $partyWidth = NULL){
        parent::render(type: $type, partyWidth: $partyWidth ?: "6em");
    }
}