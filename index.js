const fs = require('fs');
const readline = require('readline');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// data
const etunimet = ["Mikko", "Anna", "Juhani", "Liisa", "Pekka", "Sari", "Timo", "Elina", "Ville", "Maria", "Heikki", "Sofia", "Juha", "Laura", "Eero", "Hanna", "Jussi", "Aino", "Janne", "Kaisa", "Teemu", "Satu", "Antti", "Katja", "Matti", "Niina", "Jari", "Anni", "Mika", "Leena", "Tuomas", "Ella", "Risto", "Elisa", "Samuli", "Helena", "Tuukka", "Mari", "Lauri", "Marika", "Aki", "Riikka", "Veikko", "Kati", "Sami", "Henna", "Seppo", "Susanna"],

  sukunimet = ["Korhonen", "Virtanen", "M\xe4kinen", "Nieminen", "Koskinen", "H\xe4m\xe4l\xe4inen", "Laine", "Lehtonen", "Heikkinen", "J\xe4rvinen", "Laaksonen", "Miettinen", "Koivisto", "M\xe4kel\xe4", "Rantanen", "Salminen", "Kinnunen", "Jokinen", "Aaltonen", "Hakala", "Tuominen", "Lindroos", "Karppinen", "Laitinen", "Kujala", "Korpela", "Lindstr\xf6m", "Mikkola", "Laukkanen", "Tolonen", "Savolainen", "Pakarinen", "Kokko", "Virta", "Karjalainen", "Koivula", "Koivu", "Laukka", "Saari", "Kallio", "Hiltunen", "Rinne", "Rissanen", "Hirvonen", "Ranta", "Korpi", "Koskela", "Kukkonen"],

  kadunnimet = ["Kapraantie", "Testitie", "Kuusitie", "M\xe4ntykatu", "Omenapolku", "Vaahteratie", "Katajakuja", "Haavapolku", "Tammikuja", "Koivutie", "Pihlajatie", "Lehtikatu", "Kastanjatie", "Vadelmakuja", "Herukkatie", "Kirsikkatie", "Mets\xe4tie", "J\xe4rvenranta", "Aurinkokatu", "T\xe4htikuja", "Kuunsilta", "Purjeentie", "Hiekkakuja", "Merituuli", "Vesitorninkatu", "Satamakatu", "Siltatie", "Tulppaanikatu", "Orvokkitie", "Ruusupuisto", "Lumikuja", "Hangaspolku", "Kimaltaj\xe4rvi", "Kuutamotie", "Revontulentie", "T\xe4htisilm\xe4", "Pilvitie", "Sadekuja", "Sateenkaarentie", "Taikamets\xe4", "Unikkopolku", "Ruohokatu", "Keltakuja", "Sinipolku", "Oranssikuja", "Punatienniemi", "Sinipiha", "Vihersiili", "Harmaaranta"],

  kaupungit = ["Lahti", "Jyv\xe4skyl\xe4", "Kuopio", "Lappeenranta", "Rovaniemi", "Joensuu", "Vaasa", "Kajaani", "Kokkola", "Sein\xe4joki", "Kouvola", "H\xe4meenlinna", "Mikkeli", "Savonlinna", "Porvoo", "Varkaus", "Hyvink\xe4\xe4", "Salo", "Kotka", "Pietarsaari"],
  postinumerot =
    ["15100", "40100", "70100", "53100", "96100", "80100", "65100", "87100", "67100", "60100", "45100", "13100", "50100", "57100", "06100", "79100", "78200", "05800", "24100", "48100", "68600"],

  PuhelinNumerot = ["+358 404372343", "+358 403843243", "+358 405678901", "+358 409876543", "+358 406543210", "+358 402345678", "+358 407654321", "+358 408765432", "+358 401234567", "+358 402345678", "+358 409876543", "+358 406543210", "+358 405678901", "+358 403843243", "+358 407654321", "+358 401234567", "+358 408765432", "+358 402345678", "+358 403843243", "+358 406543210", "+358 405678901", "+358 401234567", "+358 408765432", "+358 409876543", "+358 407654321", "+358 402345678", "+358 405678901", "+358 401234567", "+358 408765432", "+358 409876543", "+358 402345678", "+358 404372343", "+358 405678901", "+358 403843243", "+358 401234567", "+358 407654321", "+358 406543210", "+358 402345678"],

  emailProviders = ["gmail.com", "protonmail.com", "outlook.com", "yahoo.com", "icloud.com", "yandex.com", "zoho.com",],

  Sukupuoli = ["Mies", "Nainen"],

  Maksutapa = ["Paypal", "Skrill", "Credit/Debit card", "Bitcoin", "Ethereum", "Coinbase pay", "Moon pay"],

  Toimitustapa = ["Posti automaatti", "Ovelle", "Postin toimipiste"],

  products = [{ Name: "Smartphone", Price: 500, VAT: .24 }, { Name: "Laptop", Price: 1e3, VAT: .24 }, { Name: "Tablet", Price: 300, VAT: .24 }, { Name: "Headphones", Price: 100, VAT: .24 }, { Name: "Smartwatch", Price: 200, VAT: .24 }, { Name: "Camera", Price: 600, VAT: .24 }, { Name: "Television", Price: 800, VAT: .24 }, { Name: "Gaming Console", Price: 400, VAT: .24 }, { Name: "Coffee Maker", Price: 50, VAT: .24 }, { Name: "Blender", Price: 60, VAT: .24 }, { Name: "Refrigerator", Price: 700, VAT: .24 }, { Name: "Microwave", Price: 80, VAT: .24 }, { Name: "Table Fan", Price: 40, VAT: .24 }, { Name: "Air Purifier", Price: 300, VAT: .24 }, { Name: "Wireless Mouse", Price: 20, VAT: .24 }, { Name: "External Hard Drive", Price: 120, VAT: .24 }, { Name: "Desk Chair", Price: 150, VAT: .24 }, { Name: "LED Monitor", Price: 250, VAT: .24 }, { Name: "Vacuum Cleaner", Price: 90, VAT: .24 }, { Name: "Dishwasher", Price: 400, VAT: .24 }, { Name: "Toaster Oven", Price: 70, VAT: .24 }, { Name: "Smart Thermostat", Price: 120, VAT: .24 }, { Name: "Digital Camera", Price: 350, VAT: .24 }, { Name: "Fitness Tracker", Price: 60, VAT: .24 }, { Name: "Electric Scooter", Price: 250, VAT: .24 }, { Name: "Coffee Grinder", Price: 30, VAT: .24 }, { Name: "Blu-ray Player", Price: 80, VAT: .24 }, { Name: "Handheld Vacuum", Price: 50, VAT: .24 }, { Name: "Wireless Earbuds", Price: 100, VAT: .24 }, { Name: "Home Theater System", Price: 300, VAT: .24 }, { Name: "Robot Vacuum", Price: 220, VAT: .24 }, { Name: "Electric Kettle", Price: 40, VAT: .24 }, { Name: "Digital Drawing Tablet", Price: 150, VAT: .24 }, { Name: "Microwave Oven", Price: 90, VAT: .24 }, { Name: "Bluetooth Speaker", Price: 60, VAT: .24 }, { Name: "Hair Dryer", Price: 25, VAT: .24 }, { Name: "Electric Toothbrush", Price: 35, VAT: .24 }, { Name: "Bicycle", Price: 300, VAT: .24 }, { Name: "Sofa", Price: 800, VAT: .24 }, { Name: "Car Vacuum Cleaner", Price: 50, VAT: .24 }, { Name: "Rice Cooker", Price: 45, VAT: .24 }, { Name: "Massage Chair", Price: 500, VAT: .24 }, { Name: "Washing Machine", Price: 350, VAT: .24 },];

const VAT = 0.24; // 24% VAT

const orderStatuses = ['Processing', 'Shipped', 'Delivered', 'Returned', 'Cancelled'];

function getRandomItemFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function generoiOsoite() {
  const street = getRandomItemFromArray(kadunnimet);
  const city = getRandomItemFromArray(kaupungit);
  const postalCode = getRandomItemFromArray(postinumerot);
  return `${street}, ${city}, ${postalCode}`;
}

function generateRandomPaymentConfirmation() {
  const paymentStatuses = ['Success', 'Pending', 'Failed'];
  const paymentStatus = getRandomItemFromArray(paymentStatuses);
  const paymentDate = new Date(new Date(2023, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2023, 0, 1).getTime()));
  return {
    PaymentStatus: paymentStatus,
    PaymentDate: paymentDate.toISOString(),
  };
}

function generateRandomShippingTracking() {
  const carrierCompanies = ['Matkahuolto', 'Posti', 'DHL', 'UPS', 'DB   Schenker', 'Itella', 'PostNord', 'GLS', 'Schenker', 'FedEx'];
  const trackingNumber = Math.floor(Math.random() * 1000000000).toString();
  const estimatedDeliveryDate = new Date(new Date().getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);
  const carrierCompany = getRandomItemFromArray(carrierCompanies);

  return {
    TrackingNumber: trackingNumber,
    EstimatedDeliveryDate: estimatedDeliveryDate.toISOString(),
    CarrierCompany: carrierCompany,
  };
}

function generateRandomBuyOrder() {
  const firstName = getRandomItemFromArray(etunimet);
  const lastName = getRandomItemFromArray(sukunimet);
  const fullName = `${firstName} ${lastName}`;
  const address = generoiOsoite();
  const phoneNumber = getRandomItemFromArray(PuhelinNumerot);

  const emailProvider = getRandomItemFromArray(emailProviders);
  const email = `${firstName}${lastName}@${emailProvider}`;

  const gender = getRandomItemFromArray(Sukupuoli);
  const paymentMethod = getRandomItemFromArray(Maksutapa);
  const deliveryMethod = getRandomItemFromArray(Toimitustapa);

  const productCount = Math.floor(Math.random() * 5) + 1;
  const orderProducts = [];
  let orderTotal = 0;
  for (let i = 0; i < productCount; i++) {
    const product = getRandomItemFromArray(products);
    const quantity = Math.floor(Math.random() * 5) + 1;
    const price = product.Price;
    const productTotal = quantity * price;
    const productTotalWithTax = productTotal * (1 + VAT);
    orderProducts.push({
      Name: product.Name,
      Quantity: quantity,
      Price: price,
      ProductTotal: productTotal,
      ProductTotalWithTax: productTotalWithTax,
    });
    orderTotal += productTotalWithTax;
  }

  const transactionID = Math.floor(Math.random() * 1000000);
  const orderDate = new Date(
    new Date(2023, 0, 1).getTime() +
    Math.random() * (new Date().getTime() - new Date(2023, 0, 1).getTime())
  );

  const paymentConfirmation = generateRandomPaymentConfirmation();
  const shippingTracking = generateRandomShippingTracking();

  const orderStatus = getRandomItemFromArray(orderStatuses);

  return {
    FullName: fullName,
    Address: address,
    PhoneNumber: phoneNumber,
    Email: email,
    Gender: gender,
    PaymentMethod: paymentMethod,
    DeliveryMethod: deliveryMethod,
    Products: orderProducts,
    OrderTotal: orderTotal,
    TransactionID: transactionID,
    OrderDate: orderDate.toISOString(),
    PaymentConfirmation: paymentConfirmation,
    ShippingTracking: shippingTracking,
    OrderStatus: orderStatus,
  };
}

function generateRandomBuyOrders(count) {
  const buyOrders = [];
  for (let i = 0; i < count; i++) {
    buyOrders.push(generateRandomBuyOrder());
  }
  return buyOrders;
}

// Define the headers for the CSV file
const csvWriter = createCsvWriter({
  path: 'buy_orders.csv',
  header: [
    { id: 'OrderNumber', title: 'Order Number' },
    { id: 'FullName', title: 'Full Name' },
    { id: 'Address', title: 'Address' },
    { id: 'PhoneNumber', title: 'Phone Number' },
    { id: 'Email', title: 'Email' },
    { id: 'Gender', title: 'Gender' },
    { id: 'PaymentMethod', title: 'Payment Method' },
    { id: 'DeliveryMethod', title: 'Delivery Method' },
    { id: 'Products', title: 'Products' },
    { id: 'OrderTotal', title: 'Order Total' },
    { id: 'OrderTotalWithTax', title: 'Order Total With Tax' },
    { id: 'TransactionID', title: 'Transaction ID' },
    { id: 'OrderDate', title: 'Order Date' },
    { id: 'PaymentStatus', title: 'Payment Status' },
    { id: 'PaymentDate', title: 'Payment Date' },
    { id: 'TrackingNumber', title: 'Tracking Number' },
    { id: 'EstimatedDeliveryDate', title: 'Estimated Delivery Date' },
    { id: 'CarrierCompany', title: 'Carrier Company' },
    { id: 'OrderStatus', title: 'Order Status' },
  ],
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generateAndPrintBuyOrderHTML(buyOrder, index) {
  let htmlContent = `<tr>`;
  htmlContent += `<td>${index + 1}</td>`;
  htmlContent += `<td>${buyOrder.FullName}</td>`;
  htmlContent += `<td>${buyOrder.Address}</td>`;
  htmlContent += `<td>${buyOrder.PhoneNumber}</td>`;
  htmlContent += `<td>${buyOrder.Email}</td>`;
  htmlContent += `<td>${buyOrder.Gender}</td>`;
  htmlContent += `<td>${buyOrder.PaymentMethod}</td>`;
  htmlContent += `<td>${buyOrder.DeliveryMethod}</td>`;

  htmlContent += '<td><ul>';
  buyOrder.Products.forEach((product) => {
    htmlContent += `<li>${product.Name} - Quantity: ${product.Quantity}</li>`;
  });
  htmlContent += '</ul></td>';

  htmlContent += `<td>${buyOrder.OrderTotal}</td>`;
  htmlContent += `<td>Transaction ID: ${buyOrder.TransactionID}</td>`;
  htmlContent += `<td>Order Date: ${buyOrder.OrderDate}</td>`;
  htmlContent += `<td>${buyOrder.PaymentConfirmation.PaymentStatus}, 
  Date: ${buyOrder.PaymentConfirmation.PaymentDate}</td>`;
  htmlContent += `<td>Tracking number: <br>${buyOrder.ShippingTracking.TrackingNumber},<br><br>
  Estimated Delivery Date:<br> ${buyOrder.ShippingTracking.EstimatedDeliveryDate},<br><br>
  Carrier Company: <br>${buyOrder.ShippingTracking.CarrierCompany}</td><br>`;
  htmlContent += `<td>${buyOrder.OrderStatus}</td>`;
  htmlContent += `</tr>`;

  console.log(`Buy Order ${index + 1}:`);
  console.log(buyOrder);

  return htmlContent;
}

rl.question('Enter the number of buy orders you want to generate: ', (numberOfBuyOrders) => {
  const randomBuyOrders = generateRandomBuyOrders(parseInt(numberOfBuyOrders));

  // Create an HTML template with a table structure and modern CSS styles
  let htmlContent = `
    <html>
      <head>
        <title>Buy Orders</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
          }
          h1 {
            background-color: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px;
            background-color: white;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #007bff;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <h1>Generated Buy Orders</h1>
        <table>
          <tr>
            <th>Order #</th>
            <th>Full Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Payment Method</th>
            <th>Delivery Method</th>
            <th>Products</th>
            <th>Order Total</th>
            <th>Transaction ID</th>
            <th>Order Date</th>
            <th>Payment Confirmation</th>
            <th>Shipping Tracking</th>
            <th>Order Status</th>
          </tr>
  `;

  randomBuyOrders.forEach((buyOrder, index) => {
    htmlContent += generateAndPrintBuyOrderHTML(buyOrder, index);
  });

  // Close the table and HTML structure
  htmlContent += `
        </table>
      </body>
    </html>
  `;

  try {
    // Write the HTML content to a file
    fs.writeFileSync('buy_orders.html', htmlContent, 'utf8');
    console.log('HTML file "buy_orders.html" has been generated with the buy orders.');
  } catch (err) {
    console.error('Error writing HTML file:', err);
  }

  try {
    // Write the data to JSON file
    fs.writeFileSync('buy_orders.json', JSON.stringify(randomBuyOrders, null, 2), 'utf8');
    console.log('JSON file "buy_orders.json" has been generated with the buy orders.');
  } catch (err) {
    console.error('Error writing JSON file:', err);
  }

  // Write the data to the CSV file
  csvWriter
    .writeRecords(randomBuyOrders)
    .then(() => {
      console.log('CSV file "buy_orders.csv" has been generated with the buy orders.');
      rl.close();
    })
    .catch((error) => console.error('Error writing CSV:', error));
});
