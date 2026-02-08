document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("No component ID found in URL");
    return;
  }

  fetch(`http://localhost:8080/api/component/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Component not found");
      }
      return res.json();
    })
    .then(data => {
      document.getElementById("partNumber").innerText = data.partNumber || "-";
      document.getElementById("serialNumber").innerText = data.serialNumber || "-";
      document.getElementById("batchNumber").innerText = data.batchNumber || "-";
      document.getElementById("manufacturingtype").innerText = data.manufacturingType || "-";
      document.getElementById("expiry").innerText = data.expiry || "-";
    })
    .catch(err => {
      console.error(err);
      alert("Failed to load component details");
    });
});