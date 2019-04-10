export declare class Sorting {
    private q;
    private internal;
    constructor(instance: any);
    /**
     * @public
     * @method ascending
     * @summary Sorts the documents based on the 'sort' key
     * @description
     * The sort function requires that the entire sort be able to complete within 32 megabytes.
     * When the sort option consumes more than 32 megabytes, MongoDB will return an error.
     * @param {string} field The field to sort in ascending order
     * @example
     * Stack
     *  .contentType('')
     *  .entries()
     *  .ascending()
     *  .find()
     *  .then((result) => {
     *    // result sorted in ascending manner with respect to 'published_at' field (by default)
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    ascending(field?: any): this;
    /**
     * @public
     * @method descending
     * @summary Sorts the documents based on the 'sort' key
     * @description
     * The sort function requires that the entire sort be able to complete within 32 megabytes.
     * When the sort option consumes more than 32 megabytes, MongoDB will return an error.
     *
     * @param {string} field The field to sort in descending order
     * @example
     * Stack
     *  .contentType('')
     *  .entries()
     *  .descending('title')
     *  .find()
     *  .then((result) => {
     *    // result sorted in descending manner with respect to 'title' field
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    descending(field?: any): this;
}
