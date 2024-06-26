<?php
require '../../../vendor/autoload.php';

use Dompdf\Dompdf;
use Dompdf\Options;
use BaconQrCode\Writer;
use BaconQrCode\Renderer\GDLibRenderer;

$options = new Options();
$options->set('chroot', realpath(''));
$dompdf = new Dompdf($options);

$desc = $_GET['desc'];
$username = $_GET['username'];
$email = $_GET['email'];
$slots = $_GET['slots'];
$date = $_GET['date'];
$ageneed = $_GET['ageneed'];

$renderer = new GDLibRenderer(200);
$writer = new Writer($renderer);

// le qrcode se génère lorsque l'api user/user est appélée
$filename = 'qrcode/qrcode.png';
$writer->writeFile("Masterticket : Le ticket est valide \nClient : $username", $filename);

$html = "<!DOCTYPE html>
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
      margin-right : 40px;
      text-align: right;
    }
  </style>
</head>
<body>

<div class='container'>
  <div class='invoice'>
    <h1>Facture de confirmation</h1>
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
    <div>
      <img src=$filename alt='qrcode'>
      <p>Le scan est obligatoire avant d'entrée</p>
    </div>
  </div>
</div>
</body>
</html>";

$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'landscape');
$dompdf->render();
$dompdf->stream("NEXAMPLE", array("Attachment" => false));

