<div class="container-fluid" id="app">
    <apiwallets-viewer
        ref="wallets"
        @request-auth="requestAuth">
    </apiwallets-viewer>
    <auth-viewer 
        @auth-success="authSuccess"
        ref="auth"
    ></auth-viewer>
</div>