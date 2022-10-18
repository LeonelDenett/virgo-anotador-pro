// Next
import Image from "next/image";
// Mui Components
import Box from "@mui/material/Box";
// Framer Motion
import { motion } from "framer-motion";

function Logo({variants, initial, animate, exit, logoContainer, logoImage, width, height, }) {
    return (
        <Box
            component={motion.div}
            variants={variants}
            initial={initial}
            animate={animate}
            exit={exit}
            className={logoContainer}
            >
                <Image src="/logo.jpeg" alt="Logo" width={width} height={height} className={logoImage} />
        </Box>
    );
}

export default Logo;