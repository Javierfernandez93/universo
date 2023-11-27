<div class="container-fluid pb-4" id="app">
    <flyer-viewer image="../../src/img/marketing/6.png"></flyer-viewer>

    <div class="row justify-content-center">
        <div class="col-12">
            <ul class="nav nav-pills bg-transparent mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Crear</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Resultado</button>
                </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                    <academycreate-viewer></academycreate-viewer>
                </div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                    <marketingfeedback-viewer></marketingfeedback-viewer>
                </div>
            </div>
        </div>
    </div>
</div>