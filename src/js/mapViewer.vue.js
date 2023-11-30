import { User } from '../../src/js/user.module.js?v=2.3.6'   


const MapViewer = {
    name : 'map-viewer',
    data() {
        return {
            User: new User,
            members : null
        }
    },
    methods: {
        getUsersByInternet(internet) {
            let user = this.members.find((member)=>{
                return member.country.internet == internet
            })

            return user != undefined ? user.total : 0
        },
        getTopCountries() {
            this.User.getTopCountries({},(response)=>{
                if(response.s == 1)
                {
                    this.members = response.members
                }

                this.initMap()
            })
        },
        initMap() {
            let _this = this
            var map = new jsVectorMap({
                map: 'world',
                selector: '#map',
            
                regionsSelectable: true,
                markersSelectable: true,
            
                labels: {
                    markers: {
                    render: function (marker) {
                        return marker.name
                    }
                    }
                },
                onRegionSelected: function (index, isSelected, selectedRegions) {
                    console.log(index, isSelected, selectedRegions);
                },
                onRegionTooltipShow: function (event, tooltip, index) {
                    let usersTotal = _this.getUsersByInternet(index)
                    console.log(tooltip, index);
                    tooltip.css({ backgroundColor: 'red' }).text(
                        tooltip.text() + ` ${usersTotal} miembros`
                    )
                },
                onMarkerSelected: function (code, isSelected, selectedMarkers) {
                    console.log(code, isSelected, selectedMarkers);
                },
                onMarkerTooltipShow: function (event, tooltip, code) {
                    tooltip.text(tooltip.text() + ' (Hello World (marker))')
                },
            })
        },
    },
    mounted() 
    { 
        this.getTopCountries()
    },
    template : `
        <div class="card">
            <div class="card-header h4">
                Cuenta de usuarios por paises
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-xl-6 mb-3 mb-xl-0">
                        <div id="map" style="width: 600px; height: 350px"></div>
                    </div>
                    <div class="col-12 col-xl-6 mb-3 mb-xl-0">
                        <table v-if="members" class="table">
                            <thead>
                                <tr>
                                    <th class="text-center">Top countries</th>
                                    <th class="text-center">All</th>
                                    <th class="text-center">Actives</th>
                                    <th class="text-center">Inactives</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="member in members">
                                    <td class="text-center">{{member.country.country}}</td>
                                    <td class="text-center">{{member.total}}</td>
                                    <td class="text-center">{{member.actives}}</td>
                                    <td class="text-center">{{member.inactives}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    `,
}

export { MapViewer } 