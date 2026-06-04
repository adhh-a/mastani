"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const lands = [
  {
    id: 1,
    name: "Lahan Sawah Produktif Boyolali",
    location: "Boyolali, Jawa Tengah",
    coords: "7.5295° S, 110.5986° E",
    area: 2500,
    price: 1200000,
    priceUnit: "/bulan",
    type: "Sawah",
    soil: "Tanah Liat",
    water: "Irigasi Teknis",
    owner: "Pak Sutrisno",
    contact: "+62 812-3456-7890",
    verified: true,
    available: true,
    emoji: "🌾",
    color: "#D8F3DC",
    tags: ["Irigasi Bagus", "Akses Jalan", "Dekat Pasar"],
    desc: "Lahan sawah subur dengan sistem irigasi teknis yang baik. Cocok untuk budidaya padi, jagung, atau palawija. Lokasi strategis dekat jalan utama.",
    sertifikat: "SHM",
    minSewa: "3 bulan",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Lahan Tegalan Karanganyar",
    location: "Karanganyar, Jawa Tengah",
    coords: "7.6196° S, 111.0187° E",
    area: 1500,
    price: 800000,
    priceUnit: "/bulan",
    type: "Tegalan",
    soil: "Tanah Vulkanik",
    water: "Sumur Bor",
    owner: "Bu Siti Aminah",
    contact: "+62 813-5678-9012",
    verified: true,
    available: true,
    emoji: "🌿",
    color: "#FFF3E0",
    tags: ["Tanah Subur", "Cocok Hortikultura", "Pemandangan Bagus"],
    desc: "Lahan tegalan di lereng gunung dengan tanah vulkanik yang sangat subur. Ideal untuk sayuran dataran menengah seperti wortel, kubis, dan kentang.",
    sertifikat: "SHM",
    minSewa: "1 bulan",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Lahan Pekarangan Sleman",
    location: "Sleman, Yogyakarta",
    coords: "7.7167° S, 110.3500° E",
    area: 500,
    price: 500000,
    priceUnit: "/bulan",
    type: "Pekarangan",
    soil: "Tanah Campuran",
    water: "PDAM + Sumur",
    owner: "Pak Wahyu",
    contact: "+62 857-1234-5678",
    verified: true,
    available: true,
    emoji: "🏡",
    color: "#E0F0FF",
    tags: ["Urban Farming", "Cocok Pemula", "Akses Air Mudah"],
    desc: "Pekarangan kosong di kawasan perkotaan. Sangat cocok untuk urban farming, budidaya sayuran dalam pot, atau sistem hidroponik skala kecil.",
    sertifikat: "SHM",
    minSewa: "1 bulan",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Lahan Sawah Klaten Premium",
    location: "Klaten, Jawa Tengah",
    coords: "7.7064° S, 110.6028° E",
    area: 4000,
    price: 2000000,
    priceUnit: "/bulan",
    type: "Sawah",
    soil: "Tanah Liat Subur",
    water: "Irigasi Teknis",
    owner: "Pak Joko Widodo",
    contact: "+62 821-9876-5432",
    verified: true,
    available: false,
    emoji: "🌾",
    color: "#FFE5EC",
    tags: ["Lahan Luas", "Irigasi Premium", "Produktivitas Tinggi"],
    desc: "Lahan sawah premium dengan rekam jejak produksi tinggi. Sistem irigasi lengkap, akses traktor, dan gudang penyimpanan tersedia.",
    sertifikat: "SHM",
    minSewa: "6 bulan",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Greenhouse Siap Pakai Magelang",
    location: "Magelang, Jawa Tengah",
    coords: "7.4797° S, 110.2174° E",
    area: 800,
    price: 3500000,
    priceUnit: "/bulan",
    type: "Greenhouse",
    soil: "Media Tanam (Cocopeat)",
    water: "Sistem Otomatis",
    owner: "PT Agro Magelang",
    contact: "+62 274-567890",
    verified: true,
    available: true,
    emoji: "🏗️",
    color: "#F3E5F5",
    tags: ["Greenhouse", "Siap Pakai", "Sistem Otomatis"],
    desc: "Greenhouse modern dengan sistem irigasi otomatis, pengatur suhu, dan media tanam siap pakai. Ideal untuk produksi sayuran premium sepanjang tahun.",
    sertifikat: "HGB",
    minSewa: "3 bulan",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Lahan Perkebunan Wonosobo",
    location: "Wonosobo, Jawa Tengah",
    coords: "7.3615° S, 109.9063° E",
    area: 8000,
    price: 3000000,
    priceUnit: "/bulan",
    type: "Perkebunan",
    soil: "Tanah Andosol",
    water: "Sumber Mata Air",
    owner: "Pak Haryanto",
    contact: "+62 833-4567-8901",
    verified: false,
    available: true,
    emoji: "🌄",
    color: "#E8F5E9",
    tags: ["Dataran Tinggi", "Sayuran Premium", "Lahan Luas"],
    desc: "Lahan perkebunan di dataran tinggi Wonosobo (1.800 mdpl). Cocok untuk carica, kopi, teh, dan sayuran dataran tinggi berkualitas ekspor.",
    sertifikat: "Girik",
    minSewa: "6 bulan",
    rating: 4.5,
  },
];

export default function TaniLeasePage() {
  const router = useRouter();
  const [filter, setFilter] = useState("Semua");
  const [selected, setSelected] = useState(null);

  const filters = ["Semua", "Tersedia", "Sawah", "Tegalan", "Greenhouse", "Pekarangan"];

  const filtered = lands.filter((l) => {
    if (filter === "Semua") return true;
    if (filter === "Tersedia") return l.available;
    return l.type.toLowerCase().includes(filter.toLowerCase());
  });

  const fmtPrice = (p) => `Rp ${p.toLocaleString("id-ID")}`;
  const fmtArea = (a) => a >= 10000 ? `${(a/10000).toFixed(1)} Ha` : `${a.toLocaleString("id-ID")} m²`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,500;0,700;0,900;1,300;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --forest: #1B4332; --sage: #2D6A4F; --mint: #52B788;
          --cream: #F8F4EE; --parchment: #EFE9DF; --sand: #D4C9B8;
          --ink: #1A1A1A; --muted: #6B6560; --white: #FFFFFF;
          --accent: #E76F51; --radius: 20px;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--cream); color: var(--ink); font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 1.6; overflow-x: hidden; }

        .topbar { position: sticky; top: 0; z-index: 100; background: rgba(248,244,238,0.95); backdrop-filter: blur(16px); border-bottom: 1px solid var(--sand); }
        .topbar-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 12px; height: 60px; }
        .back-btn { display: flex; align-items: center; gap: 6px; background: var(--parchment); border: none; border-radius: 100px; padding: 8px 14px; font-size: 13px; font-weight: 600; color: var(--forest); cursor: pointer; transition: all 0.2s; }
        .back-btn:hover { background: var(--sand); }
        .topbar-title { font-family: 'Fraunces', serif; font-weight: 700; font-size: 17px; color: var(--forest); }
        .topbar-badge { background: #B5838D; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px; }

        .page { max-width: 1100px; margin: 0 auto; padding: 28px 24px 60px; }

        .hero-strip { background: linear-gradient(135deg, #B5838D, #8B5E66); border-radius: 20px; padding: 32px; margin-bottom: 28px; display: flex; align-items: center; gap: 20px; }
        .hero-strip-icon { font-size: 48px; flex-shrink: 0; }
        .hero-strip-text h1 { font-family: 'Fraunces', serif; font-size: clamp(22px,4vw,32px); font-weight: 700; color: white; margin-bottom: 6px; }
        .hero-strip-text p { font-size: 14px; color: rgba(255,255,255,0.75); line-height: 1.6; }
        .hero-strip-stats { display: flex; gap: 20px; margin-top: 14px; flex-wrap: wrap; }
        .hstat-num { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: #FFB3C1; }
        .hstat-label { font-size: 10px; color: rgba(255,255,255,0.6); }

        .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .filter-btn { padding: 7px 14px; border-radius: 100px; font-size: 12px; font-weight: 600; border: 1.5px solid var(--sand); background: white; cursor: pointer; transition: all 0.2s; color: var(--muted); }
        .filter-btn.active { border-color: #B5838D; background: #B5838D; color: white; }
        .filter-btn:hover:not(.active) { border-color: #B5838D; color: #8B5E66; }

        .land-grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 640px) { .land-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 900px) { .land-grid { grid-template-columns: repeat(3,1fr); } }

        .land-card { background: white; border: 1.5px solid var(--sand); border-radius: 18px; overflow: hidden; cursor: pointer; transition: all 0.25s; }
        .land-card:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(0,0,0,0.1); border-color: #B5838D; }
        .land-card-hero { height: 100px; display: flex; align-items: center; justify-content: center; font-size: 48px; position: relative; }
        .land-avail { position: absolute; top: 10px; right: 10px; font-size: 9px; font-weight: 700; padding: 3px 8px; border-radius: 100px; }
        .land-verified { position: absolute; top: 10px; left: 10px; font-size: 9px; font-weight: 700; padding: 3px 8px; border-radius: 100px; background: rgba(27,67,50,0.85); color: white; }
        .avail-on { background: rgba(82,183,136,0.85); color: white; }
        .avail-off { background: rgba(0,0,0,0.5); color: white; }
        .land-body { padding: 16px; }
        .land-name { font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
        .land-loc { font-size: 11px; color: var(--muted); margin-bottom: 8px; }
        .land-specs { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 10px; }
        .land-spec { background: var(--cream); border-radius: 8px; padding: 6px 8px; }
        .land-spec-label { font-size: 9px; color: var(--muted); font-weight: 600; text-transform: uppercase; }
        .land-spec-val { font-size: 12px; font-weight: 700; color: var(--ink); }
        .land-tags { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 12px; }
        .land-tag { font-size: 9px; font-weight: 600; padding: 2px 7px; border-radius: 100px; background: #FFE5EC; color: #8B5E66; }
        .land-footer { display: flex; align-items: center; justify-content: space-between; }
        .land-price { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; color: var(--forest); }
        .land-price-unit { font-size: 10px; color: var(--muted); font-weight: 400; }
        .sewa-btn { background: #B5838D; color: white; border: none; border-radius: 100px; padding: 9px 18px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .sewa-btn:hover { background: #8B5E66; }
        .sewa-btn.disabled { background: var(--sand); color: var(--muted); cursor: not-allowed; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal { background: white; border-radius: 24px; padding: 28px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; }
        .modal-close-btn { background: var(--parchment); border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
        .modal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .modal-ttl { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: var(--forest); }
        .detail-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--parchment); font-size: 13px; }
        .detail-icon { font-size: 18px; width: 28px; flex-shrink: 0; }
        .detail-label { color: var(--muted); font-size: 11px; }
        .detail-val { color: var(--ink); font-weight: 600; }
        .confirm-btn { width: 100%; padding: 14px; border: none; border-radius: 12px; background: #B5838D; color: white; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; margin-top: 16px; transition: all 0.2s; }
        .confirm-btn:hover { background: #8B5E66; }
        .contact-card { background: var(--cream); border-radius: 12px; padding: 14px; margin-top: 12px; }
        .contact-owner { font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
        .contact-num { font-size: 14px; font-weight: 700; color: #B5838D; }
      `}</style>

      <div className="topbar">
        <div className="topbar-inner">
          <button className="back-btn" onClick={() => router.push("/")}>← Kembali</button>
          <span className="topbar-title">🗺️ TaniLease</span>
          <span className="topbar-badge">{lands.filter(l=>l.available).length} Tersedia</span>
        </div>
      </div>

      <div className="page">
        <div className="hero-strip">
          <div className="hero-strip-icon">🗺️</div>
          <div className="hero-strip-text">
            <h1>Cari & Sewa Lahan</h1>
            <p>Temukan lahan tidur di sekitarmu. Transparan, terverifikasi, dan aman dengan sistem kontrak digital.</p>
            <div className="hero-strip-stats">
              {[["6+","Lahan Aktif"],["Jateng & DIY","Cakupan Area"],["100%","Kontrak Digital"],["Escrow","Pembayaran Aman"]].map(([n,l]) => (
                <div key={l}><div className="hstat-num">{n}</div><div className="hstat-label">{l}</div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-row">
          {filters.map(f => (
            <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>

        <div className="land-grid">
          {filtered.map((l) => (
            <div key={l.id} className="land-card" onClick={() => setSelected(l)}>
              <div className="land-card-hero" style={{ background: l.color }}>
                <span>{l.emoji}</span>
                <span className={`land-avail ${l.available ? "avail-on" : "avail-off"}`}>
                  {l.available ? "✓ Tersedia" : "✗ Disewa"}
                </span>
                {l.verified && <span className="land-verified">✓ Terverifikasi</span>}
              </div>
              <div className="land-body">
                <div className="land-name">{l.name}</div>
                <div className="land-loc">📍 {l.location}</div>
                <div className="land-specs">
                  <div className="land-spec">
                    <div className="land-spec-label">Luas</div>
                    <div className="land-spec-val">{fmtArea(l.area)}</div>
                  </div>
                  <div className="land-spec">
                    <div className="land-spec-label">Tipe</div>
                    <div className="land-spec-val">{l.type}</div>
                  </div>
                  <div className="land-spec">
                    <div className="land-spec-label">Tanah</div>
                    <div className="land-spec-val">{l.soil}</div>
                  </div>
                  <div className="land-spec">
                    <div className="land-spec-label">Air</div>
                    <div className="land-spec-val">{l.water}</div>
                  </div>
                </div>
                <div className="land-tags">
                  {l.tags.map(t => <span key={t} className="land-tag">{t}</span>)}
                </div>
                <div className="land-footer">
                  <div>
                    <span className="land-price">{fmtPrice(l.price)}</span>
                    <span className="land-price-unit"> {l.priceUnit}</span>
                  </div>
                  <button
                    className={`sewa-btn ${!l.available ? "disabled" : ""}`}
                    onClick={e => { e.stopPropagation(); if (l.available) setSelected(l); }}
                  >
                    {l.available ? "Sewa Lahan" : "Lihat Detail"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <LandModal land={selected} onClose={() => setSelected(null)} fmtPrice={fmtPrice} fmtArea={fmtArea} />
      )}
    </>
  );
}

function LandModal({ land, onClose, fmtPrice, fmtArea }) {
  const [done, setDone] = useState(false);
  if (done) return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{textAlign:"center"}}>
        <div style={{fontSize:56,marginBottom:16}}>📋</div>
        <h2 style={{fontFamily:"Fraunces,serif",fontSize:22,color:"var(--forest)",marginBottom:8}}>Permintaan Dikirim!</h2>
        <p style={{fontSize:14,color:"var(--muted)",marginBottom:20}}>Permintaan sewa <strong>{land.name}</strong> telah dikirim ke pemilik lahan. Tim kami akan menghubungi kamu dalam 1×24 jam.</p>
        <button className="confirm-btn" onClick={onClose}>Tutup</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-head">
          <h3 className="modal-ttl">Detail Lahan</h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        <div style={{fontSize:48,textAlign:"center",background:land.color,borderRadius:14,padding:20,marginBottom:16}}>{land.emoji}</div>
        <p style={{fontFamily:"Fraunces,serif",fontSize:17,fontWeight:700,color:"var(--forest)",marginBottom:4}}>{land.name}</p>
        <p style={{fontSize:12,color:"var(--muted)",marginBottom:12}}>📍 {land.location} · {land.coords}</p>
        {[
          ["📐","Luas Lahan", fmtArea(land.area)],
          ["🌱","Tipe Lahan", land.type],
          ["🪨","Jenis Tanah", land.soil],
          ["💧","Sumber Air", land.water],
          ["📄","Sertifikat", land.sertifikat],
          ["📅","Minimum Sewa", land.minSewa],
          ["💰","Harga Sewa", `${fmtPrice(land.price)}${land.priceUnit}`],
        ].map(([icon,label,val]) => (
          <div key={label} className="detail-row">
            <span className="detail-icon">{icon}</span>
            <div style={{flex:1}}><div className="detail-label">{label}</div><div className="detail-val">{val}</div></div>
          </div>
        ))}
        <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.6,marginTop:12,marginBottom:4}}>{land.desc}</p>
        <div className="contact-card">
          <div className="contact-owner">Pemilik: {land.owner}</div>
          <div className="contact-num">📱 {land.contact}</div>
          {!land.verified && <div style={{fontSize:11,color:"#A87000",marginTop:4}}>⚠️ Sertifikat belum terverifikasi penuh</div>}
        </div>
        {land.available
          ? <button className="confirm-btn" onClick={() => setDone(true)}>Ajukan Permintaan Sewa →</button>
          : <button className="confirm-btn" style={{background:"var(--sand)",color:"var(--muted)",cursor:"not-allowed"}}>Lahan Sedang Disewa</button>
        }
      </div>
    </div>
  );
}