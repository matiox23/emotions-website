import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CameraComponentProps {
  onFaceDetected: (detected: boolean) => void;
  isFaceDetected: boolean;
  detectionStatus: string;
  setDetectionStatus: (status: string) => void;
}

export default function CameraComponent({
  onFaceDetected,
  isFaceDetected,
  detectionStatus,
  setDetectionStatus,
}: CameraComponentProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraActive(true);
        setDetectionStatus("Cámara activada. Buscando rostro...");
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
      setError(
        "No se pudo acceder a la cámara. Por favor, asegúrese de que tiene una cámara conectada y que ha dado permiso para usarla."
      );
    }
  }, [setDetectionStatus]);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    onFaceDetected(false);
    setDetectionStatus("Cámara desactivada");
  }, [onFaceDetected, setDetectionStatus]);

  const detectFace = useCallback(async () => {
    console.log("Ejecutando detectFace");
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Establecer el tamaño del canvas para que coincida con el video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/jpeg");

        // Imprimir la imagen en base64 en la consola
        console.log("ImageData:", imageData);

        try {
          setDetectionStatus("Analizando imagen...");
          // Simular llamada a API con un retraso
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Simular resultado de detección facial
          const faceDetected = Math.random() > 0.2; // 80% de probabilidad de detectar un rostro
          onFaceDetected(faceDetected);

          if (faceDetected) {
            setDetectionStatus("Rostro detectado.");
          } else {
            setDetectionStatus(
              "No se detectó ningún rostro. Por favor, ajuste su posición."
            );
          }
        } catch (error) {
          console.error("Error detecting face:", error);
          setDetectionStatus("Error en la detección. Reintentando...");
          onFaceDetected(false);
        }
      } else {
        console.error("No se pudo obtener el contexto 2D del canvas");
      }
    } else {
      console.error("No se encontró el elemento de video o canvas");
    }
  }, [onFaceDetected, setDetectionStatus]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isCameraActive) {
      intervalId = setInterval(detectFace, 3000); // Cada 3 segundos
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isCameraActive, detectFace]);

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden relative">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${
            isCameraActive ? "block" : "hidden"
          }`}
          autoPlay
          playsInline
          muted
          aria-label="Cámara de reconocimiento facial"
        />
        <canvas ref={canvasRef} className="hidden" />
        {!isCameraActive && (
          <div className="flex items-center justify-center h-full">
            <Camera
              className="h-24 w-24 text-gray-400"
              aria-label="Cámara inactiva"
            />
          </div>
        )}
      </div>
      <Button
        size="lg"
        className="w-full px-8 bg-blue-600 hover:bg-blue-700 text-white"
        onClick={isCameraActive ? stopCamera : startCamera}
        aria-label={isCameraActive ? "Detener cámara" : "Iniciar cámara"}
      >
        {isCameraActive ? "Detener cámara" : "Activar cámara"}
      </Button>
      <Alert variant={isFaceDetected ? "default" : "destructive"}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>
          {isFaceDetected ? "Rostro Detectado" : "Rostro No Detectado"}
        </AlertTitle>
        <AlertDescription>{detectionStatus}</AlertDescription>
      </Alert>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
