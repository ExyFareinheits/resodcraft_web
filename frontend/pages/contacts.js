import Link from 'next/link';

export default function Contacts() {
  return (
    <main style={{
      maxWidth: 500,
      margin: '40px auto',
      background: '#232c36',
      borderRadius: 18,
      padding: '36px 28px 28px 28px',
      color: '#eafefc',
      boxShadow: '0 4px 24px #00ffb422'
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#00ffb4',
        marginBottom: 28,
        textShadow: '1px 1px 0 #1e3557'
      }}>
        Контакти
      </h1>
      <div style={{
        background: 'rgba(0,255,180,0.07)',
        borderRadius: 8,
        padding: '18px 16px',
        marginBottom: 18,
        textAlign: 'center'
      }}>
        <div style={{ fontWeight: 600, color: '#00ffb4', marginBottom: 6 }}>
          Discord сервер:
        </div>
        <a
          href="https://discord.gg/7fa76w8TTg"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#fff',
            fontWeight: 500,
            fontSize: 16,
            textDecoration: 'underline',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <img
            src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/discord.svg"
            alt="Discord"
            width={22}
            height={22}
            style={{ verticalAlign: 'middle', marginTop: -2, filter: 'invert(0.1) brightness(2)' }}
          />
          Наш Discord
        </a>
      </div>
      <div style={{
        background: 'rgba(0,255,180,0.07)',
        borderRadius: 8,
        padding: '18px 16px',
        marginBottom: 10,
        textAlign: 'center'
      }}>
        <div style={{ fontWeight: 600, color: '#00ffb4', marginBottom: 6 }}>
          Email для звʼязку:
        </div>
        <a
          href="mailto:fareinheitsgithub@gmail.com"
          style={{
            color: '#fff',
            fontWeight: 500,
            fontSize: 16,
            textDecoration: 'underline'
          }}
        >
          fareinheitsgithub@gmail.com
        </a>
      </div>
    </main>
  );
}
