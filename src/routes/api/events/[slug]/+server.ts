import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getEventBySlug, getVenueById, cities } from '$lib/data/mock';

export const GET: RequestHandler = async ({ params }) => {
	const event = getEventBySlug(params.slug);
	if (!event) throw error(404, 'Event not found');

	const venue = getVenueById(event.venue_id);
	const city = cities.find((c) => c.id === event.city_id);

	return json({ event, venue, city });
};
