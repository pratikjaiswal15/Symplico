import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router';
import { FormBuilder ,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/services/category.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';



@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {


  product_list :any;
  date;

  product_names;
  clicked = false;
  check : boolean = true ;
  public filteredList1;
  unit_list = [
    {name : 'Kg'},
    {name : 'Quintal'},
    {name : 'Piece'},
    {name : 'litre'},

  ];
  public filteredUnit = this.unit_list.slice();

  v_check;
  imageSrc: string;
  x: any;
  img: any;
  img_formdata : any;
  subscribe1 : Subscription;
  subscribe2 : Subscription;
  subscribe3 : Subscription;

  constructor(private toastr: ToastrService, public productService : ProductService, private router: Router,private fb:FormBuilder,
    private http: HttpClient, public categoryService : CategoryService ) {

   }


   get name() {
    return this.addProductForm.get('name')
   }

   set name(u) {
    this.addProductForm.controls['name'].setValue(u)
  }

   
   get description() {
     return this.addProductForm.get('description')
   }

   get selected() {
    return this.addProductForm.get('selected')
   }
   
   get gst() {
    return this.addProductForm.get('gst')
   }

   
   set gst(u) {
    this.addProductForm.controls['gst'].setValue(u)
  }

    
  get unit() {
    return this.addProductForm.get('unit')
   }

   
   set unit(u) {
    this.addProductForm.controls['unit'].setValue(u)
  }

  get file() {
    return this.addProductForm.get('file')
   }

   
   set file(u) {
    this.addProductForm.controls['file'].setValue(u)
  }


  get image_url() {
    return this.addProductForm.get('image_url')
   }

   
   set image_url(u) {
     this.addProductForm.controls['image_url'].setValue(u)
  }

  get mrp() {
    return this.addProductForm.get('mrp')
   }

   
   set mrp(u) {
     this.addProductForm.controls['mrp'].setValue(u)
  }


   addProductForm = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(3)] ],
    image_url : [''],
    description : [''],
    gst : ['',Validators.required],
    selected : ['', Validators.required],
    unit : ['', Validators.required],
    file: [''],
    mrp: ['', Validators.required],   
  })

  

  ngOnInit() {

    this.getCategoriesAll()
    this.date = new Date();

    
  }
  
  getCategoriesAll () {
    
    this.categoryService.get_categoriesAll().then(data => {
      
      if(data){
        
        this.product_list = data;
        this.filteredList1 = this.product_list.slice();
        
      }
      

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
      
    }

  }

  

  add() {

    if(!this.img_formdata){
      alert("image is required")
    }

    else {

    const formData = new FormData();
    formData.append('photo', this.img_formdata)

  
  this.subscribe1 =this.http.post('http://[::1]:3000/api/upload', formData  ).subscribe(data => {
    
      this.x = data
      console.log(this.x)

      for(let i=0 ;i <this.x.files.length;i++){
      //  console.log(this.x[i].files.name)
        console.log(this.x.files[i].name)
        this.img = 'http://[::1]:3000/images/' + this.x.files[i].name
        this.image_url = this.img


        let prod = {
          name : this.name.value,
          image_url : this.image_url.value,
          description : this.description.value,
          gst : this.gst.value,
          date : new Date().toISOString(),
          category_id :  Number (this.selected.value),
          unit : this.unit.value
          
        
        }
    
        console.log(prod)

         
       this.subscribe2 = this.productService.addProduct(prod).subscribe( Response  => {
         console.log(Response)
         console.log(Response.status)
        console.log(Response.body.product_id)
        if(Response.status == 200 || Response.status == 201 || Response.status ==204) {
          this.toastr.success("data successfully added to database")

        this.subscribe3 =  this.productService.postProductPrice(Response.body.product_id, {fair_price : this.mrp.value} ).subscribe(data =>{
          console.log(data)
            
          })

        }
  
        else {
          this.toastr.error("Something went wrong! Please try again later")
        }
      }) 
      }      
    })
}
          
  }

ngOnDestroy(){
  
}
}
