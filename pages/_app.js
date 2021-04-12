import "../styles/globals.css"
import { DataProvider } from "../store/GlobalState"

import { ServerStyleSheets, ThemeProvider } from "@material-ui/core"
import theme from "../theme"
import Layout from "../components/Layout"

function MyApp({ Component, pageProps }) {
  const sheets = new ServerStyleSheets()
  return sheets.collect(
    <ThemeProvider theme={theme}>
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </ThemeProvider>
  )
}

export default MyApp
