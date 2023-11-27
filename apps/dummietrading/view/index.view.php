<div class="container pb-5" id="app">
    <chat-viewer></chat-viewer>
    
    <div class="row justify-content-center">
       <div class="col-12">

            <bannertop-viewer></bannertop-viewer>

            <div class="row mb-3">
                <div class="col-12">
                    <div class="row mb-3">
                        <div class="col-12 text-center d-block d-md-none">
                            <h3>{{Translator.words.welcome_home}}</h3>
                        </div>
                        <div class="col-6 col-md-3 col-xl-2">
                            <div class="card rounded-xs zoom card-special" style="background-image: url('../../src/img/Site-home/1.png')">
                                
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-xl-8 text-center d-none d-md-inline">
                            <h3>¿Como te sentirías si tuvieras más control sobre tu dinero?</h3>
                        </div>
                        <div class="col-6 col-md-3 col-xl-2">
                            <div class="card rounded-xs zoom card-special" style="background-image: url('../../src/img/Site-home/2.png')">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <div class="row mb-3 justify-content-center">
                        <div class="col-6 col-md-4 mb-3 mb-xl-4 col-xl">
                            <div class="card rounded-xs zoom card-special" style="background-image: url('../../src/img/Site-home/3.png')">
                                
                            </div>
                        </div>
                        <div class="col-6 col-md-3 mb-3 mb-xl-4 col-xl">
                            <div class="card rounded-xs zoom card-special" style="background-image: url('../../src/img/Site-home/4.png')">
                                
                            </div>
                        </div>
                        <div class="col-6 col-md-3 mb-3 mb-xl-4 col-xl">
                            <div class="card rounded-xs zoom card-special" style="background-image: url('../../src/img/Site-home/5.png')">
                                
                            </div>
                        </div>
                        <div class="col-6 col-md-3 mb-3 mb-xl-4 col-xl">
                            <div class="card rounded-xs zoom card-special" style="background-image: url('../../src/img/Site-home/6.png')">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <!-- <widgetbottelegram-viewer :translator="Translator"></widgetbottelegram-viewer> -->

            <widgetinfo-viewer class="mb-5"></widgetinfo-viewer>
            <widgetnetwork-viewer class="mb-5"></widgetnetwork-viewer>
            <widgains-viewer class="mb-5"></widgains-viewer>
            <widgetforex-viewer class="mb-5"></widgetforex-viewer>
            <widgetlanding-viewer class="mb-5"></widgetlanding-viewer>

            <notice-viewer></notice-viewer>
        </div>
    </div>
</div>