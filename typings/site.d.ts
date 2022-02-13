export interface Link {
  hidden?: true;
  title: string;
  permalink: string;
}

export interface LinkGroup extends Link {
  links: Link[];
}

export interface Slide {
  src: string;
  alt: string;
}
