<?php namespace Hungary;
/* Collection of reusable helper functions */

/* Duplicated in hungary/lib.js */
function regionToSlug(string $title){
    return preg_replace(
        '/[\x{0300}-\x{036f}]/u', "", \Normalizer::normalize(
            preg_replace(
                '/ |—/', "-", strtolower($title)
            ),
            \Normalizer::FORM_D
        )
    );
}

function slugToLookupSlug(string $slug){
    return $slug;
};