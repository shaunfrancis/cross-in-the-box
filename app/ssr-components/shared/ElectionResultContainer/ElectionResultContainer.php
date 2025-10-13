<?php
namespace Shared;

class ElectionResultContainer extends \Base\Component{

    static function renderOpen(
        string $election,
        string $map,                            // Map subclass as a string
        array $title,                           // [string, string, string]
        array $dimensions,                      // [w: string, h: string, minW: string, minH: string]
        ?array $messages = [],                  // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default",
        ?string $regionsType = "default"
    ): void { ?>

        <div
            class="ElectionResultContainer"
            data-election="<?= $election; ?>"
            data-win-formula="<?= $winFormulaName; ?>"
            data-regions-type="<?= $regionsType; ?>"
            <?php if($showChanges) : ?>data-show-changes="true"<?php endif; ?>
            style="height: min(<?= $dimensions['h']; ?>, calc(100vw - 30px)); min-height: <?= $dimensions['minH']; ?>;"
        >
            <div class="ElectionResultContainer__hover-popup hidden"></div>
            
            <?php if(!empty($messages['group'])) : ?>
                <div
                    data-group="<?= $messages['group']; ?>"
                    class="ElectionResultContainer__messages-container loading<?= !empty($messages['open']) ? " visible" : ""; ?>"
                >
                    <div class="ElectionResultContainer__messages-inner-container"></div>
                </div>
            <?php endif; ?>

            <div class="ElectionResultContainer__results-container" style="width: <?= $dimensions['w']; ?>; min-width: min( calc(100vw - 30px), <?= $dimensions['minW']; ?>);">
                <div class="ElectionResultContainer__heading-container">
                    <div class="ElectionResultContainer__title">
                        
                        <?php if(!empty($messages['group'])) : ?>
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
                                        <span><?= $title[1] ?? ''; ?></span>
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

                <?= $map::show(); ?>
                
            </div>
            <?php //Children ?>
<?php }

static function renderClose(): void{ echo '</div>'; }

}