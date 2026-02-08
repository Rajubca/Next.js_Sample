// pages/index.js
export default function Home({ shubhashita, language }) {
  if (!shubhashita) {
    return (
      <main>
        <h1>Error Loading Shubhashita</h1>
        <p>Could not fetch data. Please try again later.</p>
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
  // Use absolute URL for server-side fetching
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const apiUrl = `${protocol}://${host}/api/shubhashitas`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
        console.error(`Failed to fetch shubhashitas: ${res.status} ${res.statusText}`);
        return { props: { shubhashita: null, language: 'en' } };
    }
    const shubhashitas = await res.json();

    if (!shubhashitas || shubhashitas.length === 0) {
        return { props: { shubhashita: null, language: 'en' } };
    }

    const acceptLanguage = req.headers['accept-language'] || 'en';
    const preferredLanguage = acceptLanguage.split(',')[0].split('-')[0];

    const randomIndex = Math.floor(Math.random() * shubhashitas.length);
    const randomShubhashita = shubhashitas[randomIndex];

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
  } catch (error) {
    console.error('Error fetching shubhashitas:', error);
    return {
      props: {
        shubhashita: null,
        language: 'en'
      }
    };
  }
}
