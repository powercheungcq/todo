const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')
// 引入server-render.js
const serverRender = require('./server-render')

let bundle = require( '../../server-build/vue-ssr-server-bundle.json')

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '稍等一会'
    return
  }

  const clientManifest = require('../../public/vue-ssr-client-manifest.json')
  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })
  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
