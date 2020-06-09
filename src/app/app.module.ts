import { JwtModule } from '@auth0/angular-jwt';

import { AppErrorHandler } from './common/app.error.handler';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostService } from './services/post/post.service';
import { SummaryPipe } from './pipes/summary.pipe';
import { AppComponent } from './components/app/app.component';
import { PostComponent } from './components/post/post.component';
import { SocialComponent } from './components/social/social.component';
import { UserComponent } from './components/user/user.component';
import { TaskComponent } from './components/task/task.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { ArchiveDetailsComponent } from './components/archive-details/archive-details.component';
import { PhotosComponent } from './components/photos/photos.component';
import { AuthComponent } from './admin/auth/auth.component';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { fakeBackendProvider } from './helpers/fake.backend';

const appRoutes: Routes = [
	{ path: 'login', component: AuthComponent },
	{ path: 'archive', component: ArchiveComponent },
	{ path: 'archive-details/:albumId', component: ArchiveDetailsComponent },
	{ path: 'post', component: PostComponent },
	{ path: 'task', component: TaskComponent },
	{ path: 'photos/:id', component: PhotosComponent },
	{
		path: 'home',
		redirectTo: '/',
		pathMatch: 'full'
	},
	{
		path: 'admin',
		component: DashboardComponent,
		canActivate: [AuthGuard, AdminAuthGuard]
	},
	{ path: '', component: HomeComponent },
	{ path: '**', component: NotFoundComponent }
];
@NgModule({
	declarations: [
		AppComponent,
		PostComponent,
		SummaryPipe,
		SocialComponent,
		UserComponent,
		TaskComponent,
		PostDetailsComponent,
		PhotosComponent,
		NotFoundComponent,
		ArchiveComponent,
		ArchiveDetailsComponent,
		AuthComponent,
		HomeComponent,
		DashboardComponent
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		RouterModule.forRoot(appRoutes, {
			enableTracing: true
		}
		)
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		PostService,
		{ provide: ErrorHandler, useClass: AppErrorHandler },
		// Authentication Module
		AuthService,
		AuthGuard,
		AdminAuthGuard,
		// For creating a mock back-end. You don't need these in a real app. 
		fakeBackendProvider
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
