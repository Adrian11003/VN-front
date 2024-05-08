import Search from "@/app/ui/dashboard/search/search"
import styles from "@/app/ui/dashboard/Alumnos/Alumnos.module.css"
import Link from "next/link"
import Image from "next/image"
import Pagination from "@/app/ui/dashboard/pagination/pagination"

const AlumnosPag = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Buscar por alumno..." />
                <Link href="/dashboard/Alumnos/Crear">
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
                        <td>Dirección</td>
                        <td>Acción</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Gabriel Francisco</td>
                        <td>Ventura Moreno</td>
                        <td>9937733544</td>
                        <td>75224028</td>
                        <td>Mariano Campos 302</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href="/dashboard/Alumnos/test">
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

export default AlumnosPag