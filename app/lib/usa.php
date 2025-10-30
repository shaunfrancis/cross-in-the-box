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