import styles from './Header.module.css'

function Header() {
   return (
      <header className={styles.header}>
         <span>Ajuda Aluno</span>
         <nav>
            <a href=''>Sobre</a>
            <a href=''>Contatos</a>
         </nav>
      </header>
   )
}

export default Header