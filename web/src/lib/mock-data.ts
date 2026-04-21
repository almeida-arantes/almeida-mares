/**
 * Mock data for the Almeida Mares platform.
 * Realistic seed: property managers operating in Brazilian coastal cities.
 * All monetary values in BRL.
 */

export type Channel = "airbnb" | "booking" | "vrbo" | "direto";
export type ReservationStatus =
  | "confirmada"
  | "em_estadia"
  | "concluida"
  | "cancelada"
  | "pendente";

export const channels: Record<
  Channel,
  { label: string; color: string; hex: string }
> = {
  airbnb: { label: "Airbnb", color: "chart-5", hex: "#E11D48" },
  booking: { label: "Booking.com", color: "chart-1", hex: "#0B4F6C" },
  vrbo: { label: "Vrbo", color: "chart-4", hex: "#16A34A" },
  direto: { label: "Direto", color: "chart-2", hex: "#E6B85C" },
};

export type Owner = {
  id: string;
  name: string;
  document: string; // CPF/CNPJ
  email: string;
  phone: string;
  city: string;
  commissionPct: number;
  propertiesCount: number;
  ytdRevenue: number;
  pendingPayout: number;
  since: string;
};

export const owners: Owner[] = [
  {
    id: "own_01",
    name: "Ricardo Mendonça",
    document: "214.***.***-08",
    email: "ricardo.m@gmail.com",
    phone: "+55 71 99***-1120",
    city: "Salvador, BA",
    commissionPct: 20,
    propertiesCount: 3,
    ytdRevenue: 248_500,
    pendingPayout: 18_420,
    since: "2023-02-14",
  },
  {
    id: "own_02",
    name: "Fernanda Arantes",
    document: "356.***.***-12",
    email: "fe.arantes@outlook.com",
    phone: "+55 71 98***-4472",
    city: "Praia do Forte, BA",
    commissionPct: 18,
    propertiesCount: 2,
    ytdRevenue: 184_260,
    pendingPayout: 12_980,
    since: "2023-07-22",
  },
  {
    id: "own_03",
    name: "João Paulo Vasconcelos",
    document: "188.***.***-45",
    email: "jpvasconcelos@icloud.com",
    phone: "+55 71 99***-8843",
    city: "Itacimirim, BA",
    commissionPct: 22,
    propertiesCount: 4,
    ytdRevenue: 391_840,
    pendingPayout: 29_120,
    since: "2022-11-03",
  },
  {
    id: "own_04",
    name: "Beatriz Nogueira Lima",
    document: "432.***.***-91",
    email: "bea.nogueira@gmail.com",
    phone: "+55 11 98***-2231",
    city: "São Paulo, SP",
    commissionPct: 20,
    propertiesCount: 1,
    ytdRevenue: 96_300,
    pendingPayout: 7_150,
    since: "2024-01-18",
  },
  {
    id: "own_05",
    name: "Construtora Maré Alta Ltda.",
    document: "12.***.***/0001-58",
    email: "financeiro@marealta.com.br",
    phone: "+55 71 3***-7702",
    city: "Salvador, BA",
    commissionPct: 15,
    propertiesCount: 2,
    ytdRevenue: 142_700,
    pendingPayout: 9_840,
    since: "2023-05-09",
  },
];

export type Property = {
  id: string;
  ownerId: string;
  nickname: string;
  address: string;
  city: string;
  type: "casa" | "apartamento" | "chale" | "flat";
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  image: string;
  cleaningFee: number;
  baseNightly: number;
  channels: Channel[];
  occupancy30d: number;
  revenue30d: number;
  rating: number;
  syncStatus: Record<Channel, "synced" | "syncing" | "stale" | "error" | "n/a">;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=72`;

export const properties: Property[] = [
  {
    id: "prop_01",
    ownerId: "own_01",
    nickname: "Casa Buzios — Salvador",
    address: "Rua das Flores, 142 — Barra",
    city: "Salvador, BA",
    type: "casa",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    image: unsplash("1564013799919-ab600027ffc6"),
    cleaningFee: 280,
    baseNightly: 820,
    channels: ["airbnb", "booking", "direto"],
    occupancy30d: 86,
    revenue30d: 22_140,
    rating: 4.92,
    syncStatus: { airbnb: "synced", booking: "synced", vrbo: "n/a", direto: "synced" },
  },
  {
    id: "prop_02",
    ownerId: "own_01",
    nickname: "Flat Ondina Vista Mar",
    address: "Av. Oceânica, 880 — apto 1202",
    city: "Salvador, BA",
    type: "flat",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    image: unsplash("1522708323590-d24dbb6b0267"),
    cleaningFee: 150,
    baseNightly: 420,
    channels: ["airbnb", "booking"],
    occupancy30d: 72,
    revenue30d: 9_860,
    rating: 4.78,
    syncStatus: { airbnb: "synced", booking: "syncing", vrbo: "n/a", direto: "n/a" },
  },
  {
    id: "prop_03",
    ownerId: "own_01",
    nickname: "Apto Rio Vermelho",
    address: "Rua Lídio Mesquita, 45 — apto 302",
    city: "Salvador, BA",
    type: "apartamento",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    image: unsplash("1560448204-e02f11c3d0e2"),
    cleaningFee: 110,
    baseNightly: 280,
    channels: ["airbnb", "direto"],
    occupancy30d: 68,
    revenue30d: 5_940,
    rating: 4.65,
    syncStatus: { airbnb: "synced", booking: "n/a", vrbo: "n/a", direto: "synced" },
  },
  {
    id: "prop_04",
    ownerId: "own_02",
    nickname: "Casa Praia do Forte — Azul",
    address: "Alameda do Sol, 17",
    city: "Praia do Forte, BA",
    type: "casa",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 8,
    image: unsplash("1613490493576-7fde63acd811"),
    cleaningFee: 250,
    baseNightly: 720,
    channels: ["airbnb", "booking", "vrbo"],
    occupancy30d: 91,
    revenue30d: 19_680,
    rating: 4.95,
    syncStatus: { airbnb: "synced", booking: "synced", vrbo: "synced", direto: "n/a" },
  },
  {
    id: "prop_05",
    ownerId: "own_02",
    nickname: "Vila Praia do Forte — Coral",
    address: "Rua do Coqueiral, 32",
    city: "Praia do Forte, BA",
    type: "casa",
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 10,
    image: unsplash("1600585154340-be6161a56a0c"),
    cleaningFee: 300,
    baseNightly: 950,
    channels: ["airbnb", "booking"],
    occupancy30d: 82,
    revenue30d: 23_420,
    rating: 4.88,
    syncStatus: { airbnb: "synced", booking: "error", vrbo: "n/a", direto: "n/a" },
  },
  {
    id: "prop_06",
    ownerId: "own_03",
    nickname: "Chalé Itacimirim Mar",
    address: "Condomínio Reserva Imbassaí, bl. 4",
    city: "Itacimirim, BA",
    type: "chale",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 6,
    image: unsplash("1520250497591-112f2f40a3f4"),
    cleaningFee: 180,
    baseNightly: 540,
    channels: ["airbnb", "booking", "direto"],
    occupancy30d: 78,
    revenue30d: 13_260,
    rating: 4.81,
    syncStatus: { airbnb: "synced", booking: "synced", vrbo: "n/a", direto: "synced" },
  },
  {
    id: "prop_07",
    ownerId: "own_03",
    nickname: "Casa Itacimirim 3 quartos",
    address: "Rua das Palmeiras, 88",
    city: "Itacimirim, BA",
    type: "casa",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 8,
    image: unsplash("1600607687939-ce8a6c25118c"),
    cleaningFee: 220,
    baseNightly: 680,
    channels: ["airbnb", "booking", "vrbo", "direto"],
    occupancy30d: 84,
    revenue30d: 17_820,
    rating: 4.9,
    syncStatus: { airbnb: "synced", booking: "synced", vrbo: "synced", direto: "synced" },
  },
  {
    id: "prop_08",
    ownerId: "own_03",
    nickname: "Apartamento Guarajuba",
    address: "Edifício Mirante, apto 804",
    city: "Guarajuba, BA",
    type: "apartamento",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 5,
    image: unsplash("1600566753190-17f0baa2a6c3"),
    cleaningFee: 140,
    baseNightly: 360,
    channels: ["airbnb", "booking"],
    occupancy30d: 74,
    revenue30d: 8_260,
    rating: 4.72,
    syncStatus: { airbnb: "stale", booking: "synced", vrbo: "n/a", direto: "n/a" },
  },
  {
    id: "prop_09",
    ownerId: "own_03",
    nickname: "Loft Pelourinho Design",
    address: "Ladeira do Carmo, 12",
    city: "Salvador, BA",
    type: "apartamento",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    image: unsplash("1502672260266-1c1ef2d93688"),
    cleaningFee: 120,
    baseNightly: 310,
    channels: ["airbnb", "direto"],
    occupancy30d: 69,
    revenue30d: 6_420,
    rating: 4.83,
    syncStatus: { airbnb: "synced", booking: "n/a", vrbo: "n/a", direto: "synced" },
  },
  {
    id: "prop_10",
    ownerId: "own_04",
    nickname: "Casa Arraial d'Ajuda — Boreal",
    address: "Rua da Hera, 220",
    city: "Arraial d'Ajuda, BA",
    type: "casa",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 7,
    image: unsplash("1512917774080-9991f1c4c750"),
    cleaningFee: 200,
    baseNightly: 640,
    channels: ["airbnb", "booking"],
    occupancy30d: 88,
    revenue30d: 15_930,
    rating: 4.86,
    syncStatus: { airbnb: "synced", booking: "synced", vrbo: "n/a", direto: "n/a" },
  },
  {
    id: "prop_11",
    ownerId: "own_05",
    nickname: "Maré Alta — Cobertura Barra",
    address: "Av. Oceânica, 1450 — cob. 01",
    city: "Salvador, BA",
    type: "apartamento",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    image: unsplash("1545324418-cc1a3fa10c00"),
    cleaningFee: 260,
    baseNightly: 890,
    channels: ["airbnb", "booking", "direto"],
    occupancy30d: 81,
    revenue30d: 21_360,
    rating: 4.89,
    syncStatus: { airbnb: "synced", booking: "synced", vrbo: "n/a", direto: "synced" },
  },
  {
    id: "prop_12",
    ownerId: "own_05",
    nickname: "Maré Alta — Flat Ondina 702",
    address: "Rua Reitor Miguel Calmon, 7",
    city: "Salvador, BA",
    type: "flat",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    image: unsplash("1484154218962-a197022b5858"),
    cleaningFee: 100,
    baseNightly: 260,
    channels: ["airbnb", "booking"],
    occupancy30d: 76,
    revenue30d: 5_820,
    rating: 4.7,
    syncStatus: { airbnb: "synced", booking: "synced", vrbo: "n/a", direto: "n/a" },
  },
];

// Reservation generator — spans current/next month with realistic names
const firstNames = [
  "Ana Luísa", "Pedro", "Mariana", "Lucas", "Juliana", "Felipe", "Camila",
  "Rafael", "Isabela", "Gustavo", "Larissa", "Thiago", "Beatriz", "Rodrigo",
  "Renata", "Matthias", "Sophie", "James", "Elena", "Hiroshi",
];
const lastNames = [
  "Silva", "Santos", "Oliveira", "Souza", "Lima", "Costa", "Ferreira",
  "Ribeiro", "Carvalho", "Gomes", "Müller", "Dubois", "Anderson", "Conti", "Tanaka",
];

function daysFromNow(d: number): Date {
  const x = new Date();
  x.setHours(15, 0, 0, 0);
  x.setDate(x.getDate() + d);
  return x;
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

export type Reservation = {
  id: string;
  code: string;
  propertyId: string;
  guestName: string;
  guestCountry: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  channel: Channel;
  grossValue: number;
  otaFee: number;
  cleaningFee: number;
  netOwner: number;
  managementFee: number;
  status: ReservationStatus;
};

const countries = ["BR", "PT", "US", "FR", "DE", "AR", "UK", "JP", "IT"];

function generateReservations(): Reservation[] {
  const out: Reservation[] = [];
  let seed = 17;
  properties.forEach((prop, pi) => {
    const owner = owners.find((o) => o.id === prop.ownerId)!;
    // 4-7 reservations per property spanning -20d to +60d
    const count = 4 + (pi % 4);
    let cursor = -20 + (pi * 3) % 12;
    for (let i = 0; i < count; i++) {
      seed = seed * 31 + i + pi * 7;
      const los = 2 + (seed % 8);
      const checkIn = daysFromNow(cursor);
      const checkOut = daysFromNow(cursor + los);
      const nightly = prop.baseNightly * (0.85 + ((seed >> 2) % 30) / 100);
      const gross = Math.round(nightly * los + prop.cleaningFee);
      const channel = pick<Channel>(prop.channels, seed);
      const otaFee =
        channel === "airbnb"
          ? Math.round(gross * 0.14)
          : channel === "booking"
            ? Math.round(gross * 0.15)
            : channel === "vrbo"
              ? Math.round(gross * 0.08)
              : 0;
      const mgmt = Math.round((gross - otaFee) * (owner.commissionPct / 100));
      const net = gross - otaFee - prop.cleaningFee - mgmt;

      const today = daysFromNow(0);
      let status: ReservationStatus = "confirmada";
      if (checkOut < today) status = "concluida";
      else if (checkIn <= today && today < checkOut) status = "em_estadia";
      if (i === 2 && pi % 7 === 0) status = "cancelada";

      out.push({
        id: `res_${pi}_${i}`,
        code: channel === "booking" ? `${3_100_000 + seed % 999_999}` : `HMXZ${(seed % 9999).toString().padStart(4, "0")}`,
        propertyId: prop.id,
        guestName: `${pick(firstNames, seed)} ${pick(lastNames, seed + 3)}`,
        guestCountry: pick(countries, seed + 1),
        guests: 2 + ((seed >> 3) % Math.min(prop.maxGuests - 1, 4)),
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        nights: los,
        channel,
        grossValue: gross,
        otaFee,
        cleaningFee: prop.cleaningFee,
        netOwner: net,
        managementFee: mgmt,
        status,
      });

      cursor += los + 1 + (seed % 4);
    }
  });
  return out.sort(
    (a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime(),
  );
}

export const reservations = generateReservations();

// Revenue by month (last 12) — for the dashboard chart
export const revenueByMonth = [
  { month: "Mai/25", booking: 38_400, airbnb: 52_100, vrbo: 8_200, direto: 12_900 },
  { month: "Jun/25", booking: 41_200, airbnb: 58_600, vrbo: 9_400, direto: 14_300 },
  { month: "Jul/25", booking: 62_800, airbnb: 78_200, vrbo: 14_500, direto: 22_100 },
  { month: "Ago/25", booking: 48_900, airbnb: 64_800, vrbo: 11_200, direto: 18_400 },
  { month: "Set/25", booking: 39_100, airbnb: 49_600, vrbo: 7_800, direto: 13_200 },
  { month: "Out/25", booking: 44_200, airbnb: 55_400, vrbo: 9_300, direto: 15_800 },
  { month: "Nov/25", booking: 51_800, airbnb: 66_900, vrbo: 11_100, direto: 19_200 },
  { month: "Dez/25", booking: 84_200, airbnb: 112_400, vrbo: 22_800, direto: 34_800 },
  { month: "Jan/26", booking: 92_100, airbnb: 124_900, vrbo: 26_400, direto: 38_100 },
  { month: "Fev/26", booking: 68_400, airbnb: 88_200, vrbo: 17_300, direto: 28_900 },
  { month: "Mar/26", booking: 56_200, airbnb: 72_900, vrbo: 13_400, direto: 22_100 },
  { month: "Abr/26", booking: 49_800, airbnb: 64_200, vrbo: 10_800, direto: 18_400 },
];

export const occupancyByMonth = [
  { month: "Mai/25", value: 68 },
  { month: "Jun/25", value: 72 },
  { month: "Jul/25", value: 92 },
  { month: "Ago/25", value: 81 },
  { month: "Set/25", value: 66 },
  { month: "Out/25", value: 74 },
  { month: "Nov/25", value: 82 },
  { month: "Dez/25", value: 96 },
  { month: "Jan/26", value: 94 },
  { month: "Fev/26", value: 78 },
  { month: "Mar/26", value: 72 },
  { month: "Abr/26", value: 76 },
];

export type Alert = {
  id: string;
  type: "warning" | "error" | "info" | "success";
  title: string;
  description: string;
  when: string;
};

export const alerts: Alert[] = [
  {
    id: "a1",
    type: "warning",
    title: "Conflito potencial em Casa Itacimirim 3 quartos",
    description:
      "Sobreposição de 1 noite entre reserva Booking (#3182740) e bloqueio manual em 28/04.",
    when: daysFromNow(0).toISOString(),
  },
  {
    id: "a2",
    type: "error",
    title: "Sincronização com Booking falhou — Vila Praia do Forte Coral",
    description: "Última tentativa há 12 minutos. Credencial possivelmente expirada.",
    when: daysFromNow(0).toISOString(),
  },
  {
    id: "a3",
    type: "info",
    title: "Nova reserva direta confirmada",
    description:
      "Matthias Müller reservou Loft Pelourinho Design de 02/05 a 06/05 via link direto.",
    when: daysFromNow(0).toISOString(),
  },
  {
    id: "a4",
    type: "warning",
    title: "Limpeza ainda não agendada",
    description: "Chalé Itacimirim Mar recebe check-in amanhã às 15h — turnover não atribuído.",
    when: daysFromNow(0).toISOString(),
  },
  {
    id: "a5",
    type: "success",
    title: "Repasse de Ricardo Mendonça aprovado",
    description: "R$ 18.420 programados para PIX em 05/05.",
    when: daysFromNow(-1).toISOString(),
  },
];

// Aggregated KPIs for the dashboard header
export const kpis = {
  occupancy: 81.4,
  occupancyDelta: 4.2,
  grossRevenue: 487_320,
  grossRevenueDelta: 12.8,
  netOwners: 312_840,
  netOwnersDelta: 9.6,
  managementFee: 89_420,
  managementFeeDelta: 14.1,
  adr: 612,
  adrDelta: 3.1,
  revpar: 498,
  revparDelta: 7.4,
  avgStay: 4.3,
  avgStayDelta: -0.2,
  pickup7d: 18,
  pickup7dDelta: 6,
  directShare: 21,
  directShareDelta: 3.2,
};
