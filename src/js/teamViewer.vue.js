import { User } from '../../src/js/user.module.js?v=2.3.5'   

const TeamViewer = {
    name : 'team-viewer',
    data() {
        return {
            User: new User,
            user_login_id : null,
            busy : false,
            width : 100
        }
    },
    methods: {
        getMainBinaryTree() {
            this.busy = true
            this.User.getMainBinaryTree({},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.user_login_id = response.user_login_id


                    setTimeout(()=>{
                        this.insertHtml(response.user_login_id,response.team)
                    },1000)
                }
            })
        },
        insertHtml(user_login_id,users) {
            if(users && user_login_id)
            {
                if(($(`#${user_login_id}`).find("li").length) == 0)
                {
                    this.width += 7

                    let html = '<ul>'
                    users.forEach(user => {
                        html += `
                            <li id="${user.user_login_id}" onclick="getBinaryTree(${user.user_login_id})">
                                <a class="cursor-pointer">
                                    <img src="${user.image}"/>
                                    <span class="sans text-xs fw-semibold">
                                        ${user.names.getFirstName()}
                                    </span>
                                </a>
                            </li>
                        `
                    });
    
                    html += '</ul>'
    
                    $(`#${user_login_id}`).append(html)

                    this.scrollHorizontally(user_login_id)
                }
            }
        },
        scrollHorizontally(elementId)
        {
            document.getElementById("tree").scrollLeft += 20;
        },
        getBinaryTree(user_login_id) {
            this.User.getBinaryTree({user_login_id:user_login_id},(response)=>{
                if(response.s == 1)
                {
                    this.insertHtml(user_login_id,response.team)
                }
            })
        },
    },
    mounted() 
    {   
        let _this = this

        this.getMainBinaryTree()

        window.getBinaryTree = function(user_login_id)
        {
            _this.getBinaryTree(user_login_id)
        }
    },
    template : `
        <div v-if="busy" class="justify-content-center text-center py-5">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        </div>
        <div v-if="user_login_id" :style="{width:width+'%'}" class="tree animation-fall-down" style="--delay:500ms" id="tree">
            <div :id="user_login_id"></div>
        </div>
    `,
}

export { TeamViewer } 