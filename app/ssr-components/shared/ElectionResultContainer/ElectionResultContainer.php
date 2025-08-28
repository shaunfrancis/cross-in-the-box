<?php
namespace Shared;

class ElectionResultContainer extends \Base\Component{

    static function renderOpen(
        string $election,
        string $map,
        array $title,                           // [string, string, string]
        array $dimensions,                      // [w: string, h: string, minW: string, minH: string]
        ?array $messages = ['exist' => FALSE],  // [exist: bool, open: bool]
        ?string $dedicatedPage = NULL  
    ): void { ?>

        <div class="ElectionResultContainer" data-election="<?= $election; ?>" style="height: min(<?= $dimensions['h']; ?>, calc(100vw - 30px)); min-height: <?= $dimensions['minH']; ?>;">
            
            <?php if(!empty($messages['exist'])) : ?>
                <div class="ElectionResultContainer__messages-container<?= !empty($messages['open']) ? " visible" : ""; ?>">

                    <div class="ElectionResultContainer__messages-inner-container">
                        <?php if(!empty($messages['exist'])): ?>
                                <PlaceholderMessage />
                        <?php endif; ?>
                        {messagesVisibility && messages}
                    </div>
                    
                </div>
            <?php endif; ?>

            <div class="ElectionResultContainer__results-container" style="width: <?= $dimensions['w']; ?>; min-width: min( calc(100vw - 30px), <?= $dimensions['minW']; ?>);">
                <div class="ElectionResultContainer__heading-container"]>
                    <div class="ElectionResultContainer__title">
                        
                        <?php if(!empty($messages['exist'])) : ?>
                            <button class="ElectionResultContainer__messages-button">
                                <img src="/public/images/messages.svg" alt="Toggle message visibility" />
                            </button>
                        <?php endif; ?>

                        <h2>
                            <?php if(!empty($dedicatedPage)) : ?>
                                <a href="<?= $dedicatedPage; ?>" className="heading-link">
                            <?php endif; ?>
                                    <div class="ElectionResultContainer__title-text"><?= $title[0] ?? ''; ?></div>
                                    <div class="ElectionResultContainer__subtitle-text">
                                        <span><?= $title[1] ?? ''; ?></span><br/>
                                        <span><?= $title[2] ?? ''; ?></span>
                                    </div>
                            <?php if(!empty($dedicatedPage)) : ?>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
                                </a>
                            <?php endif; ?>
                        </h2>

                    </div>
                    
                    <div class="ElectionResultContainer__summary-container"></div>

                </div>
                <div class="ElectionResultContainer__map-container">
                    <?= $map; ?>
                </div>
            </div>
            <?php //Children ?>
<?php }

static function renderClose(): void{ echo '</div>'; }

}