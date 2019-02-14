import settings from './settings';

/**
 * The mocked callback API represents a local version of an external API for
 * fetching available dates and handling of form submission.
 */

export default class MockCallbackApi {
  weekdayOpeningHour = 9;
  weekdayClosingHour = 18;
  weekendOpeningHour = 10;
  weekendClosingHour = 17;
  sundayOpen = true;

  weekSettings;

  constructor() {
    this.weekSettings = settings.weekTimesSettings;
  }

  /**
   * Generates a mocked date interval based on the fromDate and numberOfDates from the Callback Plugin
   * 
   * @param {Date} fromDate 
   * @param {number} numberOfDates
   * 
   * @returns [{opening: Date, closing: Date}]
   */
  getDates(fromDate, numberOfDates) {
    return new Promise((resolve) => {
      const baseDate = fromDate ? fromDate : new Date();
      const dateCount = numberOfDates ? numberOfDates : 7;

      baseDate.setHours(10, 0, 0, 0);
      const dateArray = [];

      for (let i = 0; i < dateCount; i += 1) {
        let start = new Date(baseDate);
        start.setDate(baseDate.getDate() + i);
        const weekdayIndex = start.getDay();
        start.setHours(...this.getOpeningHour(weekdayIndex))

        let end = new Date(start);
        end.setHours(...this.getClosingHour(weekdayIndex));

        /**
         * The callback platform recognizes a day with equal opening and closing times as closed,
         * so we equalize the weekend days this way if applicable.
         * 
         * You can adjust these parameters in './settings.js'
         */
        if ((weekdayIndex === 0 && !this.weekSettings.sundayOpen) || 
            (weekdayIndex === 6 && !this.weekSettings.saturdayOpen)) {
          start.setHours(0, 0, 0, 0);
          start = end = new Date(start);
        }
  
        dateArray.push({
          opening: start,
          closing: end,
        });
      }
      resolve(dateArray);
    })
  }

  createCallback(formData) {
    return new Promise((resolve) => {
      const { phoneNumber, date } = formData;
      setTimeout(() => {
        if (phoneNumber && phoneNumber.toString().length < 4) {
          resolve({
            type: 'error',
            message: `The specified phone number (${phoneNumber.toString()}) is invalid.`
          })
        } else {
          resolve({
            type: 'success',
            message: `Successfully created a callback on ${this.getDateString(date)} at ${this.getTimeString(date)}`
          })
        }
      }, 1000);
    })
  }

  getDateString(date) {
    return Intl.DateTimeFormat('en-GB').format(date);
  }

  getTimeString(date) {
    return Intl.DateTimeFormat('en-GB', {hour: 'numeric', minute: 'numeric'}).format(date);
  }

  getOpeningHour(dayIndex) {
    const isWeekday = dayIndex !== 0 && dayIndex !== 6;
    const { weekdays, weekends } = this.weekSettings; 
    return [
      isWeekday ? weekdays.openingHour : weekends.openingHour,
      isWeekday ? weekdays.openingMinute : weekends.openingMinute,
      0, 0
    ]
  }

  getClosingHour(dayIndex) {
    const isWeekday = dayIndex !== 0 && dayIndex !== 6;
    const { weekdays, weekends } = this.weekSettings; 
    return [
      isWeekday ? weekdays.closingHour : weekends.closingHour,
      isWeekday ? weekdays.closingMinute : weekends.closingMinute,
      0, 0
    ]
  }
}