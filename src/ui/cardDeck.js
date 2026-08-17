import { store } from '../core/store';

/**
 * DECK 3D — pile de cartes interactive.
 * Les cartes d'un conteneur (.t-grid / .ach-list) sont empilées en 3D
 * (translateZ + translateY décroissants, opacité progressive) sur un plan
 * incliné rotateY. Des boutons flèches (et le swipe sur mobile) font tourner
 * la pile : la carte de devant sort en volant, la suivante avance, boucle
 * infinie. Aucune interception de la molette : le défilement de page reste libre.
 * Respecte prefers-reduced-motion (pile statique, cycle sans animation).
 */

const STAGGER = 9; // px de décalage vertical par rang
const THICK = 26; // px de profondeur par rang
const MIN_OPACITY = 0.45;
const FLY_MS = 460;
const SETTLE_MS = 420;

export function initCardDeck() {
  document.querySelectorAll('.t-grid, .ach-list').forEach(setupDeck);
}

function setupDeck(el) {
  if (typeof el.__deckCleanup === 'function') el.__deckCleanup();
  const token = {};
  el.__deckToken = token;

  let stack = el.querySelector(':scope > .deck-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'deck-stack';
    while (el.firstChild) stack.appendChild(el.firstChild);
    el.appendChild(stack);
  }

  const cards = [...stack.children].filter((c) => !c.classList.contains('deck-ui'));
  cards.forEach((c, i) => {
    c.classList.add('deck-card');
    c.__didx = i;
  });

  const ui = document.createElement('div');
  ui.className = 'deck-ui';
  const count = document.createElement('span');
  count.className = 'deck-count';
  const nav = document.createElement('div');
  nav.className = 'deck-nav';
  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'deck-btn';
  prev.setAttribute('aria-label', 'Carte précédente');
  prev.innerHTML = '‹';
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'deck-btn';
  next.setAttribute('aria-label', 'Carte suivante');
  next.innerHTML = '›';
  nav.append(prev, next);
  const hint = document.createElement('span');
  hint.className = 'deck-hint';
  hint.textContent = store.features.isTouch ? 'Balaye pour tourner les cartes' : 'Clique sur les flèches';
  ui.append(count, nav, hint);
  el.appendChild(ui);

  let order = [...cards];
  const n = order.length;
  const reduce = store.features.reducedMotion;
  let locked = false;
  let touchStart = null;
  let touchLast = null;
  let swiping = false;

  function setRank(card, r) {
    card.style.zIndex = String(n - r);
    card.style.transform = `translate3d(0, ${-r * STAGGER}px, ${-r * THICK}px)`;
    card.style.opacity = r === 0 ? '1' : Math.max(1 - (r / (n - 1)) * (1 - MIN_OPACITY), MIN_OPACITY).toFixed(3);
    card.dataset.rank = String(r);
  }

  function render() {
    order.forEach((c, r) => setRank(c, r));
    const cur = order[0] ? order[0].__didx + 1 : 1;
    count.innerHTML = `<b>${String(cur).padStart(2, '0')}</b> / ${String(n).padStart(2, '0')}`;
    prev.disabled = n < 2;
    next.disabled = n < 2;
  }

  function advance(dir) {
    if (locked || n < 2) return;
    locked = true;

    if (reduce) {
      order = dir > 0 ? [...order.slice(1), order[0]] : [order[n - 1], ...order.slice(0, n - 1)];
      render();
      locked = false;
      return;
    }

    if (dir > 0) {
      const front = order[0];
      front.classList.add('is-fly');
      const nextOrder = [...order.slice(1), front];
      nextOrder.forEach((c, r) => {
        if (c !== front) setRank(c, r);
      });
      setTimeout(() => {
        if (el.__deckToken !== token) return;
        front.classList.remove('is-fly');
        setRank(front, n - 1);
        order = nextOrder;
        render();
        setTimeout(() => {
          if (el.__deckToken !== token) return;
          locked = false;
        }, SETTLE_MS);
      }, FLY_MS);
    } else {
      order = [order[n - 1], ...order.slice(0, n - 1)];
      render();
      setTimeout(() => {
        if (el.__deckToken !== token) return;
        locked = false;
      }, 700);
    }
  }

  const onNext = () => advance(1);
  const onPrev = () => advance(-1);
  next.addEventListener('click', onNext);
  prev.addEventListener('click', onPrev);

  const onTouchStart = (e) => {
    touchStart = e.touches[0].clientY;
    touchLast = touchStart;
    swiping = false;
  };
  const onTouchMove = (e) => {
    if (touchStart === null) return;
    const y = e.touches[0].clientY;
    if (!swiping && Math.abs(y - touchStart) > 12) swiping = true;
    if (swiping) {
      e.preventDefault();
      touchLast = y;
    }
  };
  const onTouchEnd = () => {
    if (swiping && touchStart !== null && touchLast !== null) {
      const dy = touchLast - touchStart;
      if (Math.abs(dy) >= 40) advance(dy < 0 ? 1 : -1);
    }
    touchStart = touchLast = null;
    swiping = false;
  };

  el.addEventListener('touchstart', onTouchStart, { passive: true });
  el.addEventListener('touchmove', onTouchMove, { passive: false });
  el.addEventListener('touchend', onTouchEnd, { passive: true });

  el.__deckCleanup = () => {
    next.removeEventListener('click', onNext);
    prev.removeEventListener('click', onPrev);
    el.removeEventListener('touchstart', onTouchStart);
    el.removeEventListener('touchmove', onTouchMove);
    el.removeEventListener('touchend', onTouchEnd);
  };

  if (reduce || typeof IntersectionObserver === 'undefined') {
    stack.classList.add('deck-in');
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            stack.classList.add('deck-in');
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(stack);
  }

  render();
}
