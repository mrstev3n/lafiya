import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '../features/home/HomePage.tsx'
import { SiteHeader } from '../features/navigation/SiteHeader.tsx'
import {
  ContentPage,
  DonationLocationsPage,
  EligibilityPage,
  FaqPage,
  LegalPage,
  NeedsPage,
  NotFoundPage,
} from '../features/pages/SitePages.tsx'
import styles from './App.module.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <a className={styles.skipLink} href="#contenu">Aller au contenu</a>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/le-don" element={<ContentPage page="don" />} />
          <Route path="/le-don/parcours" element={<ContentPage page="parcours" />} />
          <Route path="/le-don/preparation" element={<ContentPage page="preparation" />} />
          <Route path="/ou-donner" element={<DonationLocationsPage />} />
          <Route path="/temoignages" element={<ContentPage page="temoignages" />} />
          <Route path="/comprendre" element={<ContentPage page="comprendre" />} />
          <Route path="/a-propos" element={<ContentPage page="apropos" />} />
          <Route path="/contact" element={<ContentPage page="contact" />} />
          <Route path="/besoins" element={<NeedsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/eligibilite" element={<EligibilityPage />} />
          <Route path="/mentions-legales" element={<LegalPage type="mentions" />} />
          <Route path="/confidentialite" element={<LegalPage type="confidentialite" />} />
          <Route path="/conditions-utilisation" element={<LegalPage type="conditions" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
