import { Mail } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { LinkedInMark } from './LinkedInMark.jsx'

export function SiteFooter({ t, ui, profile }) {
  return (
    <footer className="site-footer grid-container">
      <div><span className="brand-mark">AT</span><p>{ui.footer}<br /><small>© {new Date().getFullYear()} {ui.rights}</small></p></div>
      <div className="footer-links">
        <a href={`mailto:${t.contact.directEmail}`}><Mail size={18} /><span className="sr-only">Email</span></a>
        <a href={profile.github} target="_blank" rel="noreferrer"><SiGithub size={18} /><span className="sr-only">GitHub</span></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedInMark /><span className="sr-only">LinkedIn</span></a>
      </div>
    </footer>
  )
}
