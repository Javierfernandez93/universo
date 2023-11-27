import { User } from '../../src/js/user.module.js?v=2.3.4'   

const DirectsViewer = {
    name : 'directs-viewer',
    data() {
        return {
            User: new User,
            firstLine : null,
            total : {
                volumen: 0
            },
            busy : false,
            nextRange : null,
            multilevel : null,
            multilevelAux : null
        }
    },
    methods: {
        goToSponsor(referral_id) {  
            _scrollTo($(`#${referral_id}`).offset().top) 
        },
        async getBalanceUsersFromNetwork() {
            this.firstLine = this.multilevel[0].users

            if(this.firstLine.length > 0) 
            {
                for(let user of this.firstLine)
                {
                    user.busy = true
                    user.balance = await this.getBalanceUserFromNetwork(user.user_login_id)

                    this.total.volumen += user.balance

                    user.busy = false
                }
            }
            
            this.sortData({
                name: 'balance',
                desc: false
            })

            this.getTotalBalanceForLevel()
            this.getPercentajesByDirects(this.firstLine)
            
            this.getTotalBalanceForLevel()
            this.getNextTrangeData(this.firstLine.totalBalance)
        }, 
        getNextTrangeData(totalBalance) {   
            this.nextRange.percentageActual = this.getPercentajeByAmount(totalBalance,this.nextRange.volumen)
        },
        getPercentajeByAmount(amount,total) {   
            return parseFloat((amount * 100) / total)
        },
        getAmountByPercentage(amount,percentaje) {     
            return parseFloat((percentaje * amount) / 100)
        },
        getPercentajesByDirects(directs) {    
            directs.map((user) => {
                user.percentaje = this.getPercentajeByAmount(user.balance,this.nextRange.volumen)

                if(user.percentaje > this.nextRange.percentage)
                {
                    user.balance = this.getAmountByPercentage(this.nextRange.volumen,this.nextRange.percentage)
                    user.percentaje = this.nextRange.percentage
                } 

                return user
            })
        },
        sortData(column) {
            this.firstLine.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                return _a[column.name] - _b[column.name]
            })
        },
        getTotalBalanceForLevel() {    
            this.multilevel.map((level)=>{
                level.totalBalance = 0

                for(let user of level.users)
                {
                    level.totalBalance += user.balance != undefined ? parseFloat(user.balance) : 0
                }

                return level
            })
        },
        async getBalanceUserFromNetwork(company_id) {    
            return new Promise((resolve) => {   
                this.User.getBalanceUserFromNetwork({company_id:company_id},(response)=>{
                    resolve(response.balance)
                })
            })
        },
        duplicateUsers() {    
            this.multilevel.map((level)=>{
                level.usersAux = level.users

                return level
            })
        },
        searchInLevel(target,level) {    
            const query = target.value

            level.users = level.usersAux
            level.users = level.users.filter((user)=>{
                return user.names.toLowerCase().includes(query.toLowerCase())
                    || user.referral.names.toLowerCase().includes(query.toLowerCase())
            })
        },
        getUsersMultilevel() {    
            return new Promise((resolve,reject) => {        
                this.busy = true 
                this.User.getUsersMultilevel({},(response)=>{
                    this.busy = false 

                    if(response.s == 1)
                    {
                        resolve(response)
                    }

                    reject()
                })
            })
        },
    },
    mounted() 
    {   
        this.getUsersMultilevel().then((response)=>{
            this.multilevel = response.multilevel
            this.nextRange = response.nextRange
            this.nextRange.percentageActual = 0

            this.busy = true 
            this.duplicateUsers()
            this.getBalanceUsersFromNetwork()
            this.busy = false
        }).catch(() => {
            this.gains = false 
        })
    },
    template : `
        <div v-if="busy" class="justify-content-center text-center">
            <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
            <div class="row align-items-center mt-5"> 
                <div class="col-12 col-xl">
                    <h3>Líneas más fuertes</h3>

                    <div v-if="firstLine" class="overflow-scroll" style="max-height:320px">
                        <div v-for="line in firstLine" class="row mb-3">
                            <div class="col-12 text-end">
                                <div class="text-dark fw-semibold text-capitalize">{{line.names}} / <span clas="text-success">$ {{line.balance.numberFormat(2)}} USD </span></div>

                                <div class="progress mt-1 border bg-light" role="progressbar" aria-label="Animated striped example" :aria-valuenow="line.percentaje" aria-valuemin="0" aria-valuemax="100" style="height: 1rem;">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{'width': line.percentaje+'%'}" style="height: 1rem;"></div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xl">
                    <div class="row mb-3">
                        <div class="col-12">
                            <div class="card p-5 bg-gradient-success rounded card-body">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl">
                                        <div class="h4 fw-sembold text-white">Volumen total</div>
                                        <div class="h2 fw-sembold text-light">$ {{total.volumen.numberFormat(2)}}</div>
                                    </div>
                                    <div class="col-12 col-xl-auto">
                                        <i class="bi text-white fs-1 bi-cash-stack"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12">
                            <div class="card p-5 bg-mesh rounded card-body">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl">
                                        <div class="h4 fw-sembold text-white">Rango por alcanzar {{nextRange.title}}</div>
                                        <div class="h2 fw-sembold text-light">$ {{nextRange.volumen.numberFormat(2)}}</div>
                                    </div>
                                    <div class="progress mt-1 border bg-light px-0" role="progressbar" aria-label="Animated striped example" :aria-valuenow="nextRange.percentage" aria-valuemin="0" aria-valuemax="100" style="height: 1rem;">
                                        <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{'width': nextRange.percentage+'%'}" style="height: 1rem;"></div> 
                                    </div>

                                    <div v-if="multilevel[0].totalBalance" class="text-xs text-white text-center mt-3">
                                        {{nextRange.percentage.numberFormat(2)}} % / $ {{multilevel[0].totalBalance.numberFormat(2)}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-none row mb-3">
                        <div class="col-12">
                            <div class="card bg-mesh rounded card-body">
                                <div class="fs-4 fw-sembold text-white">Volumen total</div>
                                <div class="lead fw-sembold text-light">$ {{total.volumen.numberFormat(2)}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="multilevel" class="d-none">
                <div v-for="(level,levelIndex) in multilevel" class="card bg-transparent shadow-none border-bottom mb-3">
                    <div class="card-header bg-transparent">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl"> 
                                <div class="text-xs">Total usuarios {{level.users.length}}</div>
                                <div class="fs-4 fw-sembold text-primary">Nivel {{levelIndex+1}}</div>
                            </div>
                            <div class="col-12 col-xl-auto text-end">
                                <div class="row justify-content-end">
                                    <div class="col-12 col-xl">
                                        <div class="text-xs">Volumen en nivel</div>
                                        <span v-if="level.totalBalance" class="fw-semibold fs-4 text-dark">$ {{level.totalBalance.numberFormat(2)}}</span>
                                        <span v-else class="fw-semibold fs-4 text-dark">$ 0</span>
                                    </div>
                                    <div class="col-12 col-xl-auto">
                                        <div class="input-group">
                                            <input v-if="level.searching" @keyup="searchInLevel($event.target,level)" type="text" class="form-control" placeholder="Buscar"/>
                                            
                                            <button class="btn btn-outline-dark mb-0" type="button" @click="level.searching = !level.searching">
                                                <i class="bi bi-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else="multilevel == false" class="alert alert-white text-center">
                Aquí podrás ver tu genealogía comienza compartiendo tu link de referido para hacer crecer tu red
            </div>
        </div>
    `,
}

export { DirectsViewer } 