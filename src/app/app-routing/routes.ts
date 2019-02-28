import { Routes } from '@angular/router';

import { MobileComponent } from '../mobile/mobile.component';
import { HomeComponent } from '../home/home.component';
import { ProductdetailComponent} from '../productdetail/productdetail.component';
import { RegisterComponent} from '../register/register.component';
import { LoginComponent} from '../login/login.component';
import { ContactusComponent} from '../contactus/contactus.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'mobile', component: MobileComponent},
    {path: 'contactus', component: ContactusComponent},
    { path: 'productdetail/:id', component: ProductdetailComponent },
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' },
];
