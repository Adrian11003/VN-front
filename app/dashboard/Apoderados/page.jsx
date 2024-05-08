'use client'

import styles from "@/app/ui/dashboard/Apoderados/Apoderados.module.css"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import Search from "@/app/ui/dashboard/search/search"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { getApoderados, deleteApoderado} from "@/app/api/apoderados"

const ApoderadosPage = () => {
    const [apoderados, setApoderados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getApoderados();
                setApoderados(data);
            } catch (error) {
                console.error('Error al obtener los datos de los apoderados:', error);
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
              await deleteApoderado(id);
              const updateApoderado = apoderados.filter((apoderado) => apoderado.id !== id);
              setApoderados(updateApoderado);
              Swal.fire({
                title: "¡Eliminado!",
                text: "Tu alumno ha sido eliminado.",
                icon: "success",
              });
            } catch (error) {
              console.error("Error al eliminar el apoderado:", error);
              // Mostrar SweetAlert2 de error si ocurre algún problema
              Swal.fire({
                title: "Error",
                text: "Hubo un problema al eliminar el apoderado.",
                icon: "error",
              });
            }
          }
        });
      };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Buscar por apoderado..." />
                <Link href="/dashboard/Apoderados/Crear">
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
                {apoderados.map((apoderados, index) => (
                    <tr key={index}>
                        <td>{apoderados.nombres_apoderado}</td>
                        <td>{apoderados.apellidos_apoderado}</td>
                        <td>{apoderados.telefono_apoderado}</td>
                        <td>{apoderados.numero_dni}</td>
                        <td>{apoderados.email_apoderado}</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href="/dashboard/Apoderados/test">
                                    <button className={`${styles.button} ${styles.view}`}>
                                    Actualizar
                                    </button>
                                </Link>
                                <button className={`${styles.button} ${styles.delete}`} onClick={() => handleDelete(apoderados.apoderado_id)}>
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


export default ApoderadosPage