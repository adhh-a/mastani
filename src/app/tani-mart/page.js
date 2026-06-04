"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const products = [
  { id:1, name:"Bibit Selada Hidroponik", category:"Bibit", price:18000, unit:"pak (100 biji)", emoji:"🥬", color:"#D8F3DC", brand:"AgroSeed Pro", stock:250, rating:4.9, reviews:312, desc:"Varietas selada head lettuce unggul, siap panen 30-35 hari. Cocok untuk hidroponik & konvensional.", tags:["Terlaris","Stok Banyak"], sold:1240 },
  { id:2, name:"Bibit Tomat Cherry", category:"Bibit", price:22000, unit:"pak (50 biji)", emoji:"🍅", color:"#FFF0EB", brand:"NusaBenih", stock:180, rating:4.8, reviews:198, desc:"Tomat cherry produksi tinggi, manis, tahan penyakit. Bisa di pot maupun lahan terbuka.", tags:["Populer"], sold:870 },
  { id:3, name:"Bibit Cabai Rawit Super", category:"Bibit", price:25000, unit:"pak (30 biji)", emoji:"🌶️", color:"#FFE5EC", brand:"AgroSeed Pro", stock:120, rating:4.7, reviews:145, desc:"Cabai rawit produktif dengan buah lebat. Tahan cuaca ekstrem dan serangan hama.", tags:["Tinggi Peminat"], sold:640 },
  { id:4, name:"Pupuk NPK Mutiara 16-16-16", category:"Pupuk", price:85000, unit:"kg", emoji:"🌿", color:"#E8F4FD", brand:"Petrokimia", stock:500, rating:4.9, reviews:421, desc:"Pupuk NPK seimbang untuk semua fase pertumbuhan tanaman. Formula lengkap dengan unsur mikro.", tags:["Terlaris","Bersertifikat SNI"], sold:2100 },
  { id:5, name:"Pupuk Organik Kompos Premium", category:"Pupuk", price:45000, unit:"5 kg", emoji:"🌱", color:"#F9FBE7", brand:"GreenFarm", stock:340, rating:4.8, reviews:267, desc:"Kompos premium dari bahan organik pilihan. Meningkatkan kesuburan tanah jangka panjang.", tags:["Organik","Ramah Lingkungan"], sold:980 },
  { id:6, name:"Nutrisi Hidroponik AB Mix", category:"Pupuk", price:65000, unit:"paket (1L)", emoji:"💧", color:"#E0F0FF", brand:"HydroTani", stock:90, rating:4.9, reviews:189, desc:"Larutan nutrisi lengkap untuk sistem hidroponik. Formula khusus sayuran daun & buah.", tags:["Spesial Hidroponik"], sold:560 },
  { id:7, name:"Sprayer Elektrik 16L", category:"Alat", price:350000, unit:"unit", emoji:"🔧", color:"#F3E5F5", brand:"KiyoSprayer", stock:45, rating:4.7, reviews:98, desc:"Sprayer elektrik portabel kapasitas 16 liter. Baterai tahan 4 jam, nozel adjustable.", tags:["Hemat Tenaga","Garansi 1 Tahun"], sold:230 },
  { id:8, name:"Sekop Tangan Stainless Set", category:"Alat", price:95000, unit:"set (3 pcs)", emoji:"⚒️", color:"#FFF9C4", brand:"TaniTools", stock:200, rating:4.6, reviews:134, desc:"Set alat tangan terdiri dari sekop, garpu, dan sendok tanam. Material stainless anti karat.", tags:["Durable","Ergonomis"], sold:450 },
  { id:9, name:"Net Pot Hidroponik 5cm", category:"Alat", price:35000, unit:"50 pcs", emoji:"🪴", color:"#E8F5E9", brand:"HydroTani", stock:800, rating:4.8, reviews:223, desc:"Net pot kualitas food grade, diameter 5cm. Kompatibel dengan sistem NFT, DFT, dan ebb & flow.", tags:["Food Grade","Stok Banyak"], sold:3200 },
];

const categories = ["Semua", "Bibit", "Pupuk", "Alat"];

export default function TaniMartPage() {
  const router = useRouter();
  const [cat, setCat] = useState("Semua");
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const filtered = cat === "Semua" ? products : products.filter(p => p.category === cat);
  const cartTotal = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  const addCart = (product, e) => {
    e?.stopPropagation();
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) return prev.map(i => i.id === product.id ? {...i, qty: i.qty+1} : i);
      return [...prev, {...product, qty: 1}];
    });
  };

  const removeCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const fmt = (p) => `Rp ${p.toLocaleString("id-ID")}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,500;0,700;0,900;1,300;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --forest: #1B4332; --sage: #2D6A4F; --mint: #52B788;
          --cream: #F8F4EE; --parchment: #EFE9DF; --sand: #D4C9B8;
          --ink: #1A1A1A; --muted: #6B6560; --accent: #E76F51; --radius: 20px;
        }
        body { background: var(--cream); color: var(--ink); font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 1.6; overflow-x: hidden; }

        .topbar { position: sticky; top: 0; z-index: 100; background: rgba(248,244,238,0.95); backdrop-filter: blur(16px); border-bottom: 1px solid var(--sand); }
        .topbar-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 12px; height: 60px; }
        .back-btn { display: flex; align-items: center; gap: 6px; background: var(--parchment); border: none; border-radius: 100px; padding: 8px 14px; font-size: 13px; font-weight: 600; color: var(--forest); cursor: pointer; transition: all 0.2s; }
        .back-btn:hover { background: var(--sand); }
        .topbar-title { font-family: 'Fraunces', serif; font-weight: 700; font-size: 17px; color: var(--forest); flex: 1; }
        .cart-btn { position: relative; background: var(--accent); color: white; border: none; border-radius: 100px; padding: 8px 16px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; gap: 6px; }
        .cart-count { background: white; color: var(--accent); border-radius: 50%; width: 18px; height: 18px; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }

        .page { max-width: 1100px; margin: 0 auto; padding: 28px 24px 60px; }

        .hero-strip { background: linear-gradient(135deg, #E76F51, #C0522A); border-radius: 20px; padding: 32px; margin-bottom: 28px; display: flex; align-items: center; gap: 20px; }
        .hero-strip-text h1 { font-family: 'Fraunces', serif; font-size: clamp(22px,4vw,32px); font-weight: 700; color: white; margin-bottom: 6px; }
        .hero-strip-text p { font-size: 14px; color: rgba(255,255,255,0.75); line-height: 1.6; }
        .hstat-num { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: #FFD4C2; }
        .hstat-label { font-size: 10px; color: rgba(255,255,255,0.6); }

        .cat-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .cat-btn { padding: 7px 14px; border-radius: 100px; font-size: 12px; font-weight: 600; border: 1.5px solid var(--sand); background: white; cursor: pointer; transition: all 0.2s; color: var(--muted); }
        .cat-btn.active { border-color: var(--accent); background: var(--accent); color: white; }

        .prod-grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 480px) { .prod-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 768px) { .prod-grid { grid-template-columns: repeat(3,1fr); } }

        .prod-card { background: white; border: 1.5px solid var(--sand); border-radius: 18px; overflow: hidden; cursor: pointer; transition: all 0.25s; }
        .prod-card:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(0,0,0,0.09); border-color: var(--accent); }
        .prod-img { height: 110px; display: flex; align-items: center; justify-content: center; font-size: 52px; position: relative; }
        .prod-tag-badge { position: absolute; top: 8px; left: 8px; font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 100px; background: var(--accent); color: white; }
        .prod-body { padding: 14px; }
        .prod-name { font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 2px; }
        .prod-brand { font-size: 10px; color: var(--muted); margin-bottom: 6px; }
        .prod-rating { font-size: 11px; color: var(--muted); margin-bottom: 8px; }
        .stars { color: #F4A836; }
        .prod-footer { display: flex; align-items: center; justify-content: space-between; }
        .prod-price { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 700; color: var(--forest); }
        .prod-unit { font-size: 9px; color: var(--muted); font-weight: 400; }
        .add-btn { background: var(--forest); color: white; border: none; border-radius: 100px; padding: 7px 14px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .add-btn:hover { background: var(--sage); }

        /* Detail Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal { background: white; border-radius: 24px; padding: 28px; max-width: 460px; width: 100%; max-height: 90vh; overflow-y: auto; }
        .modal-close-btn { background: var(--parchment); border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
        .modal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }

        /* Cart */
        .cart-panel { position: fixed; right: 0; top: 0; bottom: 0; width: 340px; max-width: 100vw; background: white; box-shadow: -8px 0 40px rgba(0,0,0,0.12); z-index: 300; padding: 24px; overflow-y: auto; transform: translateX(100%); transition: transform 0.3s; }
        .cart-panel.open { transform: translateX(0); }
        .cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 299; }
        .cart-item { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--parchment); }
        .cart-item-emoji { font-size: 28px; width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cart-item-name { font-size: 12px; font-weight: 700; color: var(--ink); }
        .cart-item-price { font-size: 11px; color: var(--muted); }
        .cart-remove { background: none; border: none; color: var(--muted); cursor: pointer; font-size: 16px; margin-left: auto; }
        .checkout-btn { width: 100%; padding: 14px; border: none; border-radius: 12px; background: var(--accent); color: white; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; margin-top: 16px; transition: all 0.2s; }
        .checkout-btn:hover { background: #C0522A; }
      `}</style>

      <div className="topbar">
        <div className="topbar-inner">
          <button className="back-btn" onClick={() => router.push("/")}>← Kembali</button>
          <span className="topbar-title">🛒 TaniMart</span>
          <button className="cart-btn" onClick={() => setShowCart(true)}>
            🛒 Keranjang {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>

      <div className="page">
        <div className="hero-strip">
          <div style={{fontSize:48,flexShrink:0}}>🛒</div>
          <div className="hero-strip-text">
            <h1>Marketplace Sarana Tani</h1>
            <p>Bibit, pupuk, dan alat pertanian berkualitas dari mitra terpercaya. Harga transparan, pengiriman ke seluruh Indonesia.</p>
            <div style={{display:"flex",gap:20,marginTop:14,flexWrap:"wrap"}}>
              {[["9+","Produk"],["100%","Original"],["Garansi","Kualitas"],["Gratis","Ongkir >Rp150rb"]].map(([n,l])=>(
                <div key={l}><div className="hstat-num">{n}</div><div className="hstat-label">{l}</div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="cat-row">
          {categories.map(c => (
            <button key={c} className={`cat-btn ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        <div className="prod-grid">
          {filtered.map(p => (
            <div key={p.id} className="prod-card" onClick={() => setSelected(p)}>
              <div className="prod-img" style={{background: p.color}}>
                <span>{p.emoji}</span>
                {p.tags[0] && <span className="prod-tag-badge">{p.tags[0]}</span>}
              </div>
              <div className="prod-body">
                <div className="prod-name">{p.name}</div>
                <div className="prod-brand">{p.brand} · Stok: {p.stock}</div>
                <div className="prod-rating"><span className="stars">★</span> {p.rating} ({p.reviews} ulasan)</div>
                <div className="prod-footer">
                  <div>
                    <span className="prod-price">{fmt(p.price)}</span><br/>
                    <span className="prod-unit">per {p.unit}</span>
                  </div>
                  <button className="add-btn" onClick={(e) => addCart(p, e)}>+ Tambah</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <span style={{fontFamily:"Fraunces,serif",fontSize:17,fontWeight:700,color:"var(--forest)"}}>Detail Produk</span>
              <button className="modal-close-btn" onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{fontSize:64,textAlign:"center",background:selected.color,borderRadius:14,padding:20,marginBottom:16}}>{selected.emoji}</div>
            <p style={{fontFamily:"Fraunces,serif",fontSize:18,fontWeight:700,color:"var(--forest)",marginBottom:4}}>{selected.name}</p>
            <p style={{fontSize:12,color:"var(--muted)",marginBottom:8}}>{selected.brand}</p>
            <div style={{display:"flex",gap:16,marginBottom:12}}>
              <span style={{fontSize:12,color:"var(--muted)"}}><span style={{color:"#F4A836"}}>★</span> {selected.rating} ({selected.reviews} ulasan)</span>
              <span style={{fontSize:12,color:"var(--muted)"}}>Terjual: {selected.sold}</span>
              <span style={{fontSize:12,color:"var(--muted)"}}>Stok: {selected.stock}</span>
            </div>
            <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.6,marginBottom:12}}>{selected.desc}</p>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
              {selected.tags.map(t=><span key={t} style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:100,background:"var(--parchment)",color:"var(--ink)"}}>{t}</span>)}
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderTop:"1px solid var(--parchment)"}}>
              <div>
                <span style={{fontFamily:"Fraunces,serif",fontSize:20,fontWeight:700,color:"var(--forest)"}}>{`Rp ${selected.price.toLocaleString("id-ID")}`}</span>
                <span style={{fontSize:11,color:"var(--muted)"}}> / {selected.unit}</span>
              </div>
              <button style={{background:"var(--accent)",color:"white",border:"none",borderRadius:100,padding:"10px 24px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}} onClick={() => { addCart(selected); setSelected(null); }}>
                + Keranjang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Panel */}
      {showCart && <div className="cart-overlay" onClick={() => setShowCart(false)} />}
      <div className={`cart-panel ${showCart ? "open" : ""}`}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <span style={{fontFamily:"Fraunces,serif",fontSize:20,fontWeight:700,color:"var(--forest)"}}>Keranjang 🛒</span>
          <button className="modal-close-btn" onClick={() => setShowCart(false)}>×</button>
        </div>
        {cart.length === 0
          ? <p style={{textAlign:"center",color:"var(--muted)",fontSize:14,marginTop:40}}>Keranjang masih kosong.</p>
          : <>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-emoji" style={{background:item.color}}>{item.emoji}</div>
                <div style={{flex:1}}>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{item.qty}× {`Rp ${item.price.toLocaleString("id-ID")}`}</div>
                </div>
                <button className="cart-remove" onClick={() => removeCart(item.id)}>✕</button>
              </div>
            ))}
            <div style={{marginTop:16,padding:"12px 0",borderTop:"2px solid var(--sand)"}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:14,fontWeight:700,color:"var(--ink)"}}>
                <span>Total</span>
                <span style={{color:"var(--forest)"}}>{`Rp ${cartTotal.toLocaleString("id-ID")}`}</span>
              </div>
            </div>
            <CartCheckout onDone={() => { setCart([]); setShowCart(false); }} />
          </>
        }
      </div>
    </>
  );
}

function CartCheckout({ onDone }) {
  const [done, setDone] = useState(false);
  if (done) return (
    <div style={{textAlign:"center",padding:20}}>
      <div style={{fontSize:48,marginBottom:10}}>✅</div>
      <p style={{fontFamily:"Fraunces,serif",fontSize:16,fontWeight:700,color:"var(--forest)"}}>Pesanan Dikonfirmasi!</p>
      <p style={{fontSize:12,color:"var(--muted)",margin:"6px 0 14px"}}>Pesananmu akan segera diproses dan dikirim.</p>
      <button style={{background:"var(--forest)",color:"white",border:"none",borderRadius:12,padding:"10px 20px",fontFamily:"DM Sans,sans-serif",fontWeight:700,cursor:"pointer"}} onClick={onDone}>Selesai</button>
    </div>
  );
  return <button className="checkout-btn" onClick={() => setDone(true)}>Checkout Sekarang →</button>;
}