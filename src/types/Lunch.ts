/**
 * Lunch API response
 */
export interface Lunch {
	saturday: string;
	week: number;
	updById: number;
	creByType: number;
	/**
	 * Can be converted to date
	 */
	creDate: string;
	dishCategoryName: string;
	creById: number;
	thursday: string;
	/**
	 * Can be converted to date
	 */
	dates: string[];
	orgId: number;
	/**
	 * Can be converted to date
	 */
	updDate: string;
	empty: boolean;
	updByType: number;
	sunday: string;
	tuesday: string;
	dish: number;
	wednesday: string;
	friday: string;
	id: number;
	monday: string;
}
