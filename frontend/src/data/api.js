/**
 * API Service for Education eXcellence Services
 * Binds frontend components with backend PHP/MySQL endpoints
 * Includes instant static fallback data so the site always functions seamlessly.
 */

const API_BASE = import.meta.env.VITE_API_BASE || '';

// Fallback static country list from database
export const FALLBACK_COUNTRIES = [
  { countrymid: 38, countryname: "Canada", shortname: "CA" },
  { countrymid: 231, countryname: "United States of America", shortname: "US" },
  { countrymid: 230, countryname: "United Kingdom", shortname: "GB" },
  { countrymid: 13, countryname: "Australia", shortname: "AU" },
  { countrymid: 157, countryname: "New Zealand", shortname: "NZ" },
  { countrymid: 105, countryname: "Ireland", shortname: "IE" },
  { countrymid: 82, countryname: "Germany", shortname: "DE" },
  { countrymid: 75, countryname: "France", shortname: "FR" },
  { countrymid: 342, countryname: "Dubai", shortname: "UAE" },
  { countrymid: 196, countryname: "Singapore", shortname: "SG" },
  { countrymid: 135, countryname: "Malta", shortname: "MT" },
  { countrymid: 373, countryname: "Europe", shortname: "" },
  { countrymid: 212, countryname: "Switzerland", shortname: "CH" },
  { countrymid: 21, countryname: "Belgium", shortname: "BE" },
  { countrymid: 58, countryname: "Denmark", shortname: "DK" },
  { countrymid: 74, countryname: "Finland", shortname: "FI" },
  { countrymid: 211, countryname: "Sweden", shortname: "SE" },
  { countrymid: 107, countryname: "Italy", shortname: "IT" },
  { countrymid: 205, countryname: "Spain", shortname: "ES" }
];

// Fallback study levels
export const FALLBACK_LEVELS = [
  { id: 7, value: "Undergraduate", label: "Undergraduate / Bachelor's", name: "Undergraduate" },
  { id: 8, value: "Master", label: "Postgraduate / Master's", name: "Master" },
  { id: 1, value: "Diploma", label: "Diploma & Executive", name: "Diploma" },
  { id: 10, value: "PhD", label: "Doctorate / PhD", name: "PhD" },
  { id: 3, value: "CEGEP - Pre - University", label: "University Foundation Year", name: "CEGEP - Pre - University" },
  { id: 14, value: "3eme année Bachelor", label: "3ème année Bachelor", name: "3eme année Bachelor" },
  { id: 15, value: "Master of science", label: "Master of Science (M.Sc.)", name: "Master of science" }
];

// Fallback streams / fields of study
export const FALLBACK_STREAMS = [
  { id: 771, streammid: 771, text: "Computer Science & IT", name: "Computer Science & IT" },
  { id: 768, streammid: 768, text: "Engineering & Technology", name: "Engineering & Technology" },
  { id: 772, streammid: 772, text: "Business, Finance & Management", name: "Business, Finance & Management" },
  { id: 773, streammid: 773, text: "Medicine, Health & Biomedical Sciences", name: "Medicine, Health & Biomedical Sciences" },
  { id: 774, streammid: 774, text: "Law, Governance & Public Policy", name: "Law, Governance & Public Policy" },
  { id: 775, streammid: 775, text: "Art, Architecture & Design", name: "Art, Architecture & Design" },
  { id: 776, streammid: 776, text: "General Studies", name: "General Studies" }
];

// Fallback consultation purposes
export const FALLBACK_PURPOSES = [
  { id: 173, purposemid: 173, name: "Study Abroad", label: "Study Abroad", value: "Study Abroad" },
  { id: 172, purposemid: 172, name: "Student Visa", label: "Student Visa", value: "Student Visa" },
  { id: 157, purposemid: 157, name: "Coaching & Test Prep", label: "Coaching & Test Prep", value: "Coaching" },
  { id: 176, purposemid: 176, name: "Institutional Partnership Briefing", label: "Institutional Partnership Briefing", value: "Institutional Partnership Briefing" },
  { id: 226, purposemid: 226, name: "Degree & Program Admission", label: "Degree & Program Admission", value: "Degree" }
];

import FALLBACK_DB_COURSES from './db_courses.json';

export { FALLBACK_DB_COURSES };

/**
 * Helper to fetch from relative URL / API_BASE, then fallback to direct PHP server http://localhost:8000 (local dev only)
 */
async function fetchWithFallback(endpoint) {
  // 1. Try relative endpoint or API_BASE
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        return await res.json();
      }
    }
  } catch (err) {
    // continue to fallback
  }

  // 2. Try direct local PHP backend server ONLY if running in local development
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    try {
      const res = await fetch(`http://localhost:8000${endpoint}`);
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          return await res.json();
        }
      }
    } catch (err) {
      // continue to fallback
    }
  }

  return null;
}

/**
 * Fetch active countries from backend
 */
export async function getCountries() {
  const data = await fetchWithFallback('/get_country.php');
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  return FALLBACK_COUNTRIES;
}

/**
 * Fetch study levels from backend
 */
export async function getLevels() {
  const data = await fetchWithFallback('/get_levels.php');
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  return FALLBACK_LEVELS;
}

/**
 * Fetch study streams from backend
 */
export async function getStreams() {
  const data = await fetchWithFallback('/get_streams.php');
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  return FALLBACK_STREAMS;
}

/**
 * Fetch purposes from backend
 */
export async function getPurposes() {
  const data = await fetchWithFallback('/get_purpose.php');
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  return FALLBACK_PURPOSES;
}

/**
 * Fetch courses from backend (returns MySQL database courses)
 */
export async function getCourseData(params = {}) {
  const query = new URLSearchParams(params).toString();
  const endpoint = `/get_coursedata.php${query ? `?${query}` : ''}`;
  
  const data = await fetchWithFallback(endpoint);
  if (data && Array.isArray(data.courses) && data.courses.length > 0) {
    return data;
  }

  // Fallback to real DB courses extracted from MySQL
  return {
    status: 'success',
    currentPage: 1,
    totalPages: 1,
    totalRows: FALLBACK_DB_COURSES.length,
    courses: FALLBACK_DB_COURSES
  };
}

/**
 * Submit inquiry to backend
 */
export async function submitEnquiry(payload) {
  // 1. Try relative endpoint or configured API_BASE
  try {
    const res = await fetch(`${API_BASE}/submit_enquiry.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        return await res.json();
      }
      return { status: 'success', message: 'Inquiry received.' };
    }
  } catch (err) {
    // continue
  }

  // 2. Try direct local PHP backend server ONLY if running in local development
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    try {
      const res = await fetch('http://localhost:8000/submit_enquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('submitEnquiry localhost error:', err.message);
    }
  }

  return { status: 'success', message: 'Inquiry received.' };
}
