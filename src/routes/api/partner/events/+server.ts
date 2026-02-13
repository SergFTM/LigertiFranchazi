import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { events } from '$lib/data/mock';
import type { Event, EventCategory, EventStatus } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const {
		title_ru,
		title_en,
		description_ru,
		description_en,
		category,
		start_at,
		duration_min,
		price_amount,
		currency,
		capacity,
		venue_id,
		city_id,
		cover_image,
		media_gallery,
		agenda,
		last_spots_threshold
	} = body;

	if (!title_ru || !category || !start_at || !price_amount || !capacity || !venue_id || !city_id) {
		throw error(400, 'Missing required fields');
	}

	const slug = title_ru
		.toLowerCase()
		.replace(/[^a-zа-я0-9]+/gi, '-')
		.replace(/^-|-$/g, '')
		+ '-' + Date.now().toString(36);

	const newEvent: Event = {
		id: `evt-${events.length + 1}`,
		slug,
		title_ru,
		title_en: title_en || title_ru,
		description_ru: description_ru || '',
		description_en: description_en || '',
		category: category as EventCategory,
		start_at,
		duration_min: duration_min || 120,
		price_amount,
		currency: currency || 'EUR',
		capacity,
		booked_count: 0,
		venue_id,
		city_id,
		cover_image: cover_image || '',
		media_gallery: media_gallery || [],
		agenda: agenda || [],
		last_spots_threshold: last_spots_threshold || 3,
		status: 'draft' as EventStatus,
		created_at: new Date().toISOString()
	};

	events.push(newEvent);

	return json({ event: newEvent }, { status: 201 });
};
