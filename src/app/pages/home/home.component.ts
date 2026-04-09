import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProductsComponent } from '../../components/products/products.component';
import { PromoBannersComponent } from '../../components/promo-banners/promo-banners.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    FeaturesComponent,
    SidebarComponent,
    ProductsComponent,
    PromoBannersComponent,
    HowItWorksComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
