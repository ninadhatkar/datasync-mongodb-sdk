export declare class Projections {
    private contentStore;
    private internal;
    constructor(instance: any);
    /**
     * Projections - returns only the fields passed here
     *
     * @param {array} fields Array of 'fields', separated by dot ('.') notation for embedded document query
     *
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .only(["title", "url", "links"])
     *  .find()
     *  .then((result) => {
     *    // returns entries and projects only their - ["title", "url", "links"] properties
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    only(fields: any): this;
    /**
     * Projections - returns fields except the ones passed here
     *
     * @param {array} fields Array of 'fields', separated by dot ('.') notation for embedded document query
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .except(["title", "url", "links"])
     *  .find()
     *  .then((result) => {
     *    // returns entries and projects all of their properties, except - ["title", "url", "links"]
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    except(fields: any): this;
}
