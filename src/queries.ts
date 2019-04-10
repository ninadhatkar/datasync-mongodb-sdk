import { merge, remove } from 'lodash'

export class Queries {
  private child: any
  private q: any
  private internal: any

  constructor(instance) {
    this.child = instance
    this.q = this.child.q
    this.internal = this.child.internal
  }

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
  public and(queries) {
    if (this.q.query && typeof this.q.query === 'object') {
      this.q.query = merge(this.q.query, {
        $and: queries,
      })
    } else {
      this.q.query = {
        $and: queries,
      }
    }

    return this
  }

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
  public or(queries) {
    if (this.q.query && typeof this.q.query === 'object') {
      this.q.query = merge(this.q.query, {
        $or: queries,
      })
    } else {
      this.q.query = {
        $or: queries,
      }
    }

    return this
  }

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
  public lessThan(key, value) {
    if (typeof key !== 'string' || typeof value === 'undefined') {
      throw new Error('Kindly pass valid key and value parameters for \'.lessThan()\'')
    } else if (this.q.query && typeof this.q.query === 'object') {
      this.q.query[key] = {
        $lt: value,
      }
    } else {
      this.q.query = {
        [key]: {
          $lt: value,
        },
      }
    }

    return this
  }

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
  public lessThanOrEqualTo(key, value) {
    if (typeof key !== 'string' || typeof value === 'undefined') {
      throw new Error('Kindly pass valid key and value parameters for \'.lessThanOrEqualTo()\'')
    } else if (this.q.query && typeof this.q.query === 'object') {
      this.q.query[key] = {
        $lte: value,
      }
    } else {
      this.q.query = {
        [key]: {
          $lte: value,
        },
      }
    }

    return this
  }

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
  public greaterThan(key, value) {
    if (typeof key !== 'string' || typeof value === 'undefined') {
      throw new Error('Kindly pass valid key and value parameters for \'.greaterThan()\'')
    } else if (this.q.query && typeof this.q.query === 'object') {
      this.q.query[key] = {
        $gt: value,
      }
    } else {
      this.q.query = {
        [key]: {
          $gt: value,
        },
      }
    }

    return this
  }

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
  public greaterThanOrEqualTo(key, value) {
    if (typeof key !== 'string' || typeof value === 'undefined') {
      throw new Error('Kindly pass valid key and value parameters for \'.greaterThanOrEqualTo()\'')
    } else if (this.q.query && typeof this.q.query === 'object') {
      this.q.query[key] = {
        $gte: value,
      }
    } else {
      this.q.query = {
        [key]: {
          $gte: value,
        },
      }
    }

    return this
  }

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
  public notEqualTo(key, value) {
    if (typeof key !== 'string' || typeof value === 'undefined') {
      throw new Error('Kindly pass valid key and value parameters for \'.notEqualTo()\'')
    } else if (this.q.query && typeof this.q.query === 'object') {
      this.q.query[key] = {
        $ne: value,
      }
    } else {
      this.q.query = {
        [key]: {
          $ne: value,
        },
      }
    }

    return this
  }

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
  public containedIn(key, value) {
    if (typeof key !== 'string' || typeof value !== 'object' || !(value instanceof Array)) {
      throw new Error('Kindly pass valid key and value parameters for \'.containedIn()\'')
    } else if (this.q.query && typeof this.q.query === 'object') {
      this.q.query[key] = {
        $in: value,
      }
    } else {
      this.q.query = {
        [key]: {
          $in: value,
        },
      }
    }

    return this
  }

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
  public notContainedIn(key, value) {
    if (typeof key !== 'string' || typeof value !== 'object' || !(value instanceof Array)) {
      throw new Error('Kindly pass valid key and value parameters for \'.notContainedIn()\'')
    } else if (this.q.query && typeof this.q.query === 'object') {
      this.q.query[key] = {
        $nin: value,
      }
    } else {
      this.q.query = {
        [key]: {
          $nin: value,
        },
      }
    }

    return this
  }

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
  public exists(key) {
    if (typeof key !== 'string') {
      throw new Error('Kindly pass valid key for \'.exists()\'')
    } else if (this.q.query && typeof this.q.query === 'object') {
      this.q.query[key] = {
        $exists: true,
      }
    } else {
      this.q.query = {
        [key]: {
          $exists: true,
        },
      }
    }

    return this
  }

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
  public notExists(key) {
    if (typeof key !== 'string') {
      throw new Error('Kindly pass valid key for \'.notExists()\'')
    } else if (this.q.query && typeof this.q.query === 'object') {
      this.q.query[key] = {
        $exists: false,
      }
    } else {
      this.q.query = {
        [key]: {
          $exists: false,
        },
      }
    }

    return this
  }

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
  public limit(no) {
    if (typeof no === 'number' && (no >= 0) && typeof this.q.content_type_uid === 'string') {
      this.internal.limit = no

      return this
    }
    throw new Error('Kindly provide a valid \'numeric\' value for \'limit()\'')
  }

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
  public skip(no) {
    if (typeof no === 'number' && (no >= 0) && typeof this.q.content_type_uid === 'string') {
      this.internal.skip = no

      return this
    }
    throw new Error('Kindly provide a valid \'numeric\' value for \'skip()\'')
  }

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
  public query(queryObject = {}) {
    if (this.q.query && typeof this.q.query === 'object') {
      this.q.query = merge(this.q.query, queryObject)
    } else {
      this.q.query = queryObject
    }

    return this
  }

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
  public regex(field, pattern, options = 'i') {
    if (!(field) || !(pattern) || typeof field !== 'string' || typeof pattern !== 'string') {
      throw new Error('Kindly provide a valid field and pattern value for \'.regex()\'')
    } else if (this.q.query && typeof this.q.query === 'object') {
      this.q.query = merge(this.q.query, {
        [field]: {
          $options: options,
          $regex: pattern,
        },
      })
    } else {
      this.q.query = {
        [field]: {
          $options: options,
          $regex: pattern,
        },
      }
    }

    return this
  }

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
  public tags(values) {
    if (!values || typeof values !== 'object' || !(values instanceof Array) || values.length === 0) {
      throw new Error('Kindly provide valid \'field\' values for \'tags()\'')
    }
    // filter non-string keys
    remove(values, (value) => {
      return typeof value !== 'string'
    })

    if (this.q.query && typeof this.q.query === 'object') {
      this.q.query.tags = {
        $in: values,
      }
    } else {
      this.q.query = {
        tags: {
          $in: values,
        },
      }
    }

    return this
  }

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
  public where(expr) {
    if (!(expr)) {
      throw new Error('Kindly provide a valid field and expr/fn value for \'.where()\'')
    } else if (this.q.query && typeof this.q.query === 'object') {
      if (typeof expr === 'function') {
        expr = expr.toString()
      }
      this.q.query = merge(this.q.query, {
        $where: expr,
      })
    } else {
      if (typeof expr === 'function') {
        expr = expr.toString()
      }
      this.q.query = {
        $where: expr,
      }
    }

    return this
  }

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
  public includeCount() {
    this.internal.includeCount = true

    return this
  }

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
  public excludeReferences() {
    this.internal.excludeReferences = true

    return this
  }

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
  public queryReferences(query) {
    if (query && typeof query === 'object') {
      this.internal.queryReferences = query

      return this
    }

    throw new Error('Kindly pass a query object for \'.queryReferences()\'')
  }
}