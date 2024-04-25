import { User } from '../../src/js/user.module.js?v=1.0.1'

const DocumentationViewer = {
    name : 'documentation-viewer',
    data() {
        return {
            User: new User,
            documentation: null,
            codeMirrorHtml: null,
            codeMirrorJs: null,
            codeMirrorCss: null,
        }
    },
    methods: {
        runCodeMirror({element,instance,value,mode}) {
            return new Promise((resolve)=>{
                instance = CodeMirror(element, {
                    value : value,
                    mode : mode,
                    readOnly: true,
                    autoCloseTags : true,
                    styleActiveLine : true,
                    lineNumbers : true,
                    tabSize : 2,       
                    autoCloseBrackets: true,
                    theme : 'material'
                });

                instance.on('change', function () {
                    if(mode == "text/html")
                    {
                        
                    } else if(mode == "text/css") {
                        
                    } else if(mode == "javascript") {
                        
                    }
                })

                resolve()
            })
        },
        runJsCode(data) {
            setTimeout(()=>{
                this.runCodeMirror({element:$(`#${data.id}`).get(0),instance:this.codeMirrorJs,value:html_beautify(data.code),mode:"javascript"}).then((resolve)=>{
                    
                })
            },10)
        },
        runShellCode(data) {
            setTimeout(()=>{
                this.runCodeMirror({element:$(`#${data.id}`).get(0),instance:this.codeMirrorJs,value:html_beautify(data.code),mode:"shell"}).then((resolve)=>{
                    
                })
            },10)
        },
        runPhpCode(data) {
            setTimeout(()=>{
                this.runCodeMirror({element:$(`#${data.id}`).get(0),instance:this.codeMirrorJs,value:html_beautify(data.code),mode:"php"}).then((resolve)=>{
                    
                })
            },10)
        },
        getDocumentation(documentation_id) {
            return new Promise((resolve,reject)=>{
                this.User.getDocumentation({documentation_id:documentation_id},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.documentation)
                    }

                    reject()
                })
            })
        }
    },
    mounted() {
        const did = getParam("did") ? getParam("did") : 1

        this.getDocumentation(did).then((documentation)=>{
            this.documentation = documentation
        })
    },
    template : `
        <div v-if="documentation">
            <h1>{{documentation.title}}</h1>

            <div v-for="(section,index) in documentation.data">
                <div v-if="section.type == 'header'">
                    <span v-html="section.code"></span>
                </div>
                <div v-if="section.type == 'text'">
                    <span v-html="section.code"></span>
                </div>
                <div v-if="section.type == 'javascript'" class="mb-3">
                    <div :id="index">
                        {{runJsCode({id:index,code:section.code})}}
                    </div>
                </div>
                <div v-if="section.type == 'shell'" class="mb-3">
                    <div :id="index">
                        {{runShellCode({id:index,code:section.code})}}
                    </div>
                </div>
                <div v-if="section.type == 'php'" class="mb-3">
                    <div :id="index">
                        {{runPhpCode({id:index,code:section.code})}}
                    </div>
                </div>
                <div v-if="section.type == 'python'" class="mb-3">
                    <div :id="index">
                        {{runShellCode({id:index,code:section.code})}}
                    </div>
                </div>
            </div>
        </div>
    `
}

export { DocumentationViewer }