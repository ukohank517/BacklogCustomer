const API_DOMAIN = process.env.API_DOMAIN ?? 'NO_API_DOMAIN'
const API_KEY = process.env.API_KEY ?? 'NO_API_KEY'

const DEFAULT_TIMEOUT_MS = 60000

export async function submitGetRequest(path: string, query?: Record<string, string>, timeoutMs?: number) {
  return submitRequest('GET', path, null, query, timeoutMs)
}

export async function submitPostRequest<B>(path: string, body: B, query?: Record<string, string>, timeoutMs?: number) {
  return submitRequest('POST', path, body, query, timeoutMs)
}

export async function submitPutRequest<B>(path: string, body: B, query?: Record<string, string>, timeoutMs?: number) {
  return submitRequest('PUT', path, body, query, timeoutMs)
}

export async function submitDeleteRequest(path: string, query?: Record<string, string>, timeoutMs?: number) {
  return submitRequest('DELETE', path, null, query, timeoutMs)
}

async function submitRequest<B>(
  method: string,
  path: string,
  body: B | null,
  query?: Record<string, string>,
  timeoutMs?: number
) {
  const apiUrl = new URL(`${API_DOMAIN}${path}`)

  if (query) {
    Object.keys(query).forEach((key) => apiUrl.searchParams.append(key, query[key]))
  }

  // API authentication
  apiUrl.searchParams.append('apiKey', API_KEY)

  const init: RequestInit = {
    headers: {
      'content-type': 'application/json',
    },
    method: method,
  }

  if (body) {
    init.body = JSON.stringify(body)
  }

  const response = await withTimeout(fetch(apiUrl.toString(), init), timeoutMs)
  const json = await response.json()
  return json
}

function withTimeout<T>(promise: Promise<T>, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Request timed out'))
    }, timeoutMs)

    promise.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      (error) => {
        clearTimeout(timer)
        reject(error)
      }
    )
  })
}
