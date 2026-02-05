export interface IHeroImage {
  image: string;
  alt: string;
  link?: string;
}

export interface IHero {
  carouselImages: IHeroImage[];
  sideImages: IHeroImage[];
  isActive?: boolean;
}
