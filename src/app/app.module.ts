import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostService } from './core/Post/services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './core/User/components/user.component';
import { PostComponent } from './core/Post/components/post.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, UserComponent, PostComponent, HeaderComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
