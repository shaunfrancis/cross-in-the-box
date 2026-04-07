<?php namespace UK;
/* Collection of reusable helper functions */

/* Duplicated in uk/lib.js */
function regionToSlug(string $title){
    return preg_replace(
        '/ô/', "o", preg_replace(
            '/,|\)|\(/', "", preg_replace(
                '/ /', "-", strtolower($title)
            )
        )
    );
};

function slugToLookupSlug(string $slug){
    if($slug == "ynys-mon") return "ynys-môn";
    return $slug;
};