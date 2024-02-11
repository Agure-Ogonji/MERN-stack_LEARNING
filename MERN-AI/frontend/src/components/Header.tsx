import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{bgcolor:"transparent", position: "static", boxShadow:"none"}}>
        <Toolbar sx={{display:"flex"}}>
            <Logo/>
            <div>
              {auth?.isLoggedIn ? (
              <>
                <NavigationLink bg='#00fffc' to='/chat' text='GO TO CHAT' textColor='black'/>
                <NavigationLink bg='#51538f' textColor='white' to='/' text='logout' onClick={auth.logout} />
              </>) : (
              <>
                <NavigationLink bg='#00fffc' to='/login' text='LOGIN' textColor='black'/>
                <NavigationLink bg='#51538f' textColor='white' to='/signup' text='SIGNUP' />

              </>)}
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default Header