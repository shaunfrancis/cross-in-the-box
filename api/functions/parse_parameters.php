<?php
    function parse_parameters($string){
        $parameters = [];
        
        $parameter_strings = explode("&", $string);
        foreach($parameter_strings as $parameter_string){
            $parameter_array = explode("=", $parameter_string);
            if(count($parameter_array) != 2) continue;
            $parameters[$parameter_array[0]] = $parameter_array[1];
        }

        return $parameters;
    }
?>