document.documentElement.classList.add('js')

;(function () {
  const hero = document.querySelector('.hero')
  const spotlight = document.querySelector('.hero__spotlight')

  if (!hero || !spotlight) return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function setSpotlight(clientX, clientY) {
    const rect = hero.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    spotlight.style.left = `${x}px`
    spotlight.style.top = `${y}px`
  }

  function resetSpotlight() {
    spotlight.style.left = '50%'
    spotlight.style.top = '42%'
  }

  if (prefersReduced) {
    resetSpotlight()
    return
  }

  hero.addEventListener('mousemove', function (e) {
    setSpotlight(e.clientX, e.clientY)
  })

  hero.addEventListener('mouseleave', resetSpotlight)

  hero.addEventListener(
    'touchmove',
    function (e) {
      if (!e.touches.length) return
      const t = e.touches[0]
      setSpotlight(t.clientX, t.clientY)
    },
    { passive: true }
  )

  hero.addEventListener('touchend', resetSpotlight)
})()

;(function () {
  const modal = document.getElementById('project-modal')
  const iframe = document.getElementById('project-modal-iframe')
  const frame = document.getElementById('project-modal-frame')
  const titleEl = document.getElementById('project-modal-title')
  const subtitleEl = document.getElementById('project-modal-subtitle')
  const urlEl = document.getElementById('project-modal-url')
  const vpButtons = document.querySelectorAll('.project-modal__vp-btn')
  const cards = document.querySelectorAll('.project-card[data-preview-src]')

  if (!modal || !iframe || !frame || !titleEl || !subtitleEl || !urlEl) return

  let lastFocus = null

  function setViewportWidth(px) {
    frame.style.width = `${px}px`
    vpButtons.forEach(function (btn) {
      const w = parseInt(btn.getAttribute('data-viewport-width'), 10)
      btn.classList.toggle('is-active', w === px)
    })
  }

  function openModal(card) {
    const src = card.getAttribute('data-preview-src')
    const title = card.getAttribute('data-project-title') || 'Project'
    const url = card.getAttribute('data-project-url') || src

    if (!src) return

    lastFocus = document.activeElement
    titleEl.textContent = title
    subtitleEl.textContent = 'Live preview · Desktop 1200px · Tablet 768px · Mobile 375px'
    urlEl.textContent = url

    iframe.removeAttribute('src')
    iframe.setAttribute('src', src)

    setViewportWidth(1200)
    modal.removeAttribute('hidden')
    document.body.style.overflow = 'hidden'

    requestAnimationFrame(function () {
      modal.querySelector('.project-modal__close').focus()
    })
  }

  function closeModal() {
    modal.setAttribute('hidden', '')
    iframe.removeAttribute('src')
    document.body.style.overflow = ''

    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus()
    }
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card)
    })
  })

  modal.querySelectorAll('[data-modal-close]').forEach(function (el) {
    el.addEventListener('click', closeModal)
  })

  vpButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const w = parseInt(btn.getAttribute('data-viewport-width'), 10)
      if (!w) return
      setViewportWidth(w)
    })
  })

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeModal()
    }
  })
})()

;(function () {
  const header = document.querySelector('.site-header')
  if (!header) return

  function onScroll() {
    if (window.scrollY > 16) {
      header.classList.add('is-scrolled')
    } else {
      header.classList.remove('is-scrolled')
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})()

;(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href')
      if (!href || href === '#' || href.length < 2) return
      const id = href.slice(1)
      if (!id || /[:\s]/.test(id)) return
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  })
})()

;(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    return
  }

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return
  }

  try {
    gsap.registerPlugin(ScrollTrigger)

    var heroItems = document.querySelectorAll('.hero .js-reveal')
    if (heroItems.length) {
      gsap.from(heroItems, {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.12,
        clearProps: 'opacity,transform',
      })
    }

    document.querySelectorAll('[data-scroll-block]').forEach(function (block) {
      var items = block.querySelectorAll('.js-reveal')
      if (!items.length) return

      gsap.from(items, {
        scrollTrigger: {
          trigger: block,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
      })
    })
  } catch (err) {
    console.warn('Scroll animation init failed:', err)
  }
})()
