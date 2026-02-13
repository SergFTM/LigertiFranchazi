import type { PageServerLoad } from './$types';
import { filterEvents, cities } from '$lib/data/mock';

export const load: PageServerLoad = async ({ url }) => {
	const category = url.searchParams.get('category') || '';
	const city = url.searchParams.get('city') || '';
	const search = url.searchParams.get('search') || '';

	const events = filterEvents({ category, city, search });

	return { events, cities, filters: { category, city, search } };
};
