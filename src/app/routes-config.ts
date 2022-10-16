import {Routes} from "@angular/router";
import {UsersComponent} from "./pages/users/users.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {AbsencesComponent} from "./pages/absences/absences.component";
import { AuthGuard } from "./guards/auth-guard.guard";

export const ROUTES: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent, canActivate:[AuthGuard] },
  { path: 'settings', component: SettingsComponent },
  { path: 'absences', component: AbsencesComponent, canActivate:[AuthGuard] }
]
