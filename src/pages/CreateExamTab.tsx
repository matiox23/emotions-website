import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CreateExamTab() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
      className="space-y-6"
    >
      {/* Título con animación */}
      <motion.h2
        className="text-2xl font-bold mb-6 text-customBlue"
        variants={cardVariants}
      >
        Crear Exámenes
      </motion.h2>

      {/* Tarjeta del formulario con animación de entrada */}
      <motion.div variants={cardVariants}>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Formulario para Crear un Nuevo Examen</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.form
              className="space-y-4"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.1 }}
            >
              {/* Campo Nombre del Examen */}
              <motion.div variants={cardVariants}>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre del Examen
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el nombre del examen"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </motion.div>

              {/* Campo Descripción */}
              <motion.div variants={cardVariants}>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  placeholder="Ingrese una descripción para el examen"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </motion.div>

              {/* Campo Fecha de Aplicación */}
              <motion.div variants={cardVariants}>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de Aplicación
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </motion.div>

              {/* Botón Crear Examen con efecto de escala en hover */}
              <motion.div variants={cardVariants}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Crear Examen
                </motion.button>
              </motion.div>
            </motion.form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
