<?php
    include 'config.php';
    $_request = array_values( array_filter( preg_split( '/\//', str_replace(['/elections/'], '', $_SERVER['REQUEST_URI']) ) ) );
    $_initial_request = $_request;
    
    // If invalid show 404
    if(str_contains($_SERVER['REQUEST_URI'], '.') || str_contains($_SERVER['REQUEST_URI'], '%2e')){
        http_response_code(404);

        ob_start();
        require 'app/pages/404.php';
        $_children = ob_get_clean();

        require 'app/ssr-components/Component.php';
        require 'app/ssr-components/shared/Header/Header.php';
        require 'app/ssr-components/shared/Footer/Footer.php';
        require 'app/pages/layout.php';
        exit;
    }

    $_country = $_request[0] ?? NULL;
    $_params = [
        'path' => [],
    ];
    $_breadcrumbs = [];

    if(str_contains(end($_request), "?")){
        $query_strings = preg_split( '/(\?|&)/', end($_request) );
        $_request[count($_request) - 1] = array_shift($query_strings);
        foreach($query_strings as $query){
            $query = explode('=', $query);
            if(preg_match('/[^a-zA-Z]/', $query[0])) continue;
            else if($query[0] === "path") continue;
            $_params[$query[0]] = $query[1] ?? TRUE;
        }
    }

    // Load base API service
    require_once sprintf('%s/api/APIService.php', __DIR__);
    // Load base component
    require_once sprintf('%s/app/ssr-components/Component.php', __DIR__);
    // Load lib functions
    require_once sprintf('%s/app/lib/shared.php', __DIR__);
    $country_lib = sprintf('%s/app/lib/$s.php', __DIR__, $_country);
    if(file_exists($country_lib)) require_once $country_lib;

    // Handle autoload of API services and SSR components
    spl_autoload_register( function($class) use ($_request) {
        $camel_to_kebab = fn($camel) => ltrim(strtolower(preg_replace('/[A-Z]([A-Z](?![a-z]))*/', '-$0', $camel)), '-');
        
        $classPath = explode("\\", $class);
        $lastIndex = array_key_last($classPath);

        if(str_starts_with($class, "API\\")){ // API services
            $dirPath = __DIR__ . "/";
            foreach($classPath as $index => $fragment){
                $dirPath .= ($index == $lastIndex) ? str_replace("Service", "", $fragment) . ".php" : strtolower($fragment) . "/";
            }
            require_once $dirPath;
        }
        else{ // SSR components
            $firstNamespace = $classPath[0];
            // $classPath[1] will either be class name or secondary (and so on...) namespace;
            // either way, this will be the name of a directory inside /$firstNamespace -
            // just load all classes inside this directory, there will only be a few
            // (i.e. \UK\RegionPortrait is a class while \UK\ElectionResultContainer\Scotland will load all country containers)

            // Request main file first, i.e. 
            // as above ElectionResultContainer/ElectionResultContainer before ElectionResultContainer/ScotlandElectionResultContainer
            $main_file = sprintf('%s/app/ssr-components/%s/%s/%s.php', __DIR__, $camel_to_kebab($firstNamespace), $classPath[1], $classPath[1]);
            if(file_exists($main_file)) require_once($main_file);

            $search = sprintf('%s/app/ssr-components/%s/%s/*.php', __DIR__, $camel_to_kebab($firstNamespace), $classPath[1]);
            foreach( glob($search, GLOB_BRACE) as $file ){
                require_once($file);
            }
        }
    });

    // Sitemap
    $_sitemap = [
        'canada' => [
            'label' => "Canada",
            'href' => '/canada',
            'flag' => '/public/images/canada-flag.svg',
            'children' => [
                [
                    'label' => "Federal Elections",
                    'href' => '/canada/federal-elections'
                ]
            ]
        ],
        'france' => [
            'label' => "France",
            'href' => '/france',
            'flag' => '/public/images/france-flag.svg',
            'children' => [
                [
                    'label' => "Presidential Elections",
                    'href' => '/france/presidential-elections'
                ],
            ]
        ],
        'hungary' => [
            'label' => "Hungary",
            'href' => '/hungary',
            'flag' => '/public/images/hungary-flag.svg',
            'children' => [
                [
                    'label' => "Parliamentary Elections",
                    'href' => '/hungary/parliamentary-elections'
                ]
            ]
        ],
        'uk' => [
            'label' => "United Kingdom",
            'href' => '/uk',
            'flag' => '/public/images/uk-flag.svg',
            'children' => [
                [
                    'label' => "General Elections",
                    'href' => '/uk/general-elections'
                ],
                [
                    'label' => "Scottish Parliament",
                    'href' => '/uk/scottish-parliament'
                ],
                [
                    'label' => "Senedd Cymru",
                    'href' => '/uk/senedd-cymru'
                ],
                [
                    'label' => "Northern Ireland Assembly",
                    'href' => '/uk/northern-ireland-assembly'
                ],
            ]
        ],
        'usa' => [
            'label' => "United States",
            'href' => '/usa',
            'flag' => '/public/images/usa-flag.svg',
            'children' => [
                [
                    'label' => "Presidential Elections",
                    'href' => '/usa/presidential-elections'
                ],
                [
                    'label' => "Senate Elections",
                    'href' => '/usa/senate-elections'
                ],
                [
                    'label' => "House Elections",
                    'href' => '/usa/house-elections'
                ],
                [
                    'label' => "Gubernatorial Elections",
                    'href' => '/usa/gubernatorial-elections'
                ],
            ]
        ],
        'vatican' => [
            'label' => "Vatican City",
            'href' => '/vatican-city',
            'flag' => '/public/images/vatican-flag.svg',
            'children' => [
                [
                    'label' => "Papal Conclaves",
                    'href' => '/vatican-city/papal-conclaves'
                ]
            ]
        ],
    ];
    
    // Render page
    while(count($_request) >= 0){
        $path = implode('/', $_request);
        if( isSanitaryPath($path) && file_exists(sprintf('app/pages/%s/index.php', $path)) ) renderPage($path, $_params);
        else{
            array_unshift($_params['path'], end($_request));
            array_pop($_request);
        }
    }

    function isSanitaryPath($path, $file = 'index.php'){
        $startOfPath = dirname(__FILE__) . "/app/pages";
        $realPath = realpath(sprintf('app/pages/%s/%s', $path, $file));
        return ($realPath !== FALSE && str_starts_with($realPath, $startOfPath));
    }

    function renderPage($path, $_params = []){
        global $_country, $_request, $_params, $_breadcrumbs;
        
        $fullPath = sprintf('app/pages/%s/index.php', $path);
        if(isSanitaryPath($path) && file_exists($fullPath)){

            // First, render inits (down the tree)
            foreach(getInitPaths($path . '/index.php') as $initPath){
                try{
                    require $initPath;
                    if(!empty($_breadcrumb)){
                        array_unshift($_breadcrumbs, $_breadcrumb);
                        unset($_breadcrumb);
                    }
                    else array_unshift($_breadcrumbs, [
                        'title' => end($_title), 
                        'path' => preg_replace(['/^app\/pages\//', '/\/init.php$/'], '', $initPath)
                    ]);
                    
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
            if(!empty($nextPath)){
                $layoutPaths[] = sprintf("app/pages/%s/%s", $nextPath, $target);
                $path = $nextPath;
            }
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