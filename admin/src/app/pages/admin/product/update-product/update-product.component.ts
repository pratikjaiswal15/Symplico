import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder ,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../../services/product.service'
import { CategoryService } from 'src/app/services/category.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';


@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit, OnDestroy {


  data: any;
  myid = null;
  date;
  response: any;
  product_list :any;
  public filteredList1;
  unit_list = [
    {name : 'kilogram'},
    {name : 'Quintal'},
    {name : 'Piece'},
    {name : 'litre'},

  ];
  img : any;
  res;
  public filteredUnit = this.unit_list.slice();

  img_formdata: any;
  imageSrc: string;
  x: any;
  subscribe1 : Subscription;
  subscribe2 : Subscription;
  subscribe3 : Subscription;
  subscribe4: Subscription;
  subscribe5: Subscription;

  
  get name() {
    return this.updatePform.get('name')
   }

   set name(n) {
    this.updatePform.controls['name'].setValue(n)
   }

   get description() {
     return this.updatePform.get('description')
   }

   set description(n) {
    this.updatePform.controls['description'].setValue(n)
   }

   get image_url() {
    return this.updatePform.get('image_url')
  }
   set image_url(n) {
    this.updatePform.controls['image_url'].setValue(n)
   }

   get gst() {
    return this.updatePform.get('gst')
  }

   set gst(n) {
    this.updatePform.controls['gst'].setValue(n)
   }
  

   get unit() {
    return this.updatePform.get('unit')
  }

   set unit(n) {
    this.updatePform.controls['unit'].setValue(n)
   }

   get sub_id() {
    return this.updatePform.get('sub_id')
  }
  

   set sub_id(n) {
    this.updatePform.controls['sub_id'].setValue(n)
   }


   get file() {
    return this.updatePform.get('file')
  }
  

   set file(n) {
    this.updatePform.controls['file'].setValue(n)
   }



  constructor(private route: ActivatedRoute, private router: Router, public productService :ProductService ,private fb:FormBuilder,private toastr: ToastrService,
   private categoryService :CategoryService, private http : HttpClient ) { 

   this.subscribe1 = this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.cat;
        this.myid = this.data.product_id
        this.name = this.data.name
        this.description = this.data.description
        this.image_url = this.data.image_url
        this.gst = this.data.gst
        this.unit = this.data.unit
        this.sub_id = this.data.sub_id
    
        console.log(this.image_url.value)
      }
    });

  }

  updatePform = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(3)] ],
    description : [''],
    gst : ['', Validators.required],
    unit : ['',Validators.required],
    sub_id : ['',Validators.required],
    image_url : [''],
    file : ['']

  })

  


  update(){
    let product = {
      name : this.name.value,
      description : this.description.value,
      image_url : this.image_url.value,
      date : new Date().toISOString(),
      gst : Number (this.gst.value),
      unit : this.unit.value,
      sub_id : this.sub_id.value

    } 
      console.log(product)
     this.subscribe2 = this.productService.patchProduct(this.myid,product).subscribe(data => {
        if(data.status == 204 || data.status == 200 ) {
          this.toastr.success("data updated successfully")
        }
        else {
          this.toastr.error("Something went wrong! Please try again later")
        }
        
    } )
  
  
  }


  ngOnInit() {

    this.getCategoriesAll()

  }


  getCategoriesAll () {
    
    this.categoryService.get_categoriesAll().then(data => {
      this.product_list = data;
      this.filteredList1 = this.product_list.slice();
      

    })

  }

  delete_image(){
    let url = this.image_url.value.split('images/')
    console.log(url)

   this.subscribe3= this.productService.delete_image({image :url[1]}).subscribe(x => {

    console.log("delete image")
    })

  }

  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      this.img_formdata = file
      
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
   
      };

      this.delete_image()
    
      const formData = new FormData();
      formData.append('photo', file)

     this.subscribe4 =  this.http.post('http://[::1]:3000/api/upload', formData).subscribe(data =>{

      this.x = data
      console.log(this.x)

      for(let i=0 ;i <this.x.files.length;i++){
        console.log(this.x.files[i].name)
        this.img = 'http://[::1]:3000/images/' + this.x.files[i].name
        this.image_url = this.img

        let prod = {
          image_url : this.image_url.value
        }

        this.subscribe5 =  this.productService.patchProduct(this.myid, prod).subscribe(data =>{
          this.toastr.success("Image successfully uploaded")
        })
      }
      })      
      
    }

  }
  ngOnDestroy(){
    this.subscribe1.unsubscribe()
  }

}
