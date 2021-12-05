/**
 * Token information when requesting for the token
 */
export interface Token {
	/**
	 * This can be converted to a date
	 */
	expiryDate: string;
	token: string;
}
