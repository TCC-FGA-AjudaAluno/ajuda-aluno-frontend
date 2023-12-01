import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header(props) {
   return (
      <header className={styles.header}> 
         <Link to={`/${props.path}`}>
            <span>Ajuda Aluno</span>           
         </Link>
         <nav>
            <a href=''>Sobre</a>
         </nav>
      </header>
   )
}

export default Header