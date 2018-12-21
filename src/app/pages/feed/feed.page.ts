import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeedModalPage } from '../feed-modal/feed-modal.page';
import { NgForm } from '@angular/forms';
import { FeedService } from '../../services/feed.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit{

  feeds:any[];
  
    constructor(
      private modalController: ModalController,
      private feedService:FeedService,
      private userService: UserService
      ){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): any {
    this.feedService.getFeed()
      .subscribe(data =>{

        data.map(feed=>{

          this.userService.getUserById(feed.user_id)
            .subscribe(user=>{
              feed['user'] = user;
            });

        });
        this.feeds = data;
      });
  }

  async presentModal(feed) {
    const modal = await this.modalController.create({
      component: FeedModalPage,
      componentProps: { feed }
    });
    return await modal.present();
  }

  post(f:NgForm){
    this.feedService.postFeed(f.value)
      .subscribe(data=>{
        this.loadData();
        f.resetForm();
      });
  }
}
