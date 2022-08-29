import { useTheme } from 'next-themes'


const Logo = (props) => {
    const { theme, setTheme, systemTheme } = useTheme()
  console.log('theme', theme, systemTheme)
    return (<img
    src={theme == 'dark' ? '/logo.png' : '/logo2.png'}
    alt="logo surf0"
    width={props.width}
  />)
}

export default Logo;