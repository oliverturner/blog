export interface Link {
  title: string;
  permalink: string;
}

export interface LinkGroup {
  title: string;
  links: Link[];
}

export interface Slide {
  src: string;
  alt: string;
}
