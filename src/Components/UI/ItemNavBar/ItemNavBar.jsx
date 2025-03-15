import { NavLink } from 'react-router'

export const ItemNavBar = ({ url="*", styles, children="Sin Contenido" }) => {
  return (
    <li>
      <NavLink className={styles} to={url}> {children} </NavLink>
    </li>
  )
}
