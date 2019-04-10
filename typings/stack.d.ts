/*!
 * Contentstack DataSync Mongodb SDK
 * Copyright (c) 2019 Contentstack LLC
 * MIT Licensed
 */
/**
 * @class Stack
 * @description Expose SDK query methods on Stack
 * @constructor
 * @description Provides a range of connection/disconnect, filters and projections on mongodb
 * @returns {Stack} Returns an instance of `Stack`
 */
export declare class Stack {
    private q;
    private config;
    private contentStore;
    private types;
    private client;
    private collection;
    private internal;
    private db;
    constructor(stackConfig: any, existingDB?: any);
    /**
     * @public
     * @method connect
     * @summary
     * Establish connection to mongodb
     *
     * @param {object} overrides Config overrides/mongodb specific config
     * @example
     * Stack
     *  .connect({overrides})
     *  .then((result) => {
     *    // mongodb connection object
     *    // indexes will be created on the collection in the background if provided in config
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {object} Mongodb 'db' instance
     */
    connect(overrides?: {}): Promise<{}>;
    private createIndexes;
    /**
     * @public
     * @method close
     * @summary Closes connection with mongodb
     */
    close(): void;
    /**
     * @public
     * @method contentType
     * @summary Content type to query on
     * @param {string} uid Content type uid
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
    contentType(uid: any): Stack;
    /**
     * @method asset
     * @description
     * Query for a single asset
     *
     * @param {string} uid Asset uid to be found, if not provided,
     *  by default returns the 1st element from assets.
     * @example
     * Stack
     *  .asset()
     *  .find()
     *  .then((result) => {
     *    // returns the asset based on its 'uid', if not provided, it would return the 1st asset found
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    asset(uid?: any): Stack;
    /**
     * @method assets
     * @description
     * Query for a set of assets
     *
     * @example
     * Stack
     *  .assets()
     *  .find()
     *  .then((result) => {
     *    // returns assets filtered based on 'blog' content type
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    assets(): Stack;
    /**
     * @method schema
     * @description
     * Query for a single content type's schema
     *
     * @param {string} uid Content type uid to be found, if not provided,
     *  by default returns the 1st element from content types
     *
     * @example
     * Stack
     *  .schema('blog')
     *  .find()
     *  .then((result) => {
     *    // returns content 'blog' content type's schema
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    schema(uid?: any): Stack;
    /**
     * @method schemas
     * @description
     * Query for a set of content type schemas
     * @public
     * @example
     * Stack
     *  .schemas()
     *  .find()
     *  .then((result) => {
     *    // returns a set of content type schemas
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    schemas(): Stack;
    /**
     * @method getQuery
     * @description Returns the query build thusfar
     *
     * @example
     * const query = Stack
     *  .contentType('blog')
     *  .entries()
     *  .getQuery()
     * // exposes details of the queries formed inside the SDK
     *
     * @returns {Stack} Returns an instance of 'stack'
     */
    getQuery(): any;
    /**
     * @method find
     * @description
     * Queries the db using the query built/passed
     * Does all the processing, filtering, referencing after querying the DB
     * @param {object} query Optional query object, that overrides all the
     * previously build queries
     * @public
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .find()
     *  .then((result) => {
     *    // returns blog content type's entries
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {object} - Returns a objects, that have been processed, filtered and referenced
     */
    find(query?: {}): Promise<{}>;
    /**
     * @method count
     * @description Returns the count of the entries/assets that match the filter
     * @param {object} query Optional query filter object
     * @public
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .count()
     *  .then((result) => {
     *    // returns entries, without any of its assets Or references
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {object} Returns count of the entries/asset's matched
     */
    count(query?: any): Promise<{}>;
    /**
     * @method findOne
     * @description
     * Queries the db using the query built/passed. Returns a single entry/asset/content type object
     * Does all the processing, filtering, referencing after querying the DB
     * @param {object} query Optional query object, that overrides all the previously build queries
     *
     * @example
     * Stack
     *  .contentType('blog')
     *  .entries()
     *  .findOne()
     *  .then((result) => {
     *    // returns an entry
     *  })
     *  .catch((error) => {
     *    // handle query errors
     *  })
     *
     * @returns {object} - Returns an object, that has been processed, filtered and referenced
     */
    findOne(query?: {}): Promise<{}>;
    /**
     * @private
     * @method preProcess
     * @summary Internal method, that executes and formats the queries built/passed
     * @param {object} query Query filter/process object
     * @returns {object} Returns a query object, that has been processed to be queried in mongodb
     */
    private preProcess;
    /**
     * @private
     * @method cleanup
     * @summary Does GC, so memory doesn't stackup
     */
    private cleanup;
    /**
     * @private
     * @method postProcess
     * @summary Internal method, that executes and formats the result, which the user and use
     * @param {object} result Result, which's to be manipulated
     * @returns {object} Returns the formatted version of the `result` object
     */
    private postProcess;
    /**
     * @private
     * @method includeReferencesI
     * @summary Internal method, that iteratively calls itself and binds entries reference
     * @param {object} entry An entry or a collection of entries, who's references are to be found
     * @param {string} locale Locale, in which the reference is to be found
     * @param {object} references A map of uids tracked thusfar (used to detect cycle)
     * @param {string} parentUid Entry uid, which is the parent of the current `entry` object
     * @returns {object} Returns `entry`, that has all of its reference binded
     */
    private includeReferencesI;
    private isPartOfInclude;
    /**
     * @summary
     *  Internal method, that iteratively calls itself and binds entries reference
     * @param {Object} entry - An entry or a collection of entries, who's references are to be found
     * @param {String} locale - Locale, in which the reference is to be found
     * @param {Object} references - A map of uids tracked thusfar (used to detect cycle)
     * @param {String} parentUid - Entry uid, which is the parent of the current `entry` object
     * @returns {Object} - Returns `entry`, that has all of its reference binded
     */
    private includeSpecificReferences;
    /**
     * [
     *  'category.authors'
     *  'category'
     *  'authors.types'
     * ]
     */
    private excludeSpecificReferences;
}
