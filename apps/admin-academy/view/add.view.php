<div class="container-fluid py-4" id="app">
    <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
            <addcourse-viewer @add-session="addSession" @select-session="selectSession" ref="course"></addcourse-viewer>

            <addsession-viewer @save-session="saveSession" ref="sessionViewer"> </addsession-viewer>
        </div>
    </div>
</div>