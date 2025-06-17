import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const blocks = [
	{
		title: 'Політично-стратегічний сервер',
		text: `Resod Craft — це унікальний політично-стратегічний сервер, де немає приватів. Тут головне — взаємодовіря між гравцями. 
Всі будівлі, ресурси та території захищає лише ваша репутація, дипломатія та домовленості з іншими учасниками. 
Створюй альянси, розвивай власну державу, впливай на політику світу! 
Кожне рішення має наслідки, а справжня сила — у спільних діях та взаємоповазі.`,
		img: 'https://thumbs.dreamstime.com/b/nature-pixel-landscape-video-game-user-interface-minecraft-style-bit-background-nature-pixel-landscape-video-game-user-324602974.jpg',
	},
	{
		title: 'Економіка, магазини та квести',
		text: `На сервері діє цікава економіка, магазини зі зброєю та унікальними предметами. 
Ти можеш торгувати з іншими гравцями, відкривати власні лавки, накопичувати багатство або вкладати його у розвиток своєї фракції. 
Вас чекають сюжетні та багатоповторні квести: від простих завдань до масштабних пригод із цінними нагородами. 
Кожен день — це нові можливості для розвитку та веселощів!`,
		img: 'https://http2.mlstatic.com/D_NQ_NP_694926-MLB48841651268_012022-O.webp',
	},
	{
		title: 'Підтримка та розвиток',
		text: `Обираючи Resod Craft, ви отримуєте не просто сервер, а справжню спільноту однодумців. 
Ваша фінансова та моральна підтримка допомагає нам розвивати проект, впроваджувати нові ідеї, створювати унікальні івенти та покращувати якість гри. 
Ми відкриті до пропозицій і завжди раді бачити активних гравців, які хочуть зробити сервер ще кращим. 
Разом ми зможемо досягти більшого!`,
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzANTwho4SjmsDAD8VDK4CCHug4EiQJqBwcvNPWMdVMhqSBsehDzWehTNWcnrvsOmT2W4&usqp=CAU',
	},
	{
		title: 'Стань частиною адміністрації',
		text: `Кожен гравець може стати адміністратором! 
Якщо ти активний, відповідальний і бажаєш допомагати іншим — приєднуйся до нашої команди. 
Адміністратори допомагають новачкам, стежать за порядком, організовують івенти та карають порушників. 
Ти зможеш впливати на розвиток серверу, отримувати повагу спільноти та новий досвід у керуванні проектом.`,
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs6mqpZSiPJcUGPnclx_vKy_AHYGYdvu3xsg&s',
	},
];

function HeaderSocialIcons() {
	return (
		<div className="header-socials">
			<a
				href="https://discord.gg/ffZZFNJVQq"
				target="_blank"
				rel="noopener noreferrer"
				className="header-social-btn"
				aria-label="Discord"
			>
				<i className="fab fa-discord" />
			</a>
			<a
				href="https://www.tiktok.com/@resod.craft"
				target="_blank"
				rel="noopener noreferrer"
				className="header-social-btn"
				aria-label="TikTok"
			>
				<i className="fab fa-tiktok" />
			</a>
			<a
				href="https://youtube.com/@your-youtube"
				target="_blank"
				rel="noopener noreferrer"
				className="header-social-btn"
				aria-label="YouTube"
			>
				<i className="fab fa-youtube" />
			</a>
			<style jsx>{`
				.header-socials {
					display: flex;
					align-items: center;
					gap: 10px;
					margin-left: 18px;
				}
				.header-social-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 32px;
					height: 32px;
					border-radius: 50%;
					background: #232c36;
					color: #00ffb4;
					font-size: 18px;
					transition: background 0.18s, color 0.18s, box-shadow 0.18s;
					box-shadow: 0 2px 8px #00ffb41a;
					text-decoration: none;
				}
				.header-social-btn:hover {
					background: #00ffb4;
					color: #232c36;
					box-shadow: 0 2px 12px #00ffb4aa;
				}
				.header-social-btn:active {
					background: #ffe066;
					color: #232c36;
				}
			`}</style>
		</div>
	);
}

export default function Home() {
	const [visible, setVisible] = useState(Array(blocks.length).fill(false));
	const [active, setActive] = useState(null);
	const timeouts = useRef([]);

	useEffect(() => {
		blocks.forEach((_, i) => {
			timeouts.current[i] = setTimeout(() => {
				setVisible((v) => {
					const arr = [...v];
					arr[i] = true;
					return arr;
				});
			}, 200 + i * 220);
		});
		return () => timeouts.current.forEach((t) => clearTimeout(t));
	}, []);

	const handleBlockClick = (idx) => {
		setActive(active === idx ? null : idx);
	};

	return (
		<>
			<Head>
				<link rel="icon" href="/logos/icon.jpg" type="image/jpeg" />
				<title>Resod Craft — Minecraft сервер</title>
			</Head>
			<h1 className="main-title" style={{ textAlign: 'center' }}>
				Resod Craft — Minecraft сервер
			</h1>
			{/* Соцмережі тепер у хедері, тут видаляємо */}
			{/* <div className="main-socials"> ... </div> */}
			<div className="main-title-blocks">
				{blocks.map((block, idx) => (
					<div
						key={block.title}
						className={
							'title-block wide dark' +
							(visible[idx] ? ' visible' : '') +
							(active === idx ? ' active' : '')
						}
						tabIndex={0}
						onClick={() => handleBlockClick(idx)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') handleBlockClick(idx);
						}}
						aria-expanded={active === idx}
						aria-label={block.title}
						style={{
							fontFamily: "'Montserrat', Arial, sans-serif",
							overflow: 'hidden',
							padding: 0,
							margin: '24px 0',
							background: '#232c36',
							borderRadius: 22,
							boxShadow: '0 2px 12px #00ffb41a',
							cursor: 'pointer',
							transition: 'box-shadow 0.2s, transform 0.2s',
							transform: visible[idx] ? 'translateY(0)' : 'translateY(40px)',
							opacity: visible[idx] ? 1 : 0,
							pointerEvents: visible[idx] ? 'auto' : 'none',
						}}
					>
						<div
							className="block-banner"
							style={{
								width: '100%',
								height: 160,
								background: `url(${block.img}) center center/cover no-repeat`,
								borderTopLeftRadius: 22,
								borderTopRightRadius: 22,
								marginBottom: 0,
							}}
						/>
						<div style={{ padding: '28px 32px 22px 32px' }}>
							<h2
								style={{
									fontFamily: "'Montserrat', Arial, sans-serif",
									fontWeight: 700,
									color: '#00ffb4',
									marginBottom: 12,
								}}
							>
								{block.title}
							</h2>
							<p style={{ color: '#eafefc', fontSize: 16, lineHeight: 1.6 }}>{block.text}</p>
						</div>
					</div>
				))}
			</div>
			<style jsx>{`
				.main-title-blocks {
					max-width: 900px;
					margin: 0 auto;
					padding: 0 8px 40px 8px;
				}
				.main-ip-block {
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 10px;
					margin: 24px auto 10px auto;
					padding: 10px 18px;
					background: #232c36;
					border-radius: 14px;
					box-shadow: 0 2px 12px #00ffb41a;
					width: fit-content;
					font-size: 18px;
					position: relative;
				}
				.main-ip-label {
					color: #eafefc;
					font-weight: 600;
					margin-right: 6px;
				}
				.main-ip-btn {
					background: none;
					border: none;
					color: #00ffb4;
					font-weight: 700;
					font-size: 18px;
					cursor: pointer;
					display: flex;
					align-items: center;
					padding: 0 4px;
					transition: color 0.18s;
					border-radius: 6px;
				}
				.main-ip-btn:hover {
					color: #ffe066;
					background: #00ffb411;
				}
				.main-ip-copied {
					position: absolute;
					top: 100%;
					left: 50%;
					transform: translateX(-50%);
					background: #232c36;
					color: #00ffb4;
					font-size: 14px;
					padding: 4px 12px;
					border-radius: 8px;
					margin-top: 6px;
					box-shadow: 0 2px 8px #00ffb422;
					animation: fadein-blur 0.3s;
					white-space: nowrap;
				}
				.main-socials {
					display: flex;
					justify-content: center;
					gap: 18px;
					margin: 10px 0 28px 0;
				}
				.main-social-btn {
					display: flex;
					align-items: center;
					gap: 7px;
					font-weight: 600;
					font-size: 15px;
					padding: 7px 18px;
					border-radius: 8px;
					text-decoration: none;
					transition: background 0.18s, color 0.18s;
					background: #232c36;
					color: #eafefc;
					box-shadow: 0 2px 8px #00ffb41a;
				}
				.main-social-btn.discord:hover {
					background: #5865f2;
					color: #fff;
				}
				.main-social-btn.tiktok:hover {
					background: #010101;
					color: #fff;
				}
				.main-social-btn.youtube:hover {
					background: #ff0000;
					color: #fff;
				}
				.main-faq {
					max-width: 700px;
					margin: 0 auto 30px auto;
					background: #232c36;
					border-radius: 14px;
					box-shadow: 0 2px 12px #00ffb41a;
					padding: 18px 24px 10px 24px;
				}
				.main-faq h2 {
					color: #00ffb4;
					font-size: 20px;
					margin-bottom: 10px;
					font-weight: 700;
				}
				.main-faq ul {
					padding-left: 18px;
					margin: 0;
					color: #eafefc;
					font-size: 15px;
				}
				.main-faq li {
					margin-bottom: 7px;
				}
				body {
					background: #181f26;
				}
			`}</style>
		</>
	);
}

