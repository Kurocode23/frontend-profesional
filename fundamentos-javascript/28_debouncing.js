function debounce (cb, wait, immediate) {
  let timeout

  return function (...params) {
    let _this = this

    function later () {
      timeout = null
      if (!immediate) cb.apply(_this, params)
    }
    
    const callNow = immediate && !timeout

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) cb.apply(_this, params)
  }
}

function onScroll (ev) {
  console.log('El usuario hizo scroll')
}

window.addEventListener('scroll', debounce(onScroll, 300))
