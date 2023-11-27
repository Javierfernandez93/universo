<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsvectormap/dist/css/jsvectormap.min.css" />
<script src="https://cdn.jsdelivr.net/npm/jsvectormap"></script>
<script src="https://cdn.jsdelivr.net/npm/jsvectormap/dist/maps/world.js"></script>

<div class="container pb-5" id="app">
    <flyer-viewer></flyer-viewer>

    <teamselector-viewer class="animation-fall-down" style="--delay:450ms"></teamselector-viewer>

    <div class="row mb-3 justify-content-center align-items-center">
        <div class="col-12 col-xl mb-3 mb-xl-0">
            <rangewidget-viewer class="animation-fall-down" style="--delay:500ms"></rangewidget-viewer>
        </div>
        <div class="col-12 col-xl mb-3 mb-xl-0">
            <div class="row justify-content-center align-items-center">
                <div class="col-12 col-xl mb-3 mb-xl-0">
                    <landing-viewer class="animation-fall-down" style="--delay:650ms"></landing-viewer>
                </div>
                <div class="col-12 col-xl mb-3 mb-xl-0">
                    <membershipwidget-viewer class="animation-fall-down" style="--delay:700ms"></membershipwidget-viewer>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-0 mb-xl-3">
        <div class="col-12 col-xl mb-3 mb-xl-0">
            <paybusinesswidget-viewer class="animation-fall-down" style="--delay:750ms"></paybusinesswidget-viewer>
        </div>
        <div class="col-12 col-xl mb-3 mb-xl-0">
            <nextlevelwidget-viewer class="animation-fall-down" style="--delay:800ms"></nextlevelwidget-viewer>
        </div>
    </div>

    <div class="row mb-0 mb-xl-3">
        <div class="col-12 col-xl mb-3 mb-xl-0">
            <daily-viewer class="animation-fall-down" style="--delay:850ms"></daily-viewer>
        </div>
        <div class="col-12 col-xl mb-3 mb-xl-0">
            <income-viewer class="animation-fall-down" style="--delay:900ms"></income-viewer>
        </div>
    </div>

    <div class="row mb-0 mb-xl-3">
        <div class="col-12">
            <map-viewer class="animation-fall-down" style="--delay:950ms"></map-viewer>
        </div>
    </div>

    <chat-viewer></chat-viewer>
</div>