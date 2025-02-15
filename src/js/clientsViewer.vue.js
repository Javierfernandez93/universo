import { User } from '../../src/js/user.module.js?v=1.1.8'   

const ClientsViewer = {
    name : 'clients-viewer',
    data() {
        return {
            User: new User,
            blog: null
        }
    },
    methods : {
        getBlog(blog_id)
        {
            this.User.getBlog({blog_id:blog_id},(response)=>{
                if(response.s == 1)
                {
                    this.blog = response.blog
                }
            })
        }
    },
    mounted() 
    {       
        if(getParam("ulid"))
        {
            this.getBlog(getParam("ulid"))
        }
    },
    /* html */
    template : `
        as
    `
}

export { ClientsViewer }