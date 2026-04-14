<?php
namespace Shared;

class ElectionResultContainer extends \Base\Component{

    static function renderOpen(
        string $election,
        string $map,                            // Map subclass as a string
        array $title,                           // [string, string, string]
        ?array $dataAttrs,                      // [{name} => value: any]
        array $dimensions,                      // [w: string, h: string, minW: string, minH: string]
        ?array $messages = [],                  // [group: string, open: bool?]
        ?bool $showChanges = FALSE,
        ?bool $live = FALSE,
        ?string $dedicatedPage = NULL,
        ?string $winFormulaName = "default",
        ?string $regionsType = NULL,
    ): void { ?>

        <div
            class="ElectionResultContainer"
            data-election="<?= $election; ?>"
            data-win-formula="<?= $winFormulaName; ?>"
            data-regions-type="<?= $regionsType; ?>"
            <?php if($showChanges) : ?>data-show-changes="true"<?php endif; ?>
            <?php if($live) : ?>data-live="true"<?php endif; ?>
            <?php foreach($dataAttrs as $name => $value) : ?>data-<?= $name; ?>="<?= $value; ?>"<?php endforeach; ?>
            style="height: min(<?= $dimensions['h']; ?>, calc(100vw - 30px)); min-height: <?= $dimensions['minH']; ?>;"
        >
            <div class="hover-popup hidden"></div>
            
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
                                <a href="<?= $dedicatedPage; ?>" class="arrow-link">
                            <?php endif; ?>
                                    <div class="ElectionResultContainer__title-text"><?= $title[0] ?? ''; ?></div>
                                    <div class="ElectionResultContainer__subtitle-text">
                                        <span><?= $title[1] ?? ''; ?></span>
                                        <span><?= $title[2] ?? ''; ?></span>
                                    </div>
                            <?php if(!empty($dedicatedPage)) : ?>
                                </a>
                            <?php endif; ?>
                        </h2>

                        <?php if(!empty($live)) static::renderLiveTitle(); ?>

                    </div>
                    
                    <div class="ElectionResultContainer__summary-container"></div>

                </div>

                <?= $map::show(); ?>
                
            </div>
            <?php //Children ?>
<?php }

    static function renderClose(): void{ echo '</div>'; }

    static function renderLiveTitle(): void{ ?>
        <div class="ElectionResultContainer__live-title">
            <div class="ElectionResultContainer__title-text ElectionResultContainer__live-title-text">
                <img src="/public/images/load.svg" class="ElectionResultContainer__live-indicator" />
            </div>
            <!-- <div class="ElectionResultContainer__subtitle-text">
                <span>Updating</span>
                <span>live</span>
            </div> -->
        </div>
    <?php }

}