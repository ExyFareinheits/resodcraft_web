import '../public/css/globals.css';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// --- Додаємо компонент анімованого фону ---
function StarBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setDpr(window.devicePixelRatio || 1);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function randomStar() {
      // Minecraft-style: квадратна зірка, біла або злегка жовта
      const size = Math.random() * 1.2 + 1.2;
      const color = Math.random() > 0.8 ? '#ffe066' : '#fff';
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        color,
        speed: 0.04 + Math.random() * 0.07
      };
    }

    function createStars() {
      const count = Math.floor(width * height / 1800); // адаптивна кількість
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push(randomStar());
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = star.color;
        // Minecraft-style: квадратна зірка
        ctx.fillRect(star.x, star.y, star.size, star.size);
        ctx.restore();
      }
    }

    function animate() {
      for (const star of stars) {
        star.y += star.speed;
        if (star.y > height) {
          star.x = Math.random() * width;
          star.y = -star.size;
        }
      }
      draw();
      animationRef.current = requestAnimationFrame(animate);
    }

    resize();
    createStars();
    draw();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', () => {
      resize();
      createStars();
    });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [dpr]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        zIndex: 0,
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        background: 'transparent'
      }}
      aria-hidden="true"
    />
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="main-header" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
      }}>
        {/* Верхня градієнтна лінія */}
        <div className="header-gradient" />
        <div className="header-inner">
          <span className="header-title" style={{
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: 2,
            color: '#fff',
            textShadow: '0 0 8px #00b48a, 0 2px 12px #232c36, 0 1px 0 #00b48a22, 0 0 2px #fff',
            filter: 'drop-shadow(0 2px 12px #00b48a88)',
            background: 'linear-gradient(90deg, #eafefc 60%, #00ffb4 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            <img
              src="/logos/icon.jpg"
              width={38}
              height={35}
              alt="Resod Craft"
              style={{ verticalAlign: 'middle', marginRight: 10, borderRadius: 6, boxShadow: '0 2px 8px #00b48a44' }}
              loading="eager"
              fetchpriority="high"
            />
            Resod Craft
          </span>
          <nav className="desktop-nav">
            <Link href="/" className="header-link">Головна</Link>
            <Link href="/shop" className="header-link">Магазин</Link>
            <Link href="/rules" className="header-link">Правила</Link>
            <Link href="/contacts" className="header-link">Контакти</Link>
            <Link href="/faq" className="header-link">FAQ</Link>
          </nav>
          <button
            className="burger-btn"
            aria-label="Відкрити меню"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none', // по замовчуванню приховано, показуємо через медіа-стилі
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              marginLeft: 12,
              zIndex: 102,
              borderRadius: 8,
              boxShadow: '0 2px 8px #00b48a22',
              transition: 'background 0.18s',
              position: 'relative',
              width: 44,
              height: 44,
              outline: 'none'
            }}
          >
            <span className={`burger-anim ${menuOpen ? 'open' : ''}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
        {/* Бургер-меню для мобільних */}
        <div
          className="burger-menu"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 220,
            height: '100vh',
            background: 'linear-gradient(120deg, #1e3557cc 80%, #25364aee 100%)',
            boxShadow: menuOpen ? '2px 0 24px #00b48a22' : 'none',
            borderRight: '1.5px solid #00b48a33',
            zIndex: 200,
            display: menuOpen ? 'flex' : 'none',
            flexDirection: 'column',
            paddingTop: 80,
            paddingLeft: 24,
            gap: 18,
            // overflowY: 'auto', // прибираємо скролл
            pointerEvents: menuOpen ? 'auto' : 'none',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.38s cubic-bezier(.4,2,.6,1), transform 0.38s cubic-bezier(.4,2,.6,1)',
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            borderLeft: 'none',
            minWidth: 180,
            maxWidth: '90vw',
            boxSizing: 'border-box',
            backdropFilter: 'blur(6px)',
            animation: menuOpen ? 'fadein-burger 0.38s cubic-bezier(.4,2,.6,1)' : 'none'
          }}
        >
          {menuOpen && (
            <button
              aria-label="Закрити меню"
              onClick={() => setMenuOpen(false)}
              className="close-burger"
              tabIndex={0}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                borderRadius: '50%',
                background: '#232c36',
                boxShadow: '0 2px 8px #00b48a22',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.18s',
                color: '#00b48a',
                fontSize: 28,
                cursor: 'pointer',
                zIndex: 201,
                padding: 0,
                lineHeight: 1
              }}
            >
              ×
            </button>
          )}
          <Link href="/" onClick={() => setMenuOpen(false)} className="burger-link">Головна</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="burger-link">Магазин</Link>
          <Link href="/rules" onClick={() => setMenuOpen(false)} className="burger-link">Правила</Link>
          <Link href="/contacts" onClick={() => setMenuOpen(false)} className="burger-link">Контакти</Link>
          <Link href="/faq" onClick={() => setMenuOpen(false)} className="burger-link">FAQ</Link>
        </div>
        {/* Затінення при відкритому меню */}
        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className="burger-backdrop"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(20,28,38,0.35)',
              zIndex: 150,
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              animation: 'fadein-blur 0.38s cubic-bezier(.4,2,.6,1)'
            }}
          />
        )}
        <style jsx global>{`
          @media (max-width: 900px) {
            .desktop-nav {
              display: none !important;
            }
            .burger-btn {
              display: block !important;
            }
          }
          @media (min-width: 901px) {
            .burger-menu {
              display: none !important;
            }
            .burger-btn {
              display: none !important;
            }
          }
          .burger-btn:focus {
            outline: 2px solid #00b48a;
          }
          .burger-anim {
            display: inline-block;
            width: 28px;
            height: 28px;
            position: relative;
            transition: all 0.3s cubic-bezier(.4,2,.6,1);
            cursor: pointer;
          }
          .burger-anim span {
            display: block;
            position: absolute;
            height: 4px;
            width: 100%;
            background: #00b48a;
            border-radius: 2px;
            opacity: 1;
            left: 0;
            transition: all 0.3s cubic-bezier(.4,2,.6,1);
          }
          .burger-anim span:nth-child(1) {
            top: 4px;
          }
          .burger-anim span:nth-child(2) {
            top: 12px;
          }
          .burger-anim span:nth-child(3) {
            top: 20px;
          }
          .burger-anim.open span:nth-child(1) {
            top: 12px;
            transform: rotate(45deg);
          }
          .burger-anim.open span:nth-child(2) {
            opacity: 0;
            left: 50%;
            width: 0;
          }
          .burger-anim.open span:nth-child(3) {
            top: 12px;
            transform: rotate(-45deg);
          }
          @media (max-width: 900px) {
            .burger-btn {
              display: block !important;
            }
          }
          @media (min-width: 901px) {
            .burger-menu {
              display: none !important;
            }
            .burger-btn {
              display: none !important;
            }
          }
          .burger-btn .burger-dot {
            pointer-events: none;
          }
          .burger-menu {
            box-shadow: 2px 0 24px #00b48a22;
            border-right: 1.5px solid #00b48a33;
            background: linear-gradient(120deg, #1e3557cc 80%, #25364aee 100%);
            min-width: 180px;
            max-width: 90vw;
            border-top-right-radius: 16px;
            border-bottom-right-radius: 16px;
            padding-bottom: 24px;
          }
          .burger-link {
            color: #eafefc;
            font-weight: 600;
            font-size: 17px;
            text-decoration: none;
            margin-bottom: 12px;
            padding: 12px 0 12px 24px;
            transition: color 0.18s, background 0.18s;
            border-radius: 8px;
            font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
            background: none;
            border: none;
            outline: none;
            display: block;
          }
          .burger-link:hover, .burger-link:active {
            background: #00b48a22;
            color: #00b48a;
          }
          .close-burger {
            border-radius: 50%;
            background: #232c36;
            box-shadow: 0 2px 8px #00b48a22;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.18s;
            color: #00b48a;
            font-size: 28px;
            cursor: pointer;
            z-index: 201;
            padding: 0;
            lineHeight: 1;
            border: none;
          }
          .close-burger:hover {
            background: #00b48a22 !important;
          }
          @keyframes fadein-burger {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes fadein-blur {
            from {
              opacity: 0;
              transform: translateY(4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .main-header {
            position: fixed !important;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 100;
            box-shadow: 0 4px 24px 0 #101a2a44, 0 0px 0px 0 #00b48a33;
            background: linear-gradient(90deg, #232c36 0%, #25364a 60%, #1e3557 100%);
            transition: box-shadow 0.2s, background 0.3s;
            border-bottom: 1.5px solid #222c3a;
            backdrop-filter: blur(2px);
          }
        `}</style>
      </header>
      {/* ...existing code... */}
    </>
  );
}

// Додаємо визначення Footer перед App
function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-center">
          <span className="footer-copyright">
            &copy; {new Date().getFullYear()} Resod Craft
          </span>
          <span className="footer-ip">
            IP сервера: <span style={{ color: '#00ffb4' }}>в розробці</span>
          </span>
        </div>
        <div className="footer-links">
          <a href="https://discord.gg/ffZZFNJVQq" target="_blank" rel="noopener noreferrer" className="footer-link">
            Discord
          </a>
          <a
            href="https://docs.google.com/document/d/1V2c42wBxtp6ie8P-LsnjoAAy-36CJJpr2lrJFtJVI58/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Умови покупки донатів
          </a>
          <a
            href="https://docs.google.com/document/d/1ekEpNsM4iSiaeqal16jixjGIhtesyO0AgHygk4de7JQ/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Приватність користувача
          </a>
          <a href="https://www.tiktok.com/@resod.craft" target="_blank" rel="noopener noreferrer" className="footer-link">
            TikTok
          </a>
          <a href="https://youtube.com/@your-youtube" target="_blank" rel="noopener noreferrer" className="footer-link">
            YouTube (в розробці)
          </a>
        </div>
      </div>
      <div className="footer-gradient"></div>
      <style jsx global>{`
        .main-footer {
          /* Більше не фіксуємо футер */
          position: static;
          width: 100%;
          box-shadow: 0 -4px 24px 0 #101a2a44, 0 0px 0px 0 #00b48a33;
          background: linear-gradient(90deg, #232c36 0%, #25364a 60%, #1e3557 100%);
          border-top: 1.5px solid #222c3a;
          backdrop-filter: blur(2px);
          padding: 0;
        }
        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 18px 16px 0 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .footer-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin-bottom: 12px;
        }
        .footer-ip {
          color: #eafefc;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 2px;
          text-align: center;
          text-shadow: 0 1px 4px #232c36cc;
        }
        .footer-links {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 10px 18px;
          margin-bottom: 10px;
        }
        .footer-link {
          color: #00b48a;
          text-decoration: underline;
          font-size: 12px;
          margin: 0 6px;
          display: inline-flex;
          align-items: center;
          transition: color 0.18s;
          border-radius: 4px;
          padding: 2px 6px;
        }
        .footer-link:hover {
          color: #eafefc;
        }
        .footer-link:active {
          background: #00b48a22;
          color: #00b48a;
        }
        .footer-gradient {
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #232c36 0%, #00b48a 50%, #25364a 100%);
          opacity: 0.7;
          margin-top: 8px;
          position: absolute;
          left: 0;
          bottom: 0;
          border-radius: 8px 8px 0 0;
          box-shadow: 0 -2px 8px #00b48a22;
          animation: footer-gradient-move 10s linear infinite alternate;
        }
        @media (max-width: 700px) {
          .footer-inner {
            padding: 10px 4vw 0 4vw;
          }
          .footer-center {
            gap: 2px;
            margin-bottom: 10px;
          }
          .footer-links {
            gap: 6px 10px;
            font-size: 11px;
          }
        }
      `}</style>
    </footer>
  );
}

// Головний App-компонент
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Resod Craft - Магазин ігрових товарів</title>
        <meta name="description" content="Resod Craft — унікальний український Minecraft сервер з політикою, економікою, квестами та дружньою спільнотою. Приєднуйся до нас та розпочни свою пригоду!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Minecraft, сервер, Україна, політика, економіка, квести, Resod Craft, майнкрафт, український сервер, survival, політичний сервер, майнкрафт сервер, Minecraft server, українська спільнота" />
        <meta name="author" content="Resod Craft" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Resod Craft — Український Minecraft сервер" />
        <meta property="og:description" content="Resod Craft — унікальний політично-стратегічний Minecraft сервер з економікою, квестами та дружньою спільнотою. Приєднуйся до нас!" />
        <meta property="og:image" content="/logos/icon.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resod Craft — Український Minecraft сервер" />
        <meta name="twitter:description" content="Resod Craft — унікальний політично-стратегічний Minecraft сервер з економікою, квестами та дружньою спільнотою. Приєднуйся до нас!" />
        <meta name="twitter:image" content="/logos/icon.jpg" />
        <link rel="canonical" href="https://resodcraft.com" />
        <link rel="icon" href="/logos/icon.jpg" sizes="32x32" />
        <link rel="apple-touch-icon" href="/logos/icon.jpg" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#232c36" />
        {/* Шрифти з Google Fonts */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        {/* Іконки з FontAwesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOM6g6g6g6g6g6g6g6g6g6g6g6g6g6g6g" crossOrigin="anonymous" />
      </Head>
      <StarBackground />
      <Header />
      <div style={{ paddingTop: 80, paddingBottom: 60, position: 'relative', zIndex: 1 }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

