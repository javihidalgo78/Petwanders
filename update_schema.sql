-- Agrega la columna 'rol' a la tabla 'usuarios'
ALTER TABLE `usuarios` ADD `rol` VARCHAR(20) NOT NULL DEFAULT 'cliente' AFTER `password`;

-- Asigna el rol de 'admin' a un usuario existente (ej. usuario con id = 1)
-- CAMBIA EL ID POR EL DEL USUARIO QUE QUIERAS HACER ADMINISTRADOR
UPDATE `usuarios` SET `rol` = 'admin' WHERE `id` = 1;

-- Opcional: Crea un nuevo usuario administrador si no tienes uno
-- Reemplaza los valores de ejemplo con los datos que desees
-- INSERT INTO `usuarios` (`nombre`, `apellidos`, `email`, `password`, `rol`) VALUES
-- ('Admin', 'Petwanders', 'admin@petwanders.com', 'UNA_CONTRASEÑA_SEGURA_HASHEADA', 'admin');

