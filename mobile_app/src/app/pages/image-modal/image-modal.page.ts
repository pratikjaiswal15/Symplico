import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalController, IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  @Input() image_url: string;
  @ViewChild('sliderRef') protected slides: IonSlides;


   subscription1: Subscription

  sliderOpts = {
    zoom: {
      maxRatio: 5,
    }
  }

  constructor(public modalController: ModalController ) {}

  ngOnInit() {

  }

  close(){
    this.modalController.dismiss()
  }

  ionViewDidEnter () {
    this.slides.update();
  }
}
