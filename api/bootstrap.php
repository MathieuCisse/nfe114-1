<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-54-78-36-245.eu-west-1.compute.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'qlwoxcgbwpikrr',
'password' => 'bdfe1e53defd718701b1114c850c88fd64a4818dbe0e5408aaa7869eabc7d7f4',
'dbname' => 'deljqe203ak04j',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);
