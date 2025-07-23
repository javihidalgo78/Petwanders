<?php
session_start();
if (session_status() == PHP_SESSION_ACTIVE) {
//Borrar todos los datos de la sesión
session_unset();
//Destruye la sesión
session_destroy();
}