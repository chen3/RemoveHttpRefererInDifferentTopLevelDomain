#!/bin/bash
mkdir ./dist
cp -f ./manifest.json ./dist/manifest.json
cp -f ./node_modules/typescript-collections/dist/lib/umd.min.js ./dist/typescript-collections.min.js
cp -f ./node_modules/ts-events/dist/ts-events.min.js ./dist/ts-events.min.js
cp -f ./node_modules/vue/dist/vue.min.js ./dist/vue.min.js
cp -f ./node_modules/vuetify/dist/vuetify.min.js ./dist/vuetify.min.js