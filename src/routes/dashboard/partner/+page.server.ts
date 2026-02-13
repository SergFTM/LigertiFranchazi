import type { PageServerLoad } from './$types';
import { events, bookings, cities } from '$lib/data/mock';

export const load: PageServerLoad = async () => {
	// For MVP: show all events as if partner owns them
	const partnerEvents = events.map((e) => {
		const city = cities.find((c) => c.id === e.city_id);
		const eventBookings = bookings.filter((b) => b.event_id === e.id);
		return { ...e, city, bookingCount: eventBookings.length };
	});

	const totalRevenue = bookings.reduce((sum, b) => sum + b.total_amount, 0);
	const totalBookings = bookings.length;

	return { events: partnerEvents, totalRevenue, totalBookings };
};
