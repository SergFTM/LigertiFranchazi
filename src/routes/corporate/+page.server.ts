import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

const applications: any[] = [];

export const actions: Actions = {
	submit: async ({ request }) => {
		const formData = await request.formData();
		const company = (formData.get('company') as string)?.trim();
		const contact_name = (formData.get('contact_name') as string)?.trim();
		const email = (formData.get('email') as string)?.trim();
		const phone = (formData.get('phone') as string)?.trim();
		const event_type = (formData.get('event_type') as string)?.trim();
		const guest_count = parseInt(formData.get('guest_count') as string) || 0;
		const message = (formData.get('message') as string)?.trim();

		if (!company || !contact_name || !email || !phone) {
			return fail(400, {
				error: 'Заполните все обязательные поля',
				values: { company, contact_name, email, phone, event_type, guest_count, message }
			});
		}

		applications.push({
			id: `corp-${applications.length + 1}`,
			company,
			contact_name,
			email,
			phone,
			event_type: event_type || '',
			guest_count,
			message: message || '',
			created_at: new Date().toISOString()
		});

		return { success: true };
	}
};
