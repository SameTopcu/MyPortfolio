import { useEffect, useState } from 'react'
import { fetchPortfolio } from '../api/portfolio.js'
import { experienceByLanguage, skillGroups, translations } from '../data/portfolio.js'

const fallbackProfile = {
  name: 'Abdülsamed Topcu', email: 'a.sametopcu@gmail.com', github: 'https://github.com/SameTopcu',
  linkedin: 'https://www.linkedin.com/in/abdul-samet-topcu-003435258/', photo: '/abdulsamed-topcu.jpeg', cv: '/abdulsamed-topcu-cv.pdf',
}

function mergeDeep(base, incoming) {
  if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) return incoming ?? base
  return Object.keys(incoming).reduce((result, key) => {
    result[key] = mergeDeep(base?.[key], incoming[key])
    return result
  }, { ...base })
}

export function usePortfolioData() {
  const [remote, setRemote] = useState(null)
  const [source, setSource] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()
    fetchPortfolio(controller.signal).then((data) => {
      setRemote(data)
      setSource('api')
    }).catch((error) => {
      if (error.name !== 'AbortError') setSource('fallback')
    })
    return () => controller.abort()
  }, [])

  const fallbackExperiences = experienceByLanguage.tr.map((item, index) => ({
    id: `fallback-${index}`, company: item.company,
    period: { tr: item.period, en: experienceByLanguage.en[index].period },
    title: { tr: item.title, en: experienceByLanguage.en[index].title },
    description: { tr: item.description, en: experienceByLanguage.en[index].description },
  }))

  return {
    source,
    profile: { ...fallbackProfile, ...remote?.profile },
    translations: mergeDeep(translations, remote?.translations),
    projects: remote?.projects ?? [],
    experiences: remote?.experiences ?? fallbackExperiences,
    skillGroups: remote?.skillGroups ?? skillGroups.map((group, index) => ({ ...group, id: `fallback-${index}`, title: { tr: group.title, en: group.title } })),
    posts: remote?.posts ?? [],
  }
}
