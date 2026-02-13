import type { PageServerLoad } from './$types';
import { getCityBySlug, getEventsByCity, venues } from '$lib/data/mock';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const city = getCityBySlug(params.city);
	if (!city) throw error(404, 'Город не найден');

	const events = getEventsByCity(city.id);
	const cityVenues = venues.filter((v) => v.city_id === city.id);

	return { city, events, venues: cityVenues };
};
