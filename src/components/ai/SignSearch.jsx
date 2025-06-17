import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { Input, Button, Typography, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const API_URL = "http://localhost:8000/predict";

function SignSearch() {
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

        const res = await fetch(imageSrc);
        const blob = await res.blob();
        const formData = new FormData();
        formData.append("file", blob, "snapshot.jpg");

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

    return (
        <div style={{ textAlign: "center", padding: 16 }}>
            <Typography.Title level={3} style={{ marginBottom: 8 }}>
                Buscar usando Señas
            </Typography.Title>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 16,
                    position: "relative",
                }}
            >
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
                />
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
                    readOnly
                    placeholder="Las letras aparecerán aquí..."
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 8,
                        background: "#f5f5f5",
                    }}
                />
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