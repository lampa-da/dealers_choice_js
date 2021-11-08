const head = ({title})=>`
  <head>
    <title>The Simpsons - ${title}</title>
    <link rel="stylesheet" type="text/css" href="/assets/style.css" />
    <a href="/"><img src="/assets/The_simpsons_logo.svg" height="100"
    width="200"/></a>
  </head>
`

const footer = () => `
  <footer>
    <a href="http://www.katesv.com"><p>&copy Kate Sv</p></a>
  </footer>
`

module.exports = {
  head,
  footer
}