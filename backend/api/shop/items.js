import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'shop.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const items = JSON.parse(fileData);
  res.status(200).json(items);
}
