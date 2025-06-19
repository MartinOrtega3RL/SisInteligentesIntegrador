from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
import mediapipe as mp
import numpy as np
import cv2
import json

app = FastAPI()

# CORS: Ajusta allow_origins a tu frontend en producción
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*" ],  # Permite todo, solo para testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Carga modelo y clases
MODEL_PATH = './asl_model.h5'
CLASS_INDICES_PATH = 'class_indices.json'
IMG_SIZE = (64, 64)

model = load_model(MODEL_PATH)
with open(CLASS_INDICES_PATH, 'r') as f:
    class_indices = json.load(f)
class_labels = {v: k for k, v in class_indices.items()}

mp_hands = mp.solutions.hands

@app.get("/")
def root():
    return {"message": "ASL Recognizer Backend Running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        return {"error": "No se pudo leer la imagen"}

    # MediaPipe espera imágenes RGB
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    with mp_hands.Hands(
        static_image_mode=True,
        max_num_hands=1,
        min_detection_confidence=0.6
    ) as hands:
        results = hands.process(img_rgb)
        if not results.multi_hand_landmarks:
            # No se detectó mano
            return {"letter": "", "confidence": 0, "message": "No hand detected"}

        # Obtiene el bounding box de la mano detectada
        h, w, _ = img.shape
        hand_landmarks = results.multi_hand_landmarks[0]
        x_coords = [lm.x for lm in hand_landmarks.landmark]
        y_coords = [lm.y for lm in hand_landmarks.landmark]
        xmin, xmax = int(min(x_coords) * w), int(max(x_coords) * w)
        ymin, ymax = int(min(y_coords) * h), int(max(y_coords) * h)

        # Padding y límites
        pad = 20
        xmin = max(0, xmin - pad)
        xmax = min(w, xmax + pad)
        ymin = max(0, ymin - pad)
        ymax = min(h, ymax + pad)

        hand_img = img[ymin:ymax, xmin:xmax]
        if hand_img.size == 0:
            return {"letter": "", "confidence": 0, "message": "Empty crop"}
        hand_img = cv2.resize(hand_img, IMG_SIZE)
        hand_img = hand_img.astype('float32') / 255.0
        hand_img = np.expand_dims(hand_img, axis=0)

        preds = model.predict(hand_img)
        class_id = int(np.argmax(preds))
        confidence = float(np.max(preds))
        letter = class_labels[class_id]
        return {"letter": letter, "confidence": confidence}