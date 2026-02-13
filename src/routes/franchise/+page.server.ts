import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

const applications: any[] = [];

export const actions: Actions = {
	submit: async ({ request }) => {
		const formData = await request.formData();
		const name = (formData.get('name') as string)?.trim();
		const email = (formData.get('email') as string)?.trim();
		const phone = (formData.get('phone') as string)?.trim();
		const city = (formData.get('city') as string)?.trim();
		const message = (formData.get('message') as string)?.trim();

		if (!name || !email || !phone || !city) {
			return fail(400, { error: 'Заполните все обязательные поля', values: { name, email, phone, city, message } });
		}

		applications.push({
			id: `fr-${applications.length + 1}`,
			name,
			email,
			phone,
			city,
			message: message || '',
			created_at: new Date().toISOString()
		});

		return { success: true };
	}
};
