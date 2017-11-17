let env = process.env.NODE_ENV
let config = {
    env: env,
    title: '明阅电子发票',
    serverHost: '',
    serverRoot: env === 'development' ? '/dzfp_project/' : env === 'production' ? '/dzfp_project/' : 'https://debug.url.com'
}
export default config

