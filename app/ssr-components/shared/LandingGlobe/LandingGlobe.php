<?php
namespace Shared;

class LandingGlobe extends \Base\Component{

    static function render(): void { ?>
        <div id="LandingGlobe" class="loading">
            <div class="hover-popup hidden"></div>
            <main>
                <hgroup>
                    <h1>Cross In The Box</h1>
                    <p>Election results from around the globe</p>
                </hgroup>
                <a href="uk">uk</a>
                <a href="canada">canada</a>
            </main>
        </div>
    <?php }

}