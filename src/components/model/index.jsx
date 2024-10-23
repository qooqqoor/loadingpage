import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import { createPortal } from 'react-dom'
import {checkHasModal} from "../../hooks/scroll-modal-listion.js";


const transitionModalStyles = {
  fadeIn: {
    entering: {
      opacity: '1',
      transform: 'translateY(0px)',
    },
    entered: {
      opacity: '1',
      transform: 'translateY(0px)',
    },
    exiting: {
      opacity: '0',
      transform: 'translateY(15px)',
    },
    exited: {
      opacity: '0',
      transform: 'translateY(15px)',
    },
    unmounted: {
      opacity: '0',
      transform: 'translateY(15px)',
    },
  },
  // }
  // 50% {
  //   transform: rotate(10deg);
  // animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  // }
  popup: {
    entering: {
      opacity: '1',
      transform: 'scale(1)',
    },

    entered: {
      opacity: '1',
      transform: 'scale(1)',
    },
    exiting: {
      opacity: '1',
      transform: 'scale(1.05)',
    },
    exited: {
      opacity: '0',
      transform: 'scale(0)',
    },
    unmounted: {
      opacity: '0',
      transform: 'scale(0)',
    },
  },

}

const transitionTimeOut = {
  fadeIn: 300,
  popup: 450,
}

const maskStyle = {
  opacity: '0',
  transition: 'opacity 0.3s ease-out',
}

const transitionMaskStyles = {
  entering: { opacity: '1' },
  entered: { opacity: '1' },
  exiting: { opacity: '0' },
  exited: { opacity: '0' },
  unmounted: { opacity: '0' },
}

const modalSizeStyle = {
  fadeIn: 'max-h-80vh',
  popup: 'max-h-80vh',
}

const modalWidthStyle = {
  fadeIn: 'max-w-90vw <sm:(w-90vw)',
  popup: 'max-w-90vw <sm:(w-90vw)',
}

const Modal = ({
                 visible,
                 onCancel = () => {},
                 className,
                 children,
                 style = {},
                 zIndex = 98,
                 layoutWrapper,
                 closeMaskCancel = false,
                 animationType = 'fadeIn',
                 fullScreen,
                 target,
                 maskBgColor,
                 modalClassName,
               }) => {
  const maskRef = useRef(null)
  const modalTimeRef = useRef(null)
  const [show, setShow] = useState(false)
  const [animateShow, setAnimateShow] = useState(false)

  const _layoutWrapper =
    layoutWrapper ||
    (target && document.getElementById(target)) ||
    document.body

  useEffect(() => {
    modalTimeRef.current && clearTimeout(modalTimeRef.current)

    if (!visible) {
      setAnimateShow(visible)
      modalTimeRef.current = setTimeout(() => {
        setShow(false)
      }, transitionTimeOut[animationType])
    } else {
      setShow(true)
      modalTimeRef.current = setTimeout(() => {
        setAnimateShow(visible)
      }, transitionTimeOut[animationType] / 2)
    }
  }, [visible])

  useEffect(() => {
    checkHasModal()
  }, [show])

  useEffect(() => {
    return () => {
      checkHasModal()
    }
  }, [])

  const modalStyle = {
    fadeIn: {
      opacity: '0',
      transform: 'translateY(15px)',
      transition: 'opacity,transform 0.2s ease-out',
      zIndex: zIndex + 1,
    },
    popup: {
      opacity: '0',
      transition: 'opacity 0.2s  ease-out,transform 0.35s cubic-bezier(.1,1.1,.7,1.14)',
      zIndex: zIndex + 1,
    },

  }

  const innerHeight = window.innerHeight

  return (
    show &&
    createPortal(
      <div
        className={'flex items-center justify-center fixed top-0 bottom-0 right-0 left-0  overflow-hidden'}
        style={{ zIndex: zIndex }}
      >
        {!fullScreen && (
          <Transition nodeRef={maskRef} in={animateShow} timeout={300}>
            {state => (
              <div
                className={'absolute top-0 bottom-0 right-0 left-0 z-98 ' + modalClassName}
                ref={maskRef}
                style={{ ...maskStyle, ...transitionMaskStyles[state] }}
              >
                <div
                  className={
                    'absolute top-0 bottom-0 right-0 left-0  bg-[rgba(0,0,0,0.6)]'
                  }
                  onClick={() =>!closeMaskCancel && onCancel()}
                />


              </div>
            )}
          </Transition>
        )}

        <Transition nodeRef={maskRef} in={animateShow} timeout={200}>
          {state => (
            <div
              className={
                'absolute ' + '  ' +
                modalClassName+ ' ' +
                show ? 'mask-show' : ''
              }
              ref={maskRef}
              style={{
                position: 'absolute',

                ...modalStyle[animationType],
                ...transitionModalStyles[animationType][state],
              }}
            >
              <div
                className={
                  'overflow-hidden relative ' +
                  !fullScreen && modalSizeStyle[animationType]  + ' ' +
                  className
                }
                style={fullScreen ? { height: innerHeight, ...style } : style}
              >
                {children}
              </div>
            </div>
          )}
        </Transition>
      </div>,
      _layoutWrapper,
    )
  )
}

export { Modal }
