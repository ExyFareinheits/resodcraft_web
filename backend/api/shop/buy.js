export default function handler(req, res) {
  if (req.method === 'POST') {
    const { item } = req.body;
    // Тут можна додати логіку оплати/перевірки
    res.status(200).json({ message: `Ви успішно купили: ${item}` });
  } else {
    res.status(405).json({ message: 'Метод не дозволено' });
  }
}
