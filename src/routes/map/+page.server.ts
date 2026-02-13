import type { PageServerLoad } from './$types';
import { cities, getEventsByCity } from '$lib/data/mock';

export const load: PageServerLoad = async () => {
	const citiesWithCounts = cities.map((c) => ({
		...c,
		eventCount: getEventsByCity(c.id).length
	}));
	return { cities: citiesWithCounts };
};
