import type { PageServerLoad } from './$types';
import { getPublishedEvents, cities } from '$lib/data/mock';

export const load: PageServerLoad = async () => {
	const events = getPublishedEvents().slice(0, 6);
	return { events, cities };
};
