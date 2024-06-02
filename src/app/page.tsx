import { submitGetRequest } from '@/lib/backlogApiClient'

export default async function Home() {
  const response = await submitGetRequest('/api/v2/space/activities')
  console.log(response)
}
