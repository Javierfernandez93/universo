<div class="container-fluid py-4" id="app">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div>
                        <label>Cronjobs</label>
                        <ul class="list-group">
                            <li v-for="cron in crons" class="list-group-item">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <div class="form-check form-switch ps-0">
                                            <input 
                                                @click="saveCron(cron)"
                                                v-model="cron.status"
                                                class="form-check-input ms-auto" type="checkbox" id="" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div><span class="small text-primary">{{cron.name}}</span></div>
                                        <div>{{cron.description}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>