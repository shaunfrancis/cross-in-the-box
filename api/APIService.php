<?php
namespace API;

class APIService{
    static function setup(string $country){
        return (object)[
            'boundary_changes' => $country . "_boundary_changes",
            'elections' => $country . "_elections",
            'message_links' => $country . "_message_links",
            'messages' => $country . "_messages",
            'parties' => $country . "_parties",
            'polls' => $country . "_polls",
            'poll_figures' => $country . "_poll_figures",
            'pollsters' => $country . "_pollsters",
            'results' => $country . "_results",
            'regions' => $country . "_regions",
            'updates' => $country . "_updates"
        ];
    }

    static function call(array $request){}

    static function fetch($sql, $params = []){
        $stmt = (DB::PDO()) -> prepare($sql);
        $success = $stmt -> execute($params);

        if($success){
            $results = $stmt -> fetchAll(\PDO::FETCH_ASSOC);
            return $results;
        }
        return throw new \Exception();
    }

    static function parse_parameters($string){
        $parameters = [];
        
        $parameter_strings = explode("&", $string);
        foreach($parameter_strings as $parameter_string){
            $parameter_array = explode("=", $parameter_string);
            if(count($parameter_array) != 2) continue;
            $parameters[$parameter_array[0]] = $parameter_array[1];
        }

        return $parameters;
    }

    static function fail($status, $error){
        http_response_code($status);
        return json_encode( array("error" => $error) );
    }
}