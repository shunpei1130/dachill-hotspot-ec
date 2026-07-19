"use client";

import { useEffect, useRef, useState } from "react";

type Spot = { id: string; label: string; x: number; y: number; w: number; h: number; skin: string };

const spots: Spot[] = [
  { id: "product", label: "DACHILL STOOL 01 商品詳細", x: 39, y: 38, w: 37, h: 30, skin: "bubble" },
  { id: "specs", label: "商品詳細・スペック", x: 2, y: 61, w: 27, h: 25, skin: "board" },
  { id: "howto", label: "使い方ガイド", x: 0, y: 18, w: 39, h: 31, skin: "guide" },
  { id: "story", label: "DACHILL ブランドストーリー", x: 52, y: 0, w: 31, h: 18, skin: "neon" },
  { id: "company", label: "会社概要", x: 76, y: 14, w: 13, h: 22, skin: "poster" },
  { id: "privacy", label: "プライバシーポリシー", x: 84, y: 23, w: 12, h: 19, skin: "poster" },
  { id: "terms", label: "利用規約", x: 81, y: 57, w: 16, h: 25, skin: "sign" },
  { id: "law", label: "特定商取引法に基づく表記", x: 82, y: 35, w: 17, h: 15, skin: "receipt" },
  { id: "faq", label: "よくある質問", x: 9, y: 80, w: 20, h: 20, skin: "bag" },
  { id: "shipping", label: "配送・送料・返品", x: 53, y: 76, w: 39, h: 24, skin: "box" },
  { id: "contact", label: "お問い合わせ", x: 28, y: 80, w: 28, h: 20, skin: "machine" },
];

const faq = [
  ["何kgまで座れますか？", "耐荷重は150kgです。平らで安定した場所でご使用ください。"],
  ["車に積めますか？", "収納時は直径約25cm・厚さ約6.5cm。トランクや後部座席にも収まりやすいサイズです。"],
  ["屋外で使えますか？", "使用できます。濡れた場合は水分や汚れを拭き取り、十分に乾燥させて保管してください。"],
  ["高さは変えられますか？", "約6.5〜45cmの範囲で、使う人や場面に合わせて調整できます。"],
];

function ModalBody({ id }: { id: string }) {
  if (id === "product") return <><p className="eyebrow">座ると、もう少し話したくなる。</p><h2>DACHILL STOOL 01</h2><p className="price">¥4,980 <small>（税込・仮価格）</small></p><div className="chips"><span>BLACK</span><span>CREAM</span><span>BLUE</span></div><dl><div><dt>在庫</dt><dd>在庫あり（仮）</dd></div><div><dt>仕様</dt><dd>約1.0kg／耐荷重150kg／高さ約6.5〜45cm</dd></div></dl><a className="buy" href="#purchase-placeholder" onClick={(e)=>e.preventDefault()}>このダチを迎える <span>→</span></a><p className="note">現在は仮リンクです。Shopify / Stripeへ接続予定。</p></>;
  if (id === "specs") return <><p className="stamp">DETAILS / SPECS</p><h2>小さいのに、ちゃんと頼れる。</h2><dl className="spec-list"><div><dt>収納サイズ</dt><dd>直径 約25cm × 厚さ 約6.5cm</dd></div><div><dt>使用時の高さ</dt><dd>約6.5〜45cm</dd></div><div><dt>重量</dt><dd>約1.0kg</dd></div><div><dt>耐荷重</dt><dd>150kg</dd></div><div><dt>高さ調整</dt><dd>段階調整式</dd></div></dl></>;
  if (id === "howto") return <><p className="stamp">カンタン3ステップ！</p><h2>シュッ、ポン。もう座れる。</h2><ol className="steps"><li><b>01</b><span>ストラップで持ち運ぶ</span></li><li><b>02</b><span>両端を持って、ひねりながら伸ばす</span></li><li><b>03</b><span>好きな高さで固定。収納時は逆の手順で。</span></li></ol></>;
  if (id === "story") return <><p className="eyebrow">DACHILL STORY</p><h2>ダチと、まだ帰らない。</h2><p>帰り道の「もうちょっと話そうぜ」を、ちゃんと座れる時間に変える。DACHILLは、ダチと過ごす何でもない夜を少しだけ長くする道具です。</p><p>アウトドアのためだけでも、家具のためだけでもない。車に積んで、気が向いた場所で広げて、話が終わったら畳む。そんな軽いノリから生まれました。</p></>;
  if (id === "company") return <><p className="stamp">CLUB INFORMATION</p><h2>会社概要</h2><dl className="spec-list"><div><dt>会社名</dt><dd>DACHILL運営会社（仮）</dd></div><div><dt>代表者</dt><dd>公開前に記載</dd></div><div><dt>所在地</dt><dd>公開前に記載</dd></div><div><dt>事業内容</dt><dd>生活雑貨の企画・販売、ブランド運営</dd></div></dl></>;
  if (id === "privacy") return <><h2>プライバシーポリシー</h2><p>当サイトは、お問い合わせ・商品の購入等に必要な範囲で氏名、連絡先、配送先などの情報を取得します。</p><p>取得情報は、注文対応、配送、問い合わせ対応、サービス改善および法令上必要な対応に利用し、法令に基づく場合を除き、本人の同意なく第三者へ提供しません。</p><p className="note">制定日・事業者情報・正式な問い合わせ窓口は公開前に確定します。</p></>;
  if (id === "terms") return <><p className="stamp">PARKING RULES</p><h2>利用規約</h2><p>当サイトの画像・文章等の無断転載、サービス運営を妨げる行為、不正アクセスその他法令に反する行為を禁止します。</p><p>掲載内容は予告なく変更される場合があります。当社の責任範囲は、適用法令で認められる範囲に限られます。</p><p className="note">正式版は販売開始前に専門家確認のうえ掲載します。</p></>;
  if (id === "law") return <><p className="stamp">RECEIPT / LEGAL</p><h2>特定商取引法に基づく表記</h2><dl className="spec-list"><div><dt>販売事業者・責任者</dt><dd>公開前に記載</dd></div><div><dt>所在地・連絡先</dt><dd>請求があった場合、遅滞なく開示</dd></div><div><dt>販売価格</dt><dd>商品ページに税込表示</dd></div><div><dt>送料・支払方法</dt><dd>販売開始時に記載</dd></div><div><dt>引渡時期・返品</dt><dd>配送・返品欄に記載</dd></div></dl></>;
  if (id === "faq") return <><p className="stamp">FAQ BAG</p><h2>よくある質問</h2><div className="accordion">{faq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></>;
  if (id === "shipping") return <><p className="stamp">HANDLE WITH CHILL</p><h2>配送・送料・返品</h2><dl className="spec-list"><div><dt>発送目安</dt><dd>注文確定後3〜5営業日以内（仮）</dd></div><div><dt>配送料</dt><dd>全国一律料金を予定。購入画面で表示します。</dd></div><div><dt>返品・交換</dt><dd>初期不良・誤配送は到着後7日以内にご連絡ください。お客様都合の条件は販売開始時に明示します。</dd></div></dl></>;
  return <><p className="stamp">CHILL LINE</p><h2>お問い合わせ</h2><form onSubmit={(e)=>e.preventDefault()}><label>お名前<input name="name" autoComplete="name" /></label><label>メールアドレス<input type="email" name="email" autoComplete="email" /></label><label>お問い合わせ内容<textarea name="message" rows={4} /></label><button type="submit">送信する（デモ）</button><p className="note">このプロトタイプでは送信されません。</p></form></>;
}

export default function Home() {
  const [active, setActive] = useState<Spot | null>(null);
  const [hint, setHint] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetHint = () => { setHint(false); if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(()=>setHint(true), 5500); };
  useEffect(()=>{ resetHint(); return ()=>{ if(timer.current) clearTimeout(timer.current); }; },[]);
  useEffect(()=>{ if(!active) return; const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setActive(null)}; document.addEventListener("keydown",onKey); document.body.classList.add("modal-open"); return()=>{document.removeEventListener("keydown",onKey);document.body.classList.remove("modal-open")}; },[active]);

  return <main className="world" onPointerMove={resetHint} onPointerDown={resetHint}>
    <div className="intro" aria-hidden="true"><span>DACHILL</span><i>ダチと、まだ帰らない。</i></div>
    <div className="scene">
      <img src="/dachill-world.png" alt="深夜のコンビニ前で友人たちがDACHILLのスツールを囲んで過ごす漫画風イラスト" draggable="false" />
      {spots.map((spot)=><button key={spot.id} className={`hotspot ${hint?"hint":""}`} style={{left:`${spot.x}%`,top:`${spot.y}%`,width:`${spot.w}%`,height:`${spot.h}%`}} aria-label={spot.label} onClick={()=>setActive(spot)}><span>{spot.label}<b>＋</b></span></button>)}
    </div>
    {active && <div className="overlay" role="presentation" onMouseDown={(e)=>{if(e.target===e.currentTarget)setActive(null)}}>
      <section className={`modal ${active.skin}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="close" onClick={()=>setActive(null)} aria-label="閉じる">×</button>
        <div id="modal-title"><ModalBody id={active.id}/></div>
      </section>
    </div>}
  </main>;
}
