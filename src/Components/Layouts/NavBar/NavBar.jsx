

export const Navbar = ({ styles, children }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {children}
      </ul>
    </nav>
  )
}
