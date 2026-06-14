import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Calendar, Clock, Users, MapPin, Phone, Mail, Instagram, Facebook,
  Star, ChevronRight, ChevronLeft, X, Menu, Check, CreditCard, Gift,
  Trophy, Flame, ArrowRight, Sparkles, Heart, Lock, User as UserIcon,
  LogOut, Plus, Minus, ShieldCheck, Ticket, PartyPopper, Send, Globe,
  LayoutDashboard, Ban, Wallet, TrendingUp, LogIn, UserPlus, Trash2, Award
} from "lucide-react";

/* ============================== STYLES ============================== */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

:root{
  --petrol:#0E4D52; --petrol-deep:#0A383C; --petrol-2:#10595F;
  --cream:#F5EBDD; --cream-2:#EFE2D0;
  --coral:#E84A3F; --coral-deep:#C9382E;
  --yellow:#F4C430; --pink:#FF3D7F;
  --ink:#142A2C; --muted:#5a6b6c;
  --display:'Unbounded',system-ui,sans-serif;
  --body:'Manrope','Inter',system-ui,sans-serif;
  --chalk:'Caveat',cursive;
  --r:22px;
}
*{box-sizing:border-box}
.mah{font-family:var(--body);color:var(--ink);background:var(--cream);line-height:1.5;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.mah h1,.mah h2,.mah h3,.mah h4{font-family:var(--display);font-weight:800;line-height:1.02;letter-spacing:-.01em;margin:0}
.mah p{margin:0}
.mah button{font-family:var(--body);cursor:pointer;border:none;background:none}
.wrap{max-width:1140px;margin:0 auto;padding:0 22px}
.grain{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:.05;mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

/* buttons */
.btn{display:inline-flex;align-items:center;gap:9px;font-weight:800;font-size:16px;border-radius:999px;
  padding:15px 26px;transition:transform .12s ease,box-shadow .12s ease,background .2s;white-space:nowrap}
.btn:active{transform:translateY(1px)}
.btn-coral{background:var(--coral);color:#fff;box-shadow:0 6px 0 var(--coral-deep)}
.btn-coral:hover{transform:translateY(-2px);box-shadow:0 8px 0 var(--coral-deep)}
.btn-cream{background:var(--cream);color:var(--ink);box-shadow:0 6px 0 var(--cream-2)}
.btn-cream:hover{transform:translateY(-2px)}
.btn-ink{background:var(--ink);color:var(--cream);box-shadow:0 6px 0 #000}
.btn-ink:hover{transform:translateY(-2px)}
.btn-pink{background:var(--pink);color:#1a0010;box-shadow:0 6px 0 #c11d57}
.btn-pink:hover{transform:translateY(-2px)}
.btn-ghost{background:transparent;border:2px solid currentColor;border-radius:999px;padding:13px 22px;font-weight:800}
.btn-sm{padding:10px 18px;font-size:14px;box-shadow:0 4px 0 rgba(0,0,0,.18)}
.btn:disabled{opacity:.45;cursor:not-allowed;transform:none}

/* nav */
.nav{position:sticky;top:0;z-index:60;background:rgba(245,235,221,.86);backdrop-filter:blur(10px);border-bottom:2px solid rgba(20,42,44,.08)}
.nav-in{display:flex;align-items:center;justify-content:space-between;height:72px}
.logo{font-family:var(--display);font-weight:900;font-size:26px;letter-spacing:.04em;color:var(--petrol);display:flex;align-items:center;gap:8px}
.logo .dot{width:11px;height:11px;border-radius:50%;background:var(--coral);box-shadow:0 0 0 4px rgba(232,74,63,.18)}
.nav-links{display:flex;gap:26px;align-items:center}
.nav-links a{color:var(--ink);text-decoration:none;font-weight:700;font-size:15px;position:relative;padding:4px 0}
.nav-links a:hover{color:var(--coral)}
.nav-links a.act{color:var(--coral)}
.nav-links a.act:after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:3px;border-radius:3px;background:var(--coral)}
.page-min{min-height:62vh}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:30px}
@media(max-width:820px){.tiles{grid-template-columns:1fr 1fr}}
@media(max-width:480px){.tiles{grid-template-columns:1fr}}
.tile{position:relative;text-align:left;background:var(--cream);border:3px solid var(--ink);border-radius:var(--r);padding:22px 20px;display:flex;flex-direction:column;gap:4px;transition:transform .14s;box-shadow:0 8px 0 rgba(0,0,0,.1)}
.tile:hover{transform:translateY(-5px) rotate(-.4deg)}
.tile .te{font-size:38px}
.tile .tt{font-family:var(--display);font-weight:800;font-size:18px;margin-top:4px}
.tile .td{font-size:13px;color:var(--muted);font-weight:600}
.tile .ta{position:absolute;top:18px;right:18px;color:var(--coral)}
.nav-right{display:flex;align-items:center;gap:12px}
.lang{display:flex;align-items:center;gap:5px;font-weight:800;font-size:13px;color:var(--petrol);border:2px solid rgba(14,77,82,.25);border-radius:999px;padding:7px 11px}
.userchip{display:inline-flex;align-items:center;gap:7px;font-weight:800;font-size:14px;color:var(--petrol);border:2px solid rgba(14,77,82,.25);border-radius:999px;padding:7px 13px;background:#fff}
.userchip:hover{border-color:var(--coral)}
.userchip .av{width:24px;height:24px;border-radius:50%;background:var(--coral);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900}
@media(max-width:560px){.userchip .uname{display:none}}
.authtabs{display:flex;gap:6px;margin-bottom:18px;background:rgba(20,42,44,.06);padding:5px;border-radius:13px}
.authtab{flex:1;padding:10px;border-radius:9px;font-weight:800;font-size:14px;color:var(--muted)}
.authtab.on{background:#fff;color:var(--ink);box-shadow:0 2px 6px rgba(0,0,0,.08)}
.gbtn{width:100%;justify-content:center;background:#fff;border:2px solid rgba(20,42,44,.18);color:var(--ink);font-weight:800;border-radius:13px;padding:13px;display:flex;align-items:center;gap:9px}
.gbtn:hover{border-color:var(--coral)}
.ordiv{display:flex;align-items:center;gap:12px;margin:16px 0;color:var(--muted);font-size:12px;font-weight:700}
.ordiv:before,.ordiv:after{content:"";flex:1;height:1px;background:rgba(20,42,44,.14)}
.authnote{font-size:12px;color:var(--muted);font-weight:600;margin-top:16px;display:flex;gap:7px;align-items:flex-start;background:rgba(244,196,48,.16);border:1px solid rgba(244,196,48,.5);border-radius:11px;padding:10px 12px}
.authalt{text-align:center;margin-top:16px;font-size:13.5px;font-weight:700;color:var(--muted)}
.authalt b{color:var(--coral);cursor:pointer}
.prof-pts{display:flex;gap:12px;margin:4px 0 18px}
.prof-pts .pp{flex:1;background:#fff;border:2px solid rgba(20,42,44,.12);border-radius:14px;padding:14px;text-align:center}
.prof-pts .pp b{font-family:var(--display);font-size:26px;display:block;color:var(--coral)}
.prof-pts .pp span{font-size:12px;font-weight:700;color:var(--muted)}
.mybk{display:flex;flex-direction:column;gap:8px}
.mybk .row{display:flex;justify-content:space-between;align-items:center;background:#fff;border:2px solid rgba(20,42,44,.1);border-radius:12px;padding:12px 14px;font-weight:600;font-size:14px}
.mybk .row small{color:var(--muted);font-weight:600}
.burger{display:none}
@media(max-width:880px){
  .nav-links{display:none}
  .burger{display:inline-flex}
  .mnav{position:fixed;inset:72px 0 auto 0;background:var(--cream);border-bottom:3px solid var(--ink);padding:16px 22px;z-index:55;display:flex;flex-direction:column;gap:4px}
  .mnav a{padding:14px 6px;font-weight:800;font-size:19px;text-decoration:none;color:var(--ink);border-bottom:1px dashed rgba(20,42,44,.2)}
}

/* hero */
.hero{position:relative;background:var(--petrol);color:var(--cream);overflow:hidden;padding:64px 0 0}
.hero-grid{position:absolute;inset:0;opacity:.10;background-image:linear-gradient(rgba(245,235,221,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(245,235,221,.5) 1px,transparent 1px);background-size:46px 46px}
.eyebrow{font-family:var(--chalk);font-size:30px;color:var(--yellow);transform:rotate(-3deg);display:inline-block;margin-bottom:6px}
.hero h1{font-size:clamp(64px,16vw,168px);font-weight:900;letter-spacing:-.02em;line-height:.86;color:var(--cream);text-shadow:6px 6px 0 var(--coral)}
.hero .slogan{font-family:var(--chalk);font-size:clamp(34px,7vw,58px);color:var(--yellow);transform:rotate(-2deg);margin-top:6px}
.hero-sub{font-size:18px;max-width:520px;color:rgba(245,235,221,.82);margin:18px 0 26px;font-weight:500}
.hero-cta{display:flex;gap:14px;flex-wrap:wrap}
.hero-mascot{position:relative;display:flex;align-items:center;justify-content:center;min-height:340px}

/* hopscotch / how it works */
.hop{display:grid;gap:10px;width:200px;margin:0 auto;transform:rotate(3deg)}
.hop-row{display:flex;gap:10px;justify-content:center}
.hopc{width:90px;height:90px;border:3px solid var(--cream);border-radius:14px;display:flex;align-items:center;justify-content:center;
  font-family:var(--display);font-weight:900;font-size:34px;color:var(--cream);position:relative}
.hopc.full{width:190px}
.hopc:nth-child(1){background:rgba(232,74,63,.25)}
.hopc.a{background:rgba(244,196,48,.22)}
.hopc.b{background:rgba(255,61,127,.18)}

@media(max-width:820px){.hero-cols{grid-template-columns:1fr!important}.hero-mascot{min-height:220px;order:-1}.hero h1{text-shadow:4px 4px 0 var(--coral)}}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:54px;position:relative;z-index:2}
.step{background:var(--cream);color:var(--ink);border-radius:var(--r);padding:22px;box-shadow:0 8px 0 rgba(0,0,0,.14)}
.step .num{font-family:var(--display);font-weight:900;font-size:46px;line-height:1;color:var(--coral)}
.step h4{font-size:19px;margin:8px 0 4px}
.step p{font-size:14.5px;color:var(--muted);font-weight:500}
@media(max-width:760px){.steps{grid-template-columns:1fr}}

/* marquee */
.marq{background:var(--coral);color:var(--cream);overflow:hidden;border-top:3px solid var(--ink);border-bottom:3px solid var(--ink);padding:13px 0;white-space:nowrap}
.marq-track{display:inline-flex;gap:34px;animation:slide 24s linear infinite;font-family:var(--display);font-weight:800;font-size:19px;letter-spacing:.02em}
.marq-track span{display:inline-flex;align-items:center;gap:34px}
@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* sections */
.sec{padding:78px 0}
.sec-petrol{background:var(--petrol);color:var(--cream)}
.kicker{font-family:var(--chalk);font-size:27px;color:var(--coral);transform:rotate(-2deg);display:inline-block}
.sec-petrol .kicker{color:var(--yellow)}
.h2{font-size:clamp(34px,6vw,58px);margin:2px 0 10px}
.lead{font-size:17px;color:var(--muted);max-width:560px;font-weight:500}
.sec-petrol .lead{color:rgba(245,235,221,.78)}

/* game cards */
.games{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
@media(max-width:860px){.games{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.games{grid-template-columns:1fr}}
.gcard{background:var(--cream);border:3px solid var(--ink);border-radius:var(--r);padding:20px;transition:transform .14s;position:relative;overflow:hidden}
.gcard:hover{transform:translateY(-5px) rotate(-.5deg)}
.gcard .emoji{font-size:44px;line-height:1}
.gcard h3{font-size:21px;margin:12px 0 6px}
.gcard p{font-size:14px;color:var(--muted);font-weight:500;min-height:40px}
.gmeta{display:flex;justify-content:space-between;align-items:center;margin-top:14px;font-size:13px;font-weight:700}
.gmeta .ppl{display:flex;align-items:center;gap:5px;color:var(--petrol)}
.fire{letter-spacing:-2px}
.tag-sg{position:absolute;top:0;right:0;background:var(--pink);color:#1a0010;font-family:var(--display);font-weight:800;font-size:11px;padding:5px 12px;border-bottom-left-radius:12px;letter-spacing:.04em}

/* pricing */
.packs{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
@media(max-width:900px){.packs{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.packs{grid-template-columns:1fr}}
.pack{background:var(--cream);border-radius:var(--r);padding:24px;display:flex;flex-direction:column;border:3px solid var(--ink);box-shadow:0 8px 0 rgba(0,0,0,.12)}
.pack.hot{background:var(--yellow)}
.pack.sg{background:var(--ink);color:var(--cream);border-color:var(--pink)}
.pack .ico{width:50px;height:50px;border-radius:14px;background:var(--petrol);color:var(--cream);display:flex;align-items:center;justify-content:center;margin-bottom:12px}
.pack.sg .ico{background:var(--pink);color:#1a0010}
.pack h3{font-size:22px}
.pack .price{font-family:var(--display);font-weight:900;font-size:34px;margin:8px 0 2px}
.pack .per{font-size:13px;color:var(--muted);font-weight:600}
.pack.sg .per{color:rgba(245,235,221,.7)}
.pack ul{list-style:none;padding:0;margin:16px 0;display:flex;flex-direction:column;gap:9px;flex:1}
.pack li{display:flex;gap:9px;font-size:14px;font-weight:600;align-items:flex-start}
.pack li svg{flex:none;margin-top:2px;color:var(--coral)}
.pack.sg li svg{color:var(--pink)}

/* tournaments */
.tour-list{display:flex;flex-direction:column;gap:14px;margin-top:34px}
.tour{display:flex;align-items:center;gap:18px;background:rgba(245,235,221,.06);border:2px solid rgba(245,235,221,.16);border-radius:18px;padding:18px 20px;flex-wrap:wrap}
.tour .date{font-family:var(--display);font-weight:900;text-align:center;line-height:1;min-width:64px}
.tour .date .d{font-size:34px;color:var(--pink)}
.tour .date .m{font-size:13px;color:var(--yellow);text-transform:uppercase;letter-spacing:.08em}
.tour .info{flex:1;min-width:200px}
.tour .info h4{font-size:19px}
.tour .info p{font-size:13.5px;color:rgba(245,235,221,.7);font-weight:500;margin-top:3px}
.pill{display:inline-flex;align-items:center;gap:6px;background:rgba(255,61,127,.16);color:var(--pink);border-radius:999px;padding:5px 12px;font-size:12px;font-weight:800;border:1px solid rgba(255,61,127,.4)}

/* about */
.about{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}
@media(max-width:800px){.about{grid-template-columns:1fr}}
.stat-row{display:flex;gap:14px;margin-top:24px;flex-wrap:wrap}
.stat{background:var(--cream);border:3px solid var(--ink);border-radius:18px;padding:16px 20px;text-align:center;flex:1;min-width:120px}
.stat b{font-family:var(--display);font-size:34px;color:var(--coral);display:block;line-height:1}
.stat span{font-size:13px;font-weight:700;color:var(--muted)}
.polaroid{background:#fff;padding:14px 14px 50px;border-radius:8px;box-shadow:0 14px 34px rgba(0,0,0,.22);transform:rotate(3deg);position:relative}
.polaroid .pic{height:300px;border-radius:4px;background:
  radial-gradient(circle at 30% 30%,var(--yellow),transparent 50%),
  radial-gradient(circle at 75% 65%,var(--coral),transparent 55%),var(--petrol);
  display:flex;align-items:center;justify-content:center;font-size:90px}
.polaroid .cap{font-family:var(--chalk);font-size:26px;text-align:center;margin-top:12px;color:var(--ink)}

/* reviews */
.revs{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:34px}
@media(max-width:820px){.revs{grid-template-columns:1fr}}
.rev{background:var(--cream);border-radius:18px;padding:20px;border:3px solid var(--ink)}
.rev .stars{color:var(--yellow);display:flex;gap:2px;margin-bottom:10px}
.rev p{font-size:15px;font-weight:600;font-style:italic}
.rev .who{margin-top:12px;font-weight:800;font-size:14px;color:var(--petrol)}

/* contact */
.contact{display:grid;grid-template-columns:1fr 1fr;gap:34px}
@media(max-width:780px){.contact{grid-template-columns:1fr}}
.cinfo{display:flex;flex-direction:column;gap:16px}
.cline{display:flex;gap:13px;align-items:flex-start;font-weight:600}
.cline .ci{width:42px;height:42px;border-radius:12px;background:var(--coral);color:#fff;display:flex;align-items:center;justify-content:center;flex:none}
.map{height:200px;border-radius:18px;border:3px solid var(--ink);margin-top:6px;overflow:hidden;position:relative;
  background:repeating-linear-gradient(45deg,var(--cream-2),var(--cream-2) 16px,var(--cream) 16px,var(--cream) 32px)}
.map .pin{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;color:var(--coral);font-weight:800}

/* forms */
.field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
.field label{font-size:13px;font-weight:800;color:var(--ink)}
.input{font-family:var(--body);font-size:15px;font-weight:600;padding:13px 15px;border-radius:13px;border:2px solid rgba(20,42,44,.18);background:#fff;color:var(--ink);width:100%}
.input:focus{outline:none;border-color:var(--coral)}
textarea.input{resize:vertical;min-height:90px}

/* footer */
.foot{background:var(--ink);color:var(--cream);padding:60px 0 26px}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.3fr;gap:30px}
@media(max-width:760px){.foot-grid{grid-template-columns:1fr 1fr}}
.foot h5{font-family:var(--display);font-size:15px;margin-bottom:14px;color:var(--yellow);letter-spacing:.03em}
.foot a{color:rgba(245,235,221,.8);text-decoration:none;font-size:14px;font-weight:600;display:block;padding:5px 0}
.foot a:hover{color:var(--coral)}
.socials{display:flex;gap:10px;margin-top:6px}
.socials a{width:40px;height:40px;border-radius:12px;background:rgba(245,235,221,.1);display:flex;align-items:center;justify-content:center}
.socials a:hover{background:var(--coral)}
.foot-bottom{border-top:1px solid rgba(245,235,221,.14);margin-top:36px;padding-top:20px;display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;font-size:13px;color:rgba(245,235,221,.6)}

/* modal */
.overlay{position:fixed;inset:0;background:rgba(10,40,42,.6);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:flex-start;justify-content:center;padding:24px;overflow-y:auto}
.modal{background:var(--cream);border-radius:26px;max-width:560px;width:100%;border:4px solid var(--ink);box-shadow:0 24px 60px rgba(0,0,0,.4);margin:auto;overflow:hidden}
.modal.wide{max-width:920px}
.modal-head{display:flex;align-items:center;justify-content:between;padding:20px 24px;background:var(--petrol);color:var(--cream)}
.modal-head h3{font-size:21px;flex:1}
.modal-x{width:38px;height:38px;border-radius:50%;background:rgba(245,235,221,.14);color:var(--cream);display:flex;align-items:center;justify-content:center}
.modal-x:hover{background:var(--coral)}
.modal-body{padding:24px}

/* steps progress */
.prog{display:flex;gap:6px;margin-bottom:20px}
.prog div{flex:1;height:6px;border-radius:99px;background:rgba(20,42,44,.14)}
.prog div.on{background:var(--coral)}

.choose{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:520px){.choose{grid-template-columns:1fr}}
.choice{text-align:left;border:2px solid rgba(20,42,44,.18);background:#fff;border-radius:14px;padding:14px;display:flex;gap:12px;align-items:center;transition:.12s}
.choice:hover{border-color:var(--coral);transform:translateY(-2px)}
.choice.sel{border-color:var(--coral);background:#fff3f1;box-shadow:0 4px 0 var(--coral)}
.choice .ci{width:42px;height:42px;border-radius:11px;background:var(--petrol);color:#fff;display:flex;align-items:center;justify-content:center;flex:none}
.choice b{font-size:15px;display:block}
.choice small{color:var(--muted);font-weight:600;font-size:12.5px}

.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:7px}
.day{aspect-ratio:1;border-radius:11px;border:2px solid rgba(20,42,44,.12);background:#fff;font-weight:800;font-size:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--ink)}
.day small{font-size:9px;font-weight:700;color:var(--muted)}
.day:hover:not(:disabled){border-color:var(--coral)}
.day.sel{background:var(--coral);color:#fff;border-color:var(--coral)}
.day:disabled{opacity:.3;cursor:not-allowed}
.day.blk{background:repeating-linear-gradient(45deg,#eee,#eee 4px,#ddd 4px,#ddd 8px);color:#999}
.dow{display:grid;grid-template-columns:repeat(7,1fr);gap:7px;margin-bottom:6px}
.dow span{text-align:center;font-size:11px;font-weight:800;color:var(--muted)}

.slots{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px}
.slot{border-radius:12px;border:2px solid rgba(20,42,44,.14);background:#fff;padding:11px;font-weight:800;text-align:center;font-size:14px;color:var(--ink)}
.slot small{display:block;font-size:10px;font-weight:700;color:var(--muted);margin-top:2px}
.slot.sel{background:var(--coral);color:#fff;border-color:var(--coral)}
.slot.sel small{color:rgba(255,255,255,.85)}
.slot:disabled{opacity:.4;cursor:not-allowed}
.slot.free small{color:#1c8a4a}

.stepper{display:flex;align-items:center;gap:0;border:2px solid rgba(20,42,44,.18);border-radius:13px;overflow:hidden;width:fit-content}
.stepper button{width:46px;height:46px;background:var(--cream-2);font-size:20px;font-weight:900;color:var(--ink)}
.stepper button:hover{background:var(--yellow)}
.stepper span{min-width:64px;text-align:center;font-weight:900;font-size:18px}

.summary{background:#fff;border-radius:16px;padding:18px;border:2px dashed rgba(20,42,44,.2)}
.srow{display:flex;justify-content:space-between;padding:7px 0;font-weight:600;font-size:14.5px;border-bottom:1px dashed rgba(20,42,44,.12)}
.srow:last-child{border:none}
.srow.total{font-family:var(--display);font-weight:900;font-size:20px;color:var(--coral);padding-top:12px}

.success{text-align:center;padding:14px 0}
.success .ring{width:84px;height:84px;border-radius:50%;background:#1c8a4a;color:#fff;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.code{font-family:var(--display);font-weight:900;font-size:30px;letter-spacing:.14em;background:var(--ink);color:var(--yellow);border-radius:14px;padding:12px 18px;display:inline-block;margin:10px 0}

/* admin */
.adash{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
@media(max-width:640px){.adash{grid-template-columns:1fr 1fr}}
.kpi{background:#fff;border:2px solid rgba(20,42,44,.12);border-radius:16px;padding:16px}
.kpi .l{font-size:12px;font-weight:800;color:var(--muted);display:flex;align-items:center;gap:6px}
.kpi b{font-family:var(--display);font-size:28px;display:block;margin-top:4px}
.atable{margin-top:18px;border:2px solid rgba(20,42,44,.12);border-radius:14px;overflow:hidden}
.atable .ar{display:grid;grid-template-columns:1.25fr 1fr .9fr .5fr .8fr 38px;gap:8px;padding:11px 14px;font-size:13px;font-weight:600;align-items:center;border-bottom:1px solid rgba(20,42,44,.08)}
.atable .ar.head{background:var(--petrol);color:var(--cream);font-weight:800}
.atable .ar:last-child{border:none}
.badge{font-size:11px;font-weight:800;padding:3px 9px;border-radius:99px;background:#e7f6ec;color:#1c8a4a;text-align:center}
.badge.paid{background:#e7f6ec;color:#1c8a4a}
.badge.onsite{background:#fff0d6;color:#a86b00}
.atabs{display:flex;gap:6px;margin:18px 0 14px;background:rgba(20,42,44,.06);padding:5px;border-radius:13px}
.atab{flex:1;padding:9px;border-radius:9px;font-weight:800;font-size:13.5px;color:var(--muted)}
.atab.on{background:#fff;color:var(--ink);box-shadow:0 2px 6px rgba(0,0,0,.08)}
.addbox{background:#fff;border:2px dashed rgba(20,42,44,.22);border-radius:14px;padding:16px;margin-bottom:14px}
.addgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:560px){.addgrid{grid-template-columns:1fr}}
.aslots{display:flex;flex-wrap:wrap;gap:6px}
.aslot{border:2px solid rgba(20,42,44,.16);background:#fff;border-radius:10px;padding:7px 11px;font-weight:800;font-size:13px;color:var(--ink)}
.aslot.on{background:var(--coral);color:#fff;border-color:var(--coral)}
.aslot:disabled{opacity:.4;cursor:not-allowed}
.rm{width:32px;height:32px;border-radius:9px;background:#fbeaea;color:#c9382e;display:flex;align-items:center;justify-content:center}
.rm:hover{background:#c9382e;color:#fff}
.cli{display:flex;align-items:center;gap:12px;background:#fff;border:2px solid rgba(20,42,44,.1);border-radius:12px;padding:11px 14px;margin-bottom:8px}
.cli .cinfo2{flex:1;min-width:0}
.cli .cinfo2 b{font-size:14px}
.cli .cinfo2 small{color:var(--muted);font-size:12px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cli .clvl{font-size:20px}
.cli .cpts{font-family:var(--display);font-weight:900;color:var(--coral);font-size:18px;min-width:50px;text-align:right}
.padj{display:flex;gap:5px}
.padj button{width:30px;height:30px;border-radius:8px;font-weight:900;border:2px solid rgba(20,42,44,.16);background:var(--cream);font-size:14px;color:var(--ink)}
.padj button:hover{background:var(--yellow)}
.lvlcard{background:var(--petrol);color:var(--cream);border-radius:16px;padding:16px;margin-bottom:16px}
.lvltop{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
.lvlname{display:flex;gap:10px;align-items:center}
.lvlicon{font-size:30px}
.lvlname b{font-size:16px;display:block}
.lvlname small{font-size:12px;color:rgba(245,235,221,.78);font-weight:600}
.lvlpts{text-align:right}
.lvlpts b{font-family:var(--display);font-size:26px;line-height:1;color:var(--yellow);display:block}
.lvlpts span{font-size:11px;color:rgba(245,235,221,.75);font-weight:700}
.lvlbar{height:9px;border-radius:99px;background:rgba(245,235,221,.18);margin:14px 0 8px;overflow:hidden}
.lvlbar span{display:block;height:100%;border-radius:99px;background:var(--coral)}
.lvlnext{font-size:12.5px;font-weight:700;color:rgba(245,235,221,.85)}

.toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--cream);padding:14px 22px;border-radius:14px;font-weight:700;z-index:200;box-shadow:0 10px 30px rgba(0,0,0,.3);display:flex;gap:9px;align-items:center}

.chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.chip{font-size:12px;font-weight:800;padding:6px 12px;border-radius:99px;border:2px solid rgba(20,42,44,.16);background:#fff}
.chip.on{background:var(--ink);color:var(--cream);border-color:var(--ink)}

@media(prefers-reduced-motion:reduce){
  *{animation:none!important;transition:none!important}
}
`;

/* ============================== DATA ============================== */
const T = {
  bg: {
    nav: ["Игрите", "Цени", "Турнири", "За нас", "Контакти"],
    book: "Резервирай слот",
    eyebrow: "Излез да играеш.",
    slogan: "Където детството не свършва.",
    heroSub: "Голяма закрита зала в София за игрите, с които пораснахме. Скачане на ластик, дама, народна топка, дървен философ и Squid Game вечери. Доведи бандата.",
    seeGames: "Виж игрите",
    steps: [
      ["Избери час", "Свободен слот в реално време — за час."],
      ["Доведи бандата", "Приятели, колеги или цялата фамилия."],
      ["Играй", "Ние се грижим за всичко. Ти само губиш дъх."],
    ],
    gamesK: "Каталог", gamesH: "Игрите от двора",
    gamesL: "Всичко, което играехме до тъмно — на едно място, на закрито, целогодишно.",
    priceK: "Пакети и цени", priceH: "Избери своя режим",
    priceL: "Цените са за ориентир и важат при онлайн резервация. Депозит за големи събития — 30%.",
    tourK: "Squid Game вечери", tourH: "Предстоящи турнири",
    tourL: "Отбори, елиминации, награден фонд. Розовите гащеризони ги осигуряваме ние.",
    signTeam: "Запиши отбор",
    aboutK: "Историята", aboutH: "Върнахме детството в София",
    aboutP: "МАХАЛА започна с един въпрос: защо спряхме да играем навън? Построихме мястото, където го правим пак — на закрито, без кал и без \"прибирай се, че се стъмни\". Тук народната топка е сериозен спорт, а дамата с тебешир има шампиони.",
    revK: "Отзиви", revH: "Какво казва махалата",
    conK: "Намери ни", conH: "Ела да играеш",
    conL: "В сърцето на София. Паркинг наблизо, метро на 5 минути.",
    formName: "Име", formPhone: "Телефон", formEmail: "Имейл", formMsg: "Съобщение",
    send: "Изпрати запитване",
    newsTitle: "Не изпускай нито един турнир",
    newsSub: "Запиши се за бюлетина — пишем рядко, само за важното.",
    newsBtn: "Запиши ме",
    footTagline: "Залата, която връща детството. София.",
  },
  en: {
    nav: ["Games", "Pricing", "Tournaments", "About", "Contact"],
    book: "Book a slot",
    eyebrow: "Come out and play.",
    slogan: "Where childhood never ends.",
    heroSub: "A big indoor playground in Sofia for the games we grew up with. Jump-rope elastics, hopscotch, dodgeball, red-light-green-light and Squid Game nights. Bring the crew.",
    seeGames: "See the games",
    steps: [
      ["Pick a time", "A free real-time slot — by the hour."],
      ["Bring the crew", "Friends, coworkers or the whole family."],
      ["Play", "We handle everything. You just lose your breath."],
    ],
    gamesK: "Catalogue", gamesH: "Games from the block",
    gamesL: "Everything we played until dark — in one place, indoors, all year round.",
    priceK: "Packages & pricing", priceH: "Choose your mode",
    priceL: "Prices are indicative and apply to online bookings. Deposit for big events — 30%.",
    tourK: "Squid Game nights", tourH: "Upcoming tournaments",
    tourL: "Teams, eliminations, prize pool. The pink jumpsuits are on us.",
    signTeam: "Sign up a team",
    aboutK: "The story", aboutH: "We brought childhood back to Sofia",
    aboutP: "MAHALA started with one question: why did we stop playing outside? We built the place where we do it again — indoors, no mud, no \"come home, it's getting dark\". Here dodgeball is a serious sport and chalk hopscotch has champions.",
    revK: "Reviews", revH: "What the block says",
    conK: "Find us", conH: "Come play",
    conL: "In the heart of Sofia. Parking nearby, metro 5 minutes away.",
    formName: "Name", formPhone: "Phone", formEmail: "Email", formMsg: "Message",
    send: "Send inquiry",
    newsTitle: "Never miss a tournament",
    newsSub: "Join the newsletter — we write rarely, only for the good stuff.",
    newsBtn: "Sign me up",
    footTagline: "The hall that brings childhood back. Sofia.",
  },
};

const GAMES = [
  { emoji: "🪢", bg: ["Скачане на ластик", "Класиката от двора. Прескачай все по-високо, докато издържиш."], en: ["Elastic jump", "The yard classic. Jump higher and higher until you drop."], fire: 3, p: "2-6" },
  { emoji: "🔴", bg: ["Дървен философ", "Червена светлина, зелена светлина. Мръднеш ли — отпадаш.", true], en: ["Red light, green light", "Move and you're out. Squid Game style.", true], fire: 5, p: "6-40", sg: true },
  { emoji: "✏️", bg: ["Дама", "Тебешир, камъче и баланс. По-трудно е, отколкото помниш."], en: ["Hopscotch", "Chalk, a pebble and balance. Harder than you remember."], fire: 2, p: "1-4" },
  { emoji: "🏐", bg: ["Народна топка", "Вечната война между два отбора. Без милост."], en: ["Dodgeball", "The eternal war between two teams. No mercy."], fire: 4, p: "8-16" },
  { emoji: "🔵", bg: ["Топчета", "Прицел, чалга и малко късмет. Стъклените са на залог."], en: ["Marbles", "Aim, swagger and a bit of luck. Glass ones at stake."], fire: 2, p: "2-6" },
  { emoji: "🙈", bg: ["Криеница", "1, 2, 3... 100. Залата е голяма, скривалищата — безкрайни."], en: ["Hide & seek", "1, 2, 3... 100. The hall is big, hiding spots endless."], fire: 3, p: "4-20" },
  { emoji: "🎲", bg: ["Не се сърди, човече", "Хвърли зара, изяж пуловете, скарай се с приятели."], en: ["Ludo", "Roll the dice, eat the pieces, fight your friends."], fire: 1, p: "2-4" },
  { emoji: "🏃", bg: ["Гоненица", "Прост принцип, безкрайна умора. Ти гониш."], en: ["Tag", "Simple rules, endless exhaustion. You're it."], fire: 3, p: "4-30" },
  { emoji: "🥏", bg: ["Народна щафета", "Отбори, препятствия, рев. Тиймбилдинг без презентации."], en: ["Relay race", "Teams, obstacles, screaming. Teambuilding without slides."], fire: 4, p: "8-40" },
];

const PACKAGES = [
  { id: "free", icon: <Users size={22} />, bg: ["Свободна игра", "€9", "/човек на час"], en: ["Free play", "€9", "/person per hour"],
    bgF: ["Достъп до всички игри", "По избор час и хора", "Без записване от вкъщи", "Реквизит включен"],
    enF: ["Access to all games", "Pick hour & headcount", "Walk-in friendly", "Gear included"], price: 9, kind: "perPerson" },
  { id: "birthday", icon: <PartyPopper size={22} />, bg: ["Рожден ден", "от €149", "до 12 души · 2 часа"], en: ["Birthday", "from €149", "up to 12 · 2 hours"],
    bgF: ["Запазена зона 2 часа", "Аниматор по избор", "Торта и напитки (опция)", "Деца или възрастни"],
    enF: ["Reserved zone 2h", "Optional host", "Cake & drinks (add-on)", "Kids or adults"], price: 149, kind: "flat", hot: true },
  { id: "team", icon: <Trophy size={22} />, bg: ["Тийм-билдинг", "€24", "/човек · мин. 8"], en: ["Teambuilding", "€24", "/person · min. 8"],
    bgF: ["Отборни игри и щафети", "Класиране и награди", "Кетъринг по заявка", "Фактура за фирмата"],
    enF: ["Team games & relays", "Leaderboard & prizes", "Catering on request", "Company invoice"], price: 24, kind: "perPerson" },
  { id: "tournament", icon: <Flame size={22} />, bg: ["Squid Game турнир", "€22", "/човек · награден фонд"], en: ["Squid Game tourney", "€22", "/person · prize pool"],
    bgF: ["Елиминации до финал", "Гащеризони и номера", "Награден фонд за победителя", "Фотограф включен"],
    enF: ["Eliminations to final", "Jumpsuits & numbers", "Cash prize for the winner", "Photographer included"], price: 22, kind: "perPerson", sg: true },
  { id: "private", icon: <Lock size={22} />, bg: ["Цялата зала", "от €450", "/3 часа · до 60 души"], en: ["Whole venue", "from €450", "/3 hours · up to 60"],
    bgF: ["Само за твоята група", "Всички игри отключени", "Бар и музика по избор", "Депозит 30%"],
    enF: ["Your group only", "All games unlocked", "Bar & your playlist", "30% deposit"], price: 450, kind: "flat" },
  { id: "voucher", icon: <Gift size={22} />, bg: ["Подаръчен ваучер", "по избор", "перфектен подарък"], en: ["Gift voucher", "any value", "the perfect gift"],
    bgF: ["Сума по избор", "Код веднага по имейл", "Валиден 12 месеца", "За всеки пакет"],
    enF: ["Choose the amount", "Instant code by email", "Valid 12 months", "For any package"], price: 0, kind: "voucher" },
];

const REVIEWS = [
  { bg: ["Заведох екипа на тийм-билдинг и шефът ме гони на народна топка цял час. 10/10.", "— Мартин, IT отбор"], en: ["Took the team for teambuilding and the boss chased me at dodgeball for an hour. 10/10.", "— Martin, IT team"], s: 5 },
  { bg: ["Рожденият ден на сина ми беше тук. 12 деца, нула таблети, два часа щастие.", "— Ивелина, мама"], en: ["My son's birthday was here. 12 kids, zero tablets, two hours of pure joy.", "— Ivelina, mum"], s: 5 },
  { bg: ["Спечелихме Squid Game вечерта. Гащеризонът виси в офиса като трофей.", "— Краси, отбор „Панелка 4\""], en: ["We won the Squid Game night. The jumpsuit hangs in the office as a trophy.", "— Krasi, team 'Block 4'"], s: 5 },
];

const SLOTS = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const CAP = 30;
const MONTHS_BG = ["яну", "фев", "мар", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек"];
const DOW_BG = ["пн", "вт", "ср", "чт", "пт", "сб", "нд"];

const ymd = (d) => d.toISOString().slice(0, 10);

const fmtDate = (s) => {
  if (!s) return "";
  const p = s.split("-");
  return p.length === 3 ? `${p[2].padStart(2, "0")}.${p[1].padStart(2, "0")}.${p[0]}` : s;
};

/* ---- Loyalty points system ---- */
const POINTS = { perEuro: 1, perVisit: 10, signup: 50, redeemPer: 100 };
const LEVELS = [
  { min: 0, icon: "🥉", bg: "Новак в махалата", en: "Block rookie", perkBg: "—", perkEn: "—" },
  { min: 200, icon: "🥈", bg: "Редовен играч", en: "Regular", perkBg: "5% отстъпка", perkEn: "5% off" },
  { min: 500, icon: "🥇", bg: "Капитан на отбора", en: "Team captain", perkBg: "10% отстъпка + приоритет за турнири", perkEn: "10% off + tournament priority" },
  { min: 1000, icon: "👑", bg: "Легенда на двора", en: "Yard legend", perkBg: "15% отстъпка + 1 безплатен час месечно", perkEn: "15% off + 1 free hour monthly" },
];
const priceFor = (b) => {
  const p = PACKAGES.find(x => x.id === b.pkg); if (!p) return 0;
  if (p.kind === "flat") return p.price;
  if (p.id === "free") return p.price * b.people * (b.hours || 2);
  return p.price * b.people;
};
const userPoints = (email, bookings, adjust = 0) => {
  if (!email) return 0;
  const mine = bookings.filter(b => (b.email || "").toLowerCase() === email.toLowerCase());
  let pts = POINTS.signup;
  mine.forEach(b => { pts += POINTS.perVisit; if (b.pay === "paid") pts += Math.round(priceFor(b) * POINTS.perEuro); });
  return Math.max(0, pts + adjust);
};
const levelFor = (pts) => { let l = LEVELS[0]; for (const x of LEVELS) if (pts >= x.min) l = x; return l; };
const nextLevelFor = (pts) => LEVELS.find(x => x.min > pts) || null;

/* ============================== APP ============================== */
export default function App() {
  const [lang, setLang] = useState("bg");
  const t = T[lang];
  const [page, setPage] = useState("home");
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(null); // {name,email,role:'customer'|'owner'}
  const [auth, setAuth] = useState(null); // {mode:'login'|'register', kind:'customer'|'owner'}
  const [profile, setProfile] = useState(false);

  // booking modal
  const [bk, setBk] = useState(null); // {step, pkg, date, time, people, hours, name, phone, email, pay, code}
  const [team, setTeam] = useState(false);
  const [voucher, setVoucher] = useState(false);

  // seed some existing bookings so the calendar feels alive
  const seed = useMemo(() => {
    const base = new Date();
    const mk = (offset, time, pkg, people, name, pay, email) => {
      const d = new Date(base); d.setDate(d.getDate() + offset);
      return { id: "MX" + Math.random().toString(36).slice(2, 7).toUpperCase(), date: ymd(d), time, pkg, people, name, pay, email: email || "" };
    };
    return [
      mk(1, "18:00", "private", 60, "Делойт България", "paid", "events@deloitte.bg"),
      mk(2, "20:00", "tournament", 24, "Отбор Панелка 4", "paid", "panelka4@email.bg"),
      mk(3, "16:00", "birthday", 12, "Рожден ден – Иван", "onsite", "ivan@email.bg"),
      mk(0, "20:00", "free", 18, "Група приятели", "paid", "banda@email.bg"),
      mk(4, "12:00", "free", 8, "Семейство Колеви", "onsite", "kolevi@email.bg"),
    ];
  }, []);
  const [bookings, setBookings] = useState(seed);
  const [blocked, setBlocked] = useState([]); // admin-blocked dates
  const [pointAdjust, setPointAdjust] = useState({}); // email -> manual point delta

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600); };
  const scroll = (id) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const go = (p) => { setPage(p); setMenu(false); if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { setBk(null); setTeam(false); setVoucher(false); setAdmin(false); setAuth(null); setProfile(false); setMenu(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const addBookingAdmin = (rec) => { setBookings(b => [rec, ...b]); showToast(lang === "bg" ? "Резервацията е добавена." : "Booking added."); };
  const removeBooking = (id) => { setBookings(b => b.filter(x => x.id !== id)); showToast(lang === "bg" ? "Резервацията е премахната." : "Booking removed."); };
  const adjustPoints = (email, delta) => { if (!email) return; setPointAdjust(m => ({ ...m, [email]: (m[email] || 0) + delta })); };

  // ---- slot availability ----
  const slotInfo = (date, time) => {
    if (blocked.includes(date)) return { taken: CAP, blocked: true };
    let taken = 0, locked = false;
    bookings.forEach(b => {
      if (b.date === date && b.time === time) {
        if (["private", "tournament", "birthday"].includes(b.pkg)) locked = true;
        taken += b.people;
      }
    });
    return { taken: locked ? CAP : Math.min(taken, CAP), blocked: false, locked };
  };

  const days = useMemo(() => {
    const arr = []; const today = new Date(); today.setHours(0, 0, 0, 0);
    // pad to Monday
    const start = new Date(today);
    const offset = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - offset);
    for (let i = 0; i < 28; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      arr.push({ d, past: d < today, str: ymd(d) });
    }
    return arr;
  }, []);

  const openBooking = (pkgId) => {
    const pkg = PACKAGES.find(p => p.id === pkgId);
    if (pkg?.kind === "voucher") { setVoucher(true); return; }
    setBk({ step: 0, pkg: pkgId || null, date: null, time: null, people: 2, hours: 2, name: user?.name || "", phone: "", email: user?.email || "", pay: "card", code: null });
  };

  const handleAuth = (u) => {
    setUser(u);
    setAuth(null);
    showToast((lang === "bg" ? "Здравей, " : "Hi, ") + u.name + "!");
    if (u.role === "owner") setAdmin(true);
  };
  const logout = () => { setUser(null); setProfile(false); setAdmin(false); showToast(lang === "bg" ? "Излезе от профила." : "Signed out."); };
  const openAdmin = () => { if (user?.role === "owner") setAdmin(true); else setAuth({ mode: "login", kind: "owner" }); };

  const priceOf = (b) => {
    const p = PACKAGES.find(x => x.id === b.pkg); if (!p) return 0;
    if (p.kind === "flat") return p.price;
    if (p.id === "free") return p.price * b.people * b.hours;
    return p.price * b.people;
  };

  const confirmBooking = () => {
    const code = "MX" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const rec = { id: code, date: bk.date, time: bk.time, pkg: bk.pkg, people: bk.people, name: bk.name || "Гост", pay: bk.pay === "card" ? "paid" : "onsite", email: bk.email || user?.email || "" };
    setBookings(b => [rec, ...b]);
    setBk({ ...bk, step: 4, code });
  };

  return (
    <div className="mah">
      <style>{CSS}</style>
      <div className="grain" />

      {/* ---------- NAV ---------- */}
      <nav className="nav">
        <div className="wrap nav-in">
          <div className="logo" style={{ cursor: "pointer" }} onClick={() => go("home")}><span className="dot" />МАХАЛА</div>
          <div className="nav-links">
            <a className={page === "games" ? "act" : ""} onClick={() => go("games")}>{t.nav[0]}</a>
            <a className={page === "pricing" ? "act" : ""} onClick={() => go("pricing")}>{t.nav[1]}</a>
            <a className={page === "tournaments" ? "act" : ""} onClick={() => go("tournaments")}>{t.nav[2]}</a>
            <a className={page === "about" ? "act" : ""} onClick={() => go("about")}>{t.nav[3]}</a>
            <a className={page === "contact" ? "act" : ""} onClick={() => go("contact")}>{t.nav[4]}</a>
          </div>
          <div className="nav-right">
            <button className="lang" onClick={() => setLang(lang === "bg" ? "en" : "bg")}>
              <Globe size={14} />{lang === "bg" ? "EN" : "BG"}
            </button>
            {user ? (
              <button className="userchip" onClick={() => setProfile(true)} title={user.name}>
                <span className="av">{user.name.charAt(0).toUpperCase()}</span>
                <span className="uname">{user.name.split(" ")[0]}</span>
              </button>
            ) : (
              <button className="lang" onClick={() => setAuth({ mode: "login", kind: "customer" })}>
                <LogIn size={14} />{lang === "bg" ? "Вход" : "Sign in"}
              </button>
            )}
            <button className="btn btn-coral btn-sm" onClick={() => openBooking(null)}>{t.book}</button>
            <button className="burger btn btn-cream btn-sm" onClick={() => setMenu(!menu)}>
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="mnav">
            <a onClick={() => go("games")}>{t.nav[0]}</a>
            <a onClick={() => go("pricing")}>{t.nav[1]}</a>
            <a onClick={() => go("tournaments")}>{t.nav[2]}</a>
            <a onClick={() => go("about")}>{t.nav[3]}</a>
            <a onClick={() => go("contact")}>{t.nav[4]}</a>
          </div>
        )}
      </nav>

      {/* ---------- HERO ---------- */}
      {page === "home" && (
      <header className="hero">
        <div className="hero-grid" />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 30, alignItems: "center" }} className="hero-cols">
            <div>
              <span className="eyebrow">{t.eyebrow}</span>
              <h1>МАХАЛА</h1>
              <div className="slogan">{t.slogan}</div>
              <p className="hero-sub">{t.heroSub}</p>
              <div className="hero-cta">
                <button className="btn btn-coral" onClick={() => openBooking(null)}><Calendar size={18} />{t.book}</button>
                <button className="btn btn-cream" onClick={() => scroll("games")}>{t.seeGames}<ArrowRight size={18} /></button>
              </div>
            </div>
            <div className="hero-mascot">
              <div className="hop">
                <div className="hop-row"><div className="hopc">1</div></div>
                <div className="hop-row"><div className="hopc a">2</div><div className="hopc b">3</div></div>
                <div className="hop-row"><div className="hopc full">🏆</div></div>
              </div>
            </div>
          </div>

          <div className="steps">
            {t.steps.map((s, i) => (
              <div className="step" key={i}>
                <div className="num">{i + 1}</div>
                <h4>{s[0]}</h4>
                <p>{s[1]}</p>
              </div>
            ))}
          </div>
          <div style={{ height: 60 }} />
        </div>
      </header>
      )}

      {/* ---------- MARQUEE ---------- */}
      {page === "home" && (
      <div className="marq">
        <div className="marq-track">
          <span>ЛАСТИК ✦ ДАМА ✦ НАРОДНА ТОПКА ✦ ДЪРВЕН ФИЛОСОФ ✦ ТОПЧЕТА ✦ КРИЕНИЦА ✦ ГОНЕНИЦА ✦ </span>
          <span>ЛАСТИК ✦ ДАМА ✦ НАРОДНА ТОПКА ✦ ДЪРВЕН ФИЛОСОФ ✦ ТОПЧЕТА ✦ КРИЕНИЦА ✦ ГОНЕНИЦА ✦ </span>
        </div>
      </div>
      )}

      {/* ---------- HOME TILES ---------- */}
      {page === "home" && (
        <section className="sec" style={{ paddingTop: 56, paddingBottom: 34 }}>
          <div className="wrap">
            <span className="kicker">{lang === "bg" ? "Разгледай" : "Explore"}</span>
            <h2 className="h2">{lang === "bg" ? "Откъде да започнем?" : "Where do we start?"}</h2>
            <div className="tiles">
              {[
                ["games", "🎮", t.nav[0], lang === "bg" ? "9+ игри от двора" : "9+ yard games"],
                ["pricing", "🎟️", t.nav[1], lang === "bg" ? "Пакет за всеки повод" : "A package for any occasion"],
                ["tournaments", "🏆", t.nav[2], lang === "bg" ? "Squid Game вечери" : "Squid Game nights"],
                ["about", "💬", t.nav[3], lang === "bg" ? "Историята зад идеята" : "The story behind it"],
              ].map(tl => (
                <button key={tl[0]} className="tile" onClick={() => go(tl[0])}>
                  <span className="te">{tl[1]}</span>
                  <span className="tt">{tl[2]}</span>
                  <span className="td">{tl[3]}</span>
                  <ArrowRight size={18} className="ta" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- GAMES ---------- */}
      {page === "games" && (
      <section className="sec" id="games">
        <div className="wrap">
          <span className="kicker">{t.gamesK}</span>
          <h2 className="h2">{t.gamesH}</h2>
          <p className="lead">{t.gamesL}</p>
          <div className="games">
            {GAMES.map((g, i) => {
              const c = g[lang];
              return (
                <div className="gcard" key={i}>
                  {g.sg && <div className="tag-sg">SQUID GAME</div>}
                  <div className="emoji">{g.emoji}</div>
                  <h3>{c[0]}</h3>
                  <p>{c[1]}</p>
                  <div className="gmeta">
                    <span className="fire" title="Ниво на лудост">{"🔥".repeat(g.fire)}</span>
                    <span className="ppl"><Users size={15} />{g.p}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ---------- PRICING ---------- */}
      {page === "pricing" && (
      <section className="sec" id="pricing" style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <span className="kicker">{t.priceK}</span>
          <h2 className="h2">{t.priceH}</h2>
          <p className="lead">{t.priceL}</p>
          <div className="packs">
            {PACKAGES.map((p) => {
              const c = p[lang]; const f = p[lang === "bg" ? "bgF" : "enF"];
              return (
                <div className={"pack" + (p.hot ? " hot" : "") + (p.sg ? " sg" : "")} key={p.id}>
                  <div className="ico">{p.icon}</div>
                  <h3>{c[0]}</h3>
                  <div className="price">{c[1]}</div>
                  <div className="per">{c[2]}</div>
                  <ul>
                    {f.map((x, i) => <li key={i}><Check size={17} />{x}</li>)}
                  </ul>
                  <button
                    className={"btn " + (p.sg ? "btn-pink" : p.hot ? "btn-ink" : "btn-coral")}
                    onClick={() => openBooking(p.id)}
                  >
                    {p.kind === "voucher" ? (lang === "bg" ? "Купи ваучер" : "Buy voucher") : t.book}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ---------- TOURNAMENTS ---------- */}
      {page === "tournaments" && (
      <section className="sec sec-petrol" id="tournaments">
        <div className="wrap">
          <span className="kicker">{t.tourK}</span>
          <h2 className="h2">{t.tourH}</h2>
          <p className="lead">{t.tourL}</p>
          <div className="tour-list">
            {[
              { off: 2, time: "20:00", bg: ["Squid Game · Сезон 3 финал", "8 отбора · елиминации · награда €500"], en: ["Squid Game · Season 3 final", "8 teams · eliminations · €500 prize"], spots: "2 места" },
              { off: 6, time: "19:00", bg: ["Народна топка лига · кръг 4", "Фирмени отбори · класиране"], en: ["Dodgeball league · round 4", "Company teams · standings"], spots: "Свободно" },
              { off: 11, time: "20:00", bg: ["Ретро вечер · 90-те", "Топчета, ластик и касетофон на макс"], en: ["Retro night · the 90s", "Marbles, elastics and the boombox at max"], spots: "Свободно" },
            ].map((tr, i) => {
              const d = new Date(); d.setDate(d.getDate() + tr.off);
              const c = tr[lang];
              return (
                <div className="tour" key={i}>
                  <div className="date"><div className="d">{d.getDate()}</div><div className="m">{MONTHS_BG[d.getMonth()]}</div></div>
                  <div className="info">
                    <h4>{c[0]}</h4>
                    <p><Clock size={13} style={{ verticalAlign: "-2px" }} /> {tr.time} · {c[1]}</p>
                  </div>
                  <span className="pill"><Flame size={13} />{tr.spots}</span>
                  <button className="btn btn-pink btn-sm" onClick={() => setTeam(true)}>{t.signTeam}</button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ---------- ABOUT ---------- */}
      {page === "about" && (
      <section className="sec" id="about">
        <div className="wrap about">
          <div>
            <span className="kicker">{t.aboutK}</span>
            <h2 className="h2">{t.aboutH}</h2>
            <p className="lead" style={{ maxWidth: 520 }}>{t.aboutP}</p>
            <div className="stat-row">
              <div className="stat"><b>9+</b><span>{lang === "bg" ? "игри от двора" : "yard games"}</span></div>
              <div className="stat"><b>600м²</b><span>{lang === "bg" ? "закрита зала" : "indoor hall"}</span></div>
              <div className="stat"><b>4500</b><span>{lang === "bg" ? "щастливи деца" : "happy kids"}</span></div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="polaroid">
              <div className="pic">🤸</div>
              <div className="cap">{lang === "bg" ? "лято '98, но на закрито" : "summer '98, but indoors"}</div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ---------- REVIEWS ---------- */}
      {(page === "home" || page === "about") && (
      <section className="sec" style={{ background: "var(--petrol-deep)", color: "var(--cream)" }}>
        <div className="wrap">
          <span className="kicker">{t.revK}</span>
          <h2 className="h2">{t.revH}</h2>
          <div className="revs">
            {REVIEWS.map((r, i) => {
              const c = r[lang];
              return (
                <div className="rev" key={i}>
                  <div className="stars">{Array.from({ length: r.s }).map((_, k) => <Star key={k} size={17} fill="currentColor" />)}</div>
                  <p>“{c[0]}”</p>
                  <div className="who">{c[1]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ---------- CONTACT ---------- */}
      {page === "contact" && (
      <section className="sec" id="contact" style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <span className="kicker">{t.conK}</span>
          <h2 className="h2">{t.conH}</h2>
          <p className="lead" style={{ marginBottom: 30 }}>{t.conL}</p>
          <div className="contact">
            <div className="cinfo">
              <div className="cline"><div className="ci"><MapPin size={18} /></div><div><b>{lang === "bg" ? "Адрес" : "Address"}</b><br />ул. „Цар Симеон" 142, София</div></div>
              <div className="cline"><div className="ci"><Clock size={18} /></div><div><b>{lang === "bg" ? "Работно време" : "Hours"}</b><br />{lang === "bg" ? "Всеки ден · 10:00 – 22:00" : "Daily · 10:00 – 22:00"}</div></div>
              <div className="cline"><div className="ci"><Phone size={18} /></div><div><b>{lang === "bg" ? "Телефон" : "Phone"}</b><br />+359 88 123 4567</div></div>
              <div className="cline"><div className="ci"><Mail size={18} /></div><div><b>Имейл</b><br />zdravei@mahala.bg</div></div>
              <div className="map"><div className="pin"><MapPin size={30} /><span style={{ fontFamily: "var(--chalk)", fontSize: 22 }}>тук сме</span></div></div>
            </div>
            <Inquiry t={t} onSend={() => showToast(lang === "bg" ? "Запитването е изпратено! 🎉" : "Inquiry sent! 🎉")} lang={lang} />
          </div>
        </div>
      </section>
      )}

      {/* ---------- NEWSLETTER ---------- */}
      {(page === "home" || page === "contact") && (
      <section style={{ background: "var(--coral)", color: "#fff", padding: "54px 0", borderTop: "3px solid var(--ink)" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px,5vw,44px)" }}>{t.newsTitle}</h2>
          <p style={{ fontWeight: 600, margin: "10px 0 22px", opacity: .92 }}>{t.newsSub}</p>
          <News t={t} onSub={() => showToast(lang === "bg" ? "Добре дошъл в махалата! ✉️" : "Welcome to the block! ✉️")} lang={lang} />
        </div>
      </section>
      )}

      {/* ---------- FOOTER ---------- */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="logo" style={{ color: "var(--cream)" }}><span className="dot" />МАХАЛА</div>
              <p style={{ marginTop: 12, fontSize: 14, color: "rgba(245,235,221,.7)", fontWeight: 500, maxWidth: 240 }}>{t.footTagline}</p>
              <div className="socials">
                <a title="Instagram"><Instagram size={18} /></a>
                <a title="Facebook"><Facebook size={18} /></a>
                <a title="TikTok"><TikTok /></a>
              </div>
            </div>
            <div>
              <h5>{lang === "bg" ? "Меню" : "Menu"}</h5>
              <a onClick={() => go("games")}>{t.nav[0]}</a>
              <a onClick={() => go("pricing")}>{t.nav[1]}</a>
              <a onClick={() => go("tournaments")}>{t.nav[2]}</a>
              <a onClick={() => go("about")}>{t.nav[3]}</a>
            </div>
            <div>
              <h5>{lang === "bg" ? "Услуги" : "Services"}</h5>
              <a onClick={() => openBooking("birthday")}>{lang === "bg" ? "Рождени дни" : "Birthdays"}</a>
              <a onClick={() => openBooking("team")}>{lang === "bg" ? "Тийм-билдинг" : "Teambuilding"}</a>
              <a onClick={() => openBooking("private")}>{lang === "bg" ? "Наем на зала" : "Venue rental"}</a>
              <a onClick={() => setVoucher(true)}>{lang === "bg" ? "Ваучери" : "Gift cards"}</a>
            </div>
            <div>
              <h5>{lang === "bg" ? "Контакт" : "Contact"}</h5>
              <a>ул. „Цар Симеон" 142, София</a>
              <a>+359 88 123 4567</a>
              <a>zdravei@mahala.bg</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} МАХАЛА · {lang === "bg" ? "Всички права запазени." : "All rights reserved."}</span>
            <span style={{ cursor: "pointer", display: "inline-flex", gap: 6, alignItems: "center" }} onClick={openAdmin}>
              <LayoutDashboard size={14} /> {lang === "bg" ? "Админ панел" : "Admin"}
            </span>
          </div>
        </div>
      </footer>

      {/* ---------- BOOKING MODAL ---------- */}
      {bk && (
        <BookingModal
          bk={bk} setBk={setBk} t={t} lang={lang} days={days} slotInfo={slotInfo}
          priceOf={priceOf} confirmBooking={confirmBooking} onClose={() => setBk(null)}
        />
      )}

      {/* ---------- TEAM MODAL ---------- */}
      {team && <TeamModal lang={lang} onClose={() => setTeam(false)} onDone={() => { setTeam(false); showToast(lang === "bg" ? "Отборът е записан! Успех! 🏆" : "Team registered! Good luck! 🏆"); }} />}

      {/* ---------- VOUCHER MODAL ---------- */}
      {voucher && <VoucherModal lang={lang} onClose={() => setVoucher(false)} />}

      {/* ---------- AUTH ---------- */}
      {auth && <AuthModal auth={auth} setAuth={setAuth} lang={lang} onAuth={handleAuth} />}

      {/* ---------- PROFILE ---------- */}
      {profile && user && (
        <ProfileModal lang={lang} user={user} bookings={bookings} adjust={pointAdjust[user.email] || 0} onClose={() => setProfile(false)} onLogout={logout} onAdmin={() => { setProfile(false); setAdmin(true); }} />
      )}

      {/* ---------- ADMIN ---------- */}
      {admin && (
        <AdminModal
          lang={lang} bookings={bookings} priceOf={priceOf} blocked={blocked} pointAdjust={pointAdjust}
          slotInfo={slotInfo} days={days}
          onBlock={(d) => { setBlocked(b => b.includes(d) ? b.filter(x => x !== d) : [...b, d]); }}
          onAdd={addBookingAdmin} onRemove={removeBooking} onAdjust={adjustPoints}
          onClose={() => setAdmin(false)}
        />
      )}

      {toast && <div className="toast"><Check size={18} />{toast}</div>}
    </div>
  );
}

/* ============================== TikTok icon ============================== */
function TikTok() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.5 3c.3 2 1.6 3.6 3.5 4v2.6c-1.3 0-2.5-.4-3.5-1v6.3a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v2.8a3.1 3.1 0 1 0 2.2 3V3h2.8z" />
    </svg>
  );
}

/* ============================== Auth ============================== */
function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function AuthModal({ auth, setAuth, lang, onAuth }) {
  const owner = auth.kind === "owner";
  const isReg = auth.mode === "register" && !owner;
  const [f, setF] = useState({ name: "", email: "", pass: "" });
  const t = (bg, en) => (lang === "bg" ? bg : en);
  const ok = f.email.includes("@") && f.pass.length >= 4 && (!isReg || f.name.trim().length > 1);
  const submit = () => onAuth({ name: owner ? t("Собственик", "Owner") : (f.name || f.email.split("@")[0]), email: f.email, role: owner ? "owner" : "customer" });
  const google = () => onAuth({ name: t("Google потребител", "Google user"), email: "google@mahala.bg", role: "customer" });
  const setMode = (m) => setAuth({ ...auth, mode: m });
  return (
    <div className="overlay" onClick={() => setAuth(null)}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
        <div className="modal-head" style={{ background: owner ? "var(--ink)" : "var(--petrol)" }}>
          <h3 style={{ flex: 1 }}>
            {owner
              ? <><Lock size={17} style={{ verticalAlign: "-3px" }} /> {t("Вход за екипа", "Team sign in")}</>
              : auth.mode === "login" ? t("Добре дошъл пак", "Welcome back") : t("Създай профил", "Create account")}
          </h3>
          <button className="modal-x" onClick={() => setAuth(null)}><X size={18} /></button>
        </div>
        <div className="modal-body">
          {!owner && (
            <div className="authtabs">
              <button className={"authtab" + (auth.mode === "login" ? " on" : "")} onClick={() => setMode("login")}>{t("Вход", "Sign in")}</button>
              <button className={"authtab" + (auth.mode === "register" ? " on" : "")} onClick={() => setMode("register")}>{t("Регистрация", "Register")}</button>
            </div>
          )}
          {!owner && (
            <>
              <button className="gbtn" onClick={google}><GoogleG /> {t("Продължи с Google", "Continue with Google")}</button>
              <div className="ordiv">{t("или с имейл", "or with email")}</div>
            </>
          )}
          {isReg && (
            <div className="field"><label>{t("Име", "Name")}</label><input className="input" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder={t("Твоето име", "Your name")} /></div>
          )}
          <div className="field"><label>{t("Имейл", "Email")}</label><input className="input" type="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder={owner ? "owner@mahala.bg" : "ti@email.bg"} /></div>
          <div className="field"><label>{t("Парола", "Password")}</label><input className="input" type="password" value={f.pass} onChange={e => setF({ ...f, pass: e.target.value })} placeholder="••••••" /></div>
          <button className={"btn " + (owner ? "btn-ink" : "btn-coral")} style={{ width: "100%", justifyContent: "center" }} disabled={!ok} onClick={submit}>
            {(!owner && auth.mode === "register") ? <><UserPlus size={17} />{t("Създай профил", "Create account")}</> : <><LogIn size={17} />{t("Влез", "Sign in")}</>}
          </button>
          <div className="authnote"><ShieldCheck size={14} /><span>{t("Демо режим — профилите още не са истински. Свързваме сигурен вход (Supabase) на следваща стъпка.", "Demo mode — accounts aren't real yet. We'll connect secure auth (Supabase) next.")}</span></div>
          <div className="authalt">
            {owner
              ? <b onClick={() => setAuth({ mode: "login", kind: "customer" })}>{t("← Клиентски вход", "← Customer sign in")}</b>
              : <>{t("Собственик или екип?", "Owner or staff?")} <b onClick={() => setAuth({ mode: "login", kind: "owner" })}>{t("Вход за екипа", "Team sign in")}</b></>}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileModal({ lang, user, bookings, adjust, onClose, onLogout, onAdmin }) {
  const t = (bg, en) => (lang === "bg" ? bg : en);
  const mine = bookings.filter(b => b.email && user.email && b.email.toLowerCase() === user.email.toLowerCase());
  const pts = userPoints(user.email, bookings, adjust);
  const lvl = levelFor(pts);
  const next = nextLevelFor(pts);
  const freeHours = Math.floor(pts / POINTS.redeemPer);
  const span = next ? next.min - lvl.min : 1;
  const prog = next ? Math.min(100, Math.round(((pts - lvl.min) / span) * 100)) : 100;
  const pkgName = (id) => PACKAGES.find(p => p.id === id)?.[lang][0] || id;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
        <div className="modal-head">
          <h3 style={{ flex: 1 }}>{t("Здравей", "Hi")}, {user.name.split(" ")[0]}! 👋</h3>
          <button className="modal-x" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <div className="lvlcard">
            <div className="lvltop">
              <div className="lvlname"><span className="lvlicon">{lvl.icon}</span><div><b>{lvl[lang]}</b><small>{lvl[lang === "bg" ? "perkBg" : "perkEn"]}</small></div></div>
              <div className="lvlpts"><b>{pts}</b><span>{t("точки", "points")}</span></div>
            </div>
            <div className="lvlbar"><span style={{ width: prog + "%" }} /></div>
            <div className="lvlnext">
              {next
                ? t(`Още ${next.min - pts} т. до „${next.bg}" ${next.icon}`, `${next.min - pts} pts to "${next.en}" ${next.icon}`)
                : t("Максимално ниво — легенда! 👑", "Max level — legend! 👑")}
            </div>
          </div>

          <div className="prof-pts">
            <div className="pp"><b>{mine.length}</b><span>{t("резервации", "bookings")}</span></div>
            <div className="pp"><b>{freeHours}</b><span>{t("безпл. часа", "free hours")}</span></div>
            <div className="pp"><b>{POINTS.redeemPer}</b><span>{t("точки = 1 час", "pts = 1 hour")}</span></div>
          </div>

          <p style={{ fontWeight: 800, marginBottom: 10 }}>{t("Моите резервации", "My bookings")}</p>
          {mine.length === 0 ? (
            <p style={{ color: "var(--muted)", fontWeight: 600, fontSize: 14 }}>{t("Още нямаш резервации. Хайде, доведи бандата!", "No bookings yet. Bring the crew!")}</p>
          ) : (
            <div className="mybk">
              {mine.map(b => (
                <div className="row" key={b.id}>
                  <span><b>{pkgName(b.pkg)}</b><br /><small>{fmtDate(b.date)} · {b.time} · {b.people} {t("души", "ppl")}</small></span>
                  <span className={"badge " + (b.pay === "paid" ? "paid" : "onsite")}>{b.pay === "paid" ? t("Платено", "Paid") : t("На място", "On site")}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {user.role === "owner" && <button className="btn btn-ink" style={{ flex: 1, justifyContent: "center" }} onClick={onAdmin}><LayoutDashboard size={17} />{t("Админ панел", "Admin")}</button>}
            <button className="btn btn-cream" style={{ flex: 1, justifyContent: "center" }} onClick={onLogout}><LogOut size={17} />{t("Изход", "Sign out")}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================== Inquiry / Newsletter ============================== */
function Inquiry({ t, onSend, lang }) {
  const [f, setF] = useState({ name: "", phone: "", msg: "" });
  return (
    <div>
      <div className="field"><label>{t.formName}</label><input className="input" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder={lang === "bg" ? "Как се казваш?" : "Your name"} /></div>
      <div className="field"><label>{t.formPhone}</label><input className="input" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} placeholder="+359 ..." /></div>
      <div className="field"><label>{t.formMsg}</label><textarea className="input" value={f.msg} onChange={e => setF({ ...f, msg: e.target.value })} placeholder={lang === "bg" ? "За какво ще играем?" : "What shall we play?"} /></div>
      <button className="btn btn-coral" style={{ width: "100%", justifyContent: "center" }} disabled={!f.name || !f.phone} onClick={() => { onSend(); setF({ name: "", phone: "", msg: "" }); }}>
        <Send size={17} />{t.send}
      </button>
    </div>
  );
}

function News({ t, onSub, lang }) {
  const [v, setV] = useState("");
  return (
    <div style={{ display: "flex", gap: 10, maxWidth: 460, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
      <input className="input" style={{ flex: 1, minWidth: 220 }} value={v} onChange={e => setV(e.target.value)} placeholder={lang === "bg" ? "твоят имейл" : "your email"} />
      <button className="btn btn-ink" disabled={!v.includes("@")} onClick={() => { onSub(); setV(""); }}>{t.newsBtn}</button>
    </div>
  );
}

/* ============================== Booking Modal ============================== */
function BookingModal({ bk, setBk, t, lang, days, slotInfo, priceOf, confirmBooking, onClose }) {
  const pkgList = PACKAGES.filter(p => p.kind !== "voucher");
  const pkg = PACKAGES.find(p => p.id === bk.pkg);
  const set = (k, v) => setBk({ ...bk, [k]: v });
  const canNext = () => {
    if (bk.step === 0) return !!bk.pkg;
    if (bk.step === 1) return bk.date && bk.time;
    if (bk.step === 2) return bk.name && bk.phone && bk.people > 0;
    return true;
  };
  const estimate = bk.pkg ? priceOf(bk) : 0;
  const flat = pkg?.kind === "flat";

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head" style={{ justifyContent: "space-between" }}>
          <h3>{bk.step === 4 ? (lang === "bg" ? "Готово! 🎉" : "Done! 🎉") : t.book}</h3>
          <button className="modal-x" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          {bk.step < 4 && (
            <div className="prog">{[0, 1, 2, 3].map(i => <div key={i} className={i <= bk.step ? "on" : ""} />)}</div>
          )}

          {/* STEP 0 — package */}
          {bk.step === 0 && (
            <>
              <p style={{ fontWeight: 700, marginBottom: 14 }}>{lang === "bg" ? "Какво ще празнуваме?" : "What are we celebrating?"}</p>
              <div className="choose">
                {pkgList.map(p => (
                  <button key={p.id} className={"choice" + (bk.pkg === p.id ? " sel" : "")} onClick={() => set("pkg", p.id)}>
                    <div className="ci">{p.icon}</div>
                    <div><b>{p[lang][0]}</b><small>{p[lang][1]} {p[lang][2]}</small></div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* STEP 1 — date & time */}
          {bk.step === 1 && (
            <>
              <p style={{ fontWeight: 800, marginBottom: 10 }}>{lang === "bg" ? "Избери дата" : "Pick a date"}</p>
              <div className="dow">{DOW_BG.map(d => <span key={d}>{d}</span>)}</div>
              <div className="cal">
                {days.map((dd, i) => {
                  const blk = false;
                  return (
                    <button key={i} className={"day" + (bk.date === dd.str ? " sel" : "")} disabled={dd.past}
                      onClick={() => set("date", dd.str)}>
                      {dd.d.getDate()}
                      <small>{MONTHS_BG[dd.d.getMonth()]}</small>
                    </button>
                  );
                })}
              </div>
              {bk.date && (
                <>
                  <p style={{ fontWeight: 800, margin: "18px 0 4px" }}>{lang === "bg" ? "Избери час" : "Pick a time"}</p>
                  <div className="slots">
                    {SLOTS.map(s => {
                      const info = slotInfo(bk.date, s);
                      const left = CAP - info.taken;
                      const full = left <= 0 || info.blocked;
                      return (
                        <button key={s} disabled={full} className={"slot" + (bk.time === s ? " sel" : "") + (!full ? " free" : "")} onClick={() => set("time", s)}>
                          {s}
                          <small>{info.blocked ? (lang === "bg" ? "заето" : "blocked") : full ? (lang === "bg" ? "пълно" : "full") : (lang === "bg" ? `${left} места` : `${left} spots`)}</small>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}

          {/* STEP 2 — details */}
          {bk.step === 2 && (
            <>
              <div className="field"><label>{lang === "bg" ? "Брой хора" : "Headcount"}</label>
                <div className="stepper">
                  <button onClick={() => set("people", Math.max(1, bk.people - 1))}><Minus size={16} /></button>
                  <span>{bk.people}</span>
                  <button onClick={() => set("people", bk.people + 1)}><Plus size={16} /></button>
                </div>
              </div>
              {bk.pkg === "free" && (
                <div className="field"><label>{lang === "bg" ? "Колко часа?" : "How many hours?"}</label>
                  <div className="chips">
                    {[1, 2, 3].map(h => <button key={h} className={"chip" + (bk.hours === h ? " on" : "")} onClick={() => set("hours", h)}>{h}ч</button>)}
                  </div>
                </div>
              )}
              <div className="field"><label>{t.formName}</label><input className="input" value={bk.name} onChange={e => set("name", e.target.value)} placeholder={lang === "bg" ? "Име за резервацията" : "Name for the booking"} /></div>
              <div className="field"><label>{t.formPhone}</label><input className="input" value={bk.phone} onChange={e => set("phone", e.target.value)} placeholder="+359 ..." /></div>
              <div className="field"><label>{t.formEmail}</label><input className="input" value={bk.email} onChange={e => set("email", e.target.value)} placeholder="ti@email.bg" /></div>
            </>
          )}

          {/* STEP 3 — review & pay */}
          {bk.step === 3 && (
            <>
              <div className="summary">
                <div className="srow"><span>{lang === "bg" ? "Пакет" : "Package"}</span><b>{pkg[lang][0]}</b></div>
                <div className="srow"><span>{lang === "bg" ? "Дата и час" : "Date & time"}</span><b>{fmtDate(bk.date)} · {bk.time}</b></div>
                <div className="srow"><span>{lang === "bg" ? "Хора" : "People"}</span><b>{bk.people}{bk.pkg === "free" ? ` · ${bk.hours}ч` : ""}</b></div>
                <div className="srow"><span>{lang === "bg" ? "На име" : "Name"}</span><b>{bk.name}</b></div>
                <div className="srow total"><span>{flat ? (lang === "bg" ? "от" : "from") : (lang === "bg" ? "Общо" : "Total")}</span><span>€{estimate}</span></div>
              </div>
              <p style={{ fontWeight: 800, margin: "18px 0 8px" }}>{lang === "bg" ? "Плащане" : "Payment"}</p>
              <div className="choose">
                <button className={"choice" + (bk.pay === "card" ? " sel" : "")} onClick={() => set("pay", "card")}>
                  <div className="ci"><CreditCard size={20} /></div><div><b>{lang === "bg" ? "Карта" : "Card"}</b><small>Stripe · {lang === "bg" ? "сигурно" : "secure"}</small></div>
                </button>
                <button className={"choice" + (bk.pay === "onsite" ? " sel" : "")} onClick={() => set("pay", "onsite")}>
                  <div className="ci"><Wallet size={20} /></div><div><b>{lang === "bg" ? "На място" : "On site"}</b><small>{lang === "bg" ? "плащаш в залата" : "pay at the venue"}</small></div>
                </button>
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 12, fontWeight: 600 }}>
                <ShieldCheck size={13} style={{ verticalAlign: "-2px" }} /> {lang === "bg" ? "Демо — реално плащане не се извършва." : "Demo — no real charge is made."}
              </p>
            </>
          )}

          {/* STEP 4 — success */}
          {bk.step === 4 && (
            <div className="success">
              <div className="ring"><Check size={42} /></div>
              <h3 style={{ fontSize: 24 }}>{lang === "bg" ? "Резервацията е готова!" : "Booking confirmed!"}</h3>
              <p style={{ color: "var(--muted)", fontWeight: 600, margin: "8px 0" }}>{lang === "bg" ? "Изпратихме потвърждение на имейла ти." : "We've emailed your confirmation."}</p>
              <div className="code">{bk.code}</div>
              <div className="summary" style={{ textAlign: "left", marginTop: 8 }}>
                <div className="srow"><span>{pkg[lang][0]}</span><b>{fmtDate(bk.date)} · {bk.time}</b></div>
                <div className="srow"><span>{lang === "bg" ? "Хора" : "People"}</span><b>{bk.people}</b></div>
                <div className="srow"><span>{lang === "bg" ? "Статус" : "Status"}</span><b>{bk.pay === "card" ? (lang === "bg" ? "Платено ✓" : "Paid ✓") : (lang === "bg" ? "Плащане на място" : "Pay on site")}</b></div>
              </div>
              <button className="btn btn-coral" style={{ marginTop: 18, width: "100%", justifyContent: "center" }} onClick={onClose}>{lang === "bg" ? "Супер!" : "Awesome!"}</button>
            </div>
          )}

          {/* footer buttons */}
          {bk.step < 4 && (
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              {bk.step > 0 && <button className="btn btn-cream" onClick={() => set("step", bk.step - 1)}><ChevronLeft size={18} />{lang === "bg" ? "Назад" : "Back"}</button>}
              {bk.step < 3 && <button className="btn btn-coral" style={{ flex: 1, justifyContent: "center" }} disabled={!canNext()} onClick={() => set("step", bk.step + 1)}>{lang === "bg" ? "Напред" : "Next"}<ChevronRight size={18} /></button>}
              {bk.step === 3 && <button className="btn btn-coral" style={{ flex: 1, justifyContent: "center" }} onClick={confirmBooking}>{bk.pay === "card" ? (lang === "bg" ? `Плати €${estimate}` : `Pay €${estimate}`) : (lang === "bg" ? "Потвърди" : "Confirm")}</button>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================== Team Modal ============================== */
function TeamModal({ lang, onClose, onDone }) {
  const [f, setF] = useState({ team: "", captain: "", phone: "", size: 4 });
  const ok = f.team && f.captain && f.phone;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head" style={{ background: "var(--ink)" }}>
          <h3 style={{ flex: 1 }}><Trophy size={18} style={{ verticalAlign: "-3px", color: "var(--pink)" }} /> {lang === "bg" ? "Запиши отбор" : "Register a team"}</h3>
          <button className="modal-x" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <div className="field"><label>{lang === "bg" ? "Име на отбора" : "Team name"}</label><input className="input" value={f.team} onChange={e => setF({ ...f, team: e.target.value })} placeholder={lang === "bg" ? "напр. Панелка 4" : "e.g. Block 4"} /></div>
          <div className="field"><label>{lang === "bg" ? "Капитан" : "Captain"}</label><input className="input" value={f.captain} onChange={e => setF({ ...f, captain: e.target.value })} /></div>
          <div className="field"><label>{lang === "bg" ? "Телефон" : "Phone"}</label><input className="input" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} placeholder="+359 ..." /></div>
          <div className="field"><label>{lang === "bg" ? "Брой играчи" : "Players"}</label>
            <div className="stepper">
              <button onClick={() => setF({ ...f, size: Math.max(2, f.size - 1) })}><Minus size={16} /></button>
              <span>{f.size}</span>
              <button onClick={() => setF({ ...f, size: f.size + 1 })}><Plus size={16} /></button>
            </div>
          </div>
          <button className="btn btn-pink" style={{ width: "100%", justifyContent: "center" }} disabled={!ok} onClick={onDone}>
            <Trophy size={17} />{lang === "bg" ? "Запиши отбора" : "Register team"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================== Voucher Modal ============================== */
function VoucherModal({ lang, onClose }) {
  const [amount, setAmount] = useState(50);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(null);
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head" style={{ background: "var(--coral)" }}>
          <h3 style={{ flex: 1 }}><Gift size={18} style={{ verticalAlign: "-3px" }} /> {lang === "bg" ? "Подаръчен ваучер" : "Gift voucher"}</h3>
          <button className="modal-x" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          {!code ? (
            <>
              <div className="field"><label>{lang === "bg" ? "Сума" : "Amount"}</label>
                <div className="chips">{[25, 50, 75, 100].map(a => <button key={a} className={"chip" + (amount === a ? " on" : "")} onClick={() => setAmount(a)}>€{a}</button>)}</div>
              </div>
              <div className="field"><label>{lang === "bg" ? "Имейл на получателя" : "Recipient email"}</label><input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="podarak@email.bg" /></div>
              <button className="btn btn-coral" style={{ width: "100%", justifyContent: "center" }} disabled={!email.includes("@")} onClick={() => setCode("GIFT-" + Math.random().toString(36).slice(2, 7).toUpperCase())}>
                <CreditCard size={17} />{lang === "bg" ? `Купи за €${amount}` : `Buy for €${amount}`}
              </button>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 12, fontWeight: 600 }}><ShieldCheck size={13} style={{ verticalAlign: "-2px" }} /> {lang === "bg" ? "Демо — реално плащане не се извършва." : "Demo — no real charge."}</p>
            </>
          ) : (
            <div className="success">
              <div className="ring" style={{ background: "var(--coral)" }}><Gift size={40} /></div>
              <h3 style={{ fontSize: 22 }}>{lang === "bg" ? "Ваучерът е готов!" : "Voucher ready!"}</h3>
              <p style={{ color: "var(--muted)", fontWeight: 600, margin: "8px 0" }}>{lang === "bg" ? `Стойност €${amount} · валиден 12 месеца` : `Value €${amount} · valid 12 months`}</p>
              <div className="code">{code}</div>
              <button className="btn btn-coral" style={{ marginTop: 16, width: "100%", justifyContent: "center" }} onClick={onClose}>{lang === "bg" ? "Готово" : "Done"}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================== Admin Modal ============================== */
function AdminModal({ lang, bookings, priceOf, blocked, pointAdjust, slotInfo, days, onBlock, onAdd, onRemove, onAdjust, onClose }) {
  const t = (bg, en) => (lang === "bg" ? bg : en);
  const [tab, setTab] = useState("bookings");
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState("all");
  const future = days.filter(d => !d.past);
  const pkgList = PACKAGES.filter(p => p.kind !== "voucher");
  const blank = { pkg: "free", date: future[0]?.str || "", time: "", people: 2, name: "", phone: "", email: "", pay: "onsite" };
  const [f, setF] = useState(blank);

  const revenue = bookings.filter(b => b.pay === "paid").reduce((s, b) => s + priceOf({ pkg: b.pkg, people: b.people, hours: 2 }), 0);
  const guests = bookings.reduce((s, b) => s + b.people, 0);
  const pkgName = (id) => PACKAGES.find(p => p.id === id)?.[lang][0] || id;
  const allDates = [...new Set(bookings.map(b => b.date))].sort();
  const shown = filter === "all" ? bookings : bookings.filter(b => b.date === filter);

  const submitAdd = () => {
    const rec = { id: "MX" + Math.random().toString(36).slice(2, 7).toUpperCase(), date: f.date, time: f.time, pkg: f.pkg, people: Number(f.people) || 1, name: f.name, phone: f.phone, email: f.email, pay: f.pay };
    onAdd(rec); setF(blank); setAdding(false);
  };
  const addOk = f.date && f.time && f.name.trim() && f.people > 0;

  const clients = useMemo(() => {
    const map = {};
    bookings.forEach(b => { if (b.email) { const k = b.email.toLowerCase(); if (!map[k]) map[k] = { email: b.email, name: b.name }; } });
    return Object.values(map);
  }, [bookings]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal wide" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h3 style={{ flex: 1 }}><LayoutDashboard size={18} style={{ verticalAlign: "-3px" }} /> {t("Админ панел · МАХАЛА", "Admin · MAHALA")}</h3>
          <button className="modal-x" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <div className="adash">
            <div className="kpi"><div className="l"><Calendar size={13} />{t("Резервации", "Bookings")}</div><b>{bookings.length}</b></div>
            <div className="kpi"><div className="l"><Users size={13} />{t("Гости", "Guests")}</div><b>{guests}</b></div>
            <div className="kpi"><div className="l"><TrendingUp size={13} />{t("Приходи", "Revenue")}</div><b>€{revenue}</b></div>
            <div className="kpi"><div className="l"><Ban size={13} />{t("Блокирани дни", "Blocked")}</div><b>{blocked.length}</b></div>
          </div>

          <div className="atabs">
            <button className={"atab" + (tab === "bookings" ? " on" : "")} onClick={() => setTab("bookings")}>{t("Резервации", "Bookings")}</button>
            <button className={"atab" + (tab === "clients" ? " on" : "")} onClick={() => setTab("clients")}>{t("Клиенти и точки", "Clients & points")}</button>
            <button className={"atab" + (tab === "dates" ? " on" : "")} onClick={() => setTab("dates")}>{t("Блокиране на дати", "Block dates")}</button>
          </div>

          {tab === "bookings" && (
            <>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
                <button className="btn btn-coral btn-sm" onClick={() => setAdding(a => !a)}>{adding ? <><X size={15} />{t("Откажи", "Cancel")}</> : <><Plus size={15} />{t("Нова резервация", "New booking")}</>}</button>
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)" }}>{t("Филтър:", "Filter:")}</span>
                <select className="input" style={{ width: "auto", padding: "9px 12px" }} value={filter} onChange={e => setFilter(e.target.value)}>
                  <option value="all">{t("Всички", "All")}</option>
                  {allDates.map(d => <option key={d} value={d}>{fmtDate(d)}</option>)}
                </select>
              </div>

              {adding && (
                <div className="addbox">
                  <div className="addgrid">
                    <div className="field" style={{ margin: 0 }}>
                      <label>{t("Пакет", "Package")}</label>
                      <select className="input" value={f.pkg} onChange={e => setF({ ...f, pkg: e.target.value, time: "" })}>
                        {pkgList.map(p => <option key={p.id} value={p.id}>{p[lang][0]}</option>)}
                      </select>
                    </div>
                    <div className="field" style={{ margin: 0 }}>
                      <label>{t("Дата", "Date")}</label>
                      <select className="input" value={f.date} onChange={e => setF({ ...f, date: e.target.value, time: "" })}>
                        {future.map(d => <option key={d.str} value={d.str}>{fmtDate(d.str)}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="field" style={{ marginTop: 12, marginBottom: 12 }}>
                    <label>{t("Час", "Time")}</label>
                    <div className="aslots">
                      {SLOTS.map(s => {
                        const info = slotInfo(f.date, s);
                        const full = info.blocked || info.locked || (CAP - info.taken) < f.people;
                        return <button key={s} disabled={full} className={"aslot" + (f.time === s ? " on" : "")} onClick={() => setF({ ...f, time: s })}>{s}</button>;
                      })}
                    </div>
                  </div>
                  <div className="addgrid">
                    <div className="field" style={{ margin: 0 }}><label>{t("Име на клиента", "Client name")}</label><input className="input" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></div>
                    <div className="field" style={{ margin: 0 }}><label>{t("Телефон", "Phone")}</label><input className="input" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} placeholder="+359 ..." /></div>
                    <div className="field" style={{ margin: 0 }}><label>{t("Имейл", "Email")}</label><input className="input" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="ti@email.bg" /></div>
                    <div className="field" style={{ margin: 0 }}>
                      <label>{t("Хора", "People")}</label>
                      <div className="stepper">
                        <button onClick={() => setF({ ...f, people: Math.max(1, f.people - 1) })}><Minus size={15} /></button>
                        <span>{f.people}</span>
                        <button onClick={() => setF({ ...f, people: f.people + 1 })}><Plus size={15} /></button>
                      </div>
                    </div>
                  </div>
                  <div className="chips" style={{ marginTop: 12 }}>
                    <button className={"chip" + (f.pay === "paid" ? " on" : "")} onClick={() => setF({ ...f, pay: "paid" })}>{t("Платено", "Paid")}</button>
                    <button className={"chip" + (f.pay === "onsite" ? " on" : "")} onClick={() => setF({ ...f, pay: "onsite" })}>{t("На място", "On site")}</button>
                  </div>
                  <button className="btn btn-ink" style={{ width: "100%", justifyContent: "center", marginTop: 14 }} disabled={!addOk} onClick={submitAdd}><Check size={16} />{t("Добави резервация", "Add booking")}</button>
                </div>
              )}

              <div className="atable">
                <div className="ar head"><span>{t("Клиент", "Client")}</span><span>{t("Пакет", "Package")}</span><span>{t("Дата", "Date")}</span><span>{t("Хора", "Ppl")}</span><span>{t("Статус", "Status")}</span><span /></div>
                {shown.length === 0 && <div className="ar"><span style={{ gridColumn: "1 / -1", color: "var(--muted)", fontWeight: 600 }}>{t("Няма резервации.", "No bookings.")}</span></div>}
                {shown.map(b => (
                  <div className="ar" key={b.id}>
                    <span><b>{b.name}</b><br /><small style={{ color: "var(--muted)" }}>{b.id}</small></span>
                    <span>{pkgName(b.pkg)}</span>
                    <span>{fmtDate(b.date)}<br /><small style={{ color: "var(--muted)" }}>{b.time}</small></span>
                    <span>{b.people}</span>
                    <span><span className={"badge " + (b.pay === "paid" ? "paid" : "onsite")}>{b.pay === "paid" ? t("Платено", "Paid") : t("На място", "On site")}</span></span>
                    <button className="rm" title={t("Премахни", "Remove")} onClick={() => { if (window.confirm(t("Да премахна ли тази резервация?", "Remove this booking?"))) onRemove(b.id); }}><Trash2 size={15} /></button>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "clients" && (
            <>
              <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600, marginBottom: 12 }}>
                {t("Точки: +1 на €1 платено, +10 на посещение, +50 при регистрация. 100 точки = 1 безплатен час. Можеш да коригираш ръчно (±50).", "Points: +1 per €1 paid, +10 per visit, +50 on signup. 100 pts = 1 free hour. Manual adjust (±50).")}
              </p>
              {clients.length === 0 && <p style={{ color: "var(--muted)", fontWeight: 600 }}>{t("Още няма клиенти с имейл.", "No clients with email yet.")}</p>}
              {clients.map(c => {
                const pts = userPoints(c.email, bookings, pointAdjust[c.email] || 0);
                const lvl = levelFor(pts);
                return (
                  <div className="cli" key={c.email}>
                    <span className="clvl" title={lvl[lang]}>{lvl.icon}</span>
                    <div className="cinfo2"><b>{c.name}</b><small>{c.email} · {lvl[lang]}</small></div>
                    <div className="cpts">{pts}</div>
                    <div className="padj">
                      <button title="-50" onClick={() => onAdjust(c.email, -50)}>−</button>
                      <button title="+50" onClick={() => onAdjust(c.email, 50)}>+</button>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {tab === "dates" && (
            <>
              <p style={{ fontWeight: 800, margin: "4px 0 8px" }}>{t("Блокирай дати (частни събития)", "Block dates (private events)")}</p>
              <div className="dow">{DOW_BG.map(d => <span key={d}>{d}</span>)}</div>
              <div className="cal">
                {days.map((dd, i) => (
                  <button key={i} className={"day" + (blocked.includes(dd.str) ? " blk" : "")} disabled={dd.past} onClick={() => onBlock(dd.str)}>
                    {dd.d.getDate()}<small>{MONTHS_BG[dd.d.getMonth()]}</small>
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10, fontWeight: 600 }}>{t("Натисни ден, за да го блокираш/отблокираш — отразява се в календара за резервации.", "Tap a day to block/unblock — reflected in the booking calendar.")}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
