<?php
    $request = array_values( array_filter( preg_split( '/\//', str_replace(['/elections/'], '', $_SERVER['REQUEST_URI']) ) ) );
    if(str_contains($_SERVER['REQUEST_URI'], '.') || str_contains($_SERVER['REQUEST_URI'], '%2e')){
        http_response_code(404);
        require 'app/pages/404.php';
        exit;
    }

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
            foreach(getInitPaths($path . '/index.php') as $initPath){
                try{
                    require $initPath;
                    if(!empty($_error)) throw new Exception($_error);
                }
                catch(Exception $error){
                    // Catch any intentional exceptions thrown in inits (i.e. 404s)
                    // as well as any $_errors flagged by inits without throwing (intended to allow continued execution where necessary)
                    $_error = $error->getMessage();
                }
            }
                
            // Attempt to render page if no $_errors caught in init
            try{
                if(count($_params['path']) > ($_dynamic_params_accepted ?? 0)) throw new Exception(404);
                if(!empty($_error)) throw new Exception($_error);

                ob_start();
                require $fullPath;
            }
            catch(Exception $error){
                ob_start();
                // Traverse up for error page
                $errorStatus = $error->getMessage();
                if(!is_numeric($errorStatus)) $errorStatus = 500;

                $errorPath = nextPath($path . '/index.php', $errorStatus . '.php');
                http_response_code($errorStatus);
                require sprintf('app/pages/%s/%s.php', $errorPath, $errorStatus);
            }

            // Finally, recurse up the tree to wrap page in layouts
            $layoutPaths = traverseUpForPaths($path . '/index.php', 'layout.php');
            foreach($layoutPaths as $layoutPath){
                $_children = ob_get_clean();
                ob_start();
                require $layoutPath;
            }
            echo ob_get_clean();
            
        }
        else{
            http_response_code(404);
            require 'app/pages/404.php';
            exit;
        }
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

    function traverseUpForPaths($path, $target){
        $layoutPaths = [];
        do{
            $nextPath = nextPath($path, $target);
            $layoutPaths[] = sprintf("app/pages/%s/%s", $nextPath, $target);
            $path = dirname($nextPath);
        } while( !empty($nextPath) );
        return $layoutPaths;
    }

    function nextPath($path, $target){
        $directory = dirname($path);
        while($path !== $directory){
            $path = $directory;
            if(isSanitaryPath($directory, $target)){
                return $directory;
            }
            $directory = dirname($directory);
        }
        return NULL;
    }
?>