import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class LoadingService{

 private loading: boolean;

 constructor(private loadingController: LoadingController) {}

  
  async present() {
    this.loading = true;
    return await this.loadingController.create({
       duration: 4000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.loading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.loading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
 
}

/*
 
 
 */

/* 
export class LoadingService {


  public loading$: BehaviorSubject<{ type: LoadingTypeEnum; data?: any }> = new BehaviorSubject<any>({ type: LoadingTypeEnum.hide });
  loadingState: { type: LoadingTypeEnum; data?: any } = null;
  public loading: HTMLIonLoadingElement = null;

  public async getLoader() {
    return await this.loadingController.getTop() || null
  };

  private async showLoading(opts: LoadingOptions) {
    if (!this.loading) {
      console.log("created")
      this.loading = await this.loadingController.create(opts);
      await this.loading.present();
    }
  }

  private async hideLoading() {
    if (this.loading) {
      console.log("dismissed")

      await this.loading.dismiss();
    }
    this.loading = null;
  }

  private async messageLoading(m: string) {
    if (this.loading) {
      this.loading.message = m
    }
  }


  constructor(private loadingController: LoadingController) {
    const l$ = this.loading$.pipe(distinctUntilChanged(), debounceTime(200));

    l$.pipe(filter(l => l.type === LoadingTypeEnum.show)).subscribe(l => this.showLoading(l.data));
    l$.pipe(filter(l => l.type === LoadingTypeEnum.hide)).subscribe(l => this.hideLoading());
    l$.pipe(filter(l => l.type === LoadingTypeEnum.message)).subscribe(l => this.messageLoading(l.data));
  }

  show(opts?: LoadingOptions) {
    if (isNil(opts)) opts = {
      message: 'Please Wait'
    };
    this.loading$.next({ type: LoadingTypeEnum.show, data: opts })
  }

  hide() {
    this.loading$.next({ type: LoadingTypeEnum.hide })
  }

  message(m: string) {
    this.loading$.next({ type: LoadingTypeEnum.message, data: m })
  }
  
}
*/