import type { City, Event, Venue, Booking } from '$lib/types';

// === Cities ===
export const cities: City[] = [
	{
		id: 'city-limassol',
		slug: 'limassol',
		name: 'Лимасол',
		name_en: 'Limassol',
		country: 'Кипр',
		coordinates: { lat: 34.7071, lng: 33.0226 },
		ig_previews: [
			'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=400&fit=crop'
		],
		description: 'Главный хаб Liberty Bureau на солнечном побережье Кипра'
	},
	{
		id: 'city-paphos',
		slug: 'paphos',
		name: 'Пафос',
		name_en: 'Paphos',
		country: 'Кипр',
		coordinates: { lat: 34.7754, lng: 32.4218 },
		ig_previews: [
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
		],
		description: 'Творческие мастерские на западном побережье'
	},
	{
		id: 'city-dubai',
		slug: 'dubai',
		name: 'Дубай',
		name_en: 'Dubai',
		country: 'ОАЭ',
		coordinates: { lat: 25.2048, lng: 55.2708 },
		ig_previews: [
			'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1546412414-e1885259563a?w=400&h=400&fit=crop'
		],
		description: 'Премиальные ивенты в сердце ОАЭ'
	},
	{
		id: 'city-tbilisi',
		slug: 'tbilisi',
		name: 'Тбилиси',
		name_en: 'Tbilisi',
		country: 'Грузия',
		coordinates: { lat: 41.7151, lng: 44.8271 },
		ig_previews: [
			'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1565799514555-5c6a44019ad8?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=400&h=400&fit=crop'
		],
		description: 'Атмосферные мастер-классы в старом городе'
	}
];

// === Venues ===
export const venues: Venue[] = [
	{
		id: 'venue-1',
		name: 'Liberty Studio Limassol',
		address: 'Agiou Andreou 123, Limassol',
		city_id: 'city-limassol',
		coordinates: { lat: 34.6786, lng: 33.0413 }
	},
	{
		id: 'venue-2',
		name: 'Liberty Studio Paphos',
		address: 'Tombs of the Kings Ave, Paphos',
		city_id: 'city-paphos',
		coordinates: { lat: 34.7654, lng: 32.4108 }
	},
	{
		id: 'venue-3',
		name: 'Liberty Studio Dubai',
		address: 'Al Quoz Creative Zone, Dubai',
		city_id: 'city-dubai',
		coordinates: { lat: 25.1416, lng: 55.2254 }
	},
	{
		id: 'venue-4',
		name: 'Liberty Studio Tbilisi',
		address: 'Shardeni St 15, Tbilisi',
		city_id: 'city-tbilisi',
		coordinates: { lat: 41.6911, lng: 44.8077 }
	}
];

// === Events ===
export const events: Event[] = [
	{
		id: 'evt-1',
		slug: 'pottery-limassol-march',
		title_ru: 'Мастер-класс по керамике',
		title_en: 'Pottery Workshop',
		description_ru:
			'Погрузитесь в мир гончарного искусства! Вы создадите свою уникальную чашку или вазу под руководством профессионального мастера. Все материалы включены. Никакого опыта не требуется — только ваше вдохновение.',
		description_en:
			'Dive into the world of pottery! Create your own unique cup or vase under the guidance of a professional craftsman.',
		category: 'pottery',
		start_at: '2026-03-15T18:00:00',
		duration_min: 120,
		price_amount: 65,
		currency: 'EUR',
		capacity: 12,
		booked_count: 9,
		venue_id: 'venue-1',
		city_id: 'city-limassol',
		cover_image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=800&fit=crop',
		media_gallery: [
			'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop',
			'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop',
			'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&h=600&fit=crop'
		],
		agenda: [
			{ time: '18:00', title: 'Встреча и знакомство', description: 'Приветственный напиток, введение в керамику' },
			{ time: '18:30', title: 'Работа на гончарном круге', description: 'Основы формовки и создание изделия' },
			{ time: '19:30', title: 'Декорирование', description: 'Роспись и глазурь вашего шедевра' },
			{ time: '20:00', title: 'Завершение и фото', description: 'Обжиг через 2 дня, доставка курьером' }
		],
		last_spots_threshold: 4,
		status: 'published',
		created_at: '2026-01-10T10:00:00'
	},
	{
		id: 'evt-2',
		slug: 'perfume-limassol-march',
		title_ru: 'Создание авторского парфюма',
		title_en: 'Create Your Own Perfume',
		description_ru:
			'Раскройте свою индивидуальность через аромат! Под руководством парфюмера вы создадите свой уникальный парфюм из более чем 50 ингредиентов. Флакон 30мл — ваш на память.',
		description_en:
			'Express your individuality through scent! Create your unique perfume from 50+ ingredients.',
		category: 'perfume',
		start_at: '2026-03-20T17:00:00',
		duration_min: 150,
		price_amount: 85,
		currency: 'EUR',
		capacity: 10,
		booked_count: 3,
		venue_id: 'venue-1',
		city_id: 'city-limassol',
		cover_image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop',
		media_gallery: [
			'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=600&fit=crop',
			'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&h=600&fit=crop'
		],
		agenda: [
			{ time: '17:00', title: 'Введение в парфюмерию', description: 'Знакомство с нотами и семействами ароматов' },
			{ time: '17:30', title: 'Выбор ингредиентов', description: 'Изучение 50+ эссенций' },
			{ time: '18:30', title: 'Создание композиции', description: 'Смешивание и балансировка аромата' },
			{ time: '19:15', title: 'Разлив и упаковка', description: 'Персональный флакон 30мл' }
		],
		last_spots_threshold: 3,
		status: 'published',
		created_at: '2026-01-12T10:00:00'
	},
	{
		id: 'evt-3',
		slug: 'candles-paphos-march',
		title_ru: 'Свечи ручной работы',
		title_en: 'Handmade Candles',
		description_ru:
			'Научитесь создавать эксклюзивные ароматические свечи из натурального воска. Вы заберёте 3 готовые свечи собственного дизайна.',
		description_en: 'Learn to create exclusive aromatic candles from natural wax.',
		category: 'candles',
		start_at: '2026-03-22T16:00:00',
		duration_min: 90,
		price_amount: 55,
		currency: 'EUR',
		capacity: 15,
		booked_count: 14,
		venue_id: 'venue-2',
		city_id: 'city-paphos',
		cover_image: 'https://images.unsplash.com/photo-1602607961955-56a804e4a5b1?w=800&h=800&fit=crop',
		media_gallery: [
			'https://images.unsplash.com/photo-1602607961955-56a804e4a5b1?w=800&h=600&fit=crop',
			'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=600&fit=crop'
		],
		agenda: [
			{ time: '16:00', title: 'Основы свечеварения', description: 'Типы воска и фитилей' },
			{ time: '16:30', title: 'Создание свечей', description: 'Работа с формами и ароматами' },
			{ time: '17:15', title: 'Декор и упаковка', description: 'Персонализация и подарочная упаковка' }
		],
		last_spots_threshold: 3,
		status: 'published',
		created_at: '2026-01-15T10:00:00'
	},
	{
		id: 'evt-4',
		slug: 'kids-art-limassol-april',
		title_ru: 'Детская арт-студия',
		title_en: 'Kids Art Studio',
		description_ru:
			'Творческое занятие для маленьких художников от 5 до 12 лет. Рисование, лепка и коллаж в игровой форме. Родители могут присутствовать или наслаждаться кофе в нашем лаунже.',
		description_en: 'Creative session for young artists aged 5-12.',
		category: 'kids',
		start_at: '2026-04-05T11:00:00',
		duration_min: 90,
		price_amount: 35,
		currency: 'EUR',
		capacity: 20,
		booked_count: 8,
		venue_id: 'venue-1',
		city_id: 'city-limassol',
		cover_image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=800&fit=crop',
		media_gallery: [
			'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop'
		],
		agenda: [
			{ time: '11:00', title: 'Знакомство и разминка', description: 'Весёлые упражнения на креативность' },
			{ time: '11:20', title: 'Творческий процесс', description: 'Создание арт-работы по теме дня' },
			{ time: '12:15', title: 'Выставка и награждение', description: 'Каждый ребёнок — звезда!' }
		],
		last_spots_threshold: 5,
		status: 'published',
		created_at: '2026-02-01T10:00:00'
	},
	{
		id: 'evt-5',
		slug: 'wine-dubai-april',
		title_ru: 'Винная дегустация',
		title_en: 'Wine Tasting Experience',
		description_ru:
			'Эксклюзивный вечер дегустации вин Старого и Нового Света. 8 вин, сырная тарелка и лекция от сомелье.',
		description_en: 'Exclusive evening tasting wines from the Old and New World.',
		category: 'wine',
		start_at: '2026-04-10T19:00:00',
		duration_min: 180,
		price_amount: 120,
		currency: 'AED',
		capacity: 16,
		booked_count: 5,
		venue_id: 'venue-3',
		city_id: 'city-dubai',
		cover_image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=800&fit=crop',
		media_gallery: [
			'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop',
			'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&h=600&fit=crop'
		],
		agenda: [
			{ time: '19:00', title: 'Welcome drink', description: 'Игристое и знакомство' },
			{ time: '19:30', title: 'Белые вина', description: '3 вина из Франции, Италии, Новой Зеландии' },
			{ time: '20:15', title: 'Красные вина', description: '3 вина из Испании, Аргентины, ЮАР' },
			{ time: '21:00', title: 'Десертные вина', description: '2 вина и сырная тарелка' }
		],
		last_spots_threshold: 4,
		status: 'published',
		created_at: '2026-02-05T10:00:00'
	},
	{
		id: 'evt-6',
		slug: 'floristics-tbilisi-march',
		title_ru: 'Флористика: Весенний букет',
		title_en: 'Floristics: Spring Bouquet',
		description_ru:
			'Создайте роскошный весенний букет из свежих цветов. Вы узнаете основы флористики и заберёте домой свой шедевр.',
		description_en: 'Create a stunning spring bouquet from fresh flowers.',
		category: 'floristics',
		start_at: '2026-03-28T15:00:00',
		duration_min: 120,
		price_amount: 70,
		currency: 'GEL',
		capacity: 12,
		booked_count: 11,
		venue_id: 'venue-4',
		city_id: 'city-tbilisi',
		cover_image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=800&fit=crop',
		media_gallery: [
			'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=600&fit=crop',
			'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&h=600&fit=crop'
		],
		agenda: [
			{ time: '15:00', title: 'Выбор цветов', description: 'Знакомство с сезонными цветами' },
			{ time: '15:30', title: 'Техника сборки', description: 'Спиральная техника и основы композиции' },
			{ time: '16:30', title: 'Оформление букета', description: 'Упаковка и финальные штрихи' }
		],
		last_spots_threshold: 3,
		status: 'published',
		created_at: '2026-02-08T10:00:00'
	}
];

// === Bookings (in-memory store) ===
export const bookings: Booking[] = [];

let bookingCounter = 0;

export function createBooking(data: {
	event_id: string;
	qty: number;
	contact_info: { name: string; phone: string; email: string };
}): Booking | null {
	const event = events.find((e) => e.id === data.event_id);
	if (!event) return null;

	const remaining = event.capacity - event.booked_count;
	if (data.qty > remaining) return null;

	const total = event.price_amount * data.qty;
	const booking: Booking = {
		id: `booking-${++bookingCounter}`,
		event_id: data.event_id,
		status: 'awaiting_deposit',
		qty: data.qty,
		total_amount: total,
		deposit_amount: Math.round(total * 0.5 * 100) / 100,
		contact_info: data.contact_info,
		created_at: new Date().toISOString()
	};

	event.booked_count += data.qty;
	bookings.push(booking);
	return booking;
}

// === Helpers ===

export function getEventsByCity(cityId: string): Event[] {
	return events.filter((e) => e.city_id === cityId && e.status === 'published');
}

export function getEventBySlug(slug: string): Event | undefined {
	return events.find((e) => e.slug === slug);
}

export function getCityBySlug(slug: string): City | undefined {
	return cities.find((c) => c.slug === slug);
}

export function getVenueById(id: string): Venue | undefined {
	return venues.find((v) => v.id === id);
}

export function getPublishedEvents(): Event[] {
	return events.filter((e) => e.status === 'published');
}

export function filterEvents(params: {
	city?: string;
	category?: string;
	search?: string;
}): Event[] {
	let result = getPublishedEvents();

	if (params.city) {
		const city = getCityBySlug(params.city);
		if (city) result = result.filter((e) => e.city_id === city.id);
	}

	if (params.category) {
		result = result.filter((e) => e.category === params.category);
	}

	if (params.search) {
		const q = params.search.toLowerCase();
		result = result.filter(
			(e) =>
				e.title_ru.toLowerCase().includes(q) ||
				e.title_en.toLowerCase().includes(q) ||
				e.description_ru.toLowerCase().includes(q)
		);
	}

	return result.sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
}
