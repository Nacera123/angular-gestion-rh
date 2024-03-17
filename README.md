# RhAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
#   a n g u l a r - g e s t i o n - r h 
 
 
*******************************************************************************
*******************************************************************************
bootstrap : npm install bootstrap
bootstrap-icons :npm install bootstrap-icons
quill : npm install quill
boxicons : npm install boxicons





























    <div id="wrapper">

        <section id="featured">
            <!-- start slider -->
            <!-- Slider -->
            <div id="nivo-slider">
                <div class="nivo-slider">
                    <!-- Slide #1 image -->
                    <img [src]="imageHome.imageHome1" alt="" title="#caption-1" />
                    <!-- Slide #2 image -->
                    <img [src]="imageHome.imageHome2" alt="" title="#caption-2" />
                    <!-- Slide #3 image -->
                    <img [src]="imageHome.imageHome3" alt="" title="#caption-3" />

                </div>
                <div class="container">
                    <div class="row">
                        <div class="span12">
                            <!-- Slide #1 caption -->
                            <div class="nivo-caption" id="caption-1">
                                <div>
                                    <h2>Awesome <strong>features</strong></h2>
                                    <p>
                                        Lorem ipsum dolor sit amet nsectetuer nec Vivamus. Curabitu laoreet amet eget.
                                        Viurab oremd ellentesque ameteget. Lorem ipsum dolor sit amet nsectetuer nec
                                        vivamus.
                                    </p>
                                    <a href="#" class="btn btn-theme">Read More</a>
                                </div>
                            </div>
                            <!-- Slide #2 caption -->
                            <div class="nivo-caption" id="caption-2">
                                <div>
                                    <h2>Fully <strong>responsive</strong></h2>
                                    <p>
                                        Lorem ipsum dolor sit amet nsectetuer nec Vivamus. Curabitu laoreet amet eget.
                                        Viurab oremd ellentesque ameteget. Lorem ipsum dolor sit amet nsectetuer nec
                                        vivamus.
                                    </p>
                                    <a href="#" class="btn btn-theme">Read More</a>
                                </div>
                            </div>
                            <!-- Slide #3 caption -->
                            <div class="nivo-caption" id="caption-3">
                                <div>
                                    <h2>Very <strong>customizable</strong></h2>
                                    <p>
                                        Lorem ipsum dolor sit amet nsectetuer nec Vivamus. Curabitu laoreet amet eget.
                                        Viurab oremd ellentesque ameteget. Lorem ipsum dolor sit amet nsectetuer nec
                                        vivamus.
                                    </p>
                                    <a href="#" class="btn btn-theme">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end slider -->
        </section>
        <section class="callaction">
            <div class="container">
                <div class="row">
                    <div class="span12">
                        <div class="big-cta">
                            <div class="cta-text">
                                <h3>We've created more than <span class="highlight"><strong>5000
                                            websites</strong></span> this year!</h3>
                            </div>
                            <div class="cta floatright">
                                <a class="btn btn-large btn-theme btn-rounded" href="#">Request a quote</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="content">
            <div class="container">
                <div class="row">
                    <div class="span12">
                        <div class="row">
                            <div class="span3">
                                <div class="box aligncenter">
                                    <div class="aligncenter icon">
                                        <i class="icon-briefcase icon-circled icon-64 active"></i>
                                    </div>
                                    <div class="text">
                                        <h6>Corporate business</h6>
                                        <p>
                                            Lorem ipsum dolor sit amet, has ei ipsum scaevola deseruisse am sea
                                            facilisis.
                                        </p>
                                        <a href="#">Learn more</a>
                                    </div>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="box aligncenter">
                                    <div class="aligncenter icon">
                                        <i class="icon-desktop icon-circled icon-64 active"></i>
                                    </div>
                                    <div class="text">
                                        <h6>Responsive theme</h6>
                                        <p>
                                            Lorem ipsum dolor sit amet, has ei ipsum scaevola deseruisse am sea
                                            facilisis.
                                        </p>
                                        <a href="#">Learn more</a>
                                    </div>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="box aligncenter">
                                    <div class="aligncenter icon">
                                        <i class="icon-beaker icon-circled icon-64 active"></i>
                                    </div>
                                    <div class="text">
                                        <h6>Coded carefully</h6>
                                        <p>
                                            Lorem ipsum dolor sit amet, has ei ipsum scaevola deseruisse am sea
                                            facilisis.
                                        </p>
                                        <a href="#">Learn more</a>
                                    </div>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="box aligncenter">
                                    <div class="aligncenter icon">
                                        <i class="icon-coffee icon-circled icon-64 active"></i>
                                    </div>
                                    <div class="text">
                                        <h6>Sit and enjoy</h6>
                                        <p>
                                            Lorem ipsum dolor sit amet, has ei ipsum scaevola deseruisse am sea
                                            facilisis.
                                        </p>
                                        <a href="#">Learn more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- divider -->
                <div class="row">
                    <div class="span12">
                        <div class="solidline">
                        </div>
                    </div>
                </div>
                <!-- end divider -->
                <!-- Portfolio Projects -->
                <div class="row">
                    <div class="span12">
                        <h4 class="heading">Some of recent <strong>works</strong></h4>
                        <div class="row">
                            <section id="projects">
                                <ul id="thumbs" class="portfolio">
                                    <!-- Item Project and Filter Name -->
                                    <li class="item-thumbs span3 design" data-id="id-0" data-type="web">
                                        <!-- Fancybox - Gallery Enabled - Title - Full Image -->
                                        <a class="hover-wrap fancybox" data-fancybox-group="gallery" title="The City"
                                            href="img/works/full/image-01-full.jpg">
                                            <span class="overlay-img"></span>
                                            <span class="overlay-img-thumb font-icon-plus"></span>
                                        </a>
                                        <!-- Thumb Image and Description -->
                                        <img src="img/works/thumbs/image-01.jpg"
                                            alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis elementum odio. Curabitur pellentesque, dolor vel pharetra mollis.">
                                    </li>
                                    <!-- End Item Project -->
                                    <!-- Item Project and Filter Name -->
                                    <li class="item-thumbs span3 design" data-id="id-1" data-type="icon">
                                        <!-- Fancybox - Gallery Enabled - Title - Full Image -->
                                        <a class="hover-wrap fancybox" data-fancybox-group="gallery" title="The Office"
                                            href="img/works/full/image-02-full.jpg">
                                            <span class="overlay-img"></span>
                                            <span class="overlay-img-thumb font-icon-plus"></span>
                                        </a>
                                        <!-- Thumb Image and Description -->
                                        <img src="img/works/thumbs/image-02.jpg"
                                            alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis elementum odio. Curabitur pellentesque, dolor vel pharetra mollis.">
                                    </li>
                                    <!-- End Item Project -->
                                    <!-- Item Project and Filter Name -->
                                    <li class="item-thumbs span3 photography" data-id="id-2" data-type="illustrator">
                                        <!-- Fancybox - Gallery Enabled - Title - Full Image -->
                                        <a class="hover-wrap fancybox" data-fancybox-group="gallery"
                                            title="The Mountains" href="img/works/full/image-03-full.jpg">
                                            <span class="overlay-img"></span>
                                            <span class="overlay-img-thumb font-icon-plus"></span>
                                        </a>
                                        <!-- Thumb Image and Description -->
                                        <img src="img/works/thumbs/image-03.jpg"
                                            alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis elementum odio. Curabitur pellentesque, dolor vel pharetra mollis.">
                                    </li>
                                    <!-- End Item Project -->
                                    <!-- Item Project and Filter Name -->
                                    <li class="item-thumbs span3 photography" data-id="id-2" data-type="illustrator">
                                        <!-- Fancybox - Gallery Enabled - Title - Full Image -->
                                        <a class="hover-wrap fancybox" data-fancybox-group="gallery"
                                            title="The Mountains" href="img/works/full/image-04-full.jpg">
                                            <span class="overlay-img"></span>
                                            <span class="overlay-img-thumb font-icon-plus"></span>
                                        </a>
                                        <!-- Thumb Image and Description -->
                                        <img src="img/works/thumbs/image-04.jpg"
                                            alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis elementum odio. Curabitur pellentesque, dolor vel pharetra mollis.">
                                    </li>
                                    <!-- End Item Project -->
                                    <!-- Item Project and Filter Name -->
                                    <li class="item-thumbs span3 photography" data-id="id-4" data-type="web">
                                        <!-- Fancybox - Gallery Enabled - Title - Full Image -->
                                        <a class="hover-wrap fancybox" data-fancybox-group="gallery" title="The Sea"
                                            href="img/works/full/image-05-full.jpg">
                                            <span class="overlay-img"></span>
                                            <span class="overlay-img-thumb font-icon-plus"></span>
                                        </a>
                                        <!-- Thumb Image and Description -->
                                        <img src="img/works/thumbs/image-05.jpg"
                                            alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis elementum odio. Curabitur pellentesque, dolor vel pharetra mollis.">
                                    </li>
                                    <!-- End Item Project -->
                                    <!-- Item Project and Filter Name -->
                                    <li class="item-thumbs span3 photography" data-id="id-5" data-type="icon">
                                        <!-- Fancybox - Gallery Enabled - Title - Full Image -->
                                        <a class="hover-wrap fancybox" data-fancybox-group="gallery" title="Clouds"
                                            href="img/works/full/image-06-full.jpg">
                                            <span class="overlay-img"></span>
                                            <span class="overlay-img-thumb font-icon-plus"></span>
                                        </a>
                                        <!-- Thumb Image and Description -->
                                        <img src="img/works/thumbs/image-06.jpg"
                                            alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis elementum odio. Curabitur pellentesque, dolor vel pharetra mollis.">
                                    </li>
                                    <!-- End Item Project -->
                                    <!-- Item Project and Filter Name -->
                                    <li class="item-thumbs span3 photography" data-id="id-2" data-type="illustrator">
                                        <!-- Fancybox - Gallery Enabled - Title - Full Image -->
                                        <a class="hover-wrap fancybox" data-fancybox-group="gallery"
                                            title="The Mountains" href="img/works/full/image-07-full.jpg">
                                            <span class="overlay-img"></span>
                                            <span class="overlay-img-thumb font-icon-plus"></span>
                                        </a>
                                        <!-- Thumb Image and Description -->
                                        <img src="img/works/thumbs/image-07.jpg"
                                            alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis elementum odio. Curabitur pellentesque, dolor vel pharetra mollis.">
                                    </li>
                                    <!-- End Item Project -->
                                    <!-- Item Project and Filter Name -->
                                    <li class="item-thumbs span3 design" data-id="id-0" data-type="web">
                                        <!-- Fancybox - Gallery Enabled - Title - Full Image -->
                                        <a class="hover-wrap fancybox" data-fancybox-group="gallery" title="The Dark"
                                            href="img/works/full/image-08-full.jpg">
                                            <span class="overlay-img"></span>
                                            <span class="overlay-img-thumb font-icon-plus"></span>
                                        </a>
                                        <!-- Thumb Image and Description -->
                                        <img src="img/works/thumbs/image-08.jpg"
                                            alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis elementum odio. Curabitur pellentesque, dolor vel pharetra mollis.">
                                    </li>
                                    <!-- End Item Project -->
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
                <!-- End Portfolio Projects -->
                <!-- divider -->
                <div class="row">
                    <div class="span12">
                        <div class="solidline">
                        </div>
                    </div>
                </div>
                <!-- end divider -->
                <div class="row">
                    <div class="span12">
                        <h4>Very satisfied <strong>clients</strong></h4>
                        <ul id="mycarousel" class="jcarousel-skin-tango recent-jcarousel clients">
                            <li>
                                <a href="#">
                                    <img src="img/dummies/clients/client1.png" class="client-logo" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/dummies/clients/client2.png" class="client-logo" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/dummies/clients/client3.png" class="client-logo" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/dummies/clients/client4.png" class="client-logo" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/dummies/clients/client5.png" class="client-logo" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/dummies/clients/client6.png" class="client-logo" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/dummies/clients/client1.png" class="client-logo" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/dummies/clients/client2.png" class="client-logo" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/dummies/clients/client3.png" class="client-logo" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/dummies/clients/client4.png" class="client-logo" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/dummies/clients/client5.png" class="client-logo" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/dummies/clients/client6.png" class="client-logo" alt="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section id="bottom">
            <div class="container">
                <div class="row">
                    <div class="span12">
                        <div class="aligncenter">
                            <div id="twitter-wrapper">
                                <div id="twitter">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>










        <app-footer></app-footer>
        <a href="#" class="scrollup"><i class="icon-chevron-up icon-square icon-32 active"></i></a>
    </div>
