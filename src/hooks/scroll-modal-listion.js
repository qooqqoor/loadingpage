let scrollPosition = 0

export function checkHasModal() {
	setTimeout(() => {
		const mask = document.querySelector('.mask-show')
		if (mask) {
			disableScroll() // 如果有彈窗就禁滾
		} else {
			enableScroll() // 不然就給我滾
		}
	})
}

export function toTop() {
	document.documentElement.scrollTo({ top: -1, behavior: 'smooth' })
}

function disableScroll() {
	document.documentElement.classList.add('no-scroll')
	if (iOSVersion14()) {
		scrollPosition = window.scrollY || document.documentElement.scrollTop
		document.body.style.position = 'fixed'
		document.body.style.top = `-${scrollPosition}px`
		document.documentElement.classList.add('min-ios14')
	}
}

function enableScroll() {
	document.documentElement.classList.remove('no-scroll')
	if (iOSVersion14()) {
		document.body.style.position = 'relative'
		document.body.style.top = ''
		window.scrollTo({ top: scrollPosition, behavior: 'auto' })
		document.documentElement.classList.remove('min-ios14')
	}
}

function iOSVersion14() {
	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

	if (isIOS) {
		// 获取 iOS 版本号
		const match = navigator.userAgent.match(/OS (\d+)_/)
		const iOSVersion = match ? parseInt(match[1], 10) : 0
		// 如果 iOS 版本小于 14，将 class 添加到 html 元素
		return iOSVersion > 0 && iOSVersion <= 14
	}
}

export function getFixedHeader() {
	const fixedHeader = document.getElementById('fixed-header')
	return fixedHeader?.clientHeight || 47
}
