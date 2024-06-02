<?php
    function uk_postcode_search($query){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://api.postcodes.io/postcodes?q=" . urlencode($query));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $data = curl_exec($ch);

        if(curl_getinfo($ch, CURLINFO_HTTP_CODE) != 200) return [];
        curl_close($ch);

        $data = json_decode($data, true);
        if(!isset($data['result'])) return [];

        $constituency_titles = [];
        foreach($data['result'] as $postcode){
            if(isset($postcode['parliamentary_constituency_2024']) && !in_array($postcode['parliamentary_constituency_2024'], $constituency_titles)){
                $constituency_titles[] = strtolower($postcode['parliamentary_constituency_2024']);
            }
        }
        
        return $constituency_titles;
    }
?>