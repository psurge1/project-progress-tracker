import Image from "next/image";
import styles from "../page.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a
            href="https://psurge1.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            >
            <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
            />
            Personal Website
            </a>
            <a
            href="https://github.com/psurge1"
            target="_blank"
            rel="noopener noreferrer"
            >
            <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
            />
            Github
            </a>
            <a
            href="https://linkedin.com/in/surajswa"
            target="_blank"
            rel="noopener noreferrer"
            >
            <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
            />
            Linkedin
            </a>
        </footer>
    );
}