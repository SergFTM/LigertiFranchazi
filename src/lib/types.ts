// === Enums ===

export type EventCategory =
	| 'pottery'
	| 'perfume'
	| 'kids'
	| 'candles'
	| 'floristics'
	| 'wine'
	| 'cooking'
	| 'art'
	| 'other';

export type EventStatus = 'draft' | 'published' | 'archived';

export type BookingStatus = 'new' | 'awaiting_deposit' | 'confirmed' | 'cancelled';

export type UserRole = 'guest' | 'user' | 'partner' | 'admin';

// === Models ===

export interface AgendaItem {
	time: string;
	title: string;
	description?: string;
}

export interface ContactInfo {
	name: string;
	phone: string;
	email: string;
}

export interface Coordinates {
	lat: number;
	lng: number;
}

export interface City {
	id: string;
	slug: string;
	name: string;
	name_en: string;
	country: string;
	coordinates: Coordinates;
	ig_previews: string[];
	description?: string;
}

export interface Venue {
	id: string;
	name: string;
	address: string;
	city_id: string;
	coordinates: Coordinates;
}

export interface Event {
	id: string;
	slug: string;
	title_ru: string;
	title_en: string;
	description_ru: string;
	description_en: string;
	category: EventCategory;
	start_at: string;
	duration_min: number;
	price_amount: number;
	currency: string;
	capacity: number;
	booked_count: number;
	venue_id: string;
	city_id: string;
	media_gallery: string[];
	cover_image: string;
	agenda: AgendaItem[];
	last_spots_threshold: number;
	status: EventStatus;
	created_at: string;
}

export interface Booking {
	id: string;
	event_id: string;
	user_id?: string;
	status: BookingStatus;
	qty: number;
	total_amount: number;
	deposit_amount: number;
	contact_info: ContactInfo;
	created_at: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	phone?: string;
	role: UserRole;
	city_id?: string;
	created_at: string;
}

export interface FranchiseApplication {
	id: string;
	name: string;
	email: string;
	phone: string;
	city: string;
	message: string;
	created_at: string;
}

export interface CorporateApplication {
	id: string;
	company: string;
	contact_name: string;
	email: string;
	phone: string;
	event_type: string;
	guest_count: number;
	message: string;
	created_at: string;
}

// === Helpers ===

export function isLastSpots(event: Event): boolean {
	const remaining = event.capacity - event.booked_count;
	return remaining > 0 && remaining <= event.last_spots_threshold;
}

export function remainingSpots(event: Event): number {
	return Math.max(0, event.capacity - event.booked_count);
}

export function calculateDeposit(totalAmount: number): number {
	return Math.round(totalAmount * 0.5 * 100) / 100;
}

export function formatPrice(amount: number, currency: string = 'EUR'): string {
	return new Intl.NumberFormat('ru-RU', { style: 'currency', currency }).format(amount);
}

export function formatDate(dateStr: string): string {
	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		hour: '2-digit',
		minute: '2-digit'
	}).format(new Date(dateStr));
}

export function formatDateShort(dateStr: string): string {
	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'short'
	}).format(new Date(dateStr));
}

export const CATEGORY_LABELS: Record<EventCategory, string> = {
	pottery: 'Керамика',
	perfume: 'Парфюмерия',
	kids: 'Детские',
	candles: 'Свечи',
	floristics: 'Флористика',
	wine: 'Вино',
	cooking: 'Кулинария',
	art: 'Искусство',
	other: 'Другое'
};

export const CATEGORY_EMOJI: Record<EventCategory, string> = {
	pottery: '🏺',
	perfume: '🌸',
	kids: '🧒',
	candles: '🕯️',
	floristics: '💐',
	wine: '🍷',
	cooking: '👨‍🍳',
	art: '🎨',
	other: '✨'
};
