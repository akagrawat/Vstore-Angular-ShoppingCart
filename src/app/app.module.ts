import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MobileComponent } from './mobile/mobile.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';

import { ProductService } from '../app/services/product.service';
import { AuthService } from '../app/services/auth.service';
import { AuthGuard } from '../app/services/auth.guard';
import { HttpClientModule } from '@angular/common/http';

import { ContactusComponent } from './contactus/contactus.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminComponent } from './admin/admin.component';
import { MycartComponent } from './mycart/mycart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
@NgModule({
  declarations: [
    AppComponent,
    MobileComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductdetailComponent,
    ContactusComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    AboutusComponent,
    AdminComponent,
    MycartComponent,
    CheckoutComponent,
    BillingDetailsComponent,
    PaymentDetailsComponent,
    OrderConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    NgxSpinnerModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [ ProductService,
               AuthService,
               AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
