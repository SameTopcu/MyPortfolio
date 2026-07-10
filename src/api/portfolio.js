const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api').replace(/\/$/, '')
const API_ORIGIN = new URL(API_BASE_URL, window.location.origin).origin

function mediaUrl(value) {
  if (!value || typeof value !== 'string') return value
  if (/^(https?:)?\/\//.test(value) || value.startsWith('data:')) return value
  if (!value.startsWith('/')) return value
  return `${API_ORIGIN}${value}`
}

function normalizePortfolio(data) {
  return {
    ...data,
    profile: data.profile ? {
      ...data.profile,
      photo: mediaUrl(data.profile.photo),
      cv: mediaUrl(data.profile.cv),
    } : data.profile,
    projects: data.projects?.map((project) => ({ ...project, image: mediaUrl(project.image) })) ?? [],
    posts: data.posts?.map((post) => ({ ...post, cover_image: mediaUrl(post.cover_image), card_icon: mediaUrl(post.card_icon) })) ?? [],
  }
}

export async function fetchPortfolio(signal) {
  const response = await fetch(`${API_BASE_URL}/portfolio`, { signal, headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(`Portfolio API responded with ${response.status}`)
  return normalizePortfolio(await response.json())
}

export async function sendMessage(payload) {
  const response = await fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.message ?? `Message API responded with ${response.status}`)
  return body
}
