document.addEventListener("DOMContentLoaded", function () {
    const btnCapture = document.getElementById("btnCapture");
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const photo = document.getElementById("photo");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Tu navegador no soporta la cámara.");
        return;
    }

    let stream = null;

    btnCapture.addEventListener("click", async function () {
        try {
            if (!stream) {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accediendo a la cámara:", error);
        }
    });

    btnShow.addEventListener("click", function () {
        if (!stream) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/png");
        localStorage.setItem("foto",imageData);
        photo.src = imageData;
        photo.style.display = "block";

        stream.getTracks().forEach(track => track.stop());
        stream = null;
    });
    const savedImage = localStorage.getItem("foto");
    if (savedImage) {
        photo.src = savedImage;
        photo.style.display = "block";
    }
});
