/*
 * CYBORG landing page — React components (Navbar, Hero, Intro, Technology,
 * Features, Showcase, Stats, CTA, Footer).
 * React and ReactDOM are loaded from js/vendor/ (no build step required).
 */
const {
  useState,
  useEffect,
  useRef
} = React;
const NAV = [['home', 'HOME'], ['technology', 'TECHNOLOGY'], ['features', 'FEATURES'], ['about', 'ABOUT']];
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const go = id => document.getElementById(id)?.scrollIntoView({
  behavior: reduceMotion() ? 'auto' : 'smooth'
});
/* Run fn on scroll, at most once per animation frame; returns a cleanup function */
function onScroll(fn) {
  let t = false;
  const h = () => {
    if (t) return;
    t = true;
    requestAnimationFrame(() => {
      t = false;
      fn();
    });
  };
  window.addEventListener('scroll', h, {
    passive: true
  });
  return () => window.removeEventListener('scroll', h);
}
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }), {
      threshold: .15
    });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}
function useActive() {
  const [a, setA] = useState('home');
  useEffect(() => {
    const on = () => {
      let cur = 'home',
        best = -Infinity;
      NAV.forEach(([id]) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top < window.innerHeight * .4 && top > best) {
          best = top;
          cur = id;
        }
      });
      setA(cur);
    };
    on();
    return onScroll(on);
  }, []);
  return a;
}

/* Head: left half solid, right half resolved into contour lines */
function Head({
  uid
}) {
  const d = "M230 40C320 40 370 110 365 200C362 260 340 300 330 340L330 420L250 440L250 380C230 385 215 370 215 350L195 350C185 350 188 335 195 328L190 300C178 296 176 284 186 276C170 250 160 200 175 150C190 80 200 40 230 40Z";
  const lines = [];
  for (let y = 30; y < 450; y += 9) lines.push(/*#__PURE__*/React.createElement("line", {
    key: y,
    x1: "0",
    x2: "400",
    y1: y,
    y2: y
  }));
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 500",
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: 'h' + uid
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: 'r' + uid
  }, /*#__PURE__*/React.createElement("rect", {
    x: "268",
    y: "0",
    width: "140",
    height: "500"
  }))), /*#__PURE__*/React.createElement("g", {
    clipPath: 'url(#h' + uid + ')'
  }, /*#__PURE__*/React.createElement("rect", {
    width: "400",
    height: "500",
    fill: "#16191c"
  }), /*#__PURE__*/React.createElement("g", {
    clipPath: 'url(#r' + uid + ')',
    stroke: "#52d9e6",
    strokeWidth: ".8",
    opacity: ".75"
  }, lines), /*#__PURE__*/React.createElement("path", {
    d: "M268 40V440",
    stroke: "#52d9e6",
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: "#3a4046",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("g", {
    stroke: "#52d9e6",
    fill: "none",
    strokeWidth: "1"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "212",
    cy: "190",
    r: "11"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "212",
    cy: "190",
    r: "3",
    fill: "#52d9e6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M212 170v-12M212 210v12M192 190h-12M232 190h12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M268 120h60l16 16v40",
    opacity: ".7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "344",
    cy: "180",
    r: "2.5",
    fill: "#52d9e6"
  })), /*#__PURE__*/React.createElement("g", {
    stroke: "#3a4046",
    strokeWidth: "1"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 20h16M20 20v16M380 20h-16M380 20v16M20 480h16M20 480v-16M380 480h-16M380 480v-16"
  })));
}
function Navbar({
  active
}) {
  const [s, setS] = useState(false),
    [o, setO] = useState(false);
  useEffect(() => {
    const f = () => setS(window.scrollY > 20);
    f();
    return onScroll(f);
  }, []);
  const nav = id => {
    setO(false);
    go(id);
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: (s ? 's ' : '') + (o ? 'o' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap nb"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#home",
    className: "logo",
    onClick: e => {
      e.preventDefault();
      nav('home');
    }
  }, "CYBORG"), /*#__PURE__*/React.createElement("div", {
    className: "links"
  }, NAV.map(([id, t]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: '#' + id,
    className: active === id ? 'on' : '',
    onClick: e => {
      e.preventDefault();
      nav(id);
    }
  }, t))), /*#__PURE__*/React.createElement("button", {
    className: "btn p sm",
    onClick: () => nav('technology')
  }, "EXPLORE"), /*#__PURE__*/React.createElement("button", {
    className: 'burger' + (o ? ' o' : ''),
    "aria-label": "Menu",
    "aria-expanded": o,
    onClick: () => setO(!o)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null))), /*#__PURE__*/React.createElement("div", {
    className: "menu"
  }, NAV.map(([id, t]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: '#' + id,
    className: active === id ? 'on' : '',
    onClick: e => {
      e.preventDefault();
      nav(id);
    }
  }, t)), /*#__PURE__*/React.createElement("button", {
    className: "btn p",
    onClick: () => nav('technology')
  }, "EXPLORE")));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    id: "home",
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap hg"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lbl ld"
  }, /*#__PURE__*/React.createElement("b", null, "●"), " \xA0Cybernetic systems / v4.2"), /*#__PURE__*/React.createElement("h1", {
    className: "ld",
    style: {
      animationDelay: '.1s'
    }
  }, "Human.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "Redefined.")), /*#__PURE__*/React.createElement("p", {
    className: "sub ld",
    style: {
      animationDelay: '.25s'
    }
  }, "Where human intelligence meets the power of advanced technology."), /*#__PURE__*/React.createElement("p", {
    className: "d ld",
    style: {
      animationDelay: '.35s'
    }
  }, "Cybernetics joins the nervous system to machine systems, so the body can sense more, process faster and move beyond its natural limits, while the person stays in control."), /*#__PURE__*/React.createElement("div", {
    className: "cta ld",
    style: {
      animationDelay: '.45s'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn p",
    onClick: () => go('technology')
  }, "EXPLORE TECHNOLOGY ", /*#__PURE__*/React.createElement("i", null, "→")), /*#__PURE__*/React.createElement("button", {
    className: "btn g",
    onClick: () => go('about')
  }, "DISCOVER MORE"))), /*#__PURE__*/React.createElement("div", {
    className: "vis ld",
    style: {
      animationDelay: '.3s'
    }
  }, /*#__PURE__*/React.createElement(Head, {
    uid: "a"
  }), /*#__PURE__*/React.createElement("div", {
    className: "scan"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tag",
    style: {
      left: 12,
      top: 12
    }
  }, "SUBJECT 07"), /*#__PURE__*/React.createElement("span", {
    className: "tag",
    style: {
      right: 12,
      bottom: 12
    }
  }, /*#__PURE__*/React.createElement("b", null, "●"), " LINK STABLE"))));
}
function Intro() {
  return /*#__PURE__*/React.createElement("section", {
    id: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap ig"
  }, /*#__PURE__*/React.createElement("div", {
    className: "big rv"
  }, "01"), /*#__PURE__*/React.createElement("div", {
    className: "rv"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Introduction"), /*#__PURE__*/React.createElement("h2", null, "The next evolution of human potential"), /*#__PURE__*/React.createElement("p", null, "For most of history, tools stayed outside the body. Now they are moving in. Interfaces that read intent, sensors that widen perception and actuators that follow a thought are turning technology into an extension of the person using it."), /*#__PURE__*/React.createElement("p", null, "The aim is not to build something less human. It is to remove the limits that were never part of who we are."))));
}
const TECH = [['01', 'Neural Interface', 'Technology that creates a seamless connection between human thought and digital systems.', 'M0 32h30l8-20 10 40 10-30 8 10h20l8-14 10 28 8-14h50', '12 ch / 1 kHz'], ['02', 'Cybernetic Vision', 'Advanced visual processing designed to extend human perception.', 'M0 32C40 -4 100 -4 140 32C100 68 40 68 0 32ZM70 22a10 10 0 100 20 10 10 0 000-20', 'IR / UV / 4K'], ['03', 'Robotic Mobility', 'Intelligent mechanical systems designed to enhance movement and performance.', 'M4 56L40 56L70 12L110 12L140 56', '6 DOF / 12 ms']];
function Technology() {
  return /*#__PURE__*/React.createElement("section", {
    id: "technology"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "th rv"
  }, /*#__PURE__*/React.createElement("h2", null, "Built for", /*#__PURE__*/React.createElement("br", null), "the future"), /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "03 core systems")), TECH.map(([n, t, d, p, m]) => /*#__PURE__*/React.createElement("div", {
    className: "row rv",
    key: n
  }, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, n), /*#__PURE__*/React.createElement("h3", null, t), /*#__PURE__*/React.createElement("p", null, d), /*#__PURE__*/React.createElement("div", {
    className: "vz"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 150 64",
    preserveAspectRatio: "xMinYMid meet"
  }, /*#__PURE__*/React.createElement("path", {
    d: p,
    fill: "none",
    stroke: "#52d9e6",
    strokeWidth: "1.2"
  })), /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, m))))));
}
const FEAT = [['Enhanced Intelligence', 'Onboard processing works alongside your own thinking, surfacing context and analysis the moment you need it.'], ['Advanced Mobility', 'Adaptive actuators read intent and adjust force, balance and speed in real time.'], ['Neural Connectivity', 'A two-way link between thought and system, with latency low enough to feel like instinct.'], ['Real-Time Processing', 'Sensor data is filtered, fused and acted on within milliseconds, with no lag between decision and response.']];
function Features() {
  const [o, setO] = useState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "features"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap fg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rv"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl",
    style: {
      marginBottom: 20
    }
  }, "Capabilities"), /*#__PURE__*/React.createElement("h2", null, "Human", /*#__PURE__*/React.createElement("br", null), "× Machine")), /*#__PURE__*/React.createElement("ul", {
    className: "fl rv"
  }, FEAT.map(([t, d], i) => /*#__PURE__*/React.createElement("li", {
    key: t,
    className: o === i ? 'on' : ''
  }, /*#__PURE__*/React.createElement("button", {
    onMouseEnter: () => setO(i),
    onFocus: () => setO(i),
    onClick: () => setO(i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, t), /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, o === i ? '—' : '+')), /*#__PURE__*/React.createElement("div", {
    className: "x"
  }, /*#__PURE__*/React.createElement("div", null, d)))))));
}
function Showcase() {
  const bgRef = useRef(null);
  useEffect(() => {
    const f = () => {
      const el = bgRef.current;
      if (!el || reduceMotion()) return;
      const r = el.parentElement.getBoundingClientRect();
      el.style.transform = `translateY(${r.top * -.08}px) scale(1.1)`;
    };
    f();
    return onScroll(f);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "show"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg",
    ref: bgRef,
    style: {
      willChange: 'transform'
    }
  }, /*#__PURE__*/React.createElement(Head, {
    uid: "b"
  })), /*#__PURE__*/React.createElement("span", {
    className: "tag",
    style: {
      left: 'var(--pad)',
      top: '18%'
    }
  }, "NEURAL SYSTEM"), /*#__PURE__*/React.createElement("span", {
    className: "tag",
    style: {
      right: 'var(--pad)',
      top: '30%'
    }
  }, /*#__PURE__*/React.createElement("b", null, "●"), " ACTIVE"), /*#__PURE__*/React.createElement("span", {
    className: "tag",
    style: {
      left: '8%',
      top: '52%'
    }
  }, "98.7% SYNCHRONIZATION"), /*#__PURE__*/React.createElement("div", {
    className: "in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap rv"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("b", null, "●"), " SYSTEM ONLINE"), /*#__PURE__*/React.createElement("h2", null, "The line between human and machine is changing."))));
}
function Stats() {
  const S = [['98.7%', 'System sync'], ['24/7', 'Processing'], ['10×', 'Enhanced performance'], ['∞', 'Possibilities']];
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "wrap sg rv"
  }, S.map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("strong", null, v), /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, l)))));
}
function CTA() {
  return /*#__PURE__*/React.createElement("section", {
    className: "fin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap rv"
  }, /*#__PURE__*/React.createElement("h2", null, "Are you ready for the next evolution?"), /*#__PURE__*/React.createElement("p", null, "Technology should not replace human potential. It should expand it."), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => go('home')
  }, "ENTER THE FUTURE ", /*#__PURE__*/React.createElement("i", null, "→"))));
}
function Footer() {
  const L = (id, t) => /*#__PURE__*/React.createElement("li", {
    key: id
  }, /*#__PURE__*/React.createElement("a", {
    href: '#' + id,
    onClick: e => {
      e.preventDefault();
      go(id);
    }
  }, t));
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fgrid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "logo"
  }, "CYBORG"), /*#__PURE__*/React.createElement("p", null, "HUMAN POTENTIAL. ENHANCED.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Navigate"), /*#__PURE__*/React.createElement("ul", null, [['home', 'Home'], ['technology', 'Technology'], ['features', 'Features'], ['about', 'About']].map(([i, t]) => L(i, t)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Follow"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://github.com",
    target: "_blank",
    rel: "noopener"
  }, "GitHub ↗")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://linkedin.com",
    target: "_blank",
    rel: "noopener"
  }, "LinkedIn ↗")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://x.com",
    target: "_blank",
    rel: "noopener"
  }, "X ↗"))))), /*#__PURE__*/React.createElement("div", {
    className: "cp lbl"
  }, /*#__PURE__*/React.createElement("span", null, "© 2026 CYBORG. All rights reserved."), /*#__PURE__*/React.createElement("button", {
    className: "lbl",
    onClick: () => go('home')
  }, "Back to top ↑"))));
}
function App() {
  useReveal();
  const active = useActive();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar, {
    active: active
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Intro, null), /*#__PURE__*/React.createElement(Technology, null), /*#__PURE__*/React.createElement(Features, null), /*#__PURE__*/React.createElement(Showcase, null), /*#__PURE__*/React.createElement(Stats, null), /*#__PURE__*/React.createElement(CTA, null)), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));