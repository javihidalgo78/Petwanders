<?php

//importamos el archivo config.php
require_once 'config.php';

//Clase para establecer el archivo config
class Database {
    //definimos los atributos
    //Les ponemos el valor de las constantes de config.php
    private $host = DB_HOST;
    private $username = DB_USER;
    private $password = DB_PASS;
    private $database = DB_NAME;
   

    //Guarda la conexión con la base de datos
    //la conexión con la base de datos es un objeto de tipo mysqli
    private $conexion;
    public function __construct()
    {
       $this->connect();
}

//Abre la conexión con la base de datos
private function connect(){
        $this->conexion = new mysqli($this->host, $this->username, $this->password, $this->database);

        if($this->conexion->connect_error){
            die('Error de Conexión: '. $this->conexion->connect_error);
        }  

        $this->conexion->set_charset('utf8');
}

public function getConexion(){
        return $this->conexion;
}
public function close(){
    if($this->conexion){
    $this->conexion->close();
    }
}
}