<?php

    $request = array_filter( preg_split( '/\//', str_replace(['/elections/'], '', $_SERVER['REQUEST_URI']) ) );
    if(str_contains($_SERVER['REQUEST_URI'], '.') || str_contains($_SERVER['REQUEST_URI'], '%2e')) error(404);

    $params = [
        'path' => [],
    ];
    if(str_contains(end($request), "?")){
        $query_strings = preg_split( '/(\?|&)/', end($request) );
        $request[count($request) - 1] = array_shift($query_strings);
        foreach($query_strings as $query){
            $query = explode('=', $query);
            if(preg_match('/[^a-zA-Z]/', $query[0])) continue;
            else if($query[0] === "path") continue;
            $params[$query[0]] = $query[1] ?? TRUE;
        }
    }

    spl_autoload_register( function() use ($request) {
        require_once sprintf('%s/app/components/Component.php', __DIR__);
        $country = $request[0] ?? "*";
        $search = sprintf('%s/app/components/{shared,$s}/*/*.php', __DIR__, $country);
        foreach( glob($search, GLOB_BRACE) as $file ){
            require_once($file);
        }
    });

    while(count($request) >= 0){
        $path = implode('/', $request);
        if( isSanitaryPath($path) && file_exists(sprintf('app/pages/%s/index.php', $path)) ) renderPage($path, $params);
        else{
            array_unshift($params['path'], end($request));
            array_pop($request);
        }
    }

    function isSanitaryPath($path, $file = 'index.php'){
        $startOfPath = dirname(__FILE__) . "/app/pages";
        $realPath = realpath(sprintf('app/pages/%s/%s', $path, $file));
        return ($realPath !== FALSE && str_starts_with($realPath, $startOfPath));
    }

    function renderPage($path, $params = []){
        $fullPath = sprintf('app/pages/%s/index.php', $path);
        if(isSanitaryPath($path) && file_exists($fullPath)){
            ob_start();
            require $fullPath;
            echo renderLayouts(ob_get_clean(), $path . '/index.php');
        }
        else error(404);
        exit;
    }

    function nextLayoutPath($path){
        $directory = dirname($path);
        while($path !== $directory){
            $path = $directory;
            if(isSanitaryPath($directory, 'layout.php')){
                return $directory;
            }
            $directory = dirname($directory);
        }
        return NULL;
    }

    function renderLayouts($children, $path){
        $layoutPath = nextLayoutPath($path);
        if(empty($layoutPath)) return $children;
        else{
            ob_start();
            require sprintf("app/pages/%s/layout.php", $layoutPath);
            return renderLayouts(ob_get_clean(), $layoutPath);
        }
    }

    function error($status){
        echo match($status){
            404 => "404",
        };
        exit;
    }
?>