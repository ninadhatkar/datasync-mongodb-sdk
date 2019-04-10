export declare class Entries {
    private config;
    private q;
    private internal;
    constructor(config: any);
    /**
   * @method language
   * @description
   * Locale to query on
   *
   * @param {string} code Query locale's code
   * @example
   * Stack
   *  .contentType('')
   *  .entries()
   *  .language('es-es')
   *  .find()
   *  .then((result) => {
   *    // results in entries fetched from 'es-es' locale
   *    // if not provided, defaults to the 1st locale provided in the 'locales' key, provided in config
   *  })
   *  .catch((error) => {
   *    // handle query errors
   *  })
   *
   * @returns {Stack} Returns an instance of 'stack'
   */
    language(code: any): this;
    /**
   * @public
   * @method entry
   * @summary Query for a single entry
   * @param {string} uid Entry uid to be found, if not provided,
   *  by default returns the 1st element in the content type.
   *  Useful for `singleton` content types
   * @example
   * Stack
   *  .contentType('blog')
   *  .entry()
   *  .find()
   *  .then((result) => {
   *    // returns the entry based on its 'uid', if not provided, it would return the 1st entry found in 'blog' content type
   *  })
   *  .catch((error) => {
   *    // handle query errors
   *  })
   *
   * @returns {Stack} Returns an instance of 'stack'
   */
    entry(uid?: any): this;
    /**
     * @method entries
     * @description
     * Query for a set of entries on a content type
     *
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .find()
     *  .then((result) => {
     *    // returns entries filtered based on 'blog' content type
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    entries(): this;
    /**
     * @description
     * Includes 'content_type' key in response, which is the content type schema of the entries filtered/scanned
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .includeSchema()
     *  .find()
     *  .then((result) => {
     *    // returns entries, along with a 'content_type' property, which is 'blog' content type's schema
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    includeSchema(): this;
    /**
     * @description
     * Includes 'content_type' key in response, which is the content type schema of the entries filtered/scanned
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .includeContentType()
     *  .find()
     *  .then((result) => {
     *    // returns entries, along with a 'content_type' property, which is 'blog' content type's schema
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    includeContentType(): this;
    /**
     * @description
     * Includes all references of the entries being returned.
     * Note: This is a slow method, since it iteratively queries all the references and their references, binds them and returns
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .includeReferences()
     *  .find()
     *  .then((result) => {
     *    // returns entries, along with all their references and their nested references
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    includeReferences(): this;
    include(fields: any): this;
    Query(): void;
}
