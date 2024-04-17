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


********************************************
installation de ng confirm-box : npm i ng-confirm-box / https://socket.dev/npm/package/ng-confirm-box



  posteDeTravail: PosteDeTravail = new PosteDeTravail;
  addPosteForm?: FormGroup;
  isUpdate: boolean = false;

  constructor(
    private posteDeTravailService: PosteDeTravailService,
    private route: Router,
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute
  ) {
    this.addPosteForm = this.fb.group({
      reference: [''],
      nom: ['']
    })
  }

  ngOnInit(): void {

    const id = this.activedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.posteDeTravailService.getById(parseInt(id))
        .subscribe(
          poste => {
            this.addPosteForm = this.fb.group({
              reference: [poste.nom, [Validators.required]],
              nom: [poste.reference, [Validators.required]]
            })
            console.log('test', poste);

          }
        )
    } else {
      this.addPosteForm = this.fb.group({
        reference: [''],
        nom: ['']
      })
    }




    // this.activedRoute.params.subscribe(params => {
    //   if (params['id']) {
    //     this.isUpdate = true;
    //   }
    // });

  }

  //1- add poste de travavil
  addPosteDeTravail() {


    this.posteDeTravail.reference = this.addPosteForm!.get('reference')?.value;
    this.posteDeTravail.nom = this.addPosteForm!.get('nom')?.value;



    if (this.posteDeTravail) {
      this.posteDeTravailService.update(this.posteDeTravail)
        .subscribe(
          data => {
            console.log(data);
            alert("Le poste est bien modifié");
            this.route.navigate(['admin/poste-de-travail'])

          },
          error => {
            console.error(error);
            alert(error)

          }
        )
    } else {
      this.posteDeTravailService.add(this.posteDeTravail)
        .subscribe(
          data => {
            console.log(data);
            alert("Le poste est bien enregistré");
            this.route.navigate(['admin/poste-de-travail'])

          },
          error => {
            console.error(error);
            alert(error)

          }
        )
    }




  }

  //2- update poste de travail
  updatePosteDeTravail() {
    this.posteDeTravailService.update(this.posteDeTravail)
      .subscribe(
        update => {
          console.log(update);
          alert('Poste de travail mis à jour avec succès: ')

        },
        error => {
          console.error(error);
          alert(error)

        }
      )
  }























      