import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { Input, Button, Typography, Space } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import signAlphabetImg from "../../assets/signASL.jpg"; // Asegúrate de que la ruta sea correcta

const API_URL = "http://localhost:8000/predict";

const SECTION_IDS = [
    "que-es-ia",
    "machine-learning",
    "deep-learning",
    "tipos-aprendizaje",
    "agentes",
    "busqueda"
];

const cropCenterSquare = async (imageSrc, cropSize = 180) => {
    return new Promise((resolve) => {
        const img = new window.Image();
        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = cropSize;
            canvas.height = cropSize;
            const ctx = canvas.getContext("2d");
            const x = (img.width - cropSize) / 2;
            const y = (img.height - cropSize) / 2;
            ctx.drawImage(img, x, y, cropSize, cropSize, 0, 0, cropSize, cropSize);
            canvas.toBlob((blob) => resolve(blob), "image/jpeg");
        };
        img.src = imageSrc;
    });
};

function SignSearch({ onClose }) {
    const webcamRef = useRef(null);
    const [prediction, setPrediction] = useState("");
    const [confidence, setConfidence] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [predBuffer, setPredBuffer] = useState([]);
    const lastAddedRef = useRef("");

    const capture = useCallback(async () => {
        if (!webcamRef.current) return;
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;
        const croppedBlob = await cropCenterSquare(imageSrc, 180);

        const formData = new FormData();
        formData.append("file", croppedBlob, "snapshot.jpg");

        fetch(API_URL, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (
                    data.letter &&
                    data.letter !== "nothing" &&
                    data.confidence > 0.9
                ) {
                    setPredBuffer((buffer) => {
                        const newBuffer = [...buffer, data.letter].slice(-3);
                        if (
                            newBuffer.length === 3 &&
                            newBuffer.every((l) => l === newBuffer[0]) &&
                            lastAddedRef.current !== newBuffer[0]
                        ) {
                            setTypedText((prev) => prev + newBuffer[0]);
                            lastAddedRef.current = newBuffer[0];
                            return [];
                        }
                        return newBuffer;
                    });
                    setPrediction(data.letter);
                    setConfidence(data.confidence);
                } else if (data.letter === "nothing") {
                    lastAddedRef.current = "";
                    setPredBuffer([]);
                }
            })
            .catch((err) => {
                // Puedes mostrar un error aquí si quieres
                console.error("Error al obtener predicción:", err);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(capture, 2000); // cada 2 segundos
        return () => clearInterval(interval);
    }, [capture]);

    const handleClear = () => {
        setTypedText("");
        setPrediction("");
        setConfidence(0);
        lastAddedRef.current = "";
        setPredBuffer([]);
    };

    const matchedSection = SECTION_IDS.find(id =>
        typedText.toLowerCase().slice(0, 3) === id.slice(0, 3)
    );

    const handleSearch = () => {
        if (matchedSection) {
            const el = document.getElementById(matchedSection);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                if (onClose) onClose();
            }
        }
    };

    return (
        <div style={{ textAlign: "center", padding: 16 }}>
            <Typography.Title level={3} style={{ marginBottom: 8 }}>
                Buscar usando Señas
            </Typography.Title>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: 32,
                    marginBottom: 24,
                    flexWrap: "wrap",
                }}
            >
                {/* Webcam */}
                <div style={{ position: "relative", minWidth: 350 }}>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={350}
                        height={260}
                        style={{ borderRadius: 12, border: "2px solid #e5e7eb" }}
                        videoConstraints={{
                            width: 350,
                            height: 260,
                            facingMode: "user",
                        }}
                        mirrored={true}
                    />
                    <div
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            width: 180,
                            height: 180,
                            transform: "translate(-50%, -50%)",
                            border: "2px dashed #1677ff",
                            borderRadius: 8,
                            pointerEvents: "none",
                            boxSizing: "border-box",
                        }}
                    ></div>
                </div>
                {/* Imagen de ejemplo */}
                <div
                    style={{
                        background: "#f8fafc",
                        borderRadius: 12,
                        border: "1px solid #e5e7eb",
                        padding: 16,
                        maxWidth: 350,
                        minWidth: 250,
                        boxShadow: "0 2px 8px #0001",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography.Text strong style={{ marginBottom: 8 }}>
                        Ejemplo de abecedario en señas:
                    </Typography.Text>
                    <img
                        src={signAlphabetImg}
                        alt="Ejemplo de abecedario en señas"
                        style={{
                            width: "100%",
                            maxWidth: 320,
                            borderRadius: 8,
                            border: "1px solid #e5e7eb",
                            background: "#fff",
                        }}
                    />
                </div>
            </div>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Typography.Text>
                    {prediction && (
                        <>
                            Letra detectada:{" "}
                            <span style={{ color: "#1677ff", fontWeight: 600 }}>
                                {prediction}
                            </span>{" "}
                            ({(confidence * 100).toFixed(1)}%)
                        </>
                    )}
                </Typography.Text>
                <Input
                    value={typedText}
                    onChange={e => setTypedText(e.target.value)}
                    placeholder="Las letras aparecerán aquí..."
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 8,
                        background: "#f5f5f5",
                    }}
                />
                {typedText.length >= 3 && matchedSection && (
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        style={{ marginTop: 8 }}
                        onClick={handleSearch}
                    >
                        Ir a sección "{matchedSection.replace(/-/g, " ")}"
                    </Button>
                )}
                <Button
                    icon={<DeleteOutlined />}
                    onClick={handleClear}
                    danger
                    style={{ marginTop: 8 }}
                >
                    Limpiar
                </Button>
            </Space>
        </div>
    );
}

export default SignSearch;