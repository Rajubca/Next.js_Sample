import { shubhashitas } from '../lib/shubhashitas';

export default function Home({ shubhashita, language }) {
  if (!shubhashita) {
    return (
      <main>
        <h1>Hello Next.js</h1>
        <p>This is a sample application.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Shubhashita of the Moment</h1>
      <div style={{ margin: '2rem 0', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ color: '#d35400', marginBottom: '1rem', whiteSpace: 'pre-line' }}>{shubhashita.sanskrit}</h2>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>
          <strong>Translation ({language}):</strong> {shubhashita.translation}
        </p>
      </div>
      <p style={{ fontSize: '0.9rem', color: '#888' }}>
        Refresh the page to see another Shubhashita.
      </p>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const acceptLanguage = req.headers['accept-language'] || 'en';
  // Simple parsing: get the first language code (e.g., 'en-US' -> 'en')
  const preferredLanguage = acceptLanguage.split(',')[0].split('-')[0];

  // Pick a random shubhashita
  const randomIndex = Math.floor(Math.random() * shubhashitas.length);
  const randomShubhashita = shubhashitas[randomIndex];

  // Get translation for the preferred language, fallback to English
  const translation = randomShubhashita.translations[preferredLanguage] || randomShubhashita.translations['en'];
  const displayLanguage = randomShubhashita.translations[preferredLanguage] ? preferredLanguage : 'en';

  return {
    props: {
      shubhashita: {
        sanskrit: randomShubhashita.sanskrit,
        translation: translation
      },
      language: displayLanguage
    }
  };
}
