// Seed de produtos no MockAPI
const BASE_URL = 'https://6914e0003746c71fe049e949.mockapi.io';

const categories = [
  { name: 'Lanches', prefix: 'Lanche', min: 12, max: 40 },
  { name: 'Combos', prefix: 'Combo', min: 20, max: 70 },
  { name: 'Bebidas', prefix: 'Bebida', min: 3, max: 15 },
  { name: 'Sobremesas', prefix: 'Sobremesa', min: 6, max: 25 },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const randPrice = (min, max) => Number((min + Math.random() * (max - min)).toFixed(2));
const imageFor = (seed) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/200/200`;

async function ensureFetch() {
  if (typeof fetch !== 'function') {
    throw new Error('Este script requer Node 18+ com fetch global.');
  }
}

async function getExistingByCategory(category) {
  const url = `${BASE_URL}/produtos`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET produtos falhou: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data.filter((p) => p?.category === category) : [];
}

async function createProduct(body) {
  const res = await fetch(`${BASE_URL}/produtos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST produtos falhou: ${res.status}`);
  return res.json();
}

async function seedCategory({ name, prefix, min, max }) {
  console.log(`\nCategoria: ${name}`);
  let count = 0;
  try {
    const existing = await getExistingByCategory(name);
    count = Array.isArray(existing) ? existing.length : 0;
  } catch (e) {
    console.warn(`Aviso: não foi possível obter existentes para ${name}:`, e.message || e);
    count = 0;
  }
  console.log(`Itens existentes: ${count}`);
  const needed = Math.max(0, 10 - count);
  if (needed === 0) {
    console.log('Já há 10 ou mais itens. Pulando...');
    return;
  }
  console.log(`Criando ${needed} itens...`);
  for (let i = count + 1; i <= 10; i++) {
    const body = {
      name: `${prefix} ${i}`,
      category: name,
      price: randPrice(min, max),
      imageUrl: imageFor(`${name}-${i}`),
      available: Math.random() < 0.9,
    };
    try {
      const created = await createProduct(body);
      console.log(`✔ Criado: ${created.name} (id=${created.id})`);
    } catch (e) {
      console.error(`✖ Erro ao criar ${body.name}:`, e.message || e);
    }
    await delay(120);
  }
}

async function main() {
  try {
    await ensureFetch();
    for (const c of categories) {
      await seedCategory(c);
    }
    console.log('\nSeed concluído.');
  } catch (e) {
    console.error('Falha no seed:', e.message || e);
    process.exitCode = 1;
  }
}

main();