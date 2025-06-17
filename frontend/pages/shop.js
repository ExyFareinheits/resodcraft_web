import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

// Дата закінчення акції
const discountEnd = new Date('2025-07-15');

const DONATES = [
	{
		name: 'Emerald',
		img: '/logos/emerald.png',
		desc: 'Emerald-статус: легендарний донат, доступ до /kit emerald, найвища приорітетна підтримка, доступ до кращого спорядженна та 3500$ ігрової валюти.',
		price: 120,
		discount: 0,
	},
	{
		name: 'Diamond',
		img: '/logos/diamond.png',
		desc: 'Diamond-статус: максимальні ігрові переваги, доступ до /kit diamond, особливий колір ніку та 2500$ ігрової валюти + покращена приорітетна підртримка',
		price: 65,
		discount: 0.15,
	},
	{
		name: 'Gold',
		img: '/logos/gold.png',
		desc: 'Gold-статус: додаткові можливості, доступ до /kit gold, унікальний колір ніку, 2000$ ігрової валюти.',
		price: 60,
		discount: 0.2,
	},
	{
		name: 'Iron',
		img: '/logos/iron.png',
		desc: 'Iron-статус: стартовий донат, доступ до /kit iron, можливість виділятись у чаті та 1500$ ігрової валюти + приорітетна підртримка',
		price: 45,
		discount: 0.15,
	},
	{
		name: 'Support',
		img: '/logos/support.png',
		desc: 'Підтримка серверу. Дякуємо за внесок у розвиток! Ви отримуєте унікальний значок підтримки та 750$ ігрової валюти + приорітетна підртримка',
		price: 15,
		discount: 0,
	},
];

function getDiscounted(price, discount) {
	return Math.round(price * (1 - discount));
}

export default function Shop() {
	const [message, setMessage] = useState('');
	const now = new Date();
	const isDiscount = now < discountEnd;
	const router = useRouter();

	const handleDonate = (donate) => {
		const hasDiscount = isDiscount && donate.discount > 0;
		const discounted = hasDiscount ? getDiscounted(donate.price, donate.discount) : donate.price;
		router.push({
			pathname: '/donate-confirm',
			query: {
				amount: discounted,
				description: donate.name
			}
		});
	};

	return (
		<main style={{ textAlign: 'center' }}>
			<h1>Магазин</h1>
			<h3 style={{ marginTop: 32 }}>Донати:</h3>
			<div style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
				gap: 28,
				margin: '0 auto',
				maxWidth: 900,
				padding: '0 8px'
			}}>
				{DONATES.map((donate) => {
					const hasDiscount = isDiscount && donate.discount > 0;
					const discounted = hasDiscount ? getDiscounted(donate.price, donate.discount) : donate.price;
					return (
						<div
							key={donate.name}
							style={{
								background: '#232c36',
								borderRadius: 16,
								padding: '22px 20px 18px 20px',
								color: '#fff',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								boxShadow: '0 2px 8px #0002',
								minHeight: 270,
								position: 'relative',
								textAlign: 'center'
							}}
						>
							<img
								src={donate.img}
								alt={donate.name}
								width={60}
								height={60}
								style={{
									borderRadius: 10,
									background: '#181f26',
									objectFit: 'contain',
									boxShadow: '0 1px 4px #0003',
									marginBottom: 14
								}}
							/>
							<div style={{ fontWeight: 700, fontSize: 20, color: '#00ffb4', marginBottom: 6 }}>{donate.name}</div>
							<div style={{ fontSize: 14, color: '#eafefc', opacity: 0.92, marginBottom: 10, minHeight: 48 }}>{donate.desc}</div>
							<div style={{ marginBottom: 8 }}>
								{hasDiscount && (
									<div style={{ color: '#ff6b6b', fontSize: 15, textDecoration: 'line-through', fontWeight: 500 }}>
										{donate.price}₴
									</div>
								)}
								<div style={{
									color: hasDiscount ? '#ffe066' : '#fff',
									fontWeight: 700,
									fontSize: 22,
									marginBottom: 2
								}}>
									{discounted}₴
								</div>
								{hasDiscount && (
									<div style={{ fontSize: 11, color: '#00ffb4' }}>
										Знижка до 15.07.2025
									</div>
								)}
							</div>
							<button onClick={() => handleDonate(donate)} style={{ marginTop: 'auto', width: '100%' }}>
								Купити
							</button>
						</div>
					);
				})}
			</div>
			{message && <div style={{ marginTop: 16, color: 'green' }}>{message}</div>}
		</main>
	);
}

