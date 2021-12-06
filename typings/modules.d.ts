export interface PostImage {
	credit: string;
	link: string;
	alt: string;
}

export interface Post {
	title: string;
	permalink: string;
	image: PostImage;
	publishDate: string;
	description: string;
	tags: string[];
	isPublished: true;
}
