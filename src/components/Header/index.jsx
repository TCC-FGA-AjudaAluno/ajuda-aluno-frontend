import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
   return (
      <header className={styles.header}> 
         <Link to="/">
            <span>Ajuda Aluno</span>           
         </Link>
         <nav>
            <a href=''>Sobre</a>
         </nav>
      </header>
   )
}

export default Header