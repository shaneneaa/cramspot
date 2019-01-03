import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedPage } from './feed.page';
import { FeedModalPage } from "../feed-modal/feed-modal.page";

const routes: Routes = [
  {
    path: '',
    component: FeedPage
  }
];

@NgModule({
  entryComponents: [ FeedModalPage ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FeedPage,FeedModalPage]
})
export class FeedPageModule {}
