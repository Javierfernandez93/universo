<div class="container py-5" id="app">
    <div class="row justify-content-center">
        <div class="col-12"
            :class="viewFullFaq ? ' col-xl-8' : ''">
            <div class="row">
                <div class="col-12"
                    :class="viewFullFaq ? '' : 'col-xl-4'">
                    <faq-viewer
                        @togglemaketicket="toggleMakeTicket"
                        @toogleviewfullfaq="toogleViewFullFaq"></faq-viewer>
                </div>
                <div class="col-12 "
                    :class="viewFullFaq ? 'd-none' : 'col-xl'">
                    <ticket-viewer 
                        v-if="!addTicket"
                        @togglemaketicket="toggleMakeTicket"
                        >
                    </ticket-viewer>
                    <addticket-viewer
                        v-else
                        @togglemaketicket="toggleMakeTicket"></addticket-viewer>
                </div>
            </div>
        </div>
    </div>
</div>