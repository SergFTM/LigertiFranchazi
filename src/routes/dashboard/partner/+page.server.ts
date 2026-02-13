import type { PageServerLoad } from './$types';
import { events, bookings, cities, venues } from '$lib/data/mock';

export const load: PageServerLoad = async () => {
	// For MVP: show all events as if partner owns them
	const partnerEvents = events.map((e) => {
		const city = cities.find((c) => c.id === e.city_id);
		const venue = venues.find((v) => v.id === e.venue_id);
		const eventBookings = bookings.filter((b) => b.event_id === e.id);
		return {
			...e,
			city,
			venue,
			bookingCount: eventBookings.length,
			bookings: eventBookings
		};
	});

	const totalRevenue = bookings.reduce((sum, b) => sum + b.total_amount, 0);
	const totalBookings = bookings.length;
	const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;

	// Analytics mock
	const categoryPopularity = events.reduce(
		(acc, e) => {
			const fillRate = e.capacity > 0 ? Math.round((e.booked_count / e.capacity) * 100) : 0;
			acc[e.category] = Math.max(acc[e.category] || 0, fillRate);
			return acc;
		},
		{} as Record<string, number>
	);

	return {
		events: partnerEvents,
		totalRevenue,
		totalBookings,
		confirmedBookings,
		categoryPopularity,
		cities,
		bookings
	};
};
