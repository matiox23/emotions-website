import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AdminTab() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
      className="space-y-6"
    >
      {/* Título animado */}
      <motion.h2
        className="text-2xl font-bold mb-6 text-customBlue"
        variants={cardVariants}
      >
        Administrador
      </motion.h2>

      {/* Tarjeta de configuración con animación y efecto hover */}
      <motion.div variants={cardVariants}>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent>
            <p>
              Configuración del administrador y opciones avanzadas irían aquí.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
