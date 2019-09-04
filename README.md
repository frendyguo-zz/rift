# Rift (DEVELOPMENT)

Rift is a universal React development framework. Rift aims to simplify React app development by hiding away high complexity configurations while also providing smooth developer experience such as create-react-app.

Rift is highly inspired from [Jared Palmer](https://github.com/jaredpalmer)'s [Razzle](https://github.com/jaredpalmer/razzle), [Zeit](https://github.com/zeit)'s [Next.js](https://github.com/zeit/next.js/), [Tokopedia](https://github.com/tokopedia)'s [Treats](https://github.com/tokopedia/treats) and [Facebook](https://github.com/facebook)'s [create-react-app](https://github.com/facebook/create-react-app).

## What Rift comes with:
- Hot Module Replacement (Hot Reload) 🔥 ✅
- Server-side rendering 🌐 ✅
- ES6 presets ✅
- Eslint and Prettier support
- Supports multiple css modules such as LESS / SASS ✅
- Code-splitting support ✂ ✅
- Highly configurable webpack configurations
- Built-in Jest testing environment ✅
- Next.js like data fetching experience
- SVG, fonts, image files support ✅

## What's coming next:
- Optional GraphQL support
- Optional Redux support
- Optional Mobx support
- Client-side rendering only app

## How Rift works
### On development environment
Rift setups 2 different webpack instances running in parallel with hot module replacement support, one for server (default: `localhost:3000`) and one for client development server (`localhost:3001`), and with a little help from `http-proxy-middleware`, our server will then be able to access our client bundles by proxy-pointing to our client development server via `localhost:3000/__WDS__`.

### On production environment,
Rift will simply start an optimized bundling on our server and client codes onto a `dist` directory

#### Author
- [Frendy Guo](https://github.com/frendyguo)