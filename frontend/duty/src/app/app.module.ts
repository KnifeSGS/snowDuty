import { DATE_PIPE_DEFAULT_OPTIONS, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './login/login.module';
import { JwtInterceptorService } from './login/services/jwt-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    LayoutModule,
    HttpClientModule,
    MessagesModule,
    ToastModule
  ],
  providers: [MessageService, ConfirmationService, { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }, {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "YYYY. MM. dd. HH:mm", timezone: 'CET' }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
