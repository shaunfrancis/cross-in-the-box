<?php 
    header('Content-type: application/xml; charset=utf-8');

    // autoload API services
    require_once sprintf('%s/api/APIService.php', __DIR__);
    spl_autoload_register( function($class) {        
        $classPath = explode("\\", $class);
        $lastIndex = array_key_last($classPath);
        if(str_starts_with($class, "API\\")){ // API services
            $dirPath = __DIR__ . "/";
            foreach($classPath as $index => $fragment){
                $dirPath .= ($index == $lastIndex) ? str_replace("Service", "", $fragment) . ".php" : strtolower($fragment) . "/";
            }
            require_once $dirPath;
        }
    });

    // autoload lib functions
    foreach( glob(sprintf('%s/app/lib/*.php', __DIR__)) as $file ) require_once($file);

?>
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://crossinthebox.com</loc>
    </url>
    <?php 
        $pageRoot = new RecursiveDirectoryIterator('app/pages', RecursiveDirectoryIterator::SKIP_DOTS);
        $iterator = new RecursiveIteratorIterator($pageRoot, RecursiveIteratorIterator::SELF_FIRST);
        foreach($iterator as $item){
            if($item->isDir()){

                if(file_exists($item->getPathname() . '/sitemap.php')) :
                    include $item->getPathname() . '/sitemap.php';
                    foreach($pages ?? [] as $page) : ?>
                        <url>
                            <loc>https://crossinthebox.com<?= preg_replace('/^app\/pages/', '', $item->getPathname()) . $page; ?></loc>
                        </url>
                    <?php
                        endforeach; 
                        unset($pages);
                    ?>

                <?php else : ?>
                    <url>
                        <loc>https://crossinthebox.com<?= preg_replace('/^app\/pages/', '', $item->getPathname()); ?></loc>
                    </url>
                <?php endif;
                
            }
        }
    ?>
</urlset> 