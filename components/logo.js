import { useTheme } from 'next-themes';

import { useEffect, useState } from 'react'

export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

const Logo = (props) => {
    const { theme, setTheme, systemTheme } = useTheme()
    const renderedTheme = theme === 'system' ? systemTheme : theme
    const mounted = useMounted()

    return (<img
    src={mounted && renderedTheme === 'dark' ? '/logo.png' : '/logo2.png'}
    alt="logo surf0"
    width={props.width}
  />)
}

export default Logo;