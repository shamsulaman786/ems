# Laravel-Vue EMS softwate

> A Laravel-Vue EMS softwate's template with Vuetify frontend. 

Forked from https://github.com/shamsulaman786/ems

## Features

- An EMS to create question paper in simple way and print function
- Laravel 5.6 + Vue + Vue Router + Vuex
- Frontend built with [Vuetify](https://github.com/vuetifyjs/vuetify) UI framework
- Pages with custom layouts 
- Examples for login, register and password reset
- Client-side form validation with [VeeValidate](https://github.com/baianat/vee-validate)
- Integration with [vform](https://github.com/cretueusebiu/vform)
- Authentication with [JWT](https://github.com/tymondesigns/jwt-auth)
- Webpack with [laravel-mix](https://github.com/JeffreyWay/laravel-mix)
- etc..!

## Installation

- `git clone https://github.com/shamsulaman786/ems.git`
- `cd ems`
- `git checkout master_alias`
- `cp .env.example .env`
- `composer install`
- `php artisan key:generate`
- `php artisan jwt:secret`
- Edit `.env` and set your database connection details
- `php artisan migrate`
- `npm install` / `yarn`

## Usage

#### Development

```bash
# build and watch
npm run watch

# serve for development
npm run dev
```

#### Production

```bash
npm run production
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

