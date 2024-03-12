<div class="bg-repeat-2" id="app">
    <div class="container py-5">
        <div class="row g-6 justify-content-center">
            <div class="col-12 col-md-10">
                <div class="row align-items-center justify-content-center text-center">
                    <div class="row align-items-center justify-content-center text-center">
                        <div class="col-4 col-md-2 text-center text-dark animation-fall-down" style="--delay:300ms">
                            <img src="../../src/img/green-light-vertical.png" class="w-100" alt="logo" title="logo" />
                        </div>
                    </div>
                </div>
        
                <div class="row g-6 justify-content-center">
                    <div class="col-12 col-12 animation-fall-right pt-6" style="--delay:1200ms">
                        <div class="card shadow card-property overflow-hidden z-zoom-element cursor-pointer us" style="height: 44rem;">
                            <div class="mask"></div>
                        </div>
                    </div>

                    <div class="col-12 col-12 animation-fall-down text-white" style="--delay:600ms">

                        <div class="h3 text-white maldives">Querida comunidad Jade: </div>

                        <div class="my-5">
                            <p class="lead">En nombre de todo el equipo UNIVERSO DE JADE, queremos  expresar nuestro mas sincero agradecimiento por habernos elegido, queremos felicitarte, ya que desde este momento formas parte de nuestra familia </p>
                            <p class="lead">Es un honor para nosotros ser parte de este importante paso en tu camino. Nos comprometemos a trabajar incansablemente para garantizar que tu inversión esté respaldada por el mejor servicio y atención al cliente.</p>
                            <p class="lead">Valoramos profundamente tu confianza en nosotros y estamos aquí para responder cualquier pregunta que puedas tener y para brindarte el apoyo que necesites en cada etapa de este camino.</p>
                            <p class="lead">Una vez más, gracias por confiar en nosotros. Esperamos construir una relación duradera y exitosa contigo.</p>
                        </div>

                        <div class="lead">
                            <div>Atentamente</div>
                            <strong>
                                UNIVERSO DE JADE
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="row g-5 mb-5 align-items-center justify-content-center w-100 mx-0">
                    <div class="col-12 col-md-12">
                        <div class="row g-5 justify-content-center align-items-centers">
                            <div class="col-12 col-md-6 animation-fall-left" style="--delay:500ms">
                                <div class="row mb-3 justify-content-end">
                                    <div class="col-12 col-md-7">
                                        <img src="../../src/img/imish.png" class="w-100 rounded" alt="Imish Kuj" title="Imish Kuj"/>
                                    </div>
                                </div>
                                <video id="videoBoss" class="rounded overflow-hidden" style="width:100%" poster="../../src/img/home/video-imish.png" controls>
                                    <source src="../../src/files/video/imish.mp4" type="video/mp4">

                                    <object data="../../src/files/video/imish.mp4" width="470" height="255">
                                        
                                    </object>
                                </video>
                            </div>
                            <div class="col-12 col-md-6 mb-3 mb-md-0 animation-fall-down" style="--delay:250ms">
                                <div class="mb-3">
                                    <div class="h4 mb-0 text-white text-uppercase d-none">conoce más</div>
                                    <div class="h2 maldives text-success text-uppercase">Imish Kuj</div>
                                </div>
                                <p class="text-white lead">Permítanme presentarles a Imish Kuj, un individuo cuya vida está impregnada de significado y servicio.</p>
                                <p class="text-white lead">Con 42 años de experiencia humana, Imish ha dedicado su existencia a mantener viva una voz, un recuerdo, una memoria. Su compromiso con compartir y servir ha sido evidente desde una edad temprana, comenzando su viaje de servicio a la edad de 19 años.</p>
                                <p class="text-white lead">Imish se identifica como aprendiz del gran espíritu del gran misterio, lo que sugiere una profunda conexión con lo trascendental y lo espiritual. Reconoce que las experiencias más llenas de enseñanzas han sido las más transformadoras, incluso las dolorosas. Esta comprensión le ha llevado a la convicción de que cometer errores es esencial para el crecimiento y el aprendizaje.</p>
                                <p class="text-white lead">En resumen, Imish Kuj personifica la sabiduría adquirida a través de la vida y la voluntad de aprender y crecer a través de todas las experiencias que el camino le presenta. Su historia nos recuerda la importancia de abrazar la totalidad de la existencia, tanto la luz como la oscuridad, con gratitud y humildad.</p>

                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row justify-content-center">
                    <div class="col-12 col-md-7">
                        <div class="card rounded bg-transparent p-0 h-auto overflow-hidden">
                            <div @click="playVideo" v-show="showing" class="mask cursor-pointer opacity-100 z-zoom-element bg-dark rounded opacity-total z-index-1" style="background-image:url(../../src/img/home/video-imish.png)">
                                <div class="justify-content-center d-flex align-items-center h-100">
                                    <span class="btn-play d-flex justify-content-center align-items-center cursor-pointer z-zoom-element"><i class="bi fs-1 bi-play-fill text-white"></i></span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer-viewer></footer-viewer>
</div>