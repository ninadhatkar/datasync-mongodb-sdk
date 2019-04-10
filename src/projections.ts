import { merge } from 'lodash'

export class Projections {
  private contentStore: any
  private internal: any

  constructor(instance) {
    this.contentStore = instance.contentStore
    this.internal = instance.internal
  }

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
  public only(fields) {
    if (!fields || typeof fields !== 'object' || !(fields instanceof Array) || fields.length === 0) {
      throw new Error('Kindly provide valid \'field\' values for \'only()\'')
    }
    this.internal.only = this.internal.only || {}
    this.internal.only._id = 0

    fields.forEach((field) => {
      if (typeof field === 'string') {
        this.internal.only[field] = 1
      }
    })

    return this
  }

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
  public except(fields) {
    if (!fields || typeof fields !== 'object' || !(fields instanceof Array) || fields.length === 0) {
      throw new Error('Kindly provide valid \'field\' values for \'except()\'')
    }
    this.internal.except = this.internal.except || {}
    fields.forEach((field) => {
      if (typeof field === 'string') {
        this.internal.except[field] = 0
      }
    })

    this.internal.except = merge(this.contentStore.projections, this.internal.except)

    return this
  }
}
