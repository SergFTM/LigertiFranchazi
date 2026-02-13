import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { filterEvents } from '$lib/data/mock';

export const GET: RequestHandler = async ({ url }) => {
	const category = url.searchParams.get('category') || '';
	const city = url.searchParams.get('city') || '';
	const search = url.searchParams.get('search') || '';

	const events = filterEvents({ category, city, search });

	return json({ events, total: events.length });
};
