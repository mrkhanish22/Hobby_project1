function generateQR() {

    // 1️⃣ Get values from input fields
    const part = document.getElementById("Part").value;
    const serial = document.getElementById("Serial").value;
    const lot = document.getElementById("Log").value;
    const manufacturingType = document.getElementById("manufacturingtype").value;
    const expiry = document.getElementById("Expiry").value;

    // 2️⃣ Basic validation
    if (!part || !serial || !lot || !manufacturingType || !expiry) {
        alert("Please fill all fields");
        return;
    }

    // 3️⃣ Prepare request body (MUST match backend fields)
    const requestData = {
  partNumber: part,
  serialNumber: serial,
  batchNumber: lot,
  manufacturingType: manufacturingType,
  expiry: expiry
};

    // 4️⃣ Send data to Spring Boot backend
    fetch("http://localhost:8080/api/component/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Backend error");
        }
        return response.json();
    })
    .then(data => {

        // 5️⃣ Backend returns saved component ID
        const componentId = data.id;

        // ⚠️ IMPORTANT:
        // Use your laptop IP instead of localhost if scanning from phone
        // Example: http://192.168.1.5:5500
        const qrUrl = `http://localhost:5500/second.html?id=${componentId}`;

        // 6️⃣ Clear previous QR
        document.getElementById("qrcode").innerHTML = "";

        // 7️⃣ Generate QR Code
        new QRCode(document.getElementById("qrcode"), {
            text: qrUrl,
            width: 180,
            height: 180
        });
    })
    .catch(error => {
        console.error(error);
        alert("Failed to connect to backend");
    });
}