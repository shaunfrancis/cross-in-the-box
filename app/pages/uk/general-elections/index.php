<?php 
    namespace Shared;
    $heroNavItems = [
        [ 'title' => "Election results", 'src' => "/images/uk-nav-results.svg", 'id' => "election-results" ],
        [ 'title' => "Find a constituency", 'src' => "/images/nav-region.svg", 'id' => "find-a-constituency" ],
        [ 'title' => "Opinion polling", 'src' => "/images/nav-polling.svg", 'id' => "opinion-polling" ]
    ];
?>
<main>
    <section id="hero">
        <h1>UK General Elections</h1>
        <?php HeroNav::show($heroNavItems); ?>
    </section>

    <section id="election-results">
        <div class="section-heading">
            <h1>Election results</h1>
            <?php Toggle::show(
                $from = "/images/uk-cartographic-icon.svg",
                $to = "/images/uk-geographic-icon.svg",/*
                fun={(state) => { updateGeographicState(state) }},
                value={geographic}
            */) ?>
        </div>
        <?php ElectionResultsSection::open(); ?>
            <!--<UKElectionResultContainer election="2024" messageGroup="2024" messagesOpenOnLoad={true}
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                geographic={geographic}
            />-->
            <?php \UK\ElectionResultContainer::show(
                $title = ["2019", "General", "Election"]
            ); ?>
        <?php ElectionResultsSection::close(); ?>
        <!--<UKElectionResultsSection regions={regions} parties={parties} geographic={geographic} />-->
    </section>

    <section id="find-a-constituency" class="shaded purple">
        <h1>Find a constituency</h1>
        <!--<UKConstituencySearchSection searchInputRef={searchInputRef} />-->
    </section>
            
    <section id="opinion-polling">
        <h1>
            <a href="polling" class="heading-link">
                <span>Opinion polling</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
            </a>
        </h1>
        <!--<UKPollingSection parties={parties} />-->
    </section>
    
    <!--<section ref={heroNavItems[3].ref}>
        <div className="section-heading">
            <h1>Analysis</h1>
            <Toggle 
                from={"/images/uk-cartographic-icon.svg"} 
                to={"/images/uk-geographic-icon.svg"} 
                fun={(state) => { updateGeographicState(state) }}
                value={geographic}
            />
        </div>
        <UKAnalysisSection regions={regions} parties={parties} geographic={geographic} />
    </section>-->
            
    <!--<UKMapDefs />-->

</main>