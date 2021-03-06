import { Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';


import { AboutusComponent } from '../aboutus/aboutus.component';
import { MobileComponent } from '../mobile/mobile.component';
import { HomeComponent } from '../home/home.component';
import { ProductdetailComponent} from '../productdetail/productdetail.component';
import { RegisterComponent} from '../register/register.component';
import { LoginComponent} from '../login/login.component';
import { UserComponent} from '../user/user.component';
import { ContactusComponent} from '../contactus/contactus.component';
import { AdminComponent } from '../admin/admin.component';
import { MycartComponent} from '../mycart/mycart.component';
import { CheckoutComponent} from '../checkout/checkout.component';
import { BillingDetailsComponent } from '../billing-details/billing-details.component';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';
import { OrderConfirmationComponent } from '../order-confirmation/order-confirmation.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'mobile', component: MobileComponent},
    {path: 'contactus', component: ContactusComponent},
    {path: 'aboutus', component: AboutusComponent},
    { path: 'productdetail/:id', component: ProductdetailComponent },
    { path: 'mycart', component: MycartComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent },
    {path: 'admin', component: AdminComponent},
    {path: 'checkouts', component: CheckoutComponent, canActivate: [AuthGuard] },
    {path: 'billing-details', component: BillingDetailsComponent, canActivate: [AuthGuard]},
    {path: 'payment', component: PaymentDetailsComponent, canActivate: [AuthGuard]},
    {path: 'order-confirm', component: OrderConfirmationComponent},
    {path: 'user', component: UserComponent, },
    {path: '', redirectTo: '/home', pathMatch: 'full' },
];
