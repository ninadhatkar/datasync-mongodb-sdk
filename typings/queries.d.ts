export declare class Queries {
    private child;
    private q;
    private internal;
    constructor(instance: any);
    /**
   * @public
   * @method and
   * @summary Logical AND query wrapper
   * @description Accepts 2 queries and returns only those documents, that satisfy both the query conditions
   * @param {object} queries Query filter
   * @example
   * Stack
   *  .contentType('')
   *  .entries()
   *  .and([
   *    {
   *      title: 'John'
   *    },
   *    {
   *      age: 30
   *    }
   *  ])
   *  .find()
   *  .then((result) => {
   *    // filtered entries, where { title: 'John', age: 30 }
   *  })
   *  .catch((error) => {
   *    // handle query errors
   *  })
   *
   * @returns {Stack} Returns an instance of 'stack'
   */
    and(queries: any): this;
    /**
     * @public
     * @method or
     * @summary Logical OR query wrapper
     * @description Accepts 2 queries and returns only those documents, that satisfy either of the query conditions
     * @param {object} queries Query filter
     * @example
     * Stack
     *  .contentType('')
     *  .entries()
     *  .or([
     *    {
     *      title: 'John'
     *    },
     *    {
     *      title: 'Jane'
     *    }
     *  ])
     *  .find()
     *  .then((result) => {
     *    // filtered entries, where { title: 'John' } OR { title: 'Jane' }
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    or(queries: any): this;
    /**
     * @public
     * @method lessThan
     * @summary Comparison $lt query wrapper
     * @description
     * Compares the field/key provided against the provided value. Only documents that have lower value than the one provided are returned.
     * Check https://docs.mongodb.com/manual/reference/operator/query/lt/ and https://docs.mongodb.com/manual/reference/method/db.collection.find/#type-bracketing for more info
     * @param {string} key Field to compare against
     * @param {*} value Value to compare with
     * @example
     * Stack
     *  .contentType('')
     *  .entries()
     *  .lessThan('age', 18)
     *  .find()
     *  .then((result) => {
     *    // filtered entries, where { age < 18 }
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    lessThan(key: any, value: any): this;
    /**
     * @public
     * @method lessThanOrEqualTo
     * @summary Comparison $lte query wrapper
     * @description
     * Compares the field/key provided against the provided value. Only documents that have lower or equal value than the one provided are returned.
     * Check https://docs.mongodb.com/manual/reference/operator/query/lte/ and https://docs.mongodb.com/manual/reference/method/db.collection.find/#type-bracketing for more info
     * @param {string} key Field to compare against
     * @param {*} value Value to compare with
     * @example
     * Stack
     *  .contentType('')
     *  .entries()
     *  .lessThanOrEqualTo('age', 18)
     *  .find()
     *  .then((result) => {
     *    // filtered entries, where { age <= 18 }
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    lessThanOrEqualTo(key: any, value: any): this;
    /**
     * @public
     * @method greaterThan
     * @summary Comparison $gt query wrapper
     * @description
     * Compares the field/key provided against the provided value. Only documents that have greater value than the one provided are returned.
     * Check {@link https://docs.mongodb.com/manual/reference/operator/query/gt/ }and https://docs.mongodb.com/manual/reference/method/db.collection.find/#type-bracketing for more info
     * @param {string} key Field to compare against
     * @param {*} value Value to compare with
     * @example
     * Stack
     *  .contentType('')
     *  .entries()
     *  .greaterThan('age', 60)
     *  .find()
     *  .then((result) => {
     *    // filtered entries, where { age > 60 }
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    greaterThan(key: any, value: any): this;
    /**
     * @public
     * @method greaterThanOrEqualTo
     * @summary Comparison $gte query wrapper
     * @description
     * Compares the field/key provided against the provided value. Only documents that have greater than or equal value than the one provided are returned.
     * Check https://docs.mongodb.com/manual/reference/operator/query/gte/ and https://docs.mongodb.com/manual/reference/method/db.collection.find/#type-bracketing for more info
     * @param {string} key - Field to compare against
     * @param {*} value - Value to compare with
     * @example
     * Stack
     *  .contentType('')
     *  .entries()
     *  .greaterThanOrEqualTo('age', 60)
     *  .find()
     *  .then((result) => {
     *    // filtered entries, where { age >= 60 }
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    greaterThanOrEqualTo(key: any, value: any): this;
    /**
     * @public
     * @method notEqualTo
     * @summary Comparison $ne query wrapper
     * @description
     * Compares the field/key provided against the provided value. Only documents that have value not equals than the one provided are returned.
     *
     * Check mongodb query here: {@link https://docs.mongodb.com/manual/reference/operator/query/ne/}.
     *
     * Res: {@link https://docs.mongodb.com/manual/reference/method/db.collection.find/#type-bracketing}.
     *
     * Comparison ordering {@link https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#bson-types-comparison-order}
     * @param {string} key Field to compare against
     * @param {*} value Value to compare with
     * @example
     * Stack
     *  .contentType('')
     *  .entries()
     *  .notEqualTo('age', 25)
     *  .find()
     *  .then((result) => {
     *    // filtered entries, where { age != 25 }
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    notEqualTo(key: any, value: any): this;
    /**
     * @public
     * @method containedIn
     * @summary Comparison $in query wrapper
     * @description
     * Compares the field/key provided against the provided value. Only documents that have value contained in the field/key provided are returned.
     *
     * Check mongodb query here: {@link https://docs.mongodb.com/manual/reference/operator/query/in/}.
     *
     * Res: {@link https://docs.mongodb.com/manual/reference/method/db.collection.find/#type-bracketing}.
     *
     * Comparison ordering {@link https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#bson-types-comparison-order}
     * @param {string} key Field to compare against
     * @param {*} value Value to compare with
     *
     * @example
     * Stack
     *  .contentType('')
     *  .entries()
     *  .containedIn('emails', 'john.doe@some.com')
     *  .find()
     *  .then((result) => {
     *    // filtered entries, where 'john.doe@some.com' exists in 'emails' field (array)
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    containedIn(key: any, value: any): this;
    /**
   * @public
   * @method notContainedIn
   * @summary Comparison $nin query wrapper
   * @description
   * Compares the field/key provided against the provided value. Only documents that have value not contained in the field/key provided are returned.
   *
   * Check mongodb query here: {@link https://docs.mongodb.com/manual/reference/operator/query/nin/}.
   *
   * Res: {@link https://docs.mongodb.com/manual/reference/method/db.collection.find/#type-bracketing}.
   *
   * Comparison ordering {@link https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#bson-types-comparison-order}
   * @param {string} key Field to compare against
   * @param {*} value Value to compare with
   *
   * @example
   * Stack
   *  .contentType('')
   *  .entries()
   *  .notContainedIn('emails', 'john.doe@some.com')
   *  .find()
   *  .then((result) => {
   *    // filtered entries, where 'john.doe@some.com' does not exist in 'emails' field (array)
   *  })
   *  .catch((error) => {
   *    // handle query errors
   *  })
   *
   * @returns {Stack} Returns an instance of 'stack'
   */
    notContainedIn(key: any, value: any): this;
    /**
     * @public
     * @method exists
     * @summary Element $exists query wrapper, checks if a field exists
     * @description
     * Compares the field/key provided against the provided value. Only documents that have the field/key specified are returned.
     *
     * Check mongodb query here: {@link https://docs.mongodb.com/manual/reference/operator/query/exists/}.
     *
     * Res: {@link https://docs.mongodb.com/manual/reference/method/db.collection.find/#type-bracketing}.
     *
     * Comparison ordering {@link https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#bson-types-comparison-order}
     * @param {string} key Field to compare against
     * @param {*} value Value to compare with
     *
     * @example
     * Stack
     *  .contentType('')
     *  .entries()
     *  .exists('emails')
     *  .find()
     *  .then((result) => {
     *    // filtered entries, where 'emails' property exists
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    exists(key: any): this;
    /**
     * @public
     * @method notExists
     * @summary
     * Property $exists query wrapper, checks if a field does not exists
     * @description
     * Compares the field/key provided against the provided value. Only documents that do not have the key are returned.
     *
     * Check mongodb query here: {@link https://docs.mongodb.com/manual/reference/operator/query/exists/}.
     *
     * Res: {@link https://docs.mongodb.com/manual/reference/method/db.collection.find/#type-bracketing}.
     *
     * Comparison ordering {@link https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#bson-types-comparison-order}
     * @param {string} key Field to compare against
     * @param {*} value Value to compare with
     * @example
     * Stack
     *  .contentType('')
     *  .entries()
     *  .notExists('emails')
     *  .find()
     *  .then((result) => {
     *    // filtered entries, where 'emails' property does not exist
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    notExists(key: any): this;
    /**
   * Parameter - used to limit the total no of items returned/scanned
   * Defaults to 100 (internally, which is overridden)
   *
   * @param {number} no Max count of the 'items' returned
   *
   * @example
   * Stack
   *  .contentType('blog')
   *  .entries()
   *  .limit(20)
   *  .find()
   *  .then((result) => {
   *    // returns a maximum of 20 entries
   *    // if not provided, by default - the limit specified in config is returned
   *  })
   *  .catch((error) => {
   *    // handle query errors
   *  })
   *
   * @returns {Stack} Returns an instance of 'stack'
   */
    limit(no: any): this;
    /**
     * Parameter - used to skip initial no of items scanned
     * Defaults to 0 (internally, which is overridden)
     *
     * @param {number} no Min count of the 'items' to be scanned
     *
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .skip(10)
     *  .find()
     *  .then((result) => {
     *    // returnes entries, after first skipping 20 entries of 'blog' content type
     *    // if not provided, by default - the skip value provided in config is considered
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    skip(no: any): this;
    /**
     * Wrapper around a raw query wrapper
     * @param {object} queryObject Query filter
     *
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .query({"group.heading": "Tab 1"})
     *  .find()
     *  .then((result) => {
     *    // returns entries that have - {"group.heading": "Tab 1"}
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    query(queryObject?: {}): this;
    /**
   * Raw regex to be applied on a field - wrapper
   *
   * @param {string} field Field on which the regex is to be applied on
   * @param {pattern} pattern Regex pattern
   * @param {options} options Options to be applied while evaluating the regex
   * @example
   * Stack
   *  .contentType('blog')
   *  .entries()
   *  .regex("name", "^J")
   *  .find()
   *  .then((result) => {
   *    // returns entries who's name properties start with "J"
   *  })
   *  .catch((error) => {
   *    // handle query errors
   *  })
   *
   * @returns {Stack} Returns an instance of 'stack'
   */
    regex(field: any, pattern: any, options?: string): this;
    /**
     * @public
     * @method tags
     * @summary Match entries that match a specific tags
     *
     * @param {array} values Array of tag values
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .tags(["new", "fresh"])
     *  .find()
     *  .then((result) => {
     *    // returns entries filtered based on their tag fields
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    tags(values: any): this;
    /**
     * @method where
     * @summary Pass JS expression or a full function to the query system
     * @description
     * Use the $where operator to pass either a string containing a JavaScript expression or a full JavaScript function to the query system.
     * The $where provides greater flexibility, but requires that the database processes the JavaScript expression or function for each document in the collection.
     * Reference the document in the JavaScript expression or function using either this or obj.
     * Only apply the $where query operator to top-level documents.
     * The $where query operator will not work inside a nested document, for instance, in an $elemMatch query.
     * Ref. - https://docs.mongodb.com/manual/reference/operator/query/where/index.html
     * @param {*} expr Pass either a string containing a JavaScript expression or a full JavaScript function to the query system.
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .where(function() {
     *    return (hex_md5(this.name) === "9b53e667f30cd329dca1ec9e6a83e994")
     *  })
     *  .find()
     *  .then((result) => {
     *    // returns entries filtered based on the $where condition provided
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    where(expr: any): this;
    /**
     * @public
     * @method includeCount
     * @description
     * Includes 'count' key in response, which is the total count of the items being returned
     *
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .includeCount()
     *  .find()
     *  .then((result) => {
     *    // returns entries, along with a 'count' property, with the total count of entries being returned
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    includeCount(): this;
    /**
   * @method excludeReferences
   * @description
   * Excludes all references of the entries being scanned
   * Note: On calling this, assets will not be binded in the result being returned.
   *
   * @example
   * Stack
   *  .contentType('blog')
   *  .entries()
   *  .excludeReferences()
   *  .find()
   *  .then((result) => {
   *    // returns entries, without any of its assets Or references
   *  })
   *  .catch((error) => {
   *    // handle query errors
   *  })
   *
   * @returns {Stack} Returns an instance of 'stack'
   */
    excludeReferences(): this;
    /**
     * @method queryReferences
     * @description
     * Wrapper, that allows querying on the entry's references.
     * Note: This is a slow method, since it scans all documents and fires the `reference` query on them. Once the references are binded, the query object passed is used for filtering
     * Use `.query()` filters to reduce the total no of documents being scanned
     *
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .queryReferences({"authors.name": "John Doe"})
     *  .find()
     *  .then((result) => {
     *    // returns entries, who's reference author's name equals "John Doe"
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    queryReferences(query: any): this;
}
