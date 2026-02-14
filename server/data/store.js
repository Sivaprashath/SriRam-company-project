import { getDb } from '../db.js';

const INWARDS_COLLECTION = 'clothInwards';
const OUTWARDS_COLLECTION = 'clothOutwards';

export async function addClothInward(record) {
  const doc = {
    ...record,
    createdAt: new Date(),
  };
  const res = await getDb().collection(INWARDS_COLLECTION).insertOne(doc);
  return { id: res.insertedId.toString(), ...record, createdAt: doc.createdAt.toISOString() };
}

export async function addClothOutward(record) {
  const doc = {
    ...record,
    createdAt: new Date(),
  };
  const res = await getDb().collection(OUTWARDS_COLLECTION).insertOne(doc);
  return { id: res.insertedId.toString(), ...record, createdAt: doc.createdAt.toISOString() };
}

export async function getClothInwards(limit = 100, offset = 0) {
  const coll = getDb().collection(INWARDS_COLLECTION);
  const [records, total] = await Promise.all([
    coll.find().sort({ createdAt: -1 }).skip(offset).limit(limit).toArray(),
    coll.countDocuments(),
  ]);
  return {
    records: records.map((r) => ({
      id: r._id.toString(),
      ...r,
      _id: undefined,
      createdAt: r.createdAt?.toISOString?.() ?? r.createdAt,
    })),
    total,
  };
}

export async function getClothOutwards(limit = 100, offset = 0) {
  const coll = getDb().collection(OUTWARDS_COLLECTION);
  const [records, total] = await Promise.all([
    coll.find().sort({ createdAt: -1 }).skip(offset).limit(limit).toArray(),
    coll.countDocuments(),
  ]);
  return {
    records: records.map((r) => ({
      id: r._id.toString(),
      ...r,
      _id: undefined,
      createdAt: r.createdAt?.toISOString?.() ?? r.createdAt,
    })),
    total,
  };
}

export async function getDashboardStats() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const startOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
  const lastMonthStr = lastMonthEnd.toISOString().split('T')[0];
  const lastMonthStrStart = lastMonthStart.toISOString().split('T')[0];

  const inwardsColl = getDb().collection(INWARDS_COLLECTION);
  const outwardsColl = getDb().collection(OUTWARDS_COLLECTION);

  const [allInwards, allOutwards] = await Promise.all([
    inwardsColl.find({}).toArray(),
    outwardsColl.find({}).toArray(),
  ]);

  const todayInwards = allInwards.filter((r) => (r.bcDate || r.date || '').toString().startsWith(today)).length;
  const todayOutwards = allOutwards.filter((r) => (r.dcDate || '').toString().startsWith(today)).length;

  let totalInwardKgs = 0;
  let totalOutwardKgs = 0;
  allInwards.forEach((r) => {
    (r.items || []).forEach((i) => { totalInwardKgs += Number(i.totKgs) || 0; });
  });
  allOutwards.forEach((r) => {
    (r.items || []).forEach((i) => { totalOutwardKgs += Number(i.totKgs) || 0; });
  });
  const totalStockKgs = Math.max(0, totalInwardKgs - totalOutwardKgs);

  const thisMonthInwards = allInwards.filter((r) => {
    const d = (r.bcDate || r.date || '').toString();
    return d >= startOfMonth && d <= today;
  }).length;
  const lastMonthInwards = allInwards.filter((r) => {
    const d = (r.bcDate || r.date || '').toString();
    return d >= lastMonthStrStart && d <= lastMonthStr;
  }).length;
  const monthlyGrowthPercent = lastMonthInwards > 0
    ? Math.round(((thisMonthInwards - lastMonthInwards) / lastMonthInwards) * 100)
    : (thisMonthInwards > 0 ? 100 : 0);

  return {
    todayInwards,
    todayOutwards,
    totalStockKgs: Math.round(totalStockKgs * 1000) / 1000,
    monthlyGrowthPercent,
  };
}
