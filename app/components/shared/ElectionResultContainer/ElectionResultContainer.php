<?php
namespace Shared;

/* import { RefObject, forwardRef, useRef, useState } from 'react';
import styles from './ElectionResultContainer.module.css';
import PlaceholderMessage from '../PlaceholderMessage/PlaceholderMessage';

export default forwardRef(function ElectionResultContainer( 
    { dimensions, messages, messagesOpenOnLoad, map, summary, children } : { 
        dimensions: {w:string,h:string,minW:string,minH:string}, 
        messages?: React.ReactNode[],
        messagesOpenOnLoad?: boolean,
        map: React.ReactNode,
        summary? : React.ReactNode,
        children : React.ReactNode 
    }, 
    ref : RefObject<HTMLDivElement>
){
    let [messagesVisibility, setMessagesVisiblity] = useState<boolean>(messagesOpenOnLoad || false);

    */ ?>

<?php

class ElectionResultContainer extends \Base\Component{

    static function renderOpen(
        array $title, 
        ?string $dedicatedPage = NULL
    ): void { ?>

        <div class="ElectionResultContainer" style={{height:"min(" + dimensions.h + ",calc(100vw - 30px))", minHeight:dimensions.minH}}>
            { (messagesOpenOnLoad || (messages && messages.length > 0) ) &&
                <div class="ElectionResultContainer__messages-container"] + (messagesVisibility ? " " + styles["visible"] : "")}>

                    <div class="ElectionResultContainer__messages-inner-container">
                        {messagesOpenOnLoad && (messages && messages.length == 0) && 
                            ( <>
                                <PlaceholderMessage />
                                <PlaceholderMessage />
                                <PlaceholderMessage />
                                <PlaceholderMessage />
                                <PlaceholderMessage />
                                <PlaceholderMessage />
                                <PlaceholderMessage />
                                <PlaceholderMessage />
                                <PlaceholderMessage />
                            </> )
                        }
                        {messagesVisibility && messages}
                    </div>
                    
                </div>
            }
            <div class="ElectionResultContainer__results-container" style={{width:dimensions.w, minWidth:"min( calc(100vw - 30px), " + dimensions.minW + ")"}}>
                <div class="ElectionResultContainer__heading-container"]>
                    <div class="ElectionResultContainer__title">
                        { messages &&
                            <img src="/images/messages.svg" class="ElectionResultContainer__messages-button" onClick={() => {setMessagesVisiblity(!messagesVisibility)}} />
                        }

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
                    {summary}
                </div>
                <div class="ElectionResultContainer__map-container">
                    {map}
                </div>
            </div>

<?php }

static function renderClose(): void{ echo '</div>'; }

}