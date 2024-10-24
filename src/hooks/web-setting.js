const updateViewportContent = () => {
  const meta = document.querySelector('meta[name="viewport"]')
  const mediaQueryList = window.matchMedia('(orientation: landscape)')


  const outerHeight = mediaQueryList.matches ? window.outerHeight : window.outerWidth

  if (mediaQueryList.matches) {
    meta.content =
      'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover'
    return
  } else {
    if (outerHeight <= 568) {
      meta.content = 'width=375, user-scalable=no, viewport-fit=cover'
    } else {
      meta.content =
        'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover'
    }
  }

  // sm 下等比縮小配置
}
function onGestureStart(ev) {
  ev.preventDefault() // 阻止縮放手勢
}


//判斷是否是IOS
export const isIos = /iPhone|iPad|iPod|Mac/i.test(navigator.userAgent || '')


export {updateViewportContent,onGestureStart}
