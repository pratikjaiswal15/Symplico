import { Component, OnInit, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    
   }


  ngOnInit(): void {
  }

}
