<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
    'host' => 'ec2-63-35-156-160.eu-west-1.compute.amazonaws.com',
    'driver' => 'pdo_pgsql',
    'user' => 'mqgwsoayqztszi',
    'password' => '7ae93e6fc6c2e2652ba5141f9e81f9fb48bf7bad7937cf8a7841e55a0967b64a',
    'dbname' => 'de8jj30nho6nrm',
    'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);