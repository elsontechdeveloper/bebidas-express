import { Component, OnInit, OnDestroy } from '@angular/core';

interface Slide {
  title: string;
  highlight: string;
  subtitle: string;
  badge: { icon: string; text: string; discount: string };
  background: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  private intervalId: any;
  private isPaused = false;
  
  slides: Slide[] = [
    {
      title: 'AS MELHORES',
      highlight: 'BEBIDAS',
      subtitle: 'GELADAS, PREÇOS BAIXOS\nE ENTREGA RÁPIDA!',
      badge: { icon: 'map-marker-alt', text: 'Retirada\nno local\n', discount: 'DESCONTO' },
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
    },
    {
      title: 'CHURRASCO',
      highlight: 'COMPLETO',
      subtitle: 'COMBO CERVEJAS + CARVÃO\nPOR APENAS R$ 39,90!',
      badge: { icon: 'fire', text: 'Oferta\nEspecial\n', discount: '15% OFF' },
      background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)'
    },
    {
      title: 'SEXTA',
      highlight: 'BRAHMA',
      subtitle: 'TODAS AS BRAHMAS\nCOM 15% DE DESCONTO!',
      badge: { icon: 'beer', text: 'Só Hoje\n\n', discount: '15% OFF' },
      background: 'linear-gradient(135deg, #CC0000 0%, #FF0000 100%)'
    },
    {
      title: 'GELO',
      highlight: 'TRANSPARENTE',
      subtitle: 'PURO E CRISTALINO\n5KG POR R$ 5,00!',
      badge: { icon: 'snowflake', text: 'Gelo\nPremium\n', discount: 'R$ 5,00' },
      background: 'linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)'
    }
  ];

  get currentSlideData(): Slide {
    return this.slides[this.currentSlide];
  }

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, 5000);
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  pauseAutoPlay() {
    this.isPaused = true;
  }

  resumeAutoPlay() {
    this.isPaused = false;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
