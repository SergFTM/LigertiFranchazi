import type { PageServerLoad } from './$types';
import { getEventBySlug, getVenueById, cities } from '$lib/data/mock';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const event = getEventBySlug(params.slug);
	if (!event) throw error(404, 'Ивент не найден');

	const venue = getVenueById(event.venue_id);
	const city = cities.find((c) => c.id === event.city_id);

	return { event, venue, city };
};
