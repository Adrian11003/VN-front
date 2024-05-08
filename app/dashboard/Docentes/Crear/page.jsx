'use client'
import { useState, useEffect } from 'react';
import { getDocentes, createDocentes } from '@/app/api/docentes';
import { getDniTipos } from "@/app/api/dni";
import styles from "@/app/ui/dashboard/Docentes/addDocentes/addDocente.module.css"
import Swal from 'sweetalert2'

const AddDocentesPage = () => {
  const [docentes, setDocentes] = useState([]);
  const [dniTipos, setDniTipos] = useState([]);

  const [formData, setFormData] = useState({
    nombre_docente: '',
    apellido_docente: '',
    direccion_docente: '',
    email_docente: '',
    telefono_docente: '',
    numero_dni: '',
    dni_id: '',
  });

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const data = await getDocentes();
        setDocentes(data);
      } catch (error) {
        console.error('Error al obtener los docentes:', error);
      }
    };

    const fetchDniTipos = async () => {
      try {
        const data = await getDniTipos();
        setDniTipos(data);
      } catch (error) {
        console.error('Error al obtener los tipos de DNI:', error);
      }
    };

    fetchDniTipos();
    fetchDocentes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'numero_dni' ? parseInt(value, 10) : name === 'dni_id' ? parseInt(value, 10) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createDocentes(formData);

      if (response) {
        Swal.fire({
          title: "Creación Exitosa!",
          text: "Docentes creado exitosamente",
          icon: "success"
        }).then(() => {
          // Redireccionar al listado de alumnos
          window.location.href = "/dashboard/Docentes";
        });
      }
    } catch (error) {
      console.error('Error al crear el docente:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

    return (
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" placeholder="Nombres" name="nombre_docente" value={formData.nombre_docente} onChange={handleChange} required />
            <input type="text" placeholder="Apellidos" name="apellido_docente" value={formData.apellido_docente} onChange={handleChange}  required />
            <input type="email" placeholder="Email" name="email_docente" value={formData.email_docente} onChange={handleChange}  required />
            <input type="text" placeholder="Teléfono" name="telefono_docente" value={formData.telefono_docente} onChange={handleChange}  required />
            <input type="text" placeholder="Dirección" name="direccion_docente" value={formData.direccion_docente} onChange={handleChange} required/>
            <input type="text" placeholder="Numero de Documento" name="numero_dni" value={formData.numero_dni} onChange={handleChange} required />
            <select name="dni_id" value={formData.dni_id} onChange={handleChange} required>
              <option value="">Seleccione un tipo de Documento</option>
              {dniTipos.map((tipoDni) => (
                <option key={tipoDni.dni_id} value={tipoDni.dni_id}>
                  {tipoDni.tipo_dni}
                </option>
              ))}
            </select>
            <button type="submit" className={styles.crear}>Crear</button>
          </form>
        </div>
      );
    };


export default  AddDocentesPage 
