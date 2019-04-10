/*!
 * Contentstack DataSync Mongodb SDK
 * Copyright (c) 2019 Contentstack LLC
 * MIT Licensed
 */

import { filter, find, map, merge, remove, uniq } from 'lodash'
import { Db, MongoClient } from 'mongodb'
import sift from 'sift'
import { config } from './config'
import { checkCyclic, validateURI } from './util'

/**
 * @class Stack
 * @description Expose SDK query methods on Stack
 * @constructor
 * @description Provides a range of connection/disconnect, filters and projections on mongodb
 * @returns {Stack} Returns an instance of `Stack`
 */
export class Stack {
  private q: any
  private config: any
  private contentStore: any
  private types: any
  private client: any
  private collection: any
  private internal: any
  private db: Db

  constructor(stackConfig, existingDB ? ) {
    this.config = merge(config, stackConfig)
    this.contentStore = this.config.contentStore
    this.types = this.contentStore.internalContentTypes
    this.q = {}
    this.internal = {}
    this.db = existingDB
  }

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
  public connect(overrides = {}) {
    return new Promise((resolve, reject) => {
      try {
        const dbConfig = merge({}, this.config, overrides).contentStore

        const uri = validateURI(dbConfig.uri || dbConfig.url)
        const options = dbConfig.options
        const dbName = dbConfig.dbName
        const client = new MongoClient(uri, options)
        this.client = client

        return client.connect().then(() => {
          this.db = client.db(dbName)

          resolve(this.db)

          // Create indexes in the background
          const bucket: any = []
          const indexes = this.config.contentStore.indexes
          const collectionName = this.config.contentStore.collectionName
          for (let index in indexes) {
            if (indexes[index] === 1 || indexes[index] === -1) {
              bucket.push(this.createIndexes(this.config.contentStore.collectionName, index, indexes[index]))
            }
          }

          Promise.all(bucket)
            .then(() => {
              console.info(`Indexes created successfully in '${collectionName}' collection`)
            })
            .catch((error) => {
              console.error(`Failed while creating indexes in '${collectionName}' collection`)
              console.error(error)
            })
        }).catch(reject)
      } catch (error) {

        return reject(error)
      }
    })
  }

  private createIndexes(collectionId, index, type) {
    return this.db.collection(collectionId)
      .createIndex({
        [index]: type
      })
      .then(() => {
        console.info(`Index '${index}' created successfully!`)
        return
      })
  }

  /**
   * @public
   * @method close
   * @summary Closes connection with mongodb
   */
  public close() {
    this.client.close()
  }

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
  public contentType(uid) {
    // create new instances, instead of re-using the old one
    const stack = new Stack(this.config, this.db)
    if (uid && typeof uid === 'string') {
      stack.q.content_type_uid = uid
      stack.collection = stack.db.collection(stack.contentStore.collectionName)

      return stack
    }
    throw new Error('Kindly pass the content type\'s uid')
  }

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
  public asset(uid ? ) {
    const stack = new Stack(this.config, this.db)
    if (uid && typeof uid === 'string') {
      stack.q.uid = uid
    }
    stack.q.content_type_uid = this.types.assets
    stack.collection = stack.db.collection(stack.contentStore.collectionName)
    stack.internal.limit = 1
    stack.internal.single = true

    return stack
  }

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
  public assets() {
    const stack = new Stack(this.config, this.db)
    stack.q.content_type_uid = this.types.assets
    stack.collection = stack.db.collection(stack.contentStore.collectionName)

    return stack
  }

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
  public schema(uid ? ) {
    const stack = new Stack(this.config, this.db)
    if (uid && typeof uid === 'string') {
      stack.q.uid = uid
    }
    stack.q.content_type_uid = this.types.content_types
    stack.collection = stack.db.collection(stack.contentStore.collectionName)
    stack.internal.limit = 1
    stack.internal.single = true

    return stack
  }

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
  public schemas() {
    const stack = new Stack(this.config, this.db)
    stack.q.content_type_uid = this.types.content_types
    stack.collection = stack.db.collection(stack.contentStore.collectionName)

    return stack
  }

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
  public getQuery() {
    return {
      ...this.q,
    }
  }

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
  public find(query = {}) {
    return new Promise(async (resolve, reject) => {
      let queryFilters = this.preProcess(query)

      if (this.internal.includeSpecificReferences) {
        const projections = await this.excludeSpecificReferences(this.internal.includeSpecificReferences, this.q.content_type_uid, this.internal.hasOwnProperty('only'))
        console.log('projections', projections)
        this.internal.projections = merge(this.internal.projections, projections)
        console.log('this.internal.projections', this.internal.projections)
      }
      
      if (this.internal.sort) {
        this.collection = this.collection.find(queryFilters).sort(this.internal.sort)
      } else {
        this.collection = this.collection.find(queryFilters)
      }

      if (this.internal.queryReferences) {
        this.collection = this.collection.project(this.internal.projections).toArray()
      } else {
        this.collection = this.collection.project(this.internal.projections).limit(this.internal.limit).skip(this.internal.skip).toArray()
      }

      return this.collection
        .then((result) => {
          let contentType
          if (this.internal.includeSchema && this.q.content_type_uid !== this.types.content_types && this.q.content_type_uid !==
            this.types.assets) {
            contentType = remove(result, {uid: this.q.content_type_uid})
            contentType = (typeof contentType === 'object' && contentType instanceof Array && contentType.length) ?
              contentType[0] : null
          }

          if (this.internal.excludeReferences || this.q.content_type_uid === this.types.content_types || this.q.content_type_uid
            === this.types.assets) {
            result = this.postProcess(result, contentType)

            return resolve(result)
          } else if (this.internal.includeSpecificReferences) {
            return this.includeSpecificReferences(result, this.q.locale, {}, undefined, this.internal.includeSpecificReferences)
            .then(() => {
              if (this.internal.queryReferences) {
                result = sift(this.internal.queryReferences, result)

                if (this.internal.skip) {
                  result = result.splice(this.internal.skip, this.internal.limit)
                } else if (this.internal.limit) {
                  result = result.splice(0, this.internal.limit)
                }
              }
              result = this.postProcess(result, contentType)

              return resolve(result)
            })
          } else {

            return this.includeReferencesI(result, this.q.locale, {}, undefined)
              .then(() => {
                if (this.internal.queryReferences) {
                  result = sift(this.internal.queryReferences, result)
  
                  if (this.internal.skip) {
                    result = result.splice(this.internal.skip, this.internal.limit)
                  } else if (this.internal.limit) {
                    result = result.splice(0, this.internal.limit)
                  }
                }
                result = this.postProcess(result, contentType)

                return resolve(result)
              })
          }
        })
        .catch((error) => {
          this.cleanup()

          return reject(error)
        })
    })
  }

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
  public count(query ? ) {
    return new Promise((resolve, reject) => {
      const queryFilters = this.preProcess(query)
      this.collection = this.collection.find(queryFilters)
      // process it in a different manner
      if (this.internal.queryReferences) {
        return this.collection
          .project(this.internal.projections)
          .toArray()
          .then((result) => {
            if (result === null || result.length === 0) {
              return resolve({
                count: 0
              })
            }
            this.internal.includeReferences = true

            return this.includeReferencesI(result, this.q.locale, {}, undefined)
              .then(() => {
                result = sift(this.internal.queryReferences, result)
                result = result.length
                this.cleanup()

                return resolve({
                  count: result
                })
              })
          })
          .catch((error) => {
            this.cleanup()

            return reject(error)
          })
      }

      return this.collection
        .project(this.internal.projections)
        .count()
        .then((result) => {
          this.cleanup()

          return resolve({
            count: result
          })
        })
        .catch((error) => {
          this.cleanup()

          return reject(error)
        })
    })
  }

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
  public findOne(query = {}) {
    return new Promise((resolve, reject) => {
      this.internal.single = true

      return this.find(query)
        .then(resolve)
        .catch(reject)
    })
  }

  /**
   * @private
   * @method preProcess
   * @summary Internal method, that executes and formats the queries built/passed
   * @param {object} query Query filter/process object
   * @returns {object} Returns a query object, that has been processed to be queried in mongodb
   */
  private preProcess(query) {
    let queryFilters
    if (this.q.query && typeof this.q.query === 'object') {
      this.q.query = merge(this.q.query, query)
    } else {
      this.q.query = {}
    }

    if (this.internal.only) {
      this.internal.projections = this.internal.only
    } else {
      this.internal.projections = merge(this.contentStore.projections, this.internal.except)
    }

    if (!(this.internal.limit)) {
      this.internal.limit = this.contentStore.limit
    }

    if (!(this.internal.skip)) {
      this.internal.skip = this.contentStore.skip
    }

    if (!(this.q.locale)) {
      this.q.locale = this.config.locales[0].code
    }

    if (this.q.content_type_uid === this.types.content_types) {
      delete this.q.locale
    }

    const filters = {
      content_type_uid: this.q.content_type_uid,
      locale: this.q.locale,
      ...this.q.query,
    }

    if (this.internal.includeSchema) {
      // since, content type will take up 1 item-space
      this.internal.limit += 1
      queryFilters = {
        $or: [
          filters,
          {
            uid: this.q.content_type_uid,
          },
        ],
      }
    } else {
      queryFilters = filters
    }

    return queryFilters
  }

  /**
   * @private
   * @method cleanup
   * @summary Does GC, so memory doesn't stackup
   */
  private cleanup() {
    this.collection = null
    this.internal = null
    this.q = null
  }

  /**
   * @private
   * @method postProcess
   * @summary Internal method, that executes and formats the result, which the user and use
   * @param {object} result Result, which's to be manipulated
   * @returns {object} Returns the formatted version of the `result` object
   */
  private postProcess(result, contentType ? ) {
    const count = (result === null) ? 0 : result.length
    switch (this.q.content_type_uid) {
    case this.types.assets:
      if (this.internal.single) {
        result = {
          asset: (result === null) ? result : result[0],
        }
      } else {
        result = {
          assets: result,
        }
      }
      result.content_type_uid = 'assets'
      result.locale = this.q.locale
      break
    case this.types.content_types:
      if (this.internal.single) {
        result = {
          content_type: (result === null) ? result : result[0],
        }
      } else {
        result = {
          content_types: result,
        }
      }
      result.content_type_uid = 'content_types'
      break
    default:
      if (this.internal.single) {
        result = {
          entry: (result === null) ? result : result[0],
        }
      } else {
        result = {
          entries: result,
        }
      }
      result.content_type_uid = this.q.content_type_uid
      result.locale = this.q.locale
      break
    }

    if (this.internal.includeCount) {
      result.count = count
    }

    if (this.internal.includeSchema) {
      result.content_type = contentType
    }

    this.cleanup()

    return result
  }

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
  private includeReferencesI(entry, locale, references, parentUid ? ) {
    const self = this

    return new Promise((resolve, reject) => {
      if (entry === null || typeof entry !== 'object') {
        return resolve()
      }

      // current entry becomes the parent
      if (entry.uid) {
        parentUid = entry.uid
      }

      const referencesFound = []

      // iterate over each key in the object
      for (const prop in entry) {
        if (entry[prop] !== null && typeof entry[prop] === 'object') {
          if (entry[prop] && entry[prop].reference_to) {
            if ((!(this.internal.includeReferences)
            && entry[prop].reference_to === this.types.assets) || this.internal.includeReferences) {
              if (entry[prop].values.length === 0) {
                entry[prop] = []
              } else {
                let uids = entry[prop].values
                if (typeof uids === 'string') {
                  uids = [uids]
                }
                if (entry[prop].reference_to !== this.types.assets) {
                  uids = filter(uids, (uid) => {
                    return !(checkCyclic(uid, references))
                  })
                }
                if (uids.length) {
                  const query = {
                    content_type_uid: entry[prop].reference_to,
                    locale,
                    uid: {
                      $in: uids,
                    },
                  }

                  referencesFound.push(new Promise((rs, rj) => {
                    return self.db.collection(this.contentStore.collectionName)
                      .find(query)
                      .project(self.config.contentStore.projections)
                      .toArray()
                      .then((result) => {
                        if (result.length === 0) {
                          entry[prop] = []

                          return rs()
                        } else if (parentUid) {
                          references[parentUid] = references[parentUid] || []
                          references[parentUid] = uniq(references[parentUid].concat(map(result, 'uid')))
                        }

                        if (typeof entry[prop].values === 'string') {
                          entry[prop] = ((result === null) || result.length === 0) ? null : result[0]
                        } else {
                          // format the references in order
                          const referenceBucket = []
                          query.uid.$in.forEach((entityUid) => {
                            const elem = find(result, (entity) => {
                              return entity.uid === entityUid
                            })
                            if (elem) {
                              referenceBucket.push(elem)
                            }
                          })
                          entry[prop] = referenceBucket
                        }

                        return self.includeReferencesI(entry[prop], locale, references, parentUid)
                          .then(rs)
                          .catch(rj)
                      })
                      .catch(rj)
                  }))
                }
              }
            }
          } else {
            referencesFound.push(self.includeReferencesI(entry[prop], locale, references, parentUid))
          }
        }
      }

      return Promise.all(referencesFound)
        .then(resolve)
        .catch(reject)
    })
  }

  private isPartOfInclude(pth, include) {
    for (let i = 0, j = include.length; i < j; i++) {
      if (include[i].indexOf(pth) !== -1) {
        return true
      }
    }

    return false
  }

  /**
   * @summary
   *  Internal method, that iteratively calls itself and binds entries reference
   * @param {Object} entry - An entry or a collection of entries, who's references are to be found
   * @param {String} locale - Locale, in which the reference is to be found
   * @param {Object} references - A map of uids tracked thusfar (used to detect cycle)
   * @param {String} parentUid - Entry uid, which is the parent of the current `entry` object
   * @returns {Object} - Returns `entry`, that has all of its reference binded
   */
  private includeSpecificReferences(entry, locale, references, parentUid?, includePths = [], parentField = '') {
    const self = this

    return new Promise((resolve, reject) => {
      if (entry === null || typeof entry !== 'object') {
        return resolve()
      }

      // current entry becomes the parent
      if (entry.uid) {
        parentUid = entry.uid
      }

      const referencesFound = []

      // iterate over each key in the object
      for (const prop in entry) {
        if (entry[prop] !== null && typeof entry[prop] === 'object') {
          let currentPth
          if (parentField === '' && isNaN(parseInt(prop))) {
            currentPth = prop
          } else if (parentField === '' && !isNaN(parseInt(prop))) {
            currentPth = parentField
          } else {
            currentPth = parentField.concat('.', prop)
          }

          if (entry[prop] && entry[prop].reference_to) {
            if (entry[prop].reference_to === this.types.assets || this.isPartOfInclude(currentPth, includePths)) {
              if (entry[prop].values.length === 0) {
                entry[prop] = []
              } else {
                let uids = entry[prop].values
                if (typeof uids === 'string') {
                  uids = [uids]
                }
                if (entry[prop].reference_to !== this.types.assets) {
                  uids = filter(uids, (uid) => {
                    return !(checkCyclic(uid, references))
                  })
                }
                if (uids.length) {
                  const query = {
                    content_type_uid: entry[prop].reference_to,
                    locale,
                    uid: {
                      $in: uids,
                    },
                  }

                  referencesFound.push(new Promise((rs, rj) => {
                    return self.db.collection(this.contentStore.collectionName)
                      .find(query)
                      .project(self.config.contentStore.projections)
                      .toArray()
                      .then((result) => {
                        if (result.length === 0) {
                          entry[prop] = []

                          return rs()
                        } else if (parentUid) {
                          references[parentUid] = references[parentUid] || []
                          references[parentUid] = uniq(references[parentUid].concat(map(result, 'uid')))
                        }

                        if (typeof entry[prop].values === 'string') {
                          entry[prop] = ((result === null) || result.length === 0) ? null : result[0]
                        } else {
                          // format the references in order
                          const referenceBucket = []
                          query.uid.$in.forEach((entityUid) => {
                            const elem = find(result, (entity) => {
                              return entity.uid === entityUid
                            })
                            if (elem) {
                              referenceBucket.push(elem)
                            }
                          })
                          entry[prop] = referenceBucket
                        }

                        return self.includeSpecificReferences(entry[prop], locale, references, parentUid, includePths, currentPth)
                          .then(rs)
                          .catch(rj)
                      })
                      .catch(rj)
                  }))
                }
              }
            }
          } else {
            referencesFound.push(self.includeSpecificReferences(entry[prop], locale, references, parentUid, includePths, currentPth))
          }
        }
      }

      return Promise.all(referencesFound)
        .then(resolve)
        .catch(reject)
    })
  }

  /**
   * [
   *  'category.authors'
   *  'category'
   *  'authors.types'
   * ]
   */

  private excludeSpecificReferences (includes, uid, isOnly) {
    return new Promise((resolve) => {
      return this.db.collection(this.contentStore.collectionName)
        .find({uid})
        .project({references: 1})
        .limit(1)
        .toArray()
        .then((result) => {
          if (result === null) {
            return resolve({})
          }
          const excludeQuery = {}
          const references = result[0].references

          for (const referenceField in references) {
            let flag = false

            for (let i = 0, j = includes.length; i < j; i++) {
              if (includes[i].includes(referenceField)) {
                flag = true
                break
              }
            }

            if (!flag) {
              const referenceFieldValues = `${referenceField}.values`
              const referenceFieldRefTo = `${referenceField}.reference_to`
              excludeQuery[referenceFieldValues] = (isOnly) ? 1: 0
              excludeQuery[referenceFieldRefTo] = (isOnly) ? 1: 0
            }
          }

          return resolve(excludeQuery)
        })
    })
  }
}
