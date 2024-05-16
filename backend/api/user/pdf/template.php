<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

<div class="container">
  <div class="invoice">
    <h1>Facture</h1>
    <div class="info">
      <p><strong>Client:</strong> John Doe</p>
      <p><strong>Adresse:</strong> 123 Rue de la Facturation</p>
      <p><strong>Email:</strong> john@example.com</p>
    </div>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Quantité</th>
          <th>Prix unitaire</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Produit 1</td>
          <td>2</td>
          <td>10€</td>
          <td>20€</td>
        </tr>
        <tr>
          <td>Produit 2</td>
          <td>1</td>
          <td>15€</td>
          <td>15€</td>
        </tr>
      </tbody>
    </table>
    <div class="total">
      <p><strong>Total à payer:</strong> 35€</p>
    </div>
  </div>
</div>

</body>
</html>
