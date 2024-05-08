'use client'
import { useState, useEffect } from 'react';
import { getApoderados, createApoderados } from '@/app/api/apoderados';
import { getDniTipos } from "@/app/api/dni";
import styles from "@/app/ui/dashboard/Apoderados/addApoderados/addApoderados.module.css"
import Swal from 'sweetalert2'

const AddApoderadosPage = () => {
  const [apoderados, setApoderados] = useState([]);
  const [dniTipos, setDniTipos] = useState([]);

  const [formData, setFormData] = useState({
    nombres_apoderado: '',
    apellidos_apoderado: '',
    email_apoderado: '',
    telefono_apoderado: '',
    direccion_apoderado: '',
    numero_dni: '',
    dni_id: '',
  });

  useEffect(() => {
    const fetchApoderados = async () => {
      try {
        const data = await getApoderados();
        setApoderados(data);
      } catch (error) {
        console.error('Error al obtener los apoderados:', error);
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
    fetchApoderados();
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
      const response = await createApoderados(formData);

      if (response) {
        Swal.fire({
          title: "Creación Exitosa!",
          text: "Apoderado creado exitosamente",
          icon: "success"
        }).then(() => {
          // Redireccionar al listado de alumnos
          window.location.href = "/dashboard/Apoderados";
        });
      }
    } catch (error) {
      console.error('Error al crear el apoderad:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

    return (
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" placeholder="Nombres" name="nombres_apoderado" value={formData.nombres_apoderado} onChange={handleChange} required />
            <input type="text" placeholder="Apellidos" name="apellidos_apoderado" value={formData.apellidos_apoderado} onChange={handleChange}  required />
            <input type="email" placeholder="Email" name="email_apoderado" value={formData.email_apoderado} onChange={handleChange}  required />
            <input type="text" placeholder="Teléfono" name="telefono_apoderado" value={formData.telefono_apoderado} onChange={handleChange}  required />
            <input type="text" placeholder="Dirección" name="direccion_apoderado" value={formData.direccion_apoderado} onChange={handleChange} required/>
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


export default  AddApoderadosPage 
