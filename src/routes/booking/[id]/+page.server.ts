import type { PageServerLoad, Actions } from './$types';
import { events, createBooking } from '$lib/data/mock';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const event = events.find((e) => e.id === params.id);
	if (!event) throw error(404, 'Ивент не найден');

	return { event };
};

export const actions: Actions = {
	create: async ({ request, params }) => {
		const event = events.find((e) => e.id === params.id);
		if (!event) return fail(404, { error: 'Ивент не найден', values: { qty: 1, name: '', phone: '', email: '' } });

		const formData = await request.formData();
		const qty = parseInt(formData.get('qty') as string) || 1;
		const name = (formData.get('name') as string)?.trim();
		const phone = (formData.get('phone') as string)?.trim();
		const email = (formData.get('email') as string)?.trim();

		if (!name || !phone || !email) {
			return fail(400, { error: 'Заполните все поля', values: { qty, name, phone, email } });
		}

		const remaining = event.capacity - event.booked_count;
		if (qty > remaining) {
			return fail(400, { error: `Доступно только ${remaining} мест`, values: { qty, name, phone, email } });
		}

		const booking = createBooking({
			event_id: event.id,
			qty,
			contact_info: { name, phone, email }
		});

		if (!booking) {
			return fail(500, { error: 'Не удалось создать бронь', values: { qty, name, phone, email } });
		}

		return { success: true, booking };
	}
};
