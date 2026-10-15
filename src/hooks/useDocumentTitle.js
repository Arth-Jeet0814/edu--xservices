import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const baseTitle = "Education eXcellence Services";
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} | B2B Institutional Platform for African Schools`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title]);
}
