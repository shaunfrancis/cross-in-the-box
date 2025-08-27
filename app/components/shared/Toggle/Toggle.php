<?php

class Toggle extends Component{

    static function render(string $from, string $to): void { ?>
        <div class="Toggle">

            <img src="/public/<?= $from; ?>" <?php /*onClick={() => { fun(false); setState(false) }}*/ ?> />

            <div 
                class="Toggle__outer"
                <?php /*onClick={() => {
                    if(valueProvided) nextState = !value;
                    else nextState = !state;

                    fun(nextState); 
                    setState(nextState);
                }}*/ ?>
            >
                <div <?php /*class={"Toggle__inner" + ( ( (valueProvided && value) || (!valueProvided && state) ) ? " " + styles["toggled"] : "")}*/ ?> class="Toggle__inner"></div>
            </div>
            
            <img src="/public/<?= $to; ?>" <?php /*onClick={() => { fun(true); setState(true) }}*/ ?> />

        </div>
    <?php }

}