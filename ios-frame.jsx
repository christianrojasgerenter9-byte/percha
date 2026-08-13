// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({ dark = false, time = '' }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      display: 'flex', gap: 154, alignItems: 'center', justifyContent: 'center',
      padding: '21px 24px 19px', boxSizing: 'border-box',
      position: 'relative', zIndex: 20, width: '100%',
    }}>
      <div style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 1.5 }}>
        <span style={{
          fontFamily: '-apple-system, "SF Pro", system-ui', fontWeight: 590,
          fontSize: 17, lineHeight: '22px', color: c,
        }}>{time}</span>
      </div>
      <div style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, paddingTop: 1, paddingRight: 1 }}>
        <svg width="19" height="12" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c}/>
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c}/>
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c}/>
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c}/>
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12">
          <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={c}/>
          <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill={c}/>
          <circle cx="8.5" cy="10.5" r="1.5" fill={c}/>
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none"/>
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c}/>
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({ children, dark = false, style = {} }) {
  return (
    <div style={{
      height: 44, minWidth: 44, borderRadius: 9999,
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: dark
        ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)'
        : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style,
    }}>
      {/* blur + tint */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 9999,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)',
      }} />
      {/* shine */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 9999,
        boxShadow: dark
          ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)'
          : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
        border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', padding: '0 4px' }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({ title = 'Title', dark = false, trailingIcon = true }) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = (content) => (
    <IOSGlassPill dark={dark}>
      <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {content}
      </div>
    </IOSGlassPill>
  );
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 10,
      paddingTop: 62, paddingBottom: 10, position: 'relative', zIndex: 5,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
      }}>
        {/* back chevron */}
        {pillIcon(
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" style={{ marginLeft: -1 }}>
            <path d="M10 2L2 10l8 8" stroke={muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {/* trailing ellipsis */}
        {trailingIcon && pillIcon(
          <svg width="22" height="6" viewBox="0 0 22 6">
            <circle cx="3" cy="3" r="2.5" fill={muted}/>
            <circle cx="11" cy="3" r="2.5" fill={muted}/>
            <circle cx="19" cy="3" r="2.5" fill={muted}/>
          </svg>
        )}
      </div>
      {/* large title */}
      <div style={{
        padding: '0 16px',
        fontFamily: '-apple-system, system-ui',
        fontSize: 34, fontWeight: 700, lineHeight: '41px',
        color: text, letterSpacing: 0.4,
      }}>{title}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({ title, detail, icon, chevron = true, isLast = false, dark = false }) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', minHeight: 52,
      padding: '0 16px', position: 'relative',
      fontFamily: '-apple-system, system-ui', fontSize: 17,
      letterSpacing: -0.43,
    }}>
      {icon && (
        <div style={{
          width: 30, height: 30, borderRadius: 7, background: icon,
          marginRight: 12, flexShrink: 0,
        }} />
      )}
      <div style={{ flex: 1, color: text }}>{title}</div>
      {detail && <span style={{ color: sec, marginRight: 6 }}>{detail}</span>}
      {chevron && (
        <svg width="8" height="14" viewBox="0 0 8 14" style={{ flexShrink: 0 }}>
          <path d="M1 1l6 6-6 6" stroke={ter} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {!isLast && (
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          left: icon ? 58 : 16, height: 0.5, background: sep,
        }} />
      )}
    </div>
  );
}

function IOSList({ header, children, dark = false }) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return (
    <div>
      {header && (
        <div style={{
          fontFamily: '-apple-system, system-ui', fontSize: 13,
          color: hc, textTransform: 'uppercase',
          padding: '8px 36px 6px', letterSpacing: -0.08,
        }}>{header}</div>
      )}
      <div style={{
        background: bg, borderRadius: 26,
        margin: '0 16px', overflow: 'hidden',
      }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children, width = 402, height = 874, dark = false,
  title, keyboard = false, bare = false,
}) {
  // Installed on a real phone: no fake bezel, island or status bar.
  if (bare) {
    return (
      <div data-om-starter="ios-frame" style={{
        width: '100%', minHeight: '100dvh', position: 'relative',
        background: dark ? '#000' : '#F2F2F7',
        display: 'flex', flexDirection: 'column',
        fontFamily: '-apple-system, system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased',
      }}>
        {title !== undefined && <IOSNavBar title={title} dark={dark} />}
        <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
      </div>
    );
  }
  return (
    // data-om-starter: inert presence marker — Claude Design's starter-usage
    // probe reads it; it renders nothing. Keep it on this root element.
    <div data-om-starter="ios-frame" style={{
      width, height, borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>

      {/* top band — covers where the notch and status icons used to be */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 54, zIndex: 40,
        background: '#4d8bc0',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
      }}>
        <img src="data:image/png;base64,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" alt="" width="26" height="26" style={{ borderRadius: 7, display: 'block' }} />
        <span style={{
          fontFamily: 'Caprasimo, Georgia, serif', fontSize: 16, letterSpacing: '.01em',
          color: '#f2f8fd', lineHeight: 1,
        }}>Bienvenido a Percha</span>
      </div>
      {/* status bar (absolute) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, display: 'none' }}>
        <IOSStatusBar dark={dark} />
      </div>
      {/* nav + content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {title !== undefined && <IOSNavBar title={title} dark={dark} />}
        <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
        {keyboard && <IOSKeyboard dark={dark} />}
      </div>
      {/* home indicator — always on top */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
        height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        paddingBottom: 8, pointerEvents: 'none',
      }}>
        <div style={{
          width: 139, height: 5, borderRadius: 100,
          background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)',
        }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({ dark = false }) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: <svg width="19" height="17" viewBox="0 0 19 17"><path d="M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z" fill={glyph}/></svg>,
    del: <svg width="23" height="17" viewBox="0 0 23 17"><path d="M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z" fill="none" stroke={glyph} strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 5l7 7M17 5l-7 7" stroke={glyph} strokeWidth="1.6" strokeLinecap="round"/></svg>,
    ret: <svg width="20" height="14" viewBox="0 0 20 14"><path d="M18 1v6H4m0 0l4-4M4 7l4 4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  };

  const key = (content, { w, flex, ret, fs = 25, k } = {}) => (
    <div key={k} style={{
      height: 42, borderRadius: 8.5,
      flex: flex ? 1 : undefined, width: w, minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs, fontWeight: 458, color: ret ? '#fff' : glyph,
    }}>{content}</div>
  );

  const row = (keys, pad = 0) => (
    <div style={{ display: 'flex', gap: 6.5, justifyContent: 'center', padding: `0 ${pad}px` }}>
      {keys.map(l => key(l, { flex: true, k: l }))}
    </div>
  );

  return (
    <div style={{
      position: 'relative', zIndex: 15, borderRadius: 27, overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      boxShadow: dark
        ? '0 -2px 20px rgba(0,0,0,0.09)'
        : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)',
    }}>
      {/* liquid glass bg — same recipe as nav pills */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 27,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 27,
        boxShadow: dark
          ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)'
          : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
        border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
        pointerEvents: 'none',
      }} />

      {/* autocorrect bar */}
      <div style={{
        display: 'flex', gap: 20, alignItems: 'center',
        padding: '8px 22px 13px', width: '100%', boxSizing: 'border-box',
        position: 'relative',
      }}>
        {['"The"', 'the', 'to'].map((w, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ width: 1, height: 25, background: '#ccc', opacity: 0.3 }} />}
            <div style={{
              flex: 1, textAlign: 'center',
              fontFamily: '-apple-system, system-ui', fontSize: 17,
              color: sugg, letterSpacing: -0.43, lineHeight: '22px',
            }}>{w}</div>
          </React.Fragment>
        ))}
      </div>

      {/* key layout */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 13,
        padding: '0 6.5px', width: '100%', boxSizing: 'border-box',
        position: 'relative',
      }}>
        {row(['q','w','e','r','t','y','u','i','o','p'])}
        {row(['a','s','d','f','g','h','j','k','l'], 20)}
        <div style={{ display: 'flex', gap: 14.25, alignItems: 'center' }}>
          {key(icons.shift, { w: 45, k: 'shift' })}
          <div style={{ display: 'flex', gap: 6.5, flex: 1 }}>
            {['z','x','c','v','b','n','m'].map(l => key(l, { flex: true, k: l }))}
          </div>
          {key(icons.del, { w: 45, k: 'del' })}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {key('ABC', { w: 92.25, fs: 18, k: 'abc' })}
          {key('', { flex: true, k: 'space' })}
          {key(icons.ret, { w: 92.25, ret: true, k: 'ret' })}
        </div>
      </div>

      {/* bottom spacer (emoji+mic area, icons omitted) */}
      <div style={{ height: 56, width: '100%', position: 'relative' }} />
    </div>
  );
}

Object.assign(window, {
  IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard,
});
