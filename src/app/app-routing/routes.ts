import { Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';



import { MobileComponent } from '../mobile/mobile.component';
import { HomeComponent } from '../home/home.component';
import { ProductdetailComponent} from '../productdetail/productdetail.component';
import { RegisterComponent} from '../register/register.component';
import { LoginComponent} from '../login/login.component';
import { UserComponent} from '../user/user.component';
import { ContactusComponent} from '../contactus/contactus.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'mobile', component: MobileComponent},
    {path: 'contactus', component: ContactusComponent},
    { path: 'productdetail/:id', component: ProductdetailComponent },
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    {path: 'user', component: UserComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' },
];
