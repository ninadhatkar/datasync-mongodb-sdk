import { find } from 'lodash'
import { Projections } from './projections'
import { Queries } from './queries'
import { Sorting } from './sorting'
import { mergeClassProperties } from './util'

export class Entries {
  private config: any
  private q: any
  private internal: any

  constructor(config) {
    this.config = config
    this.q = {}
    this.internal = {}
  }

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
  public language(code) {
    if (!(code) || typeof code !== 'string' || !(find(this.config.locales, {
        code
      }))) {
      throw new Error(`Language queried is invalid ${code}`)
    }
    this.q.locale = code

    return this
  }

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
  public entry(uid ? ) {
    if (!(this.q.content_type_uid)) {
      throw new Error('Kindly call \'contentType()\' before \'entry()\'!')
    }
    if (uid && typeof uid === 'string') {
      this.q.uid = uid
    }
    this.internal.limit = 1
    this.internal.single = true

    return this
  }

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
  public entries() {
    if (this.q.content_type_uid && typeof this.q.content_type_uid === 'string') {

      return this
    }
    throw new Error('Kindly call \'contentType()\' before \'entries()\'!')
  }
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
  public includeSchema() {
    this.internal.includeSchema = true

    return this
  }

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

  public includeContentType() {
    this.internal.includeSchema = true

    return this
  }

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
  public includeReferences() {
    this.internal.includeReferences = true

    return this
  }

  public include(fields) {
    if (fields.length === 0) {
      throw new Error('Kindly pass a valid reference field path to \'.include()\' ')
    } else if (typeof fields === 'string') {
      this.internal.includeSpecificReferences = [fields]
    } else {
      this.internal.includeSpecificReferences = fields
    }

    return this
  }

  Query() {
    const query = new Queries(this)
    const sort = new Sorting(this)
    const project = new Projections(this)

    mergeClassProperties(query, this)
    mergeClassProperties(sort, this)
    mergeClassProperties(project, this)
  }
}