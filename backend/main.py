from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = tf.keras.models.load_model('./saved_models/2')

CLASS_NAMES = class_names = ['Bacterial spot of bell Pepper','Healthy Bell Pepper', 'Bacterial spot of Tomato',
 'Early blight of Tomato','Late blight of Tomato','Leaf mold of Tomato','Septoria leaf spot of Tomato','Spider mites or Two-spotted spider mite of Tomato','Target Spot of Tomato','Yellow leaf curl virus of Tomato','Mosaic virus of Tomato','Healthy Tomato']

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    image = tf.image.resize(image, [224, 224])
    img_batch = np.expand_dims(image,0) #increase dimension
    predictions =  MODEL.predict(img_batch)
    
    index = np.argmax(predictions[0]) #get the index of the max value
    
    predicted_class = CLASS_NAMES[index]
    
    confidence = np.max(predictions[0])
    
    
    return {
        'class':predicted_class,
        "confidence":float(confidence)
    }


# if __name__ == "__main__":
#     uvicorn.run(app, host='192.168.95.90',port=8080)