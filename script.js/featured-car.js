document.querySelectorAll(".color-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedColor = btn.getAttribute("data-color");

    document.querySelectorAll(".hero-image").forEach(img => {
      img.classList.remove("active");
    });

    const selectedImage = document.querySelector(`.hero-image.${selectedColor}`);
    if (selectedImage) {
      selectedImage.classList.add("active");
    }
  });
});

// Show the default image on page load (e.g., purple)
document.querySelector(".hero-image.purple").classList.add("active");
