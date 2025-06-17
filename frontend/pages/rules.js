import Link from 'next/link';
import { useState, useEffect } from 'react';

const rules = [
	{
		code: 'P1',
		title: 'Використання зброї без ліцензії або зброї, яку не можна отримати РП шляхом (мініган, ядерна бомба, лазери тощо)',
		penalty: '1 порушення — штраф 50000₴, 2 порушення — бан 1-3 години'
	},
	{
		code: 'P2',
		title: 'Використання стороннього ПЗ, яке дає перевагу, ламає логіку гри, шкодить гравцям або серверу',
		penalty: 'Бан назавжди'
	},
	{
		code: 'P3',
		title: 'Цілеспрямоване використання багів, бекдорів, недоліків чи обходу правил',
		penalty: '1 порушення — бан 3 години, 2 — бан 9 годин, 3 — бан 2 дні'
	},
	{
		code: 'P4',
		title: 'Підбурення гравців до агресії чи іншої поганої поведінки',
		penalty: '1 — попередження, 2 — бан 1 год, 3 — бан 1 год, 4 — бан 6 год'
	},
	{
		code: 'P5',
		title: 'Осудлива, неприємна чи агресивна поведінка під час гри',
		penalty: 'Покарання залежно від поведінки (1 година — 1 день)'
	},
	{
		code: 'P6',
		title: 'Правило новачків: не можна шкодити гравцю, який не награв 30 хвилин, або його споруді/території (виняток — якщо новачок нападає сам)',
		penalty: '1 — попередження, 2 — бан 5 год, 3 — бан 10 год, 4 — бан 2 дні'
	},
	{
		code: 'P7',
		title: 'Обман співробітників або гравців, дезінформація з метою обдурити',
		penalty: '1 — бан 2 год, 2 — бан 1 день, 3 — бан 3 дні'
	},
	{
		code: 'P8',
		title: 'Обхід покарання на сервері',
		penalty: 'Бан аналогічний основному порушенню'
	},
	{
		code: 'P9',
		title: 'Розголошення секретної інформації, яку гравці не мали знати',
		penalty: '1 — бан 24 год, 2 — бан 2 дні'
	},
	{
		code: 'P10',
		title: 'Ігнорування, вихід чи спроба уникнути перевірки або покарання',
		penalty: 'Бан за порушення + подвоєння терміну'
	},
	{
		code: 'P11',
		title: 'Реклама інших проектів, які не співпрацюють з нашим',
		penalty: 'Мут на 1/3/6 годин'
	},
	{
		code: 'P12',
		title: 'Видавання себе за співробітника проекту',
		penalty: '1 — мут 3 год, 2 — бан 1 день'
	},
	{
		code: 'P13',
		title: 'Провокація гравців на необдумані дії або агресія до них',
		penalty: 'Мут 30 хв — 3 години'
	},
	{
		code: 'P14',
		title: 'Обговорення політики, псевдоніми, фото, тексти з поганим чи провокаційним змістом',
		penalty: '1 — мут 15 хв — 1 год, 2 — мут 1 — 4 год'
	},
	{
		code: 'P15',
		title: 'Використання альтернативних акаунтів для обходу правил, чи гри',
		penalty: 'Попередження про вимкнення аккаунту / блокування аналогічне основі'
	}
];

export default function Rules() {
	const [filter, setFilter] = useState('');
	const [animList, setAnimList] = useState([]);

	const filteredRules = rules.filter(
		rule =>
			rule.code.toLowerCase().includes(filter.toLowerCase()) ||
			rule.title.toLowerCase().includes(filter.toLowerCase()) ||
			rule.penalty.toLowerCase().includes(filter.toLowerCase())
	);

	// Анімація появи блоків при фільтрації
	useEffect(() => {
		setAnimList([]);
		if (filteredRules.length > 0) {
			let timeouts = [];
			filteredRules.forEach((_, i) => {
				timeouts[i] = setTimeout(() => {
					setAnimList(list => [...list, i]);
				}, 60 * i);
			});
			return () => timeouts.forEach(t => clearTimeout(t));
		}
	}, [filter]);

	return (
		<main>
			<h1 style={{ textAlign: 'center', marginBottom: 32, fontSize: 28 }}>Правила сервера</h1>
			<div style={{ textAlign: 'center', marginBottom: 24 }}>
				<input
					type="text"
					placeholder="Пошук по правилах..."
					value={filter}
					onChange={e => setFilter(e.target.value)}
					style={{
						padding: '8px 16px',
						borderRadius: 8,
						border: '1px solid #00ffb4',
						fontSize: 15,
						outline: 'none',
						width: 260,
						background: '#181f26',
						color: '#eafefc',
						transition: 'box-shadow 0.18s',
						boxShadow: filter ? '0 0 8px #00ffb4' : 'none',
						maxWidth: '90vw'
					}}
				/>
			</div>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 22,
				maxWidth: 700,
				margin: '0 auto',
				padding: '0 8px'
			}}>
				{filteredRules.length === 0 && (
					<div style={{ color: '#ff6b6b', textAlign: 'center', fontSize: 16 }}>
						Нічого не знайдено.
					</div>
				)}
				{filteredRules.map((rule, idx) => (
					<div
						key={rule.code}
						style={{
							background: '#232c36',
							borderRadius: 14,
							padding: '18px 22px',
							color: '#eafefc',
							boxShadow: '0 2px 8px #0002',
							borderLeft: '5px solid #00ffb4',
							opacity: animList.includes(idx) ? 1 : 0,
							transform: animList.includes(idx)
								? 'translateY(0)'
								: 'translateY(30px) scale(0.98)',
							transition: 'opacity 0.35s cubic-bezier(.4,2,.6,1), transform 0.35s cubic-bezier(.4,2,.6,1)',
							overflowX: 'auto'
						}}
					>
						<div style={{ fontWeight: 700, color: '#00ffb4', fontSize: 17, marginBottom: 6, wordBreak: 'break-word' }}>
							{rule.code}
						</div>
						<div style={{ fontSize: 15, marginBottom: 7, wordBreak: 'break-word' }}>
							{rule.title}
						</div>
						<div style={{ color: '#ffe066', fontSize: 14, fontWeight: 500, wordBreak: 'break-word' }}>
							{rule.penalty}
						</div>
					</div>
				))}
			</div>
			<style jsx global>{`
				@media (max-width: 600px) {
					h1 {
						font-size: 20px !important;
						margin-bottom: 18px !important;
					}
					input[type="text"] {
						font-size: 13px !important;
						padding: 7px 10px !important;
						width: 98vw !important;
						max-width: 98vw !important;
					}
					[style*="padding: '18px 22px'"] {
						padding: 12px 7vw !important;
						font-size: 13px !important;
					}
					[style*="maxWidth: 700"] {
						max-width: 99vw !important;
						padding: 0 2vw !important;
					}
				}
			`}</style>
		</main>
	);
}

