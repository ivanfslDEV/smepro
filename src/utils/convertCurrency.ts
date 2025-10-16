/** Convert euros to cents 
 * @param {string} amount - euros
 * @returns {number} Value in cents
*/
export function convertToCents(amount: string){
    const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
    const priceInCents = Math.round(numericPrice * 100);

    return priceInCents;
}