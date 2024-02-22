import { User } from '../../src/js/user.module.js?v=2.4.6'   

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
    template : `
        as
    `
}

export { ClientsViewer }