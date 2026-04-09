<?php
namespace API;

class APIService{
    static bool $apiMode = FALSE;

    static string $country = "??";

    static function setup(string $country){
        self::$country = $country;

        return (object)[
            'attributes' => $country . "_attributes",
            'boundary_changes' => $country . "_boundary_changes",
            'candidates' => $country . "_candidates",
            'elections' => $country . "_elections",
            'message_links' => $country . "_message_links",
            'messages' => $country . "_messages",
            'parties' => $country . "_parties",
            'party_links' => $country . "_party_links",
            'polls' => $country . "_polls",
            'poll_figures' => $country . "_poll_figures",
            'pollsters' => $country . "_pollsters",
            'relationships' => $country . "_relationships",
            'results' => $country . "_results",
            'regions' => $country . "_regions",
            'update_links' => $country . "_update_links",
            'updates' => $country . "_updates"
        ];
    }

    static function call(array $request, ?array $params = []){}

    static function fetch($sql, $params = [], $ttl = 86400){

        $cache_path = sprintf(
            "%s/cache/%s-%s-%s", 
            __DIR__, self::$country, str_replace(['API\\', '\\'], '', static::class), md5($sql . serialize($params))
        );

        if(!empty($ttl) && file_exists($cache_path) && (filemtime($cache_path) + $ttl > time())){
            $results = unserialize(file_get_contents($cache_path));
            return $results;
        }
        else{
            $stmt = (DB::PDO()) -> prepare($sql);
            $success = $stmt -> execute($params);

            if($success){
                $results = $stmt -> fetchAll(\PDO::FETCH_ASSOC);

                if(!empty($ttl)) file_put_contents($cache_path, serialize($results));

                return $results;
            }
            return throw new \Exception();
        }
    }

    static function fail($status, $error){
        if(self::$apiMode){
            http_response_code($status);
            return array("error" => $error);
        }
        else return array("status" => $status, "error" => $error);
    }
}