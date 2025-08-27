<?php
function getCountryAbbrev(){ return "uk"; }
function getCountryName(){ return "United Kingdom"; }
function getLinks(){
    return [
        ['title' => "General Elections", 'path' => "/uk/general-elections"],
        ['title'=> "Scottish Parliament", 'path' => "https://politics.tennessine.co.uk/uk/scottish-parliament-elections/overview/citb" ],
        ['title' => "Senedd Cymru", 'path' => "https://politics.tennessine.co.uk/uk/senedd-cymru-elections/overview/citb" ]
    ];
}

echo $children;