import { UserSupport } from './../userSupport.module.js'

const CourseEditorCategoryCard = {
    props: ["courseData"],
    emits: [],
    components: {
        // OtherComponentName,
    },
    data(){
        return {
            categories: null,
            currencies: null,
            UserSupport: new UserSupport(),
        }
    },
    methods: {
        getCategories(){
            return new Promise((resolve) => {
                this.UserSupport.getCourseFormAddVars({},(response)=>{
                    this.currencies = response.catalog_currencies.map(currency => ({
                        id: currency.catalog_currency_id,
                        description: currency.currency + ' - ' + currency.description,
                    }));
                    this.categories = response.catalog_courses;
                    resolve()
                })
            })
        }
    },
    mounted(){
        this.getCategories().then(()=>{})
        $("#price").mask('#,##0.00', { reverse: true });
    },
    template: `
        <div class="card">
            <div class="card-body">
                <div class="form-floating mb-3">
                    <select :class="courseData.catalog_course_id ? 'is-valid' : ''" class="form-select" ref="catalog_course_id" v-model="courseData.catalog_course_id" aria-label="Selecciona el tipo de proyecto">
                        <option v-for="category in categories" :value="category.catalog_course_id">
                            {{ category.name }}
                        </option>
                    </select>
                    <label for="catalog_proyect_id">
                        <t>Categoría del curso</t>
                    </label>
                </div>

                <div v-if="!courseData.free" class="row">
                    <div class="col-12 col-xl">
                        <div class="row">
                            <div class="col-12 col-xl-6">
                                <div class="form-floating">
                                    <input v-model="courseData.price" :class="courseData.price ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.currency.focus()" type="text" class="form-control" ref="price" id="price" placeholder="">

                                    <label for="price">
                                        <t>Precio</t>
                                    </label>
                                </div>
                            </div>
                            <div class="col-12 col-xl-6">
                                <div class="form-floating">
                                    <select :class="courseData.catalog_currency_id ? 'is-valid' : ''" class="form-select" ref="currency" v-model="courseData.catalog_currency_id" aria-label="Selecciona el tipo de moneda">
                                        <option v-for="currency in currencies" :value="currency.id">
                                            {{ currency.description }}
                                        </option>
                                    </select>
                                    <label for="catalog_currency_id">
                                        <t>Moneda</t>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
};

export default CourseEditorCategoryCard;