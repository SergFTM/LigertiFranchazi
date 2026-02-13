import type { PageServerLoad } from './$types';
import { events, bookings, cities, venues } from '$lib/data/mock';

export const load: PageServerLoad = async () => {
	const totalRevenue = bookings.reduce((sum, b) => sum + b.total_amount, 0);
	const totalDeposits = bookings.reduce((sum, b) => sum + b.deposit_amount, 0);

	return {
		stats: {
			totalEvents: events.length,
			publishedEvents: events.filter((e) => e.status === 'published').length,
			totalBookings: bookings.length,
			totalCities: cities.length,
			totalVenues: venues.length,
			totalRevenue,
			totalDeposits
		},
		cities: cities.map((c) => ({
			...c,
			eventCount: events.filter((e) => e.city_id === c.id).length,
			bookingCount: bookings.filter((b) => {
				const event = events.find((e) => e.id === b.event_id);
				return event?.city_id === c.id;
			}).length
		})),
		recentBookings: bookings.slice(-5).reverse().map((b) => {
			const event = events.find((e) => e.id === b.event_id);
			return { ...b, event };
		})
	};
};
