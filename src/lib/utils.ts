import { Post } from "typings/modules";

function comparePublishedDates(a: Post, b: Post) {
	return new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf();
}

function matchFilter(filters: Record<string, boolean>) {
	return function (p: Post) {
		for (const [key, val] of Object.entries(filters)) {
			p[key] = p[key] === val;
		}
		return Object.values(p).every((val) => val);
	};
}

export function getFilteredPosts(
	allPosts: Post[],
	filters: Record<string, boolean>
): Post[] {
	return allPosts.filter(matchFilter(filters)).sort(comparePublishedDates);
}
