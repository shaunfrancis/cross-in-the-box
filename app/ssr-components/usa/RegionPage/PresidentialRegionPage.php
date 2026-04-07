<?php
namespace USA\RegionPage;

class Presidential extends \USA\RegionPage{
    
    // delete boundary change notices
    static function renderTreeChangeNote(
        array $event, array $currentRegion, array $data, ?callable $renameLabel = NULL, string $changesLabel = ""
    ){
        return;
    }
    
}