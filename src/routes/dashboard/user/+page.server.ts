import type { PageServerLoad } from './$types';
import { bookings, events } from '$lib/data/mock';

export const load: PageServerLoad = async () => {
	const userBookings = bookings.map((b) => {
		const event = events.find((e) => e.id === b.event_id);
		return { ...b, event };
	});

	return { bookings: userBookings };
};
