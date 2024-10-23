const updateViewportContent = () => {
  const meta = document.querySelector('meta[name="viewport"]')
  const mediaQueryList = window.matchMedia('(orientation: landscape)')

  const outerHeight = mediaQueryList.matches ? window.outerHeight : window.outerWidth

  if (mediaQueryList.matches) {
    meta.content =
      'width=568, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover'
    return
  } else {
    if (outerHeight <= 568) {
      meta.content = 'width=375, user-scalable=no, viewport-fit=cover'
    } else {
      meta.content =
        'width=568, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover'
    }
  }

  // sm 下等比縮小配置
}
function onGestureStart(ev) {
  ev.preventDefault() // 阻止縮放手勢
}

export {updateViewportContent,onGestureStart}
