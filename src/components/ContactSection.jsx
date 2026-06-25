import { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import { sendMessage } from '../api/portfolio.js'
import { SectionHeading } from './SectionHeading.jsx'

export function ContactSection({ t, ui }) {
  const [status, setStatus] = useState('idle')

  async function submitContact(event) {
    event.preventDefault()
    setStatus('sending')
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      await sendMessage(data)
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="grid-container">
        <SectionHeading id="contact" index={6} title={t.nav.contact}/>
        <div className="contact-layout">
          <div className="contact-copy reveal"><h3>{t.contact.title}</h3><p>{t.contact.body}</p><a className="email-link" href={`mailto:${t.contact.directEmail}`}><Mail size={20} /><span><small>{ui.contactDirect}</small>{t.contact.directEmail}</span></a></div>
          <form className="contact-form reveal" onSubmit={submitContact}>
            <label htmlFor="name">{ui.contactName}</label><input id="name" name="name" autoComplete="name" maxLength="100" required />
            <label htmlFor="email">{ui.contactEmail}</label><input id="email" name="email" type="email" autoComplete="email" maxLength="180" required />
            <label className="honeypot" htmlFor="website">Website</label><input className="honeypot" id="website" name="website" tabIndex="-1" autoComplete="off" />
            <label htmlFor="message">{ui.contactMessage}</label><textarea id="message" name="message" rows="5" minLength="10" maxLength="3000" required />
            <button className="button button-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? ui.contactSending : ui.contactSend}<Send size={17} /></button>
            {status === 'success' && <p className="form-status success" role="status">{ui.contactSuccess}</p>}
            {status === 'error' && <p className="form-status error" role="alert">{ui.contactError}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
