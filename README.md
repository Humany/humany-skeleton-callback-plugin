# humany-skeleton-callback-plugin
This skeleton sets up a standard callback plugin for Humany using the Humany Callback Platform.

For documentation on how to use the platform: [`@humany/widget-callback`](https://www.npmjs.com/package/@humany/widget-callback).

## Building the code
1. Ensure NodeJS and Git is installed.
2. Clone or fork this repository.
3. From the root folder, execute the following commants to install the dependencies:
```
npm install
```
4. From the root folder, execute one of the following commands to generate the bundle.
```
npm run build
```
```
npm run build-dev
```
5. Dev environment
```
npm run start-dev
```

This will launch your browser and redirect to a simple server where you can see the plugin in action, which will respons on changes you make to the code.

## Registering the plugin
Include the generated bundle (located in the `/dist` folder) after the default Humany embed script, e.g:
```html
<!-- Start Humany - implementation: "Skeleton Callback" [V4 compatible] -->
<script>
  (function(a,b,c,d,e,f,g){for(var h,i=/[?&]{1}(humany[^=]*)=([^&#]*)/g;h=i.exec(a.location.search);)c+=(-1<c.indexOf("?")?"&":"?")+h[1]+"="+h[2];
  f=b.createElement(e),f.async=!0,f.src=c,g=b.getElementsByTagName(e)[0],g.parentNode.insertBefore(f,g),a[d]=a[d]||{_c:[],
  configure:function(){a[d]._c.push(arguments)}};var j=d.toLowerCase();a[j]=a[j]||{_c:[],configure:function(){a[j]._c.push(arguments)}}})
  (window,document,"//webprovisions-labs.humany.net/skeleton-callback/embed.js","Humany","script");
</script>
<!-- End Humany -->
<script src="skeleton-callback-plugin-js"></script>
```
