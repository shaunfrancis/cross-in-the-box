<?php
namespace Shared;

class Footer extends \Base\Component{

    static function render(): void { 
        global $request;
        if(!empty($request)) $page = "/" . implode("/", $request);
    ?>
    
        <footer id="Footer">
            <div id="Footer__container">

                <div id="Footer__logo-container">
                    <a href="/">
                        <img src="/public/images/monochrome-logo.svg" alt="Cross In The Box" />
                    </a>
                    <div class="Footer__logo-label">
                        <a href="/" class="unstyled">
                            <h1>Cross In The Box</h1>
                        </a>
                        <p>A <a href="https://tennessine.co.uk">Tennessine</a> project</p>
                    </div>
                </div>

                <ul id="Footer__social-container">
                    <li><a href="https://twitter.com/crossinthebox">
                        <img src="/public/images/twitter.svg" alt="Twitter/X" />
                    </a></li>
                    <li><a href="https://instagram.com/TennessineWeb">
                        <img src="/public/images/instagram.png" alt="Instagram" />
                    </a></li>
                    <li><a href="mailto:hello@tennessine.co.uk">
                        <img src="/public/images/email.svg" alt="Email" />
                    </a></li>
                </ul>

                <nav id="Footer__sitemap">

                    <?php
                        $sitemap = [
                            'canada' => [
                                'label' => "Canada",
                                'href' => '/canada',
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
                                'children' => [
                                    [
                                        'label' => "Presidential Elections",
                                        'href' => '/france/presidential-elections'
                                    ]
                                ]
                            ],
                            'hungary' => [
                                'label' => "Hungary",
                                'href' => '/hungary',
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
                                'label' => "United States of America",
                                'href' => '/usa',
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
                                'children' => [
                                    [
                                        'label' => "Papal Conclaves",
                                        'href' => '/vatican-city/papal-conclaves'
                                    ]
                                ]
                            ],
                        ];

                        foreach($sitemap as $country): ?>
                            <section class="Footer__top-level-section" style="--row-span:<?= count($country['children']); ?>">
                                <h2>
                                    <a href="<?= $country['href']; ?>" class="unstyled<?= !empty($page) && str_starts_with($page, $country['href']) ? " Footer__current-page" : ""; ?>">
                                        <?= $country['label']; ?>
                                    </a>
                                </h2>
                                <?php if(!empty($country['children'])) : ?>
                                    <ul>
                                        <?php foreach($country['children'] as $child) : ?>
                                            <li>
                                                <a href="<?= $child['href']; ?>" class="unstyled<?= !empty($page) && str_starts_with($page, $child['href']) ? " Footer__current-page" : ""; ?>">
                                                    <?= $child['label']; ?>
                                                </a>
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                <?php endif; ?>
                            </section>

                        <?php endforeach;
                    ?>
                </nav>
                
            </div>
        </footer>

    <?php }
}