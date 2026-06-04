"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const mentors = [
  {
    id: 1,
    name: "Dr. Sari Wulandari",
    title: "Ahli Hortikultura & Hidroponik",
    university: "Universitas Gadjah Mada",
    avatar: "👩‍🔬",
    avatarBg: "#D8F3DC",
    rating: 4.9,
    reviews: 128,
    sessions: 340,
    price: "Rp 75.000/sesi",
    tags: ["Hidroponik", "Sayuran", "Pemula-friendly"],
    bio: "Peneliti hortikultura dengan pengalaman 12 tahun. Spesialis sistem tanam tanpa tanah dan budidaya sayuran organik di lahan terbatas.",
    available: true,
    nextSlot: "Hari ini, 14.00",
    specialties: ["Selada", "Kangkung", "Pakcoy", "Bayam"],
  },
  {
    id: 2,
    name: "Bapak Hendra Kusuma",
    title: "Praktisi Agribisnis & Pemasaran",
    university: "Penyuluh Pertanian Bersertifikat",
    avatar: "👨‍🌾",
    avatarBg: "#FFF3E0",
    rating: 4.8,
    reviews: 95,
    sessions: 210,
    price: "Rp 60.000/sesi",
    tags: ["Agribisnis", "Pemasaran", "Analisis Pasar"],
    bio: "15 tahun pengalaman di bidang distribusi hasil tani. Membantu petani muda memahami rantai pasok dan strategi penjualan yang efektif.",
    available: true,
    nextSlot: "Besok, 09.00",
    specialties: ["Cabai", "Tomat", "Bawang Merah"],
  },
  {
    id: 3,
    name: "Ibu Dewi Rahayu, M.Sc.",
    title: "Spesialis Pertanian Organik",
    university: "Institut Pertanian Bogor",
    avatar: "👩‍🏫",
    avatarBg: "#E8F4FD",
    rating: 4.9,
    reviews: 203,
    sessions: 520,
    price: "Rp 85.000/sesi",
    tags: ["Organik", "Sertifikasi", "Premium"],
    bio: "Pakar pertanian organik bersertifikat internasional. Memandu proses sertifikasi organik dan transisi dari pertanian konvensional.",
    available: false,
    nextSlot: "Senin, 10.00",
    specialties: ["Sayuran Organik", "Kompos", "Pestisida Nabati"],
  },
  {
    id: 4,
    name: "Pak Rudi Santoso",
    title: "Ahli Irigasi & Manajemen Air",
    university: "Universitas Brawijaya",
    avatar: "👨‍💻",
    avatarBg: "#F3E5F5",
    rating: 4.7,
    reviews: 74,
    sessions: 155,
    price: "Rp 70.000/sesi",
    tags: ["Irigasi", "Drip System", "Efisiensi Air"],
    bio: "Insinyur pertanian yang berfokus pada sistem irigasi hemat air. Membantu petani mengurangi penggunaan air hingga 60% tanpa mengurangi hasil.",
    available: true,
    nextSlot: "Hari ini, 16.00",
    specialties: ["Drip Irrigation", "Sprinkler", "Fertigasi"],
  },
  {
    id: 5,
    name: "Ibu Anita Permatasari",
    title: "Konsultan Pertanian Vertikal",
    university: "Universitas Diponegoro",
    avatar: "👩‍🔬",
    avatarBg: "#FFF9C4",
    rating: 4.8,
    reviews: 112,
    sessions: 280,
    price: "Rp 80.000/sesi",
    tags: ["Urban Farming", "Vertikal", "Lahan Sempit"],
    bio: "Spesialis pertanian perkotaan dan sistem tanam vertikal. Cocok untuk yang ingin berkebun di rumah, apartemen, atau lahan kecil.",
    available: true,
    nextSlot: "Besok, 13.00",
    specialties: ["Vertical Garden", "Pot Gantung", "Rooftop Farm"],
  },
  {
    id: 6,
    name: "Dr. Bambang Wahyudi",
    title: "Ahli Tanah & Pemupukan",
    university: "Universitas Sebelas Maret",
    avatar: "👨‍🏫",
    avatarBg: "#E8F5E9",
    rating: 4.6,
    reviews: 58,
    sessions: 120,
    price: "Rp 65.000/sesi",
    tags: ["Tanah", "Pupuk", "Analisis Lahan"],
    bio: "Doktor ilmu tanah dengan keahlian khusus analisis kesuburan lahan dan rekomendasi pemupukan berbasis uji tanah.",
    available: false,
    nextSlot: "Rabu, 09.00",
    specialties: ["Uji Tanah", "Pupuk Organik", "pH Tanah"],
  },
];

const SHARED_STYLES = `
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
`;

export default function TaniMentorPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("Semua");
  const [selectedMentor, setSelectedMentor] = useState(null);

  const filters = ["Semua", "Tersedia Sekarang", "Hidroponik", "Organik", "Agribisnis", "Urban Farming"];

  const filtered = mentors.filter((m) => {
    if (filter === "Semua") return true;
    if (filter === "Tersedia Sekarang") return m.available;
    return m.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()));
  });

  return (
    <>
      <style>{`
        ${SHARED_STYLES}

        .topbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(248,244,238,0.95); backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--sand);
        }
        .topbar-inner {
          max-width: 1100px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center; gap: 12px; height: 60px;
        }
        .back-btn {
          display: flex; align-items: center; gap: 6px;
          background: var(--parchment); border: none; border-radius: 100px;
          padding: 8px 14px; font-size: 13px; font-weight: 600; color: var(--forest);
          cursor: pointer; transition: all 0.2s;
        }
        .back-btn:hover { background: var(--sand); }
        .topbar-title { font-family: 'Fraunces', serif; font-weight: 700; font-size: 17px; color: var(--forest); }
        .topbar-badge { background: var(--forest); color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px; }

        .page { max-width: 1100px; margin: 0 auto; padding: 28px 24px 60px; }

        .hero-strip {
          background: linear-gradient(135deg, #1B4332, #2D6A4F);
          border-radius: 20px; padding: 32px; margin-bottom: 28px;
          display: flex; align-items: center; gap: 20px;
        }
        .hero-strip-icon { font-size: 48px; flex-shrink: 0; }
        .hero-strip-text h1 { font-family: 'Fraunces', serif; font-size: clamp(22px,4vw,32px); font-weight: 700; color: white; margin-bottom: 6px; }
        .hero-strip-text p { font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.6; }
        .hero-strip-stats { display: flex; gap: 20px; margin-top: 14px; flex-wrap: wrap; }
        .hstat { text-align: center; }
        .hstat-num { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: #95D5B2; }
        .hstat-label { font-size: 10px; color: rgba(255,255,255,0.6); }

        .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .filter-btn {
          padding: 7px 14px; border-radius: 100px; font-size: 12px; font-weight: 600;
          border: 1.5px solid var(--sand); background: white; cursor: pointer;
          transition: all 0.2s; color: var(--muted);
        }
        .filter-btn.active { border-color: var(--sage); background: var(--sage); color: white; }
        .filter-btn:hover:not(.active) { border-color: var(--mint); color: var(--forest); }

        .mentor-grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 640px) { .mentor-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 900px) { .mentor-grid { grid-template-columns: repeat(3,1fr); } }

        .mentor-card {
          background: white; border: 1.5px solid var(--sand); border-radius: 18px;
          padding: 20px; cursor: pointer; transition: all 0.25s; position: relative;
        }
        .mentor-card:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(27,67,50,0.1); border-color: var(--mint); }
        .mentor-card-top { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 12px; }
        .mentor-avatar { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0; }
        .mentor-name { font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 2px; }
        .mentor-title { font-size: 11px; color: var(--sage); font-weight: 600; margin-bottom: 2px; }
        .mentor-uni { font-size: 10px; color: var(--muted); }
        .avail-badge {
          position: absolute; top: 14px; right: 14px;
          font-size: 9px; font-weight: 700; padding: 3px 8px; border-radius: 100px;
        }
        .avail-on { background: rgba(82,183,136,0.12); color: var(--sage); }
        .avail-off { background: rgba(0,0,0,0.05); color: var(--muted); }
        .mentor-bio { font-size: 12px; color: var(--muted); line-height: 1.6; margin-bottom: 12px; }
        .mentor-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
        .mentor-tag { font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 100px; background: var(--parchment); color: var(--ink); }
        .mentor-stats { display: flex; gap: 14px; margin-bottom: 14px; }
        .mstat { display: flex; flex-direction: column; }
        .mstat-val { font-size: 13px; font-weight: 700; color: var(--forest); }
        .mstat-lbl { font-size: 9px; color: var(--muted); }
        .mentor-footer { display: flex; align-items: center; justify-content: space-between; }
        .mentor-price { font-size: 13px; font-weight: 700; color: var(--ink); }
        .mentor-next { font-size: 10px; color: var(--muted); margin-top: 2px; }
        .book-btn {
          background: var(--forest); color: white; border: none; border-radius: 100px;
          padding: 9px 18px; font-size: 12px; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .book-btn:hover { background: var(--sage); }
        .book-btn.disabled { background: var(--sand); color: var(--muted); cursor: not-allowed; }
        .stars { color: #F4A836; font-size: 11px; }

        /* MODAL */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
          z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .modal {
          background: white; border-radius: 24px; padding: 28px; max-width: 480px; width: 100%;
          max-height: 90vh; overflow-y: auto;
        }
        .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .modal-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: var(--forest); }
        .modal-close { background: var(--parchment); border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
        .modal-avatar { width: 72px; height: 72px; border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 36px; margin: 0 auto 14px; }
        .slot-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin: 12px 0 20px; }
        .slot-btn {
          padding: 8px 4px; border-radius: 10px; border: 1.5px solid var(--sand); background: white;
          font-size: 11px; font-weight: 600; cursor: pointer; color: var(--ink); text-align: center;
          transition: all 0.2s;
        }
        .slot-btn:hover, .slot-btn.picked { border-color: var(--mint); background: rgba(82,183,136,0.08); color: var(--forest); }
        .modal-book-btn {
          width: 100%; padding: 14px; border: none; border-radius: 12px;
          background: var(--forest); color: white; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s;
        }
        .modal-book-btn:hover { background: var(--sage); }
      `}</style>

      <div className="topbar">
        <div className="topbar-inner">
          <button className="back-btn" onClick={() => router.push("/")}>← Kembali</button>
          <span className="topbar-title">👨‍🏫 TaniMentor</span>
          <span className="topbar-badge">{mentors.filter(m=>m.available).length} Online</span>
        </div>
      </div>

      <div className="page">
        <div className="hero-strip">
          <div className="hero-strip-icon">👨‍🏫</div>
          <div className="hero-strip-text">
            <h1>Temukan Mentor Tanimu</h1>
            <p>Terhubung langsung dengan ahli, akademisi, dan praktisi pertanian bersertifikat.</p>
            <div className="hero-strip-stats">
              {[["6+","Mentor Aktif"],["4.8★","Rata-rata Rating"],["1.600+","Sesi Selesai"],["100%","Terverifikasi"]].map(([n,l]) => (
                <div key={l} className="hstat"><div className="hstat-num">{n}</div><div className="hstat-label">{l}</div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-row">
          {filters.map(f => (
            <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>

        <div className="mentor-grid">
          {filtered.map((m) => (
            <div key={m.id} className="mentor-card" onClick={() => setSelectedMentor(m)}>
              <span className={`avail-badge ${m.available ? "avail-on" : "avail-off"}`}>
                {m.available ? "● Online" : "○ Offline"}
              </span>
              <div className="mentor-card-top">
                <div className="mentor-avatar" style={{ background: m.avatarBg }}>{m.avatar}</div>
                <div>
                  <div className="mentor-name">{m.name}</div>
                  <div className="mentor-title">{m.title}</div>
                  <div className="mentor-uni">{m.university}</div>
                </div>
              </div>
              <p className="mentor-bio">{m.bio}</p>
              <div className="mentor-tags">
                {m.tags.map(t => <span key={t} className="mentor-tag">{t}</span>)}
              </div>
              <div className="mentor-stats">
                <div className="mstat"><div className="mstat-val"><span className="stars">★</span> {m.rating}</div><div className="mstat-lbl">{m.reviews} ulasan</div></div>
                <div className="mstat"><div className="mstat-val">{m.sessions}</div><div className="mstat-lbl">sesi</div></div>
              </div>
              <div className="mentor-footer">
                <div>
                  <div className="mentor-price">{m.price}</div>
                  <div className="mentor-next">Slot: {m.nextSlot}</div>
                </div>
                <button
                  className={`book-btn ${!m.available ? "disabled" : ""}`}
                  onClick={(e) => { e.stopPropagation(); if (m.available) setSelectedMentor(m); }}
                >
                  {m.available ? "Konsultasi" : "Lihat Jadwal"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Booking */}
      {selectedMentor && (
        <BookingModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
      )}
    </>
  );
}

function BookingModal({ mentor, onClose }) {
  const [picked, setPicked] = useState(null);
  const [booked, setBooked] = useState(false);

  const slots = ["Hari ini 13.00","Hari ini 15.00","Hari ini 17.00","Besok 09.00","Besok 11.00","Besok 14.00","Besok 16.00","Rabu 09.00","Rabu 13.00"];

  if (booked) return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 22, color: "var(--forest)", marginBottom: 8 }}>Booking Berhasil!</h2>
        <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}>Sesi konsultasi dengan <strong>{mentor.name}</strong> pada <strong>{picked}</strong> telah dikonfirmasi. Cek email kamu untuk detail link video call.</p>
        <button className="modal-book-btn" onClick={onClose}>Tutup</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Booking Sesi</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-avatar" style={{ background: mentor.avatarBg }}>{mentor.avatar}</div>
        <p style={{ textAlign: "center", fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>{mentor.name}</p>
        <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>{mentor.title}</p>
        <p style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "var(--forest)", marginBottom: 16 }}>{mentor.price}</p>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>Pilih Slot Waktu</p>
        <div className="slot-grid">
          {slots.map(s => (
            <button key={s} className={`slot-btn ${picked === s ? "picked" : ""}`} onClick={() => setPicked(s)}>{s}</button>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 16 }}>Spesialisasi: {mentor.specialties.join(", ")}</p>
        <button className="modal-book-btn" onClick={() => picked && setBooked(true)} style={{ opacity: picked ? 1 : 0.5 }}>
          {picked ? `Konfirmasi — ${picked}` : "Pilih Waktu Terlebih Dahulu"}
        </button>
      </div>
    </div>
  );
}