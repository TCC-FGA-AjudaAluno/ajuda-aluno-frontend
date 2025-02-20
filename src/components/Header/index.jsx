import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header(props) {
   return (
      <header className={styles.header}> 
         <Link to={`/${props.path}`}>
            <span>AjudaAluno</span>           
         </Link>
      </header>
   )
}

export default Header