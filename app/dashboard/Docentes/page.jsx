import styles from "@/app/ui/dashboard/Docentes/Docentes.module.css"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import Search from "@/app/ui/dashboard/search/search"
import Image from "next/image"
import Link from "next/link"
const DocentesPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Buscar por docente..." />
                <Link href="/dashboard/Docentes/Crear">
                    <button className={styles.addButton}>Añadir Nuevo</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Nombres</td>
                        <td>Apellidos</td>
                        <td>Telefono</td>
                        <td>N° de Documento</td>
                        <td>Email</td>
                        <td>Acción</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Gabriel Ventura</td>
                        <td>nose quemas</td>
                        <td>980990912</td>
                        <td>75223030</td>
                        <td>202010604@urp.edu.pe</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href="/dashboard/Docentes/test">
                                    <button className={`${styles.button} ${styles.view}`}>
                                        Ver
                                    </button>
                                </Link>
                                <button className={`${styles.button} ${styles.delete}`}>
                                    Eliminar
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination />
        </div>
    )
}


export default DocentesPage