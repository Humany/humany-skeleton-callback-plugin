import SkeletonCallbackPlugin from './skeleton-callback-plugin';
import settings from './settings';

const humany = window.Humany;
if (!humany) {
  console.error('No Humany installation is available on the page.');
}

humany.configure(settings.implementationName, (config) => {
  config(settings.widgetName)
    .plugin(SkeletonCallbackPlugin);
});
