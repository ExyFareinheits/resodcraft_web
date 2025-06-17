import Head from 'next/head';
import { useState } from 'react';


const FAQ_LIST = [
  { q: 'Як зайти на сервер?', a: 'Додайте IP  у вашому клієнті Minecraft (версія 1.16.5).' },
  { q: 'Які версії Minecraft підтримуються?', a: 'Сервер підтримує версію Minecraft 1.16.5' },
  { q: 'Як купити донат?', a: 'Перейдіть у розділ Магазин та оберіть бажаний донат. Оплата доступна через популярні платіжні системи.' },
  { q: 'Що робити, якщо виникли проблеми?', a: 'Звертайтесь у наш Discord або через розділ Контакти.' },
  { q: 'Чи можна грати без ліцензії?', a: 'Так, сервер підтримує як ліцензійних, так і неліцензійних гравців.' },
  { q: 'Чи є вайпи світу?', a: 'Вайпи проводяться лише у разі крайньої необхідності. Про це завжди повідомляється заздалегідь.' },
  { q: 'Як отримати статус YouTube?', a: 'Зверніться до адміністрації через Discord із посиланням на ваш канал.' },
  { q: 'Як змінити нікнейм?', a: 'Змініть нік у лаунчері Minecraft. На сервері він оновиться автоматично.' },
  { q: 'Чи є захист від читерів?', a: 'На сервері встановлений сучасний анти-чит та активна модерація.' },
  { q: 'Як отримати креатив?', a: 'Креатив доступний лише технічним адміністраторам в разі тестування.' },
  { q: 'Чи можна перенести речі між акаунтами?', a: 'Передача речей між акаунтами заборонена правилами.' },
  { q: 'Чи є івенти на сервері?', a: 'Так, івенти проводяться регулярно. Слідкуйте за новинами на сайті та у Discord.' },
  { q: 'Як написати скаргу на гравця?', a: 'Використовуйте розділ Контакти або звертайтесь до модераторів у Discord.' },
  { q: 'Чи можна грати з друзями?', a: 'Звісно! Запрошуйте друзів та створюйте власні команди.' },

];

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [openIdx, setOpenIdx] = useState(null);

  const filtered = FAQ_LIST.filter(
    item =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>FAQ — Resod Craft</title>
      </Head>
      <div className="faq-root">
        <div className="faq-example-row">
          <span className="faq-example-label">Наприклад:</span>
          <span className="faq-example-value">"донат", "версії", "читер"</span>
        </div>
        <h1 className="faq-title">Часті питання (FAQ)</h1>
        <input
          className="faq-search"
          type="text"
          placeholder="Пошук питання або відповіді..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="faq-list">
          {filtered.length === 0 && (
            <div className="faq-empty">Нічого не знайдено.</div>
          )}
          {filtered.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                className={`faq-item${isOpen ? ' open' : ''}`}
                key={idx}
                style={{
                  opacity: filtered.length ? 1 : 0,
                  transform: filtered.length ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.35s, transform 0.35s',
                }}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="faq-arrow">{isOpen ? '▲' : '▼'}</span>
                </button>
                <div
                  className="faq-answer"
                  style={{
                    maxHeight: isOpen ? 300 : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.45s cubic-bezier(.4,2,.6,1), opacity 0.3s',
                  }}
                >
                  <div className="faq-answer-inner">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .faq-root {
          max-width: 700px;
          margin: 0 auto;
          padding: 32px 16px 80px 16px;
        }
        .faq-example-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }
        .faq-example-label {
          color: #b2dfdb;
          font-size: 15px;
          margin-bottom: 2px;
        }
        .faq-example-value {
          color: #00ffb4;
          font-size: 16px;
          font-style: italic;
          letter-spacing: 0.5px;
        }
        .faq-title {
          color: #00ffb4;
          font-size: 32px;
          margin-bottom: 24px;
          text-align: center;
          letter-spacing: 1px;
        }
        .faq-search {
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #00ffb4;
          background: #1e3557;
          color: #fff;
          font-size: 16px;
          margin-bottom: 28px;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px #00ffb41a;
        }
        .faq-search:focus {
          border: 1.5px solid #00ffb4;
          background: #223c5e;
          box-shadow: 0 4px 16px #00ffb433;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .faq-item {
          background: linear-gradient(90deg, #232c36 0%, #1e3557 100%);
          border-radius: 10px;
          box-shadow: 0 2px 12px #00ffb41a;
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .faq-item.open {
          box-shadow: 0 4px 18px #00ffb433;
        }
        .faq-question {
          width: 100%;
          background: none;
          border: none;
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          padding: 18px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          outline: none;
          transition: background 0.18s;
        }
        .faq-question:hover {
          background: #223c5e;
        }
        .faq-arrow {
          font-size: 18px;
          color: #00ffb4;
          margin-left: 10px;
          transition: transform 0.2s;
        }
        .faq-item.open .faq-arrow {
          transform: rotate(180deg);
        }
        .faq-answer {
          background: #223c5e;
          transition: max-height 0.45s cubic-bezier(.4,2,.6,1), opacity 0.3s;
          overflow: hidden;
        }
        .faq-answer-inner {
          color: #cfd8dc;
          font-size: 16px;
          padding: 16px 22px 18px 22px;
        }
        .faq-empty {
          color: #fff;
          text-align: center;
          padding: 32px 0;
          font-size: 18px;
          opacity: 0.7;
        }
        .faq-hint {
          margin-top: 38px;
          color: #b2dfdb;
          font-size: 14px;
          background: #1e3557;
          border-radius: 8px;
          padding: 14px 18px;
          box-shadow: 0 2px 8px #00ffb41a;
        }
        .faq-hint code {
          background: #223c5e;
          color: #00ffb4;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 13px;
        }
      `}</style>
    </>
  );
}
