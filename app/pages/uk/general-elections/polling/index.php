<?php namespace Shared; ?>

<section id="hero">
    <a href="/uk/general-elections/" class="breadcrumb">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg><span>General Elections</span>
    </a>

    <h1>Opinion polling</h1>
    <?= HeroNav::show([
        [ 'title' => "Graph", 'src' => "/images/nav-polling.svg", 'id' => "graph" ],
        [ 'title' => "Data", 'src' => "/images/nav-region.svg", 'id' => "data" ],
    ]); ?>
</section>

<section id="graph" class="content-section white">
    <?= \UK\PollGraph::show($polls); ?>
</section>
<section id="data" class="content-section white">
    <div class="block-scroller">
        <?= PollTable::show($polls); ?>
    </div>
    <span>Many of the polls on this page are sourced from <a href="https://en.wikipedia.org/wiki/Opinion_polling_for_the_next_United_Kingdom_general_election" target="_blank">Wikipedia</a> which allows the use of its content under the <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">Creative Commons Attribution-ShareAlike 4.0 License</a>.</span>
</section>