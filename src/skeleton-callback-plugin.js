import { Plugin } from '@humany/widget-core';
import { CallbackPlatform } from '@humany/widget-callback';
import MockCallbackApi from './mock-callback-api';

export default class SkeletonCallbackPlugin extends Plugin {
  constructor(container, settings) {
    super(container);

    this.clientApi = new MockCallbackApi();
    this.clientApi.getDates();

    const callbackPlatformSettings = {
      adapterClientName: 'skeleton.callback.eng',
      maxAvailableDates: 14,
      minuteInterval: 10,
      texts: {
        description: 'Pick a date',
        hour: 'Hour',
        minute: 'Minute',
        loading: 'Loading opening hours...',
        notAvailable: 'The selected date is unavailable',
        back: 'Back',
        next: 'Next',
      },
      submit: (formData) => this.clientApi.createCallback(formData),
      getAvailableHours: (startDate, period) => this.clientApi.getDates(startDate, period)
    }

    this.callbackPlatform = new CallbackPlatform(container, callbackPlatformSettings);
  }
}