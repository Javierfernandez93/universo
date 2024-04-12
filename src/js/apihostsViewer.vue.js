import { User } from '../../src/js/user.module.js?v=1.0.0'   

const ApihostsViewer = {
    name : 'apihosts-viewer',
    data() {
        return {
            User: new User,
            user_api_id: null,
            hosts: null,
            hostsAux: null,
            status: null,
            query: null,
            STATUS: {
                DELETED: {
                    code: -1,
                    text: 'Eliminadas'
                },
                PENDING: {
                    code: 0,
                    text: 'Pendiente'
                },
                PAYED: {
                    code: 1,
                    text: 'Pagada'
                },
                EXPIRED: {
                    code: 2,
                    text: 'Expirada'
                },
            }
        }
    },
    watch: {
        query: {
            handler() {
                this.filterData()
            },
            deep: true
        },
        status: {
            handler() {
                this.filterDataByStatus()
            },
            deep: true
        }
    },
    methods: {
        filterData() {
            this.hosts = this.hostsAux
            this.hosts = this.hosts.filter((host) => {
                return host.host.toLowerCase().includes(this.query.toLowerCase()) 
            })
        },
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
               target.innerText = 'Done'
            })
        },
        createHost() {
            const alert = alertCtrl.create({
                title: "Add Host",
                subTitle: `<p>Please provide full host url (ex: https://www.universodejade.com)</p>`,
                inputs : [
                    {
                        type: 'text',
                        id: 'host',
                        name: 'host',
                        placeholder: 'host name',
                    }
                ],
                buttons: [
                    {
                        text: "Create",
                        role: "cancel",
                        class: 'btn-success',
                        handler: (data) => {
                            this.User.createHost({host:data.host,user_api_id:this.user_api_id},(response)=> {
                                if(response.s == 1)
                                {
                                    alertInfo({
                                        icon:'<i class="bi bi-ui-checks"></i>',
                                        message: `${data.host} was created successfully`,
                                        _class:'bg-gradient-success text-white'
                                    })

                                    this._getUserApiHosts()
                                }
                            })
                        },
                    },
                    {
                        text: "Cancelar",
                        role: "cancel",
                        handler: (data) => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal); 
        },
        updateHost(host) {
            this.User.updateHost({...host,...{user_api_id:this.user_api_id}},(response)=> {
                if(response.s == 1)
                {
                    host.editing = false
                }
            })
        },
        deleteHost(host) {
            const alert = alertCtrl.create({
                title: "Host",
                subTitle: `<p>Are you sure to delete <strong>${host.host}</strong> host?</p>`,
                buttons: [
                    {
                        text: "Yes, delete",
                        role: "cancel",
                        class: 'btn-success',
                        handler: () => {
                            this.User.deleteHost({host_per_user_api_id:host.host_per_user_api_id,user_api_id:this.user_api_id},(response)=> {
                                if(response.s == 1)
                                {
                                    this._getUserApiHosts()
                                }
                            })
                        },
                    },
                    {
                        text: "Cancelar",
                        role: "cancel",
                        handler: () => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal); 
        },
        _getUserApiHosts() {
            this.getUserApiHosts(this.user_api_id).then((hosts)=>{
                this.hosts = hosts
                this.hostsAux = hosts
            }).catch(() => this.hosts = false)
        },
        getUserApiHosts(user_api_id) {
            return new Promise((resolve,reject)=> {
                this.User.getUserApiHosts({user_api_id:user_api_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.hosts)
                    }

                    reject()
                })

            })
        },
    },
    mounted() 
    {       
        if(getParam('uaid'))
        {
            this.user_api_id = getParam('uaid')

            this._getUserApiHosts()
        }
    },
    template : `
        <div class="container animation-fall-down" style="--delay:0.5s">
            <div v-if="hosts">
                <div class="card overflow-hidden mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-xl fs-4 fw-sembold text-primary">
                                <div class="text-xs">Total {{hosts.length}}</div>
                                <div class="">Hosts list</div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <button @click="createHost" class="btn btn-primary mb-0 me-2 shadow-none"><i class="bi bi-plus-circle me-1"></i> New host </button>
                            </div>
                        </div>

                        <div class="mt-3">
                            <input :disabled="busy" v-model="query" type="text" class="form-control" placeholder="Search host..."/>
                        </div>
                    </div>
                </div>
                <div v-for="(host,index) in hosts" class="row align-items-center mb-3 pb-3">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl-auto">
                                        <div class="avatar avatar-sm me-2 bg-dark">
                                            {{host.host.getAcronime()}}
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl">
                                        <div v-if="!host.editing">
                                            <div>{{host.host}}</div>
                                        </div>
                                        <div v-else>
                                            <div class="input-group">
                                                <span class="input-group-text" id="basic-addon1">Full host url</span>
                                                <input @keypress.enter.exact="updateHost(host)" v-model="host.host" :class="host.host ? 'is-valid': 'is-invalid'" type="text" class="form-control ps-3" placeholder="host" aria-label="host" aria-describedby="basic-addon1">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-auto">
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-outline-primary px-3 mb-0 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                            </button>
                                            <ul class="dropdown-menu shadow">
                                                <li><button class="dropdown-item" @click="host.editing = true">Edit</button></li>
                                                <li><button class="dropdown-item" @click="deleteHost(host)">Delete</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="hosts == false" class="card">
                <div class="card-body d-flex justify-content-center py-5">
                    <button @click="createHost" class="btn btn-primary mb-0 shadow-none btn"> 
                        <i class="bi bi-plus-circle me-1"></i>
                        Add host
                    </button>
                </div>
            </div>
        </div>
    `,
}

export { ApihostsViewer } 