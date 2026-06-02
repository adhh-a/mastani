"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ─── DATA ────────────────────────────────────────────────────────────────────

const chartData = {
  Minggu: [
    { label: "Sen", selada: 72, tomat: 58, cabai: 44 },
    { label: "Sel", selada: 80, tomat: 62, cabai: 40 },
    { label: "Rab", selada: 75, tomat: 70, cabai: 42 },
    { label: "Kam", selada: 88, tomat: 65, cabai: 38 },
    { label: "Jum", selada: 92, tomat: 74, cabai: 36 },
    { label: "Sab", selada: 85, tomat: 78, cabai: 35 },
    { label: "Min", selada: 95, tomat: 80, cabai: 33 },
  ],
  Bulan: [
    { label: "Jan", selada: 60, tomat: 50, cabai: 55 },
    { label: "Feb", selada: 65, tomat: 55, cabai: 50 },
    { label: "Mar", selada: 70, tomat: 60, cabai: 48 },
    { label: "Apr", selada: 78, tomat: 65, cabai: 45 },
    { label: "Mei", selada: 82, tomat: 70, cabai: 42 },
    { label: "Jun", selada: 88, tomat: 75, cabai: 38 },
    { label: "Jul", selada: 95, tomat: 80, cabai: 33 },
  ],
  Tahun: [
    { label: "2019", selada: 45, tomat: 40, cabai: 60 },
    { label: "2020", selada: 50, tomat: 45, cabai: 58 },
    { label: "2021", selada: 58, tomat: 52, cabai: 54 },
    { label: "2022", selada: 65, tomat: 60, cabai: 50 },
    { label: "2023", selada: 75, tomat: 68, cabai: 44 },
    { label: "2024", selada: 88, tomat: 75, cabai: 38 },
    { label: "2025", selada: 95, tomat: 80, cabai: 33 },
  ],
};

const commodities = [
  { emoji: "🥬", name: "Selada", change: "+18%", up: true, price: "Rp 12.500/kg" },
  { emoji: "🍅", name: "Tomat", change: "+12%", up: true, price: "Rp 8.200/kg" },
  { emoji: "🌶", name: "Cabai", change: "-5%", up: false, price: "Rp 35.000/kg" },
];

const potential = [
  { rank: 1, emoji: "🥬", name: "Selada", level: "Potensi Tinggi", badgeClass: "badge-high", barWidth: "100%" },
  { rank: 2, emoji: "🍅", name: "Tomat", level: "Potensi Sedang", badgeClass: "badge-mid", barWidth: "66%" },
  { rank: 3, emoji: "🌶", name: "Cabai", level: "Potensi Rendah", badgeClass: "badge-low", barWidth: "33%" },
];

const timeline = [
  { icon: "📚", label: "Belajar", desc: "Ikuti modul & mentor" },
  { icon: "🗺️", label: "Cari Lahan", desc: "Temukan lahan terdekat" },
  { icon: "🌱", label: "Beli Bibit", desc: "Marketplace sarana tani" },
  { icon: "🚜", label: "Tanam", desc: "Panduan tanam step-by-step" },
  { icon: "👨‍🌾", label: "Konsultasi", desc: "Tanya mentor kapan saja" },
  { icon: "🌾", label: "Panen", desc: "Pantau jadwal panen" },
  { icon: "💰", label: "Jual Hasil", desc: "Hubungkan ke pembeli" },
];

const products = [
  {
    id: "tani-mentor",
    icon: "👨‍🏫",
    name: "TaniMentor",
    tagline: "Konsultasi & Pendampingan Ahli",
    desc: "Terhubung langsung dengan ahli, akademisi, dan praktisi pertanian. Dapatkan pendampingan mulai dari perencanaan usaha tani, teknik budidaya, hingga penanganan masalah selama masa tanam.",
    color: "#2D6A4F",
    lightColor: "#D8F3DC",
    features: ["Konsultasi video call 1-on-1", "Chat teks langsung dengan mentor", "Panduan teknis budidaya", "Mentor bersertifikat & terverifikasi"],
  },
  {
    id: "tani-lease",
    icon: "🗺️",
    name: "TaniLease",
    tagline: "Akses Lahan Mudah & Transparan",
    desc: "Temukan dan sewa lahan tidur di sekitarmu. Sistem sewa digital yang transparan, terdokumentasi, dan aman — menghubungkan petani muda dengan pemilik lahan.",
    color: "#B5838D",
    lightColor: "#FFE5EC",
    features: ["Peta lahan real-time", "Kontrak sewa digital", "Verifikasi kepemilikan lahan", "Sistem escrow pembayaran"],
  },
  {
    id: "tani-mart",
    icon: "🛒",
    name: "TaniMart",
    tagline: "Marketplace Sarana Pertanian",
    desc: "Beli bibit, pupuk, alat pertanian, dan kebutuhan budidaya dari mitra terpercaya. Harga transparan, kualitas terjamin, pengiriman ke seluruh Indonesia.",
    color: "#E76F51",
    lightColor: "#FFF0EB",
    features: ["Bibit & benih berkualitas", "Pupuk organik & kimia", "Alat dan mesin tani", "Garansi produk asli"],
  },
  {
    id: "smartcrop",
    icon: "📊",
    name: "SmartCrop Insight",
    tagline: "Analisis Pasar Berbasis Data",
    desc: "Ambil keputusan tani yang lebih cerdas. Fitur analitik bertenaga data memberikan rekomendasi komoditas, tren harga pasar, dan peluang usaha sebelum kamu menanam.",
    color: "#457B9D",
    lightColor: "#E0F0FF",
    features: ["Rekomendasi komoditas AI", "Grafik harga real-time", "Analisis risiko pasar", "Laporan tren mingguan"],
  },
];

const teamMembers = [
  { name: "Anisa Rahmawati", role: "Chief Executive Officer", emoji: "👩‍💼", bg: "#D8F3DC" },
  { name: "Budi Santoso", role: "Chief Technology Officer", emoji: "👨‍💻", bg: "#E0F0FF" },
  { name: "Citra Dewi", role: "Chief Marketing Officer", emoji: "👩‍🎨", bg: "#FFE5EC" },
  { name: "Dimas Prayoga", role: "Partnership & Community Manager", emoji: "🤝", bg: "#FFF0EB" },
];

const milestones = [
  { year: "2023", label: "Ideasi & Riset", desc: "Riset mendalam tentang tantangan petani muda Indonesia." },
  { year: "2024", label: "Pengembangan MVP", desc: "Membangun prototipe platform dengan fitur inti TaniMentor & SmartCrop." },
  { year: "2025", label: "Peluncuran Beta", desc: "Uji coba terbatas dengan 100 pengguna awal di Pulau Jawa." },
  { year: "2026", label: "Ekspansi Nasional", desc: "Target 15.000 pengguna aktif dan ekspansi ke luar Jawa." },
  { year: "2032", label: "Visi Besar", desc: "Menjangkau 100.000 petani muda aktif di seluruh Indonesia." },
];

const faqs = [
  {
    q: "Apakah MasTani gratis untuk digunakan?",
    a: "MasTani menggunakan model freemium. Fitur dasar seperti browsing konten edukasi, melihat daftar lahan, dan menelusuri TaniMart dapat diakses gratis. Fitur premium seperti konsultasi lanjutan dengan mentor dan insight pasar eksklusif tersedia melalui paket berlangganan mulai Rp99.000/bulan.",
  },
  {
    q: "Bagaimana cara saya memulai bertani dengan MasTani?",
    a: "Cukup daftarkan diri kamu di aplikasi atau website MasTani. Setelah registrasi, kamu bisa langsung mengakses modul edukasi, mencari mentor, menelusuri lahan tersedia, atau melihat analisis komoditas terbaru — semua dari satu akun.",
  },
  {
    q: "Siapa saja mentor yang ada di TaniMentor?",
    a: "Mentor kami terdiri dari akademisi pertanian, praktisi agribisnis berpengalaman, dan penyuluh pertanian bersertifikat. Semua mentor melalui proses verifikasi ketat sebelum bergabung di platform untuk memastikan kualitas pendampingan yang kamu terima.",
  },
  {
    q: "Apakah TaniLease aman untuk menyewa lahan?",
    a: "Ya. TaniLease menggunakan sistem kontrak digital yang terdokumentasi, verifikasi kepemilikan lahan, dan sistem escrow pembayaran untuk memastikan transaksi sewa berlangsung transparan dan aman bagi kedua belah pihak.",
  },
  {
    q: "Apakah SmartCrop Insight akurat?",
    a: "SmartCrop Insight menggunakan data harga pasar aktual dari berbagai sumber terpercaya dan diperbarui secara berkala. Fitur ini dirancang sebagai alat bantu pengambilan keputusan, bukan jaminan hasil panen — sehingga kami selalu menyertakan konteks dan catatan risiko pada setiap rekomendasi.",
  },
  {
    q: "Di mana saja MasTani tersedia?",
    a: "Saat ini MasTani fokus melayani pengguna di Pulau Jawa sebagai tahap awal. Dalam roadmap kami, ekspansi ke seluruh Indonesia dijadwalkan seiring pertumbuhan tim dan jaringan kemitraan.",
  },
];

const navLinks = [
  { id: "beranda", label: "Beranda" },
  { id: "produk", label: "Produk" },
  { id: "tentang", label: "Tentang Kami" },
  { id: "kontak", label: "Kontak" },
  { id: "faq", label: "FAQ" },
];

const mobileNavItems = [
  { icon: "🏠", label: "Beranda", id: "beranda" },
  { icon: "🎓", label: "Produk", id: "produk" },
  { icon: "👥", label: "Tentang", id: "tentang" },
  { icon: "💬", label: "Kontak", id: "kontak" },
  { icon: "❓", label: "FAQ", id: "faq" },
];

// ─── BAR CHART ────────────────────────────────────────────────────────────────

function BarChart({ data }) {
  return (
    <div className="bar-chart-wrap">
      {data.map((d) => (
        <div key={d.label} className="bar-group">
          <div className="bars">
            {(["selada", "tomat", "cabai"]).map((key) => (
              <div
                key={key}
                className={`bar bar-${key}`}
                style={{ height: `${d[key]}%` }}
              />
            ))}
          </div>
          <span className="bar-label">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="faq-q">
        <span>{q}</span>
        <span className="faq-arrow">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeTab, setActiveTab] = useState("Minggu");
  const [activeSection, setActiveSection] = useState("beranda");
  const [activeProd, setActiveProd] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,500;0,700;0,900;1,300;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --forest: #1B4332;
          --sage: #2D6A4F;
          --mint: #52B788;
          --cream: #F8F4EE;
          --parchment: #EFE9DF;
          --sand: #D4C9B8;
          --ink: #1A1A1A;
          --muted: #6B6560;
          --white: #FFFFFF;
          --accent: #E76F51;
          --radius: 20px;
          --radius-sm: 12px;
        }
        html { scroll-behavior: smooth; }
        body {
          background: var(--cream);
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.6;
          overflow-x: hidden;
        }

        /* ── DESKTOP NAV ── */
        .desktop-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(248,244,238,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--sand);
        }
        .desktop-nav-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
          height: 68px;
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-logo-mark {
          width: 38px; height: 38px; background: var(--forest);
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .nav-logo-text { font-family: 'Fraunces', serif; font-weight: 700; font-size: 20px; color: var(--forest); }
        .nav-links { display: flex; align-items: center; gap: 4px; }
        .nav-link {
          padding: 8px 16px; border-radius: 100px; font-size: 14px; font-weight: 500;
          color: var(--muted); cursor: pointer; border: none; background: none;
          transition: all 0.2s;
        }
        .nav-link:hover { color: var(--forest); background: var(--parchment); }
        .nav-link.active { color: var(--forest); background: var(--parchment); font-weight: 600; }
        .nav-cta {
          background: var(--forest); color: var(--white);
          border: none; border-radius: 100px; padding: 10px 24px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
        }
        .nav-cta:hover { background: var(--sage); transform: translateY(-1px); }

        @media (max-width: 768px) { .desktop-nav { display: none; } }

        /* ── MOBILE HEADER ── */
        .mobile-header {
          display: none; position: sticky; top: 0; z-index: 100;
          background: rgba(248,244,238,0.95); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--sand); padding: 12px 16px;
          align-items: center; justify-content: space-between;
        }
        @media (max-width: 768px) { .mobile-header { display: flex; } }
        .mobile-logo { font-family: 'Fraunces', serif; font-weight: 700; font-size: 18px; color: var(--forest); }
        .mobile-header-right { display: flex; align-items: center; gap: 8px; }
        .icon-btn {
          width: 36px; height: 36px; border-radius: 50%; border: none;
          background: var(--parchment); cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-size: 16px; position: relative;
        }
        .notif-dot {
          position: absolute; top: 6px; right: 6px; width: 7px; height: 7px;
          background: var(--accent); border-radius: 50%; border: 1.5px solid var(--cream);
        }
        .avatar-btn {
          width: 36px; height: 36px; border-radius: 50%; background: var(--forest);
          border: none; cursor: pointer; color: white; font-weight: 700; font-size: 13px;
        }

        /* ── LAYOUT ── */
        .page { max-width: 1200px; margin: 0 auto; padding: 0 20px 120px; }
        @media (min-width: 769px) { .page { padding: 0 40px 80px; } }
        section { padding-top: 60px; }

        /* ── SECTION LABEL ── */
        .section-label {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--sage); background: rgba(82,183,136,0.12);
          padding: 5px 12px; border-radius: 100px; margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Fraunces', serif; font-size: clamp(28px, 5vw, 48px);
          font-weight: 700; line-height: 1.15; color: var(--forest);
        }
        .section-sub { color: var(--muted); font-size: 15px; margin-top: 8px; max-width: 540px; line-height: 1.7; }

        /* ═══════════════════════════════════════════
           BERANDA SECTION
        ═══════════════════════════════════════════ */

        /* Hero */
        .hero {
          position: relative; border-radius: var(--radius); overflow: hidden;
          background: var(--forest); min-height: 480px; display: flex;
          flex-direction: column; justify-content: flex-end; padding: 48px;
          margin-top: 24px;
        }
        @media (max-width: 768px) { .hero { min-height: 360px; padding: 28px; } }
        .hero-bg-circle {
          position: absolute; border-radius: 50%;
          background: rgba(255,255,255,0.04); pointer-events: none;
        }
        .hero-grain {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px; pointer-events: none;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px; padding: 5px 14px; margin-bottom: 16px;
          font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.85);
          width: fit-content;
        }
        .hero-badge-dot { width: 6px; height: 6px; background: #52B788; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .hero-title {
          font-family: 'Fraunces', serif; font-weight: 900;
          font-size: clamp(36px, 6vw, 64px); line-height: 1.05;
          color: white; margin-bottom: 12px;
        }
        .hero-title em { color: #95D5B2; font-style: italic; }
        .hero-sub { color: rgba(255,255,255,0.7); font-size: 15px; max-width: 460px; line-height: 1.7; margin-bottom: 28px; }
        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-primary {
          background: white; color: var(--forest); border: none;
          border-radius: 100px; padding: 14px 28px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-primary:hover { background: #95D5B2; transform: translateY(-1px); }
        .btn-ghost {
          background: rgba(255,255,255,0.1); color: white;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 100px; padding: 14px 28px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.18); }
        .hero-stats {
          position: absolute; top: 36px; right: 36px;
          display: flex; flex-direction: column; gap: 10px;
        }
        @media (max-width: 768px) { .hero-stats { display: none; } }
        .stat-chip {
          background: rgba(255,255,255,0.1); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15); border-radius: 14px;
          padding: 12px 16px; text-align: right;
        }
        .stat-num { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: white; }
        .stat-desc { font-size: 11px; color: rgba(255,255,255,0.6); margin-top: 2px; }

        /* Menu grid */
        .menu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        @media (max-width: 480px) { .menu-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; } }
        .menu-card {
          background: white; border: 1px solid var(--sand); border-radius: var(--radius);
          padding: 20px 16px; text-align: center; cursor: pointer;
          transition: all 0.25s; display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .menu-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(27,67,50,0.1); border-color: var(--mint); }
        .menu-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
        .menu-name { font-size: 12px; font-weight: 700; color: var(--ink); line-height: 1.3; }
        .menu-desc-sm { font-size: 10px; color: var(--muted); }

        /* Market section */
        .market-card {
          background: white; border: 1px solid var(--sand); border-radius: var(--radius); padding: 24px;
        }
        .market-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
        .live-badge {
          display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600;
          color: var(--sage); background: rgba(82,183,136,0.1); padding: 4px 10px; border-radius: 100px;
        }
        .live-dot { width: 6px; height: 6px; background: var(--mint); border-radius: 50%; animation: pulse 2s infinite; }
        .tab-row {
          display: flex; gap: 4px; background: var(--parchment); padding: 4px; border-radius: 12px;
          margin-bottom: 14px;
        }
        .tab-btn {
          flex: 1; padding: 7px; border: none; border-radius: 8px; font-size: 12px; font-weight: 600;
          cursor: pointer; transition: all 0.2s; background: transparent; color: var(--muted);
        }
        .tab-btn.active { background: white; color: var(--forest); box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .chart-legend { display: flex; gap: 12px; margin-bottom: 8px; }
        .legend-dot { width: 10px; height: 10px; border-radius: 3px; }
        .legend-label { font-size: 11px; color: var(--muted); display: flex; align-items: center; gap: 4px; }

        /* Bar chart */
        .bar-chart-wrap { display: flex; align-items: flex-end; gap: 6px; height: 130px; }
        .bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .bars { width: 100%; display: flex; gap: 2px; align-items: flex-end; height: 110px; }
        .bar { flex: 1; border-radius: 4px 4px 0 0; transition: height 0.5s ease; }
        .bar-selada { background: var(--mint); }
        .bar-tomat { background: #E9936C; }
        .bar-cabai { background: #E05C5C; }
        .bar-label { font-size: 9px; color: var(--muted); font-weight: 600; }

        /* Commodity list */
        .commodity-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px; border-radius: 12px; background: var(--cream); margin-bottom: 8px;
          transition: background 0.2s; cursor: pointer;
        }
        .commodity-row:hover { background: var(--parchment); }
        .commodity-info { display: flex; align-items: center; gap: 10px; }
        .commodity-emoji { font-size: 22px; }
        .commodity-name { font-size: 13px; font-weight: 600; color: var(--ink); }
        .commodity-price { font-size: 11px; color: var(--muted); margin-top: 1px; }
        .change-badge {
          font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 100px;
        }
        .change-up { background: rgba(82,183,136,0.12); color: #1B4332; }
        .change-down { background: rgba(224,92,92,0.1); color: #C0392B; }

        /* Hot picks */
        .hot-card {
          background: var(--parchment); border: 1px solid var(--sand); border-radius: 16px; padding: 16px; margin-top: 16px;
        }
        .hot-title { font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 12px; }
        .potential-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .potential-bar-bg { flex: 1; height: 5px; background: rgba(0,0,0,0.06); border-radius: 100px; overflow: hidden; }
        .potential-bar-fill { height: 100%; border-radius: 100px; }
        .badge-high { font-size: 9px; font-weight: 700; padding: 3px 7px; border-radius: 100px; background: rgba(82,183,136,0.15); color: var(--sage); }
        .badge-mid { font-size: 9px; font-weight: 700; padding: 3px 7px; border-radius: 100px; background: rgba(255,183,77,0.15); color: #A87000; }
        .badge-low { font-size: 9px; font-weight: 700; padding: 3px 7px; border-radius: 100px; background: rgba(224,92,92,0.1); color: #C0392B; }

        /* Pemula cards */
        .pemula-card {
          display: flex; align-items: center; gap: 16px;
          border-radius: var(--radius); padding: 20px; margin-bottom: 12px;
          cursor: pointer; transition: transform 0.2s; position: relative; overflow: hidden;
        }
        .pemula-card:hover { transform: translateY(-2px); }
        .pemula-icon-wrap { width: 52px; height: 52px; border-radius: 14px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
        .pemula-text { flex: 1; }
        .pemula-q { font-size: 13px; font-weight: 700; color: white; }
        .pemula-a { font-size: 11px; color: rgba(255,255,255,0.8); margin-top: 3px; line-height: 1.5; }
        .pemula-cta-btn {
          background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3);
          color: white; font-size: 11px; font-weight: 600; padding: 7px 12px;
          border-radius: 100px; cursor: pointer; white-space: nowrap; flex-shrink: 0;
          font-family: 'DM Sans', sans-serif; transition: background 0.2s;
        }
        .pemula-cta-btn:hover { background: rgba(255,255,255,0.28); }

        /* Ecosystem */
        .eco-card {
          background: white; border: 1px solid var(--sand); border-radius: var(--radius); padding: 24px;
        }
        .eco-timeline { position: relative; padding-left: 8px; }
        .eco-line {
          position: absolute; left: 27px; top: 24px; bottom: 24px;
          width: 2px; background: linear-gradient(to bottom, var(--mint), var(--sage));
          border-radius: 100px;
        }
        .eco-step { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; position: relative; z-index: 1; }
        .eco-step-icon {
          width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .eco-step-body {
          flex: 1; background: var(--cream); border-radius: 12px; padding: 10px 14px;
          cursor: pointer; transition: background 0.2s;
        }
        .eco-step-body:hover { background: rgba(82,183,136,0.08); }
        .eco-step-title { font-size: 13px; font-weight: 700; color: var(--ink); }
        .eco-step-desc { font-size: 11px; color: var(--muted); }

        /* Promo banner */
        .promo-banner {
          background: var(--forest); border-radius: var(--radius);
          padding: 24px; display: flex; align-items: center; gap: 16px;
        }
        .promo-icon { font-size: 36px; flex-shrink: 0; }
        .promo-text { flex: 1; }
        .promo-title { font-size: 14px; font-weight: 700; color: white; }
        .promo-sub { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 2px; }
        .promo-btn {
          background: white; color: var(--forest); border: none; border-radius: 100px;
          padding: 9px 18px; font-size: 12px; font-weight: 700; cursor: pointer;
          flex-shrink: 0; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .promo-btn:hover { background: #95D5B2; }

        /* ═══════════════════════════════════════════
           PRODUK SECTION
        ═══════════════════════════════════════════ */
        .produk-tabs {
          display: flex; gap: 8px; flex-wrap: wrap; margin: 24px 0 0;
        }
        .produk-tab {
          padding: 9px 18px; border-radius: 100px; font-size: 13px; font-weight: 600;
          border: 1.5px solid var(--sand); background: white; cursor: pointer;
          transition: all 0.2s; color: var(--muted);
        }
        .produk-tab.active { border-color: var(--sage); background: var(--sage); color: white; }
        .produk-detail {
          display: grid; gap: 24px; margin-top: 24px;
        }
        @media (min-width: 769px) { .produk-detail { grid-template-columns: 1fr 1fr; } }
        .produk-visual {
          border-radius: var(--radius); min-height: 280px;
          display: flex; align-items: center; justify-content: center;
          font-size: 80px; position: relative; overflow: hidden;
        }
        .produk-info { display: flex; flex-direction: column; justify-content: center; gap: 12px; }
        .produk-tag {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 4px 12px; border-radius: 100px;
        }
        .produk-name { font-family: 'Fraunces', serif; font-size: 32px; font-weight: 700; color: var(--forest); line-height: 1.1; }
        .produk-tagline { font-size: 14px; font-weight: 600; color: var(--sage); }
        .produk-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }
        .produk-features { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
        .produk-feature {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: var(--ink); font-weight: 500;
        }
        .feature-check {
          width: 20px; height: 20px; border-radius: 50%; background: rgba(82,183,136,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; flex-shrink: 0;
        }
        .produk-cta {
          margin-top: 12px; padding: 13px 28px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700;
          border: none; cursor: pointer; transition: all 0.2s; width: fit-content;
          background: var(--forest); color: white;
        }
        .produk-cta:hover { background: var(--sage); transform: translateY(-1px); }

        /* Compare table */
        .compare-table-wrap { overflow-x: auto; margin-top: 40px; }
        .compare-table { width: 100%; border-collapse: collapse; min-width: 520px; }
        .compare-table th {
          padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 700; color: var(--muted);
          border-bottom: 2px solid var(--sand); text-transform: uppercase; letter-spacing: 0.06em;
        }
        .compare-table th:first-child { text-align: left; }
        .compare-table th.highlight { color: var(--sage); }
        .compare-table td {
          padding: 12px 16px; font-size: 13px; border-bottom: 1px solid var(--parchment);
          text-align: center;
        }
        .compare-table td:first-child { text-align: left; font-weight: 600; color: var(--ink); }
        .compare-table tr:hover td { background: var(--cream); }
        .check-green { color: var(--sage); font-weight: 700; font-size: 16px; }
        .check-red { color: #C0392B; font-size: 16px; }
        .check-partial { color: #A87000; font-size: 12px; font-weight: 600; }

        /* ═══════════════════════════════════════════
           TENTANG KAMI SECTION
        ═══════════════════════════════════════════ */
        .about-grid { display: grid; gap: 24px; margin-top: 32px; }
        @media (min-width: 769px) { .about-grid { grid-template-columns: 1fr 1fr; } }
        .about-card {
          background: white; border: 1px solid var(--sand); border-radius: var(--radius); padding: 28px;
        }
        .about-card-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: var(--forest); margin-bottom: 10px; }
        .about-card-text { font-size: 14px; color: var(--muted); line-height: 1.75; }
        .mission-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
        .mission-item { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--ink); line-height: 1.6; }
        .mission-num { width: 22px; height: 22px; border-radius: 50%; background: rgba(82,183,136,0.15); color: var(--sage); font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }

        /* Milestones */
        .milestone-track { display: flex; flex-direction: column; gap: 0; margin-top: 32px; position: relative; }
        .milestone-track::before {
          content: ''; position: absolute; left: 51px; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, var(--mint), var(--sage));
        }
        @media (min-width: 769px) {
          .milestone-track { flex-direction: row; gap: 0; }
          .milestone-track::before { left: 0; right: 0; top: 26px; bottom: auto; width: auto; height: 2px; background: linear-gradient(to right, var(--mint), var(--sage)); }
        }
        .milestone-item { display: flex; gap: 16px; padding: 0 0 20px; position: relative; z-index: 1; }
        @media (min-width: 769px) {
          .milestone-item { flex-direction: column; align-items: center; text-align: center; flex: 1; padding: 0 8px; gap: 8px; }
        }
        .milestone-dot {
          width: 42px; height: 42px; border-radius: 50%;
          background: var(--forest); color: white; border: 3px solid var(--cream);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif; font-size: 11px; font-weight: 700;
          flex-shrink: 0; box-shadow: 0 0 0 4px rgba(82,183,136,0.2);
        }
        .milestone-label { font-size: 13px; font-weight: 700; color: var(--forest); }
        .milestone-desc { font-size: 11px; color: var(--muted); line-height: 1.5; }

        /* Team */
        .team-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; margin-top: 28px; }
        @media (min-width: 769px) { .team-grid { grid-template-columns: repeat(4,1fr); } }
        .team-card {
          background: white; border: 1px solid var(--sand); border-radius: var(--radius);
          padding: 24px 16px; text-align: center; transition: all 0.25s;
        }
        .team-card:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(27,67,50,0.09); }
        .team-avatar { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 12px; }
        .team-name { font-size: 13px; font-weight: 700; color: var(--ink); }
        .team-role { font-size: 11px; color: var(--muted); margin-top: 3px; line-height: 1.4; }

        /* Stats strip */
        .stats-strip { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-top: 32px; }
        @media (min-width: 769px) { .stats-strip { grid-template-columns: repeat(4,1fr); } }
        .stat-box {
          background: white; border: 1px solid var(--sand); border-radius: var(--radius);
          padding: 20px; text-align: center;
        }
        .stat-box-num { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700; color: var(--forest); }
        .stat-box-label { font-size: 11px; color: var(--muted); margin-top: 4px; }

        /* ═══════════════════════════════════════════
           KONTAK SECTION
        ═══════════════════════════════════════════ */
        .kontak-grid { display: grid; gap: 24px; margin-top: 32px; }
        @media (min-width: 769px) { .kontak-grid { grid-template-columns: 1fr 1fr; } }
        .kontak-info { display: flex; flex-direction: column; gap: 12px; }
        .kontak-item {
          display: flex; gap: 14px; align-items: flex-start;
          background: white; border: 1px solid var(--sand); border-radius: 14px; padding: 16px;
        }
        .kontak-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--parchment); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .kontak-item-title { font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; }
        .kontak-item-val { font-size: 14px; font-weight: 600; color: var(--ink); margin-top: 2px; }
        .kontak-form-card {
          background: white; border: 1px solid var(--sand); border-radius: var(--radius); padding: 28px;
        }
        .form-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
        .form-label { font-size: 12px; font-weight: 600; color: var(--ink); }
        .form-input, .form-textarea {
          border: 1.5px solid var(--sand); border-radius: 10px; padding: 11px 14px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink);
          background: var(--cream); outline: none; transition: border-color 0.2s;
          resize: none;
        }
        .form-input:focus, .form-textarea:focus { border-color: var(--mint); background: white; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .submit-btn {
          width: 100%; padding: 14px; border: none; border-radius: 12px;
          background: var(--forest); color: white; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s;
        }
        .submit-btn:hover { background: var(--sage); }

        /* ═══════════════════════════════════════════
           FAQ SECTION
        ═══════════════════════════════════════════ */
        .faq-list { display: flex; flex-direction: column; gap: 10px; margin-top: 28px; }
        .faq-item {
          background: white; border: 1.5px solid var(--sand); border-radius: 14px;
          padding: 18px 20px; cursor: pointer; transition: all 0.2s;
        }
        .faq-item.open { border-color: var(--mint); }
        .faq-item:hover { border-color: var(--mint); }
        .faq-q { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 14px; font-weight: 600; color: var(--ink); }
        .faq-arrow { font-size: 20px; font-weight: 400; color: var(--sage); flex-shrink: 0; }
        .faq-a { font-size: 13px; color: var(--muted); line-height: 1.7; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--parchment); }

        /* ── FOOTER ── */
        .footer {
          background: var(--forest); border-radius: var(--radius); padding: 40px;
          text-align: center; margin-top: 48px;
        }
        .footer-logo { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700; color: white; margin-bottom: 6px; }
        .footer-tagline { font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 24px; }
        .footer-links { display: flex; justify-content: center; gap: 24px; margin-bottom: 24px; }
        .footer-link { font-size: 13px; color: rgba(255,255,255,0.6); cursor: pointer; transition: color 0.2s; text-decoration: none; }
        .footer-link:hover { color: white; }
        .footer-copy { font-size: 11px; color: rgba(255,255,255,0.25); }

        /* ── MOBILE BOTTOM NAV ── */
        .mobile-bottom-nav {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
          background: rgba(248,244,238,0.97); backdrop-filter: blur(16px);
          border-top: 1px solid var(--sand);
          display: flex;
        }
        @media (min-width: 769px) { .mobile-bottom-nav { display: none; } }
        .mobile-nav-btn {
          flex: 1; display: flex; flex-direction: column; align-items: center;
          padding: 10px 4px 12px; gap: 3px; background: none; border: none;
          cursor: pointer; transition: all 0.2s;
        }
        .mobile-nav-icon { font-size: 20px; }
        .mobile-nav-label { font-size: 9px; font-weight: 600; color: var(--muted); }
        .mobile-nav-btn.active .mobile-nav-label { color: var(--forest); }
        .mobile-nav-btn.active .mobile-nav-icon { filter: saturate(1.5); }
        .mobile-nav-pip { width: 4px; height: 4px; background: var(--mint); border-radius: 50%; }

        /* Helpers */
        .divider { height: 1px; background: var(--sand); margin: 32px 0; }
        .section-header { margin-bottom: 8px; }
        .grid-2 { display: grid; gap: 20px; }
        @media (min-width: 769px) { .grid-2 { grid-template-columns: 1fr 1fr; } }
        .space-y > * + * { margin-top: 12px; }
        .hero-logo {
          position: absolute;
          top: 50%;
          right: 60px;
          transform: translateY(-50%);

          width: 500px;
          max-width: 35%;

          display: flex;
          align-items: center;
          justify-content: center;

          z-index: 2;
        }

        .hero-logo img {
          filter: drop-shadow(0 12px 40px rgba(0,0,0,0.25));
        }

        @media (max-width: 768px) {
          .hero-logo {
            position: relative;
            top: auto;
            right: auto;
            transform: none;

            width: 220px;
            max-width: 70%;

            margin: 24px auto 0;
          }
        }
      `}</style>

      {/* ── DESKTOP NAV ── */}
      <nav className="desktop-nav">
        <div className="desktop-nav-inner">
          <button className="nav-logo" onClick={() => scrollTo("beranda")}>
            <Image
              src="/logo-mastani.png"
              alt="MasTani"
              width={220}
              height={80}
              priority
              className="nav-logo-img"
              style={{
                height: 72,
                width: "auto",
                objectFit: "contain"
              }}
            />
          </button>
          <div className="nav-links">
            {navLinks.map((l) => (
              <button key={l.id} className={`nav-link ${activeSection === l.id ? "active" : ""}`} onClick={() => scrollTo(l.id)}>
                {l.label}
              </button>
            ))}
          </div>
          <button className="nav-cta">Mulai Bertani </button>
        </div>
      </nav>

      {/* ── MOBILE HEADER ── */}
      <header className="mobile-header">
        <button className="nav-logo" onClick={() => scrollTo("beranda")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
          <Image src="/logo-mastani.png" alt="MasTani" width={110} height={40} priority style={{ height: 36, width: "auto", objectFit: "contain" }} />
        </button>
        <div className="mobile-header-right">
          <button className="icon-btn">🔔<span className="notif-dot" /></button>
          <button className="avatar-btn">A</button>
        </div>
      </header>

      <div className="page">

        {/* ═══════════════════════════════════════════
            BERANDA
        ═══════════════════════════════════════════ */}
        <section id="beranda">

          {/* Hero */}
          <div className="hero">
            <div className="hero-grain" />
            <div className="hero-bg-circle" style={{ width: 320, height: 320, top: -80, right: -80 }} />
            <div className="hero-bg-circle" style={{ width: 180, height: 180, bottom: 40, right: 120 }} />
            <div className="hero-logo">
              <Image
                src="/loggoo.png"
                alt="MasTani"
                width={420}
                height={420}
                priority
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain"
                }}
              />
            </div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Platform Ekosistem Pertanian Digital #1
            </div>
            <h1 className="hero-title">Dari Belajar<br /><em>Hingga Panen</em></h1>
            <p className="hero-sub">Platform digital yang membantu petani muda belajar, mencari lahan, membeli sarana tani, hingga menjual hasil panen — dalam satu ekosistem terintegrasi.</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => scrollTo("produk")}>Mulai Bertani 🚀</button>
              <button className="btn-ghost" onClick={() => scrollTo("tentang")}>Tentang Kami</button>
            </div>
          </div>

          {/* Menu */}
          <div style={{ marginTop: 24 }}>
            <p className="section-label">Layanan Utama</p>
            <div className="menu-grid">
              {[
                { icon: "🎓", name: "Edukasi & Mentoring", desc: "Belajar dari ahli", bg: "#D8F3DC", id: "produk" },
                { icon: "🚜", name: "Akses Lahan", desc: "Cari & sewa lahan", bg: "#FFF3E0", id: "produk" },
                { icon: "🛒", name: "Marketplace", desc: "Bibit, pupuk & alat", bg: "#E0F0FF", id: "produk" },
              ].map((m) => (
                <button key={m.name} className="menu-card" onClick={() => scrollTo(m.id)}>
                  <div className="menu-icon" style={{ background: m.bg }}>{m.icon}</div>
                  <div>
                    <div className="menu-name">{m.name}</div>
                    <div className="menu-desc-sm">{m.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Market Analysis */}
          <div style={{ marginTop: 20 }}>
            <div className="market-card">
              <div className="market-header">
                <div>
                  <p style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>Analisis Pasar</p>
                  <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Data aktual untuk keputusan tani terbaik</p>
                </div>
                <span className="live-badge"><span className="live-dot" />Live</span>
              </div>
              <div className="tab-row">
                {(["Minggu","Bulan","Tahun"]).map((t) => (
                  <button key={t} className={`tab-btn ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>{t}</button>
                ))}
              </div>
              <div className="chart-legend">
                {[["var(--mint)","Selada"],["#E9936C","Tomat"],["#E05C5C","Cabai"]].map(([c,l]) => (
                  <span key={l} className="legend-label"><span className="legend-dot" style={{ background: c }} />{l}</span>
                ))}
              </div>
              <BarChart data={chartData[activeTab]} />
              <div style={{ marginTop: 16 }}>
                {commodities.map((c) => (
                  <div key={c.name} className="commodity-row">
                    <div className="commodity-info">
                      <span className="commodity-emoji">{c.emoji}</span>
                      <div>
                        <div className="commodity-name">{c.name}</div>
                        <div className="commodity-price">{c.price}</div>
                      </div>
                    </div>
                    <span className={`change-badge ${c.up ? "change-up" : "change-down"}`}>{c.change}</span>
                  </div>
                ))}
              </div>
              <div className="hot-card">
                <div className="hot-title">Komoditas Potensial Minggu Ini</div>
                {potential.map((p) => (
                  <div key={p.name} className="potential-row">
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", width: 16 }}>{p.rank}.</span>
                    <span style={{ fontSize: 16 }}>{p.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{p.name}</span>
                        <span className={p.badgeClass}>{p.level}</span>
                      </div>
                      <div className="potential-bar-bg">
                        <div className="potential-bar-fill" style={{ width: p.barWidth, background: p.rank === 1 ? "var(--mint)" : p.rank === 2 ? "#FFBA08" : "#E05C5C" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pemula */}
          <div style={{ marginTop: 24 }}>
            <p className="section-label">Untuk Pemula</p>
            {[
              { icon: "🌱", q: "Belum tahu mulai dari mana?", a: "Pelajari dasar pertanian dari nol bersama mentor kami.", cta: "Mulai Belajar", bg: "linear-gradient(135deg,#2D6A4F,#1B4332)" },
              { icon: "🚜", q: "Tidak punya lahan?", a: "Temukan lahan sewa terdekat yang siap digunakan hari ini.", cta: "Cari Lahan", bg: "linear-gradient(135deg,#E9A84C,#C0720A)" },
              { icon: "💰", q: "Takut gagal pasar?", a: "Gunakan analisis pasar berbasis data sebelum memulai.", cta: "Lihat Analisis", bg: "linear-gradient(135deg,#457B9D,#1D3557)" },
            ].map((item) => (
              <div key={item.q} className="pemula-card" style={{ background: item.bg }}>
                <div className="pemula-icon-wrap">{item.icon}</div>
                <div className="pemula-text">
                  <div className="pemula-q">{item.q}</div>
                  <div className="pemula-a">{item.a}</div>
                </div>
                <button className="pemula-cta-btn">{item.cta}</button>
              </div>
            ))}
          </div>

          {/* Ecosystem */}
          <div style={{ marginTop: 24 }}>
            <div className="eco-card">
              <p style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>Ekosistem Hulu–Hilir</p>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 3, marginBottom: 20 }}>Dari belajar hingga panen & jual — semua dalam satu platform.</p>
              <div className="eco-timeline">
                <div className="eco-line" />
                {timeline.map((s, i) => (
                  <div key={s.label} className="eco-step">
                    <div className="eco-step-icon" style={{ background: `hsl(${130 + i*8},${58-i*3}%,${90-i*5}%)` }}>{s.icon}</div>
                    <div className="eco-step-body">
                      <div className="eco-step-title">{s.label}</div>
                      <div className="eco-step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Promo 
          <div style={{ marginTop: 20 }}>
            <div className="promo-banner">
              <div className="promo-icon">🎓</div>
              <div className="promo-text">
                <div className="promo-title">Kelas Gratis Minggu Ini</div>
                <div className="promo-sub">Budidaya Selada Hidroponik — Sabtu, 14.00 WIB</div>
              </div>
              <button className="promo-btn">Daftar →</button>
            </div>
          </div>*/}
        </section>

        {/* ═══════════════════════════════════════════
            PRODUK
        ═══════════════════════════════════════════ */}
        <section id="produk">
          <div className="section-header">
            <p className="section-label">Produk & Layanan</p>
            <h2 className="section-title">Semua yang Kamu<br />Butuhkan, di Satu Tempat</h2>
            <p className="section-sub">MasTani menghadirkan empat layanan terintegrasi yang dirancang khusus untuk mendukung perjalanan bertani dari nol hingga sukses.</p>
          </div>

          <div className="produk-tabs">
            {products.map((p, i) => (
              <button key={p.id} className={`produk-tab ${activeProd === i ? "active" : ""}`} onClick={() => setActiveProd(i)}>
                {p.icon} {p.name}
              </button>
            ))}
          </div>

          {products.map((p, i) => i === activeProd && (
            <div key={p.id} className="produk-detail">
              <div className="produk-visual" style={{ background: p.lightColor }}>
                <div style={{ fontSize: 90 }}>{p.icon}</div>
                <div style={{ position: "absolute", top: 16, left: 16, background: "white", borderRadius: 100, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: p.color }}>
                  {p.name}
                </div>
              </div>
              <div className="produk-info">
                <span className="produk-tag" style={{ background: p.lightColor, color: p.color }}>{p.tagline}</span>
                <h3 className="produk-name">{p.name}</h3>
                <p className="produk-desc">{p.desc}</p>
                <ul className="produk-features">
                  {p.features.map((f) => (
                    <li key={f} className="produk-feature">
                      <span className="feature-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="produk-cta">Coba {p.name} →</button>
              </div>
            </div>
          ))}

          {/* Comparison Table */}
          <div style={{ marginTop: 40 }}>
            <p className="section-label">Perbandingan</p>
            <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: "var(--forest)", marginBottom: 16 }}>MasTani vs Kompetitor</h3>
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Fitur</th>
                    <th className="highlight">MasTani</th>
                    <th>TaniHub</th>
                    <th>Pak Tani Digital</th>
                    <th>Penyuluhan Konvensional</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Edukasi & Mentoring", "✅","❌","Terbatas","✅"],
                    ["Akses Lahan", "✅","❌","❌","❌"],
                    ["Marketplace Sarana Tani", "✅","❌","✅","❌"],
                    ["Analisis Pasar", "✅","✅","Terbatas","❌"],
                    ["Fokus Petani Pemula", "✅","❌","❌","❌"],
                    ["Ekosistem Hulu–Hilir", "✅","Sebagian","Sebagian","❌"],
                  ].map(([feat, ...vals]) => (
                    <tr key={feat}>
                      <td>{feat}</td>
                      {vals.map((v, idx) => (
                        <td key={idx}>
                          {v === "✅" ? <span className="check-green">✓</span>
                           : v === "❌" ? <span className="check-red">✗</span>
                           : <span className="check-partial">{v}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            TENTANG KAMI
        ═══════════════════════════════════════════ */}
        <section id="tentang">
          <p className="section-label">Tentang Kami</p>
          <h2 className="section-title">Misi Kami: Regenerasi<br />Petani Indonesia</h2>
          <p className="section-sub">MasTani lahir dari keprihatinan terhadap krisis regenerasi petani dan semangat untuk memberdayakan generasi muda lewat teknologi digital.</p>

          {/* Stats */}
          <div className="stats-strip">
            {[["27 Juta+","Total petani Indonesia"],["72.77%","Petani usia > 45 tahun"],["100.000","Target petani muda 2032"],["4 Layanan","Terintegrasi dalam 1 platform"]].map(([n,d]) => (
              <div key={n} className="stat-box">
                <div className="stat-box-num">{n}</div>
                <div className="stat-box-label">{d}</div>
              </div>
            ))}
          </div>

          {/* Visi & Misi */}
          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-title">Visi</div>
              <p className="about-card-text">Menjadi platform ekosistem pertanian digital terdepan di Indonesia yang memberdayakan generasi muda untuk membangun usaha pertanian yang produktif, berkelanjutan, dan berorientasi pasar — menjangkau <strong>100.000 petani muda aktif</strong> di Indonesia pada tahun 2032.</p>
            </div>
            <div className="about-card">
              <div className="about-card-title">Misi</div>
              <ul className="mission-list">
                {["Menyediakan akses pembelajaran dan pendampingan pertanian yang mudah dan terjangkau.",
                  "Mempermudah akses petani muda terhadap lahan, sarana produksi, dan informasi.",
                  "Mengintegrasikan layanan pertanian hulu ke hilir dalam satu platform digital.",
                  "Membantu petani mengambil keputusan tepat melalui informasi pasar berbasis data.",
                  "Mendorong regenerasi petani dengan ekosistem yang modern dan inklusif.",
                  "Membangun kemitraan strategis dengan universitas, pemerintah, dan komunitas pertanian.",
                ].map((m, i) => (
                  <li key={i} className="mission-item">
                    <span className="mission-num">{i+1}</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ marginTop: 40 }}>
            <p className="section-label">Perjalanan Kami</p>
            <div className="milestone-track">
              {milestones.map((m) => (
                <div key={m.year} className="milestone-item">
                  <div className="milestone-dot">{m.year}</div>
                  <div>
                    <div className="milestone-label">{m.label}</div>
                    <div className="milestone-desc">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team 
          <div style={{ marginTop: 40 }}>
            <p className="section-label">Tim Kami</p>
            <div className="team-grid">
              {teamMembers.map((t) => (
                <div key={t.name} className="team-card">
                  <div className="team-avatar" style={{ background: t.bg }}>{t.emoji}</div>
                  <div className="team-name">{t.name}</div>
                  <div className="team-role">{t.role}</div>
                </div>
              ))}
            </div>
          </div>*/}
        </section>

        {/* ═══════════════════════════════════════════
            KONTAK
        ═══════════════════════════════════════════ */}
        <section id="kontak">
          <p className="section-label">Hubungi Kami</p>
          <h2 className="section-title">Mari Berkolaborasi<br />Bersama MasTani</h2>
          <p className="section-sub">Ada pertanyaan, ingin bermitra, atau ingin bergabung sebagai mentor? Kami senang mendengar dari kamu.</p>

          <div className="kontak-grid">
            <div className="kontak-info">
              {[
                { icon: "📧", title: "Email", val: "halo@mastani.id" },
                { icon: "📱", title: "WhatsApp", val: "+62 812-XXXX-XXXX" },
                { icon: "📍", title: "Lokasi", val: "Surakarta, Jawa Tengah, Indonesia" },
                { icon: "⏰", title: "Jam Operasional", val: "Senin – Jumat, 08.00 – 17.00 WIB" },
              ].map((k) => (
                <div key={k.title} className="kontak-item">
                  <div className="kontak-icon">{k.icon}</div>
                  <div>
                    <div className="kontak-item-title">{k.title}</div>
                    <div className="kontak-item-val">{k.val}</div>
                  </div>
                </div>
              ))}

              <div style={{ background: "var(--forest)", borderRadius: 16, padding: 20 }}>
                <p style={{ fontFamily: "Fraunces, serif", fontSize: 16, color: "white", fontWeight: 700, marginBottom: 6 }}>Ikuti Media Sosial Kami</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>Update terbaru, tips bertani, dan konten edukasi gratis.</p>
                <div style={{ display: "flex", gap: 10 }}>
                  {["📸 Instagram","🎵 TikTok","▶️ YouTube"].map((s) => (
                    <button key={s} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: 100, padding: "7px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>{s}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="kontak-form-card">
              <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 20, color: "var(--forest)", marginBottom: 20 }}>Kirim Pesan</h3>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama</label>
                  <input className="form-input" placeholder="Nama lengkap" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" placeholder="email@kamu.com" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Topik</label>
                <input className="form-input" placeholder="Contoh: Kemitraan, Pertanyaan Umum, Jadi Mentor..." />
              </div>
              <div className="form-group">
                <label className="form-label">Pesan</label>
                <textarea className="form-textarea" rows={5} placeholder="Tulis pesanmu di sini..." />
              </div>
              <button className="submit-btn">Kirim Pesan ✉️</button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FAQ
        ═══════════════════════════════════════════ */}
        <section id="faq">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Pertanyaan yang<br />Sering Ditanyakan</h2>
          <p className="section-sub">Belum menemukan jawaban? Hubungi kami langsung di halaman Kontak.</p>

          <div className="faq-list">
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>

          <div style={{ background: "var(--parchment)", borderRadius: 20, padding: 32, textAlign: "center", marginTop: 32, border: "1px solid var(--sand)" }}>
            <p style={{ fontFamily: "Fraunces, serif", fontSize: 22, fontWeight: 700, color: "var(--forest)" }}>Masih ada pertanyaan?</p>
            <p style={{ fontSize: 14, color: "var(--muted)", margin: "8px 0 20px" }}>Tim kami siap membantu kamu setiap hari kerja.</p>
            <button className="btn-primary" style={{ background: "var(--forest)", color: "white" }} onClick={() => scrollTo("kontak")}>Hubungi Kami →</button>
          </div>
        </section>

        {/* Footer */}
        <div className="footer">
          <div className="footer-tagline">Platform digital yang menumbuhkan petani Indonesia.</div>
          <div className="footer-links">
            {["Beranda","Produk","Tentang","Kontak","FAQ"].map((l, i) => (
              <button key={l} className="footer-link" onClick={() => scrollTo(["beranda","produk","tentang","kontak","faq"][i])} style={{ background: "none", border: "none", fontFamily: "DM Sans, sans-serif" }}>{l}</button>
            ))}
          </div>
          <div className="footer-copy">© 2025 MasTani. ----</div>
        </div>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="mobile-bottom-nav">
        {mobileNavItems.map((n) => (
          <button key={n.id} className={`mobile-nav-btn ${activeSection === n.id ? "active" : ""}`} onClick={() => scrollTo(n.id)}>
            <span className="mobile-nav-icon">{n.icon}</span>
            <span className="mobile-nav-label">{n.label}</span>
            {activeSection === n.id && <span className="mobile-nav-pip" />}
          </button>
        ))}
      </nav>
    </>
  );
}