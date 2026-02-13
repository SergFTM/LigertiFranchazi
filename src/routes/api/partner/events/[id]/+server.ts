import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { events } from '$lib/data/mock';

export const PATCH: RequestHandler = async ({ params, request }) => {
	const event = events.find((e) => e.id === params.id);
	if (!event) throw error(404, 'Event not found');

	const updates = await request.json();

	const allowedFields = [
		'title_ru', 'title_en', 'description_ru', 'description_en',
		'category', 'start_at', 'duration_min', 'price_amount',
		'currency', 'capacity', 'cover_image', 'media_gallery',
		'agenda', 'last_spots_threshold', 'status'
	];

	for (const [key, value] of Object.entries(updates)) {
		if (allowedFields.includes(key)) {
			(event as any)[key] = value;
		}
	}

	return json({ event });
};
