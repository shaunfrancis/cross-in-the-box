<?php namespace Canada;
/* Collection of reusable helper functions */

/* Duplicated in canada/lib.js */
function regionToSlug(string $title){
    return preg_replace(
        '/[\x{0300}-\x{036f}]/u', "", \Normalizer::normalize(
            preg_replace(
                '/œ/', "oe", preg_replace(
                    '/,|\.|\'|\)|\(/', "", preg_replace(
                        '/ |—/', "-", strtolower($title)
                    )
                )
            ),
            \Normalizer::FORM_D
        )
    );
}

function slugToLookupSlug(string $slug){
    if($slug == "ville-marie-le-sud-ouest-ile-des-soeurs") return "ville-marie-le-sud-ouest-ile-des-sœurs";
    return $slug;
};