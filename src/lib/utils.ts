/**
 * Converts Western digits to Devanagari numerals
 * @param num - The number to convert
 * @returns String with Devanagari numerals for Marathi locale
 */
export function toDevanagariNumber(num: number): string {
    const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return num.toString().split('').map(digit => {
        const digitNum = parseInt(digit);
        return isNaN(digitNum) ? digit : devanagariDigits[digitNum];
    }).join('');
}

/**
 * Formats price based on locale
 * @param price - The price amount
 * @param locale - The current locale ('en' or 'mr')
 * @returns Formatted price string
 */
export function formatPrice(price: number, locale: string): string {
    if (locale === 'mr') {
        return toDevanagariNumber(price);
    }
    return price.toString();
}
