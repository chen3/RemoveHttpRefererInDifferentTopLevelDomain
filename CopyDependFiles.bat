mkdir .\dist
copy /Y .\manifest.json .\dist\manifest.json
copy /Y .\node_modules\typescript-collections\dist\lib\umd.min.js .\dist\typescript-collections.min.js
copy /Y .\node_modules\ts-events\dist\ts-events.min.js .\dist\ts-events.min.js
copy /Y .\node_modules\vue\dist\vue.min.js .\dist\vue.min.js
copy /Y .\node_modules\vuetify\dist\vuetify.min.js .\dist\vuetify.min.js