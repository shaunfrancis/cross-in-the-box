<?php namespace USA;
/* Collection of reusable helper functions */

/* Duplicated in usa/lib.js */
function regionToSlug(string $title){
    return preg_replace(
        '/,|\)|\(/', "", preg_replace(
            '/ /', "-", strtolower($title)
        )
    );
};

function slugToLookupSlug(string $slug){
    return $slug;
};

function getBaseId(string $id){
    // get two-letter state abbreviation from any US region ID
    return substr(
        preg_replace('/[0-9]/', '', 
            preg_replace('/^(S|G|[0-9])/', '', $id)
        ), 0, 2
    );
}