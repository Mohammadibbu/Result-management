function showAlert(message, type) {
  const alertContainer = document.getElementById("alertContainer");
  const alertElement = document.createElement("div");
  alertElement.className = `alert alert-${type} alert-custom alert-dismissible fade show`;
  alertElement.role = "alert";
  // Define icons based on type
  const icons = {
    error: "bi bi-x-circle",
    successful: "bi bi-check-circle",
    information: "bi bi-info-circle",
    warn: "bi bi-exclamation-triangle",
  };

  alertElement.innerHTML = `
    <i class="${icons[type]} alert-icon"></i>
    ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>`;

  alertContainer.appendChild(alertElement);

  // Automatically remove the alert after a few seconds
  setTimeout(() => {
    $(alertElement).alert("close");
  }, 5000);
}
