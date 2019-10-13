import { format } from 'date-fns'

export const formatDate = {
  methods: {
    /**
     * @description Format the date into "Jan, 01 1970"
     * @param {String} date
     * @returns {String}
     */
    MX_beautifyDate (date) {
      return format(new Date(date), 'MMM, d yyyy')
    }
  }
}
