import { Component, ViewChild } from '@angular/core';

import { Platform, ModalController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Plugins } from '@capacitor/core';
import { UserService } from './services/user.service';

const { Network } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private location: PlatformLocation,
    private modalController: ModalController,
    private router: Router,
    private authenticationService: AuthenticationService,
    public userSevice : UserService
  ) {
    this.initializeApp();

    this.location.onPopState(async () => {
      console.log('on pop')
      const modal = await this.modalController.getTop()
      if (modal) {
        await modal.dismiss();
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {

          console.log(state)
          this.router.navigate(['tabs']);
        }
        else {

          console.log(state)
          this.router.navigate(['home']);
        }
      });

      this.network()

         this.platform.backButton.subscribeWithPriority(0, async() =>{
   
           if(this.routerOutlet && this.routerOutlet.canGoBack()) {
               this.routerOutlet.pop()
           } 
           
           else if(this.router.url == "/menu/items"){
             navigator["app"].exitApp();
           }

           if(this.router.url == "/tabs/tab5"){
             console.log('back')
             this.userSevice.hide_tab.next(false)
           }
   
         });
         
    });

  }

  async network() {
    let handler = Network.addListener('networkStatusChange', (status) => {
      console.log("Network status changed", status);
    });
    // To stop listening:
    // handler.remove();

    // Get the current network status
    let status = await Network.getStatus();
    console.log(status)

  }

}
