import 'dotenv-safe/config'
import fetch from 'node-fetch'

const mutation = `
  mutation ClearTokens {
    clearTokens
  }
`
const url = `${process.env.API_BASE_URL}/graphql`
const method = 'POST'
const body = JSON.stringify({ query: mutation })
const headers = { 'Content-Type': 'application/json' }

fetch(url, {
  method,
  body,
  headers,
})
