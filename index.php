<?php
    $request = array_values( array_filter( preg_split( '/\//', str_replace(['/elections/'], '', $_SERVER['REQUEST_URI']) ) ) );
    if(str_contains($_SERVER['REQUEST_URI'], '.') || str_contains($_SERVER['REQUEST_URI'], '%2e')) error(404);

    $_country = $request[0] ?? NULL;
    $_params = [
        'path' => [],
    ];
    if(str_contains(end($request), "?")){
        $query_strings = preg_split( '/(\?|&)/', end($request) );
        $request[count($request) - 1] = array_shift($query_strings);
        foreach($query_strings as $query){
            $query = explode('=', $query);
            if(preg_match('/[^a-zA-Z]/', $query[0])) continue;
            else if($query[0] === "path") continue;
            $_params[$query[0]] = $query[1] ?? TRUE;
        }
    }

    spl_autoload_register( function() use ($request) {
        // Base component
        require_once sprintf('%s/app/ssr-components/Component.php', __DIR__);
        // SSR components
        $search = sprintf('%s/app/ssr-components/{shared,%s}/*/*.php', __DIR__, $_country ?? "*");
        foreach( glob($search, GLOB_BRACE) as $file ){
            require_once($file);
        }
        // API services
        foreach( glob(sprintf('%s/api/{*/,}/[!_]*.php', __DIR__), GLOB_BRACE) as $file ){
            require_once($file);
        }
    });

    while(count($request) >= 0){
        $path = implode('/', $request);
        if( isSanitaryPath($path) && file_exists(sprintf('app/pages/%s/index.php', $path)) ) renderPage($path, $_params);
        else{
            array_unshift($_params['path'], end($request));
            array_pop($request);
        }
    }

    function isSanitaryPath($path, $file = 'index.php'){
        $startOfPath = dirname(__FILE__) . "/app/pages";
        $realPath = realpath(sprintf('app/pages/%s/%s', $path, $file));
        return ($realPath !== FALSE && str_starts_with($realPath, $startOfPath));
    }

    function renderPage($path, $_params = []){
        global $_country, $_params;
        
        $fullPath = sprintf('app/pages/%s/index.php', $path);
        if(isSanitaryPath($path) && file_exists($fullPath)){

            // First, render inits (down the tree)
            foreach(getInitPaths($path . '/index.php') as $initPath) require $initPath;

            // Now, check how many levels of dynamic paths are accepted
            // and 404 if incompatible
            if(count($_params['path']) > ($_dynamic_params_accepted ?? 0)) error(404);

            // Next, render page
            ob_start();
            require $fullPath;

            // Finally, recurse up the tree to wrap page in layouts
            foreach(getLayoutPaths($path . '/index.php') as $layoutPath){
                $_children = ob_get_clean();
                ob_start();
                require $layoutPath;
            }
            
        }
        else error(404);
        exit;
    }

    function getInitPaths($path){
        $initPaths = [];
        $directory = dirname($path);
        while($path !== $directory){
            $path = $directory;
            if(isSanitaryPath($directory, 'init.php')){
                $initPaths[] = sprintf("app/pages/%s/init.php", $directory);
            }
            $directory = dirname($directory);
        }
        return $initPaths;
    }

    function getLayoutPaths($path){
        $layoutPaths = [];
        do{
            $nextPath = nextLayoutPath($path);
            $layoutPaths[] = sprintf("app/pages/%s/layout.php", $nextPath);
            $path = dirname($nextPath);
        } while( !empty($nextPath) );
        return $layoutPaths;
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

    function error($status){
        echo match($status){
            404 => "404",
        };
        exit;
    }
?>