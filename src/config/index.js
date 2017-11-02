let env = process.env.NODE_ENV
let config = {
    env: env,
    title: '明阅电子发票',
    serverHost: '',
    serverRoot: env === 'development' ? '/project_dzff/' : env === 'production' ? '/project_dzff/' : 'https://debug.url.com'
}
export default config
