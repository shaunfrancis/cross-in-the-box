<?php namespace NewZealand;
/* Collection of reusable helper functions */

/* Duplicated in new-zealand/lib.js */
function regionToSlug(string $title){
    return preg_replace(
        '/[\x{0300}-\x{036f}]/u', "", \Normalizer::normalize(
            preg_replace(
                '/,|\.|\'|\)|\(/', "", preg_replace(
                    '/ |—/', "-", mb_strtolower($title, 'UTF-8')
                )
            ),
            \Normalizer::FORM_D
        )
    );
}

function slugToLookupSlug(string $slug){
    return $slug;
};