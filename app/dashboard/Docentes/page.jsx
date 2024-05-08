'use client'

import styles from "@/app/ui/dashboard/Docentes/Docentes.module.css"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import Search from "@/app/ui/dashboard/search/search"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { getDocentes, deleteDocentes } from "@/app/api/docentes"

const DocentesPage = () => {
    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDocentes();
                setDocentes(data);
            } catch (error) {
                console.error('Error al obtener los datos de los docentes:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        // Mostrar el SweetAlert2 de confirmación
        Swal.fire({
          title: "¿Estás seguro?",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminarlo",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await deleteDocentes(id);
              const updateDocente = docentes.filter((docentes) => docentes.id !== id);
              setDocentes(updateDocente);
              Swal.fire({
                title: "¡Eliminado!",
                text: "Tu docente ha sido eliminado.",
                icon: "success",
              });
            } catch (error) {
              console.error("Error al eliminar el docente:", error);
              // Mostrar SweetAlert2 de error si ocurre algún problema
              Swal.fire({
                title: "Error",
                text: "Hubo un problema al eliminar el docente.",
                icon: "error",
              });
            }
          }
        });
      };

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
                {docentes.map((docentes, index) => (
                    <tr key={index}>
                        <td>{docentes.nombre_docente}</td>
                        <td>{docentes.apellido_docente}</td>
                        <td>{docentes.telefono_docente}</td>
                        <td>{docentes.numero_dni}</td>
                        <td>{docentes.email_docente}</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href="/dashboard/Docentes/test">
                                    <button className={`${styles.button} ${styles.view}`}>
                                        Actualizar
                                    </button>
                                </Link>
                                <button className={`${styles.button} ${styles.delete}`} onClick={() => handleDelete(docentes.docente_id)}>
                                    Eliminar
                                </button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Pagination />
        </div>
    )
}


export default DocentesPage