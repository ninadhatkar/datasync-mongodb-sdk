"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sorting {
    constructor(instance) {
        this.q = instance.q;
        this.internal = instance.internal;
    }
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
    ascending(field) {
        if (typeof this.q.content_type_uid !== 'string') {
            throw new Error('Kindly call \'.contentType()\' before \.ascending()\'');
        }
        if (!(field) || typeof field !== 'string') {
            // throw new Error('Kindly provide a valid field name for \'.ascending()\'')
            if (this.internal.sort && typeof this.internal.sort === 'object') {
                this.internal.sort.published_at = 1;
            }
            else {
                this.internal.sort = {
                    published_at: 1,
                };
            }
        }
        else {
            if (this.internal.sort && typeof this.internal.sort === 'object') {
                this.internal.sort[field] = 1;
            }
            else {
                this.internal.sort = {
                    [field]: 1,
                };
            }
        }
        return this;
    }
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
    descending(field) {
        if (typeof this.q.content_type_uid !== 'string') {
            throw new Error('Kindly call \'.contentType()\' before \.descending()\'');
        }
        if (!(field) || typeof field !== 'string') {
            if (this.internal.sort && typeof this.internal.sort === 'object') {
                this.internal.sort.published_at = -1;
            }
            else {
                this.internal.sort = {
                    published_at: -1,
                };
            }
        }
        else {
            if (this.internal.sort && typeof this.internal.sort === 'object') {
                this.internal.sort[field] = -1;
            }
            else {
                this.internal.sort = {
                    [field]: -1,
                };
            }
        }
        return this;
    }
}
exports.Sorting = Sorting;
