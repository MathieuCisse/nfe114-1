<?php

use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

function createJwt(Response $response): Response
{
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
        'userid' => 'toto',
        'email' => 'toto@gmail.com',
        'pseudo' => 'totoPseudo',
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}
function getJWTToken($request)
{
    $payload = str_replace("Bearer ", "", $request->getHeader('Authorization')[0]);
    $token = JWT::decode($payload,JWT_SECRET , array("HS256"));
    return $token;
}


const JWT_SECRET = "makey1234567";
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello","/api/login","/api/createUser"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app = AppFactory::create();
$app->add(new Tuupola\Middleware\JwtAuthentication($options));

$app->get('/api/hello/{name}',
    function (Request $request, Response $response, $args) {
        $response->getBody()->write(json_encode(array('nom' => $args['name'])));
        return $response;
    });

$app->post('/api/login',
    function (Request $request, Response $response) {
        $err = false;

        $body = $request->getBody();
        $data = json_decode($body, true);

        $login = $data['login'] ?? '';
        $pass = $data['password'] ?? '';

        if(!preg_match("/[a-zA-Z0-9]{1,20}/", $login)){
            $err = true;
        }
        if(!preg_match("/[a-zA-Z0-9]{1,20}/", $pass)){
            $err = true;
        }
        if(!$err){
            $response = createJWT($response);
            $data = ['nom'=> 'toto', 'prenom'=> 'titi'];
            $response->getBody()->write(json_encode($data));
        }else{
            $response = $response->withStatus(401);
        }
        return $response;
    });

$app->get('/api/user',
    function (Request $request, Response $response) {
        $payload = getJWTToken($request);
        $userid = $payload->userid;
        $response->getBody()->write($userid);
        return $response;
    });

$app->get('/api/catalog',
    function(Request $request, Response $response) {
        $products = file_get_contents("../bouchon/products.json");

        if($products) {
            $response->getBody()->write(json_encode($products));
        } else {
            $response->withStatus(404);
        }

        return $response;
    });

$app->get('/api/catalog/{filter}',
    function(Request $request, Response $response, $args) {
        $products = file_get_contents("../bouchon/products.json");

        // s'il n'y a pas d'erreur dans la récupération du bouchon
        if($products) {

            $filterValue = (string)$args['filter'];
            array_filter(json_encode($products, true), function($value) use ($filterValue) {
                // si le filtre est similaire à plus de 50% au titre du produit alors on le garde
                return similar_text((string)$value['titre'], $filterValue) > 50;
            })
            $response->getBody()->write(json_encode($products));
        } else {
            $response->withStatus(404);
        }


        return $response;
    });

$app->run();
