<div class="container-fluid py-4" id="app">
    <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
            <editcourse-viewer @add-session="addSession" @select-session="selectSession" ref="course"></editcourse-viewer>

            <editsession-viewer @save-session="saveSession" ref="sessionViewer"> </editsession-viewer>
        </div>
    </div>
</div>