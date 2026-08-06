import Papa from 'papaparse';

const SHEET_URLS = {
  categories: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQec-uIBohCVEjlXnUg2CPx9WK4zKQN55QVFXht_3Ae5KIf_PdGN95VL-ad9AHb2u4-SsrHyhOtpRl-/pub?gid=0&single=true&output=csv',
  activities: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQec-uIBohCVEjlXnUg2CPx9WK4zKQN55QVFXht_3Ae5KIf_PdGN95VL-ad9AHb2u4-SsrHyhOtpRl-/pub?gid=427796429&single=true&output=csv',
  activityImages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQec-uIBohCVEjlXnUg2CPx9WK4zKQN55QVFXht_3Ae5KIf_PdGN95VL-ad9AHb2u4-SsrHyhOtpRl-/pub?gid=909309052&single=true&output=csv',
};

function parseCSV(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(`${url}&t=${Date.now()}`, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });
}

export async function getCategories() {
  try {
    const data = await parseCSV(SHEET_URLS.categories);
    return data.filter(row => row.slug && row.name);
  } catch {
    return [];
  }
}

export async function getCategory(slug) {
  const categories = await getCategories();
  return categories.find(c => c.slug === slug) || null;
}

export async function getActivities(categorySlug = null) {
  try {
    const data = await parseCSV(SHEET_URLS.activities);
    const filtered = data.filter(row => row.slug && row.title);
    if (categorySlug) return filtered.filter(a => a.categorySlug === categorySlug);
    return filtered;
  } catch {
    return [];
  }
}

export async function getActivity(slug) {
  const activities = await getActivities();
  return activities.find(a => a.slug === slug) || null;
}

export async function getActivityImages(activitySlug) {
  try {
    const data = await parseCSV(SHEET_URLS.activityImages);
    return data.filter(row => row.activitySlug === activitySlug && row.imageUrl);
  } catch {
    return [];
  }
}