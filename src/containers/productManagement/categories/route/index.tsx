import React from "react";
import styles from "@/styles/add.module.scss";
import {IRoute} from "@/containers/productManagement/categories/add";
import Link from "next/link";

interface IRouteComp {
    routes: IRoute[];
}

const Route = ({routes}: IRouteComp) => {
    return (
        <div className={styles.routeContainer}>
            <div className={styles.wrapper}>
                <svg
                    className={styles.homeIcon}
                    width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="home-line">
                        <path id="Icon"
                              d="M6.66667 14.1663H13.3333M9.18141 2.30297L3.52949 6.6989C3.15168 6.99276 2.96278 7.13968 2.82669 7.32368C2.70614 7.48667 2.61633 7.67029 2.56169 7.86551C2.5 8.0859 2.5 8.32521 2.5 8.80384V14.833C2.5 15.7664 2.5 16.2331 2.68166 16.5896C2.84144 16.9032 3.09641 17.1582 3.41002 17.318C3.76654 17.4996 4.23325 17.4996 5.16667 17.4996H14.8333C15.7668 17.4996 16.2335 17.4996 16.59 17.318C16.9036 17.1582 17.1586 16.9032 17.3183 16.5896C17.5 16.2331 17.5 15.7664 17.5 14.833V8.80384C17.5 8.32521 17.5 8.0859 17.4383 7.86551C17.3837 7.67029 17.2939 7.48667 17.1733 7.32368C17.0372 7.13968 16.8483 6.99276 16.4705 6.69891L10.8186 2.30297C10.5258 2.07526 10.3794 1.9614 10.2178 1.91763C10.0752 1.87902 9.92484 1.87902 9.78221 1.91763C9.62057 1.9614 9.47418 2.07526 9.18141 2.30297Z"
                              stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                </svg>
            </div>
            {
                routes.map((route, i) =>
                    <div
                        key={i}
                        className={"flex items-center gap-2"}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="chevron-right">
                                <path id="Icon" d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                        </svg>
                        <Link
                            href={route.link}
                            key={i}
                            className={styles.wrapper}
                        >
                            <span className={"text-tertiary"}>{route.name}</span>
                        </Link>
                    </div>
                )
            }
        </div>
    );
};

export default Route;
