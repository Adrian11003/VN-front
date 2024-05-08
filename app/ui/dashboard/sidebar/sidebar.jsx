import MenuLink from './menuLink/menuLink';
import styles from './sidebar.module.css';
import { MdDashboard, MdSupervisedUserCircle, MdHail, MdLogout, MdAutoStories } from "react-icons/md";
import Image from 'next/image';

const menuItems = [
    {
        title: "pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: < MdDashboard />,
            },
            {
                title: "Alumnos",
                path: "/dashboard/Alumnos",
                icon: < MdSupervisedUserCircle />,
            },
            {
                title: "Apoderados",
                path: "/dashboard/Apoderados",
                icon: < MdHail />,
            },
            {
                title: "Docentes",
                path: "/dashboard/Docentes",
                icon: < MdAutoStories />,
            },

        ],
    },


];
const Sidebar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" alt="" width="50" height="50" />
                <div className={styles.userDetail}>
                    <span className={styles.username}> Dereck Muñoz</span>
                    <span className={styles.userTitle}>Tp1</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((cat =>
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map(item => (
                            <MenuLink item={item} key={item.title} />
                        ))}

                    </li>
                ))}
            </ul>
            <button className={styles.logout}>
                <MdLogout />
                Logout
            </button>
        </div>
    )
}

export default Sidebar