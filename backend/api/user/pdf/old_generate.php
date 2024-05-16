<?php
require '../../../vendor/autoload.php';

use Dompdf\Dompdf;
use Dotenv\Dotenv;
use BaconQrCode\Writer;
use BaconQrCode\Renderer\GDLibRenderer;

$dompdf = new Dompdf();
$desc = $_GET['desc'];
$username = $_GET['username'];
$email = $_GET['email'];
$slots = $_GET['slots'];
$date = $_GET['date'];
$ageneed = $_GET['ageneed'];

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../../');
$dotenv->load();
$server_ext = $_ENV['SERVER_EXT'];

$renderer = new GDLibRenderer(200);
$writer = new Writer($renderer);

// vous pouvez supprimer l'image qrcode mais ça se génère à chaque moment ou on appelle le pdf
$filename = 'qrcode/qrcode.png';
$writer->writeFile('Masterticket : Le ticket est valide', $filename);

$dompdf = new Dompdf();
echo "<!DOCTYPE html>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Facture</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    .container {
      width: 80%;
      margin: 20px auto;
    }

    .invoice {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 20px;
      background-color: #f9f9f9;
    }

    .invoice h1 {
      text-align: center;
    }

    .invoice .info {
      margin-bottom: 20px;
    }

    .invoice .info p {
      margin: 5px 0;
    }

    .invoice table {
      width: 100%;
      border-collapse: collapse;
    }

    .invoice table th, 
    .invoice table td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }

    .invoice table th {
      background-color: #f2f2f2;
    }

    .invoice .total {
      margin-top: 20px;
      text-align: right;
    }
  </style>
</head>
<body>

<div class='container'>
  <div class='invoice'>
    <h1>Facture</h1>
    <div class='info'>
      <p><strong>Client: $username</strong></p>
      <p><strong>Adresse:</strong> 25 Rue Claude Tillier, 75012 Paris</p>
      <p><strong>Email:</strong> $email</p>
    </div>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Quantité</th>
          <th>Age</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>$desc</td>
          <td>$slots</td>
          <td>$ageneed</td>
          <td>$date</td>
        </tr>
      </tbody>
    </table>
    <div class='total'>
      <p><strong>Total à payer:</strong> gratuit</p>
    </div>
    <div><img src='$server_ext/assets/images/qrcode.png' alt='qrcode'></div>
  </div>
</div>
</body>
</html>";

// $dompdf->loadHtml($html);
// $dompdf->setPaper('A4', 'landscape');
// $dompdf->render();
// $dompdf->stream();