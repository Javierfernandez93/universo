import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.4'

/* vue */
Vue.createApp({
    components : { 
    },
    data() {
        return {
            UserSupport : new UserSupport,
            administrators : null,
            columns: { // 0 DESC , 1 ASC 
                user_support_id : {
                    name: 'user_support_id',
                    desc: false,
                },
                names : {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
                },
                create_date : {
                    name: 'create_date',
                    desc: false,
                },
            }
        }
    },
    watch : {
    },
    methods: {
        sortData: function (column) {
            this.administrators.sort((a,b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                if(column.alphabetically)
                {
                    return _a[column.name].localeCompare(_b[column.name])
                } else {
                    return _a[column.name] - _b[column.name]
                }
            });

            column.desc = !column.desc
        },
        deleteAdministrator(administrator) {
            const alert = alertCtrl.create({
                title: `Aviso`,
                subTitle: `¿Estás seguro de eliminar a <b>${administrator.names}</b>?`,
                buttons: [
                    { 
                        text: 'Aceptar',
                        handler: data => {
                            
                            this.UserSupport.deleteSupportUser({user_support_id:administrator.user_support_id},(response)=>{

                                alert.modal.dismiss();

                                if(response.s == 1)
                                {
                                    this.getAdministrators()

                                    alertInfo({
                                        icon:'<i class="bi bi-check"></i>',
                                        message: 'Eliminado correctamente',
                                        _class:'bg-gradient-success text-white'
                                    })
                                    
                                } else if(response.r == "INVALID_SUPPORT_ID") {
                                    alertInfo({
                                        icon:'<i class="bi bi-x"></i>',
                                        message: 'No puedes eliminarte a ti mismo',
                                        _class:'bg-gradient-danger text-white'
                                    })
                                }
                            })
                        }              
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel', 
                        handler: data => {
                        }
                    },  
                ]
            });
          
            alertCtrl.present(alert.modal);
        },
        goToEdit : function(company_id) {
            window.location.href = '../../apps/admin-administrators/edit?usid='+company_id
        },
        addPermission : function() {
            Sitegroup.io = alertCtrl.create({
                title: 'Añadir permiso',
                subTitle: 'Ingresa los datos',
                size: 'modal-md',
                inputs: [
                    {
                        type: 'text',
                        name: 'permission',
                        id: 'permission',
                        placeholder: 'Nombre del permiso',
                        label: 'Nombre del permiso'
                    },
                    {
                        type: 'text',
                        name: 'description',
                        id: 'description',
                        placeholder: 'Descripción del permiso',
                        label: 'Descripción del permiso'
                    }
                ],  
                buttons: [
                    {
                        text: "Aceptar",
                        role: "cancel",
                        handler: (data) => {
                            
                            this.UserSupport.addPermission(data,(response)=>{
                                if(response.s == 1)
                                {
                                }
                            })
                        },
                    },
                    {
                        text: "Cancel",
                        role: "cancel",
                        handler: (data) => {
                            
                        },
                    },
                ],
            });
        
            alertCtrl.present(alert.modal);
        },
        getAdministrators : function() {
            this.UserSupport.getAdministrators({},(response)=>{
                if(response.s == 1)
                {
                    this.administrators = response.administrators.map((administrator)=>{
                        administrator['create_date'] = new Date(administrator['create_date']*1000).toLocaleDateString()
                        return administrator
                    })
                }
            })
        },
    },
    mounted() 
    {
        this.getAdministrators()
    },
}).mount('#app')